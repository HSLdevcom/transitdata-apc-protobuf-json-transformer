import pino from "pino";
import Pulsar from "pulsar-client";
import * as testcontainers from "testcontainers";
import { getConfig } from "./config";
import keepProcessingMessages from "./messageProcessing";
import { passengerCount } from "./protobuf/passengerCount";
import {
  createPulsarClient,
  createPulsarConsumer,
  createPulsarProducer,
} from "./pulsar";

// Starting Pulsar can take minutes on a busy machine.
jest.setTimeout(600_000);

const pulsarImage = "apachepulsar/pulsar:3.3.5";
const pulsarPort = 6650;
const pulsarAdminPort = 8080;
const inputTopic = "persistent://public/default/hfp-expanded-apc";
const outputTopic =
  "persistent://public/default/hfp-expanded-apc-mqtt-backfeed";
const subscription = "transitdata_partial_apc_protobuf_json_transformer";

const encodeApcData = (apcData: passengerCount.IData): Buffer =>
  Buffer.from(
    passengerCount.Data.encode(passengerCount.Data.create(apcData)).finish(),
  );

const sleep = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

describe("Transformer wired as in index.ts against a real Pulsar", () => {
  let container: testcontainers.StartedTestContainer;
  let adminUrl: string;
  let appClient: Pulsar.Client;
  let appProducer: Pulsar.Producer;
  let appConsumer: Pulsar.Consumer;
  let processing: Promise<void>;
  let testClient: Pulsar.Client;

  beforeAll(async () => {
    container = await new testcontainers.GenericContainer(pulsarImage)
      .withExposedPorts(pulsarPort, pulsarAdminPort)
      .withCommand(["bin/pulsar", "standalone"])
      // Reduce heap from the default 2g to avoid OOM on CI/dev machines.
      .withEnvironment({
        PULSAR_MEM: "-Xms256m -Xmx512m -XX:MaxDirectMemorySize=512m",
      })
      .withHealthCheck({
        test: ["CMD-SHELL", "bin/pulsar-admin brokers healthcheck"],
        interval: 2_000,
        timeout: 30_000,
        retries: 150,
      })
      .withStartupTimeout(360_000)
      .withWaitStrategy(
        testcontainers.Wait.forAll([
          testcontainers.Wait.forHealthCheck(),
          testcontainers.Wait.forLogMessage(/messaging service is ready/),
        ]),
      )
      .start();
    const host = container.getHost();
    const serviceUrl = `pulsar://${host}:${container.getMappedPort(pulsarPort)}`;
    adminUrl = `http://${host}:${container.getMappedPort(pulsarAdminPort)}`;

    process.env["PULSAR_SERVICE_URL"] = serviceUrl;
    process.env["PULSAR_CONSUMER_TOPIC"] = inputTopic;
    process.env["PULSAR_SUBSCRIPTION"] = subscription;
    process.env["PULSAR_PRODUCER_TOPIC"] = outputTopic;
    process.env["PULSAR_COMPRESSION_TYPE"] = "LZ4";
    process.env["PULSAR_BLOCK_IF_QUEUE_FULL"] = "true";

    const logger = pino({ name: "integration-test", level: "warn" });
    const config = getConfig(logger);
    appClient = createPulsarClient(config.pulsar);
    appProducer = await createPulsarProducer(appClient, config.pulsar);
    appConsumer = await createPulsarConsumer(
      appClient,
      config.pulsar.consumerConfig,
    );
    // Rejects once the consumer is closed in afterAll.
    processing = keepProcessingMessages(logger, appProducer, appConsumer);
    processing.catch(() => {});

    testClient = new Pulsar.Client({ serviceUrl });
  });

  afterAll(async () => {
    await testClient?.close();
    await appConsumer?.close();
    await appProducer?.close();
    await appClient?.close();
    await container?.stop();
  });

  test("Valid APC Protobuf is forwarded as JSON, invalid input is dropped, everything is acknowledged", async () => {
    const outputConsumer = await testClient.subscribe({
      topic: outputTopic,
      subscription: "integration-test-reader",
      subscriptionType: "Exclusive",
      subscriptionInitialPosition: "Earliest",
    });
    const inputProducer = await testClient.createProducer({
      topic: inputTopic,
    });

    await inputProducer.send({
      data: encodeApcData({
        SchemaVersion: 1,
        topic: "/hfp/v2/journey/ongoing/apc/bus/0018/00817",
        payload: {
          desi: "994K",
          veh: 817,
          tst: 1661865644,
          tsi: 1661865644,
          vehicleCounts: {
            countQuality: "regular",
            vehicleLoad: 6,
            vehicleLoadRatio: 0.1,
            doorCounts: [
              { door: "0", count: [{ clazz: "adult", in: 1, out: 0 }] },
            ],
          },
        },
      }),
      eventTimestamp: 1660731500000,
    });
    await inputProducer.send({
      data: Buffer.from([0xff, 0xff, 0xff]),
      eventTimestamp: 1660731500001,
    });
    await inputProducer.send({
      data: encodeApcData({
        SchemaVersion: 1,
        payload: { veh: 1 },
      }),
      eventTimestamp: 1660731500002,
    });
    await inputProducer.send({
      data: encodeApcData({
        SchemaVersion: 1,
        topic: "/hfp/v2/journey/ongoing/apc-partial/tram/0040/00123",
        payload: { veh: 123 },
      }),
      eventTimestamp: 1660731500003,
    });
    await inputProducer.flush();

    const first = await outputConsumer.receive(60_000);
    const second = await outputConsumer.receive(60_000);

    expect(JSON.parse(first.getData().toString("utf8"))).toStrictEqual({
      APC: {
        desi: "994K",
        veh: 817,
        tst: "2022-08-30T13:20:44.000Z",
        tsi: 1661865644,
        vehiclecounts: {
          countquality: "regular",
          vehicleload: 6,
          vehicleloadratio: 0.1,
          doorcounts: [
            { door: "0", count: [{ class: "adult", in: 1, out: 0 }] },
          ],
        },
      },
    });
    // pulsar-client returns the properties as an array with named keys.
    expect({ ...first.getProperties() }).toStrictEqual({
      "mqtt-topic": "bus/0018/00817",
    });
    expect(first.getEventTimestamp()).toBe(1660731500000);

    expect(JSON.parse(second.getData().toString("utf8"))).toStrictEqual({
      APC: { veh: 123 },
    });
    expect({ ...second.getProperties() }).toStrictEqual({
      "mqtt-topic": "tram/0040/00123",
    });
    expect(second.getEventTimestamp()).toBe(1660731500003);

    // The two dropped messages produce nothing.
    await expect(outputConsumer.receive(5_000)).rejects.toThrow();

    // All four input messages are acknowledged by the transformer.
    const statsUrl = `${adminUrl}/admin/v2/persistent/public/default/hfp-expanded-apc/stats`;
    let backlog: number | undefined;
    for (let attempt = 0; attempt < 30; attempt += 1) {
      // eslint-disable-next-line no-await-in-loop
      const stats = (await (await fetch(statsUrl)).json()) as {
        subscriptions: Record<string, { msgBacklog: number }>;
      };
      backlog = stats.subscriptions[subscription]?.msgBacklog;
      if (backlog === 0) {
        break;
      }
      // eslint-disable-next-line no-await-in-loop
      await sleep(1_000);
    }
    expect(backlog).toBe(0);

    await outputConsumer.acknowledge(first);
    await outputConsumer.acknowledge(second);
    await outputConsumer.close();
    await inputProducer.close();
  });
});
