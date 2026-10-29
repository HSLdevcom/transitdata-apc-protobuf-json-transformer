import http from "node:http";
import type Pulsar from "pulsar-client";
import createHealthCheckServer from "./healthCheck";

const port = 18080;

const getStatus = (path: string): Promise<number | undefined> =>
  new Promise((resolve, reject) => {
    http
      .get({ host: "127.0.0.1", port, path }, (res) => {
        res.resume();
        resolve(res.statusCode);
      })
      .on("error", reject);
  });

const waitUntilListening = async () => {
  for (let attempt = 0; attempt < 50; attempt += 1) {
    try {
      // eslint-disable-next-line no-await-in-loop
      await getStatus("/");
      return;
    } catch {
      // eslint-disable-next-line no-await-in-loop
      await new Promise((resolve) => {
        setTimeout(resolve, 20);
      });
    }
  }
  throw new Error("Health check server did not start listening");
};

describe("Health check server", () => {
  let producerConnected = true;
  let consumerConnected = true;
  const producer = {
    isConnected: () => producerConnected,
  } as unknown as Pulsar.Producer;
  const consumer = {
    isConnected: () => consumerConnected,
  } as unknown as Pulsar.Consumer;
  const { closeHealthCheckServer, setHealth } = createHealthCheckServer(
    { port },
    producer,
    consumer,
  );

  beforeAll(waitUntilListening);

  beforeEach(() => {
    producerConnected = true;
    consumerConnected = true;
    setHealth(true);
  });

  afterAll(async () => {
    await closeHealthCheckServer();
  });

  test("Responds 204 when health is OK and Pulsar is connected", async () => {
    expect(await getStatus("/healthz")).toBe(204);
  });

  test("Responds 500 before health is set to OK", async () => {
    setHealth(false);
    expect(await getStatus("/healthz")).toBe(500);
  });

  test("Responds 500 when the producer is disconnected", async () => {
    producerConnected = false;
    expect(await getStatus("/healthz")).toBe(500);
  });

  test("Responds 500 when the consumer is disconnected", async () => {
    consumerConnected = false;
    expect(await getStatus("/healthz")).toBe(500);
  });

  test("Responds 404 to other paths", async () => {
    expect(await getStatus("/health")).toBe(404);
  });
});
