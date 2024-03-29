import type Long from "long";
import type pino from "pino";
import type Pulsar from "pulsar-client";
import type * as expandedApc from "./quicktype/expandedApc";
import { passengerCount } from "./protobuf/passengerCount";

export const getUniqueVehicleIdFromMqttTopic = (
  topic: string,
): string | undefined => {
  const parts = topic.split("/");
  if (parts.length >= 9) {
    return parts.slice(7, 9).join("/");
  }
  return undefined;
};

/**
 * If value is undefined, return an empty object. If value is defined, wrap it
 * in an object with the given key.
 *
 * The result can be used with spread syntax to add an entry into another object
 * iff value is defined.
 */
export function wrapDefined<T>(key: string, value: T): { [k: string]: T } {
  return value === undefined ? {} : { [key]: value };
}

const transformLongishToNumber = (
  x: number | Long | null | undefined,
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
  tst: number | Long | null | undefined,
): string | undefined => {
  let result;
  const seconds = transformLongishToNumber(tst);
  if (seconds != null) {
    result = new Date(1000 * seconds).toISOString();
  }
  return result;
};

const transformVehicleCounts = (
  vehiclecounts: passengerCount.IVehicleCounts | null | undefined,
): expandedApc.Vehiclecounts | undefined => {
  let result: expandedApc.Vehiclecounts | undefined;
  if (vehiclecounts != null) {
    let doorcounts: expandedApc.Doorcount[] | undefined;
    if (vehiclecounts.doorCounts != null) {
      doorcounts = vehiclecounts.doorCounts.map((dc) => {
        let count: expandedApc.Count[] | undefined;
        if (dc.count != null) {
          count = dc.count.map((c) => ({
            ...wrapDefined("class", c.clazz),
            ...wrapDefined("in", c.in),
            ...wrapDefined("out", c.out),
          }));
        }
        return {
          ...wrapDefined("door", dc.door),
          ...wrapDefined("count", count),
        };
      });
    }
    result = {
      ...wrapDefined("countquality", vehiclecounts.countQuality),
      ...wrapDefined("vehicleload", vehiclecounts.vehicleLoad),
      ...wrapDefined("vehicleloadratio", vehiclecounts.vehicleLoadRatio),
      ...wrapDefined("doorcounts", doorcounts),
    };
  }
  return result;
};

const transformPayload = (
  apcProtobufPayload: passengerCount.IPayload,
): expandedApc.ExpandedApcMessage => ({
  APC: {
    ...wrapDefined("desi", apcProtobufPayload.desi),
    ...wrapDefined("dir", apcProtobufPayload.dir),
    ...wrapDefined("oper", apcProtobufPayload.oper),
    ...wrapDefined("veh", apcProtobufPayload.veh),
    ...wrapDefined("tst", transformTstToIsoString(apcProtobufPayload.tst)),
    ...wrapDefined("tsi", transformLongishToNumber(apcProtobufPayload.tsi)),
    ...wrapDefined("lat", apcProtobufPayload.lat),
    ...wrapDefined("long", apcProtobufPayload.long),
    ...wrapDefined("odo", apcProtobufPayload.odo),
    ...wrapDefined("oday", apcProtobufPayload.oday),
    ...wrapDefined("jrn", apcProtobufPayload.jrn),
    ...wrapDefined("line", apcProtobufPayload.line),
    ...wrapDefined("start", apcProtobufPayload.start),
    ...wrapDefined("loc", apcProtobufPayload.loc),
    ...wrapDefined("stop", apcProtobufPayload.stop),
    ...wrapDefined("route", apcProtobufPayload.route),
    ...wrapDefined(
      "vehiclecounts",
      transformVehicleCounts(apcProtobufPayload.vehicleCounts),
    ),
  },
});

export const decodeProtobufData = (
  logger: pino.Logger,
  message: Pulsar.Message,
): passengerCount.IData | undefined => {
  const messageData = message.getData();
  let data: passengerCount.IData | undefined;
  try {
    // Use toObject to get rid off probobufjs-generated zero values for missing
    // fields.
    data = passengerCount.Data.toObject(
      passengerCount.Data.decode(messageData),
    ) as passengerCount.IData;
  } catch (err) {
    logger.warn(
      {
        err,
        properties: { ...message.getProperties() },
        messageId: message.getMessageId().toString(),
        dataString: messageData.toString("utf8"),
        eventTimestamp: message.getEventTimestamp(),
      },
      "Decoding the expanded APC message failed. Dropping the message",
    );
  }
  return data;
};

export const initializeTransformer = (
  logger: pino.Logger,
): ((msg: Pulsar.Message) => Pulsar.ProducerMessage | undefined) => {
  const transform = (
    protobufMessage: Pulsar.Message,
  ): Pulsar.ProducerMessage | undefined => {
    let result: Pulsar.ProducerMessage | undefined;
    const apcData = decodeProtobufData(logger, protobufMessage);
    if (apcData != null) {
      if (apcData.topic == null) {
        logger.warn(
          { apcData },
          "APC data is missing topic and thus the owning operator and its vehicle number",
        );
      } else {
        const mqttTopicSuffix = getUniqueVehicleIdFromMqttTopic(apcData.topic);
        if (mqttTopicSuffix === undefined) {
          logger.warn(
            { topic: apcData.topic },
            "APC data has an unexpected topic format",
          );
        } else {
          const mqttPayload: expandedApc.ExpandedApcMessage = transformPayload(
            apcData.payload,
          );
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
    }
    return result;
  };
  return transform;
};
