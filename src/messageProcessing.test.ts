import pino from "pino";
import Pulsar from "pulsar-client";
import keepProcessingMessages from "./messageProcessing";
import { passengerCount } from "./protobuf/passengerCount";

const mockPulsarMessage = (data: Buffer) =>
  Object.defineProperties(new Pulsar.Message(), {
    getData: { value: () => data, writable: true },
    getEventTimestamp: { value: () => 1707664053746, writable: true },
    getProperties: { value: () => ({}), writable: true },
    getMessageId: {
      value: () => ({ toString: () => "1:2:3" }),
      writable: true,
    },
  });

const validMessage = mockPulsarMessage(
  Buffer.from(
    passengerCount.Data.encode(
      passengerCount.Data.create({
        SchemaVersion: 1,
        topic: "/hfp/v2/journey/ongoing/apc/bus/0018/00817",
        payload: { veh: 817 },
      }),
    ).finish(),
  ),
);

const invalidMessage = mockPulsarMessage(Buffer.from([0xff, 0xff, 0xff]));

const stopError = new Error("stop receiving");

const runUntilMessagesRunOut = async (messages: Pulsar.Message[]) => {
  const receive = jest.fn();
  messages.forEach((message) => receive.mockResolvedValueOnce(message));
  receive.mockRejectedValue(stopError);
  const acknowledge = jest.fn().mockResolvedValue(null);
  const send = jest.fn().mockResolvedValue({});
  const consumer = { receive, acknowledge } as unknown as Pulsar.Consumer;
  const producer = { send } as unknown as Pulsar.Producer;
  const logger = pino({ name: "test-logger", level: "silent" });
  await expect(
    keepProcessingMessages(logger, producer, consumer),
  ).rejects.toThrow(stopError);
  // Let the send-then-acknowledge promise chains settle.
  await new Promise((resolve) => {
    setImmediate(resolve);
  });
  return { acknowledge, send };
};

describe("Message processing", () => {
  test("A transformable message is sent and then acknowledged", async () => {
    const { acknowledge, send } = await runUntilMessagesRunOut([validMessage]);
    expect(send).toHaveBeenCalledTimes(1);
    expect(send).toHaveBeenCalledWith({
      data: Buffer.from(JSON.stringify({ APC: { veh: 817 } }), "utf8"),
      eventTimestamp: 1707664053746,
      properties: { "mqtt-topic": "bus/0018/00817" },
    });
    expect(acknowledge).toHaveBeenCalledTimes(1);
    expect(acknowledge).toHaveBeenCalledWith(validMessage);
    expect(send.mock.invocationCallOrder[0]).toBeLessThan(
      acknowledge.mock.invocationCallOrder[0] ?? 0,
    );
  });

  test("A message that cannot be transformed is acknowledged without sending", async () => {
    const { acknowledge, send } = await runUntilMessagesRunOut([
      invalidMessage,
    ]);
    expect(send).not.toHaveBeenCalled();
    expect(acknowledge).toHaveBeenCalledTimes(1);
    expect(acknowledge).toHaveBeenCalledWith(invalidMessage);
  });

  test("Every received message is acknowledged, only transformable ones are sent", async () => {
    const { acknowledge, send } = await runUntilMessagesRunOut([
      invalidMessage,
      validMessage,
      invalidMessage,
    ]);
    expect(send).toHaveBeenCalledTimes(1);
    expect(acknowledge).toHaveBeenCalledTimes(3);
    expect(
      acknowledge.mock.calls.filter(([m]) => m === invalidMessage),
    ).toHaveLength(2);
    expect(
      acknowledge.mock.calls.filter(([m]) => m === validMessage),
    ).toHaveLength(1);
  });
});
