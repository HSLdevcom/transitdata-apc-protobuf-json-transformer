import pino from "pino";
import Pulsar from "pulsar-client";
import * as apcJson from "./apcJson";
import { passengerCount } from "./protobuf/passengerCount";
import {
  getUniqueVehicleIdFromMqttTopic,
  initializeTransformer,
  stringifyNumbers,
  wrapDefined,
} from "./transformer";

describe("Get unique vehicle IDs", () => {
  test("Get a unique vehicle ID from a valid MQTT topic", () => {
    const mqttTopic = "/hfp/v2/journey/ongoing/apc/bus/0022/00758";
    const uniqueVehicleId = "0022/00758";
    expect(getUniqueVehicleIdFromMqttTopic(mqttTopic)).toBe(uniqueVehicleId);
  });

  test("Get undefined instead of a unique vehicle ID from an invalid MQTT topic", () => {
    const mqttTopic = "/hfp/v2/journey/ongoing/foobar/0022/00758";
    expect(getUniqueVehicleIdFromMqttTopic(mqttTopic)).toBeUndefined();
  });
});

test("wrapDefined", () => {
  expect(wrapDefined("foo", undefined)).toStrictEqual({});
  expect(wrapDefined("foo", null)).toStrictEqual({ foo: null });
  expect(wrapDefined("foo", 1)).toStrictEqual({ foo: 1 });
  expect(wrapDefined("foo", { bar: 1 })).toStrictEqual({ foo: { bar: 1 } });
});

test("stringifyNumbers with one entry", () => {
  expect(stringifyNumbers({ foo: undefined })).toStrictEqual({ foo: null });
  expect(stringifyNumbers({ foo: null })).toStrictEqual({ foo: null });
  expect(stringifyNumbers({ foo: 1 })).toStrictEqual({ foo: "1" });
  expect(stringifyNumbers({ foo: 1.1 })).toStrictEqual({ foo: "1.1" });
});

const mockApcProtobufMessage = ({
  payload,
  mqttTopic,
  eventTimestamp,
}: {
  payload: passengerCount.IPayload;
  mqttTopic: string;
  eventTimestamp: number;
}): Pulsar.Message => {
  const apcData = {
    SchemaVersion: 1,
    payload,
    topic: mqttTopic,
  };
  const verificationErrorMessage = passengerCount.Data.verify(apcData);
  if (verificationErrorMessage != null) {
    throw Error(verificationErrorMessage);
  }
  const buffer = Buffer.from(
    passengerCount.Data.encode(passengerCount.Data.create(apcData)).finish()
  );
  const message = Object.defineProperties(new Pulsar.Message(), {
    getData: {
      value: () => buffer,
      writable: true,
    },
    getEventTimestamp: {
      value: () => eventTimestamp,
      writable: true,
    },
  });
  return message;
};

const mockApcJsonMessage = ({
  mqttPayload,
  eventTimestamp,
  properties,
}: {
  mqttPayload: apcJson.ApcJSON;
  eventTimestamp: number;
  properties: { [key: string]: string };
}): Pulsar.ProducerMessage => {
  const data = Buffer.from(JSON.stringify(mqttPayload), "utf8");
  return { data, eventTimestamp, properties };
};

describe("Transformer", () => {
  test("Providing a valid input message results in a valid output message", () => {
    const logger = pino({
      name: "test-logger",
      timestamp: pino.stdTimeFunctions.isoTime,
      sync: true,
    });
    const transform = initializeTransformer(logger);
    const protobufMessage = mockApcProtobufMessage({
      payload: {
        desi: "994K",
        dir: "2",
        oper: 6,
        veh: 817,
        tst: 1661865644,
        tsi: 1661865644,
        lat: 60.280113,
        long: 25.293034,
        odo: 2147483647,
        oday: "2022-08-30",
        jrn: 28,
        line: 747,
        start: "16:15",
        loc: "GPS",
        stop: 9210204,
        route: "9994K",
        vehicleCounts: {
          countQuality: "regular",
          vehicleLoad: 6,
          vehicleLoadRatio: 0.1,
          doorCounts: [
            { door: "0", count: [{ clazz: "adult", in: 1, out: 0 }] },
            { door: "1", count: [{ clazz: "adult", in: 0, out: 1 }] },
            { door: "2", count: [{ clazz: "adult", in: 0, out: 3 }] },
          ],
        },
      },
      mqttTopic: "/hfp/v2/journey/ongoing/apc/bus/0018/00817",
      eventTimestamp: 1660731500000,
    });
    const jsonMessage = mockApcJsonMessage({
      mqttPayload: {
        APC: {
          desi: "994K",
          dir: "2",
          oper: "6",
          veh: "817",
          tst: "2022-08-30T13:20:44.000Z",
          tsi: 1661865644,
          lat: "60.280113",
          long: "25.293034",
          odo: "2147483647",
          oday: "2022-08-30",
          jrn: "28",
          line: "747",
          start: "16:15",
          loc: "GPS",
          stop: "9210204",
          route: "9994K",
          vehiclecounts: {
            countquality: "regular",
            vehicleload: 6,
            vehicleloadratio: "0.1",
            doorcounts: [
              { door: "0", count: [{ class: "adult", in: 1, out: 0 }] },
              { door: "1", count: [{ class: "adult", in: 0, out: 1 }] },
              { door: "2", count: [{ class: "adult", in: 0, out: 3 }] },
            ],
          },
        },
      },
      properties: {
        "mqtt-topic": "0018/00817",
      },
      eventTimestamp: 1660731500000,
    });
    const resultMessage = transform(protobufMessage);
    expect(resultMessage).toBeDefined();
    let result;
    if (resultMessage != null) {
      result = apcJson.Convert.toApcJSON(resultMessage.data.toString("utf-8"));
    }
    const expected = apcJson.Convert.toApcJSON(
      jsonMessage.data.toString("utf-8")
    );
    expect(result).toStrictEqual(expected);
    expect(resultMessage).toStrictEqual(jsonMessage);
  });
});
