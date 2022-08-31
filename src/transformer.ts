import type Pulsar from "pulsar-client";
import type pino from "pino";
import type * as ApcJson from "./apcJson";
import { passengerCount } from "./protobuf/passengerCount";

export const getUniqueVehicleIdFromMqttTopic = (
  topic: string
): string | undefined => {
  const parts = topic.split("/");
  if (parts.length >= 9) {
    return parts.slice(7, 9).join("/");
  }
  return undefined;
};

/**
 * If value is nullish, return an empty object. If value is not nullish, wrap it
 * in an object with given key.
 *
 * The result can be used with spread syntax to add value into another object
 * iff value is not nullish.
 */
function wrapNotNullish<T>(key: string, value: T): { [k: string]: T } {
  return value == null ? {} : { [key]: value };
}

const longishToNumber = (
  x: number | Long | null | undefined
): number | undefined => {
  let result;
  if (x != null) {
    if (!(typeof x === "number")) {
      result = x.toNumber();
    }
  }
  return result;
};

const transformTstToIsoString = (
  tst: number | Long.Long | null | undefined
): string | undefined => {
  let result;
  const num = longishToNumber(tst);
  if (num != null) {
    result = new Date(num).toISOString();
  }
  return result;
};

const transformVehicleCounts = (
  vehiclecounts: passengerCount.IVehicleCounts | null | undefined
): ApcJson.Vehiclecounts | undefined => {
  let result: ApcJson.Vehiclecounts | undefined;
  if (vehiclecounts != null) {
    let doorcounts: ApcJson.Doorcount[] | undefined;
    if (vehiclecounts.doorCounts != null) {
      doorcounts = vehiclecounts.doorCounts.map((dc) => {
        let count: ApcJson.Count[] | undefined;
        if (dc.count != null) {
          count = dc.count.map((c) => ({
            ...wrapNotNullish("class", c.clazz),
            ...wrapNotNullish("in", c.in),
            ...wrapNotNullish("out", c.out),
          }));
        }
        return {
          ...wrapNotNullish("door", dc.door),
          ...wrapNotNullish("count", count),
        };
      });
    }
    result = {
      ...wrapNotNullish("countquality", vehiclecounts.countQuality),
      ...wrapNotNullish("vehicleload", vehiclecounts.vehicleLoad),
      ...wrapNotNullish("vehicleloadratio", vehiclecounts.vehicleLoadRatio),
      ...wrapNotNullish("doorcounts", doorcounts),
    };
  }
  return result;
};

export const initializeTransformer = (
  logger: pino.Logger
): ((msg: Pulsar.Message) => Pulsar.ProducerMessage | undefined) => {
  const transform = (
    protobufMessage: Pulsar.Message
  ): Pulsar.ProducerMessage | undefined => {
    let result: Pulsar.ProducerMessage | undefined;
    const apcData = passengerCount.Data.decode(protobufMessage.getData());
    if (apcData.topic == null) {
      logger.warn(
        { apcData },
        "APC data is missing topic and thus the owning operator and its vehicle number"
      );
    } else {
      const mqttTopicSuffix = getUniqueVehicleIdFromMqttTopic(apcData.topic);
      if (mqttTopicSuffix === undefined) {
        logger.warn(
          { topic: apcData.topic },
          "APC data has an unexpected topic format"
        );
      } else {
        const mqttPayload: ApcJson.ApcJSON = {
          APC: {
            ...wrapNotNullish("desi", apcData.payload.desi),
            ...wrapNotNullish("dir", apcData.payload.dir),
            ...wrapNotNullish("oper", apcData.payload.oper),
            ...wrapNotNullish("veh", apcData.payload.veh),
            ...wrapNotNullish(
              "tst",
              transformTstToIsoString(apcData.payload.tst)
            ),
            ...wrapNotNullish("tsi", longishToNumber(apcData.payload.tsi)),
            ...wrapNotNullish("lat", apcData.payload.lat),
            ...wrapNotNullish("long", apcData.payload.long),
            ...wrapNotNullish("odo", apcData.payload.odo),
            ...wrapNotNullish("oday", apcData.payload.oday),
            ...wrapNotNullish("jrn", apcData.payload.jrn),
            ...wrapNotNullish("line", apcData.payload.line),
            ...wrapNotNullish("start", apcData.payload.start),
            ...wrapNotNullish("loc", apcData.payload.loc),
            ...wrapNotNullish("stop", apcData.payload.stop),
            ...wrapNotNullish("route", apcData.payload.route),
            ...wrapNotNullish(
              "vehiclecounts",
              transformVehicleCounts(apcData.payload.vehicleCounts)
            ),
          },
        };
        const encoded = Buffer.from(JSON.stringify(mqttPayload), "utf8");
        result = {
          data: encoded,
          eventTimestamp: protobufMessage.getEventTimestamp(),
          properties: {
            "mqtt-topic": mqttTopicSuffix,
          },
        };
      }
    }
    return result;
  };
  return transform;
};
