import pino from "pino";
import Pulsar from "pulsar-client";
import { getConfig } from "./config";

const requiredEnv = {
  PULSAR_SERVICE_URL: "pulsar://localhost:6650",
  PULSAR_PRODUCER_TOPIC: "persistent://public/default/out",
  PULSAR_CONSUMER_TOPIC: "persistent://public/default/in",
  PULSAR_SUBSCRIPTION: "test-subscription",
};

const optionalEnvNames = [
  "PULSAR_BLOCK_IF_QUEUE_FULL",
  "PULSAR_COMPRESSION_TYPE",
  "HEALTH_CHECK_PORT",
];

const logger = pino({ name: "test-logger", level: "silent" });

describe("Configuration", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv, ...requiredEnv };
    optionalEnvNames.forEach((name) => {
      delete process.env[name];
    });
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  test("Required values and defaults", () => {
    const config = getConfig(logger);
    expect(config.pulsar.clientConfig.serviceUrl).toBe(
      "pulsar://localhost:6650",
    );
    expect(config.pulsar.clientConfig.log).toBeInstanceOf(Function);
    expect(config.pulsar.producerConfig).toStrictEqual({
      topic: "persistent://public/default/out",
      blockIfQueueFull: true,
      compressionType: "LZ4",
    });
    expect(config.pulsar.consumerConfig).toStrictEqual({
      topic: "persistent://public/default/in",
      subscription: "test-subscription",
      subscriptionType: "Exclusive",
      subscriptionInitialPosition: "Earliest",
    });
    expect(config.healthCheck).toStrictEqual({ port: 8080 });
  });

  test("Optional values are read", () => {
    process.env["PULSAR_BLOCK_IF_QUEUE_FULL"] = "false";
    process.env["PULSAR_COMPRESSION_TYPE"] = "ZSTD";
    process.env["HEALTH_CHECK_PORT"] = "8081";
    const config = getConfig(logger);
    expect(config.pulsar.producerConfig.blockIfQueueFull).toBe(false);
    expect(config.pulsar.producerConfig.compressionType).toBe("ZSTD");
    expect(config.healthCheck.port).toBe(8081);
  });

  test.each(Object.keys(requiredEnv))("%s is required", (name) => {
    delete process.env[name];
    expect(() => getConfig(logger)).toThrow(`${name} must be defined`);
  });

  test("An unknown compression type is rejected", () => {
    process.env["PULSAR_COMPRESSION_TYPE"] = "gzip";
    expect(() => getConfig(logger)).toThrow(
      "If defined, PULSAR_COMPRESSION_TYPE must be one of",
    );
  });

  test.each(["Zlib", "LZ4", "ZSTD", "SNAPPY"])(
    "Compression type %s is accepted",
    (compressionType) => {
      process.env["PULSAR_COMPRESSION_TYPE"] = compressionType;
      expect(getConfig(logger).pulsar.producerConfig.compressionType).toBe(
        compressionType,
      );
    },
  );

  test("A non-boolean PULSAR_BLOCK_IF_QUEUE_FULL is rejected", () => {
    process.env["PULSAR_BLOCK_IF_QUEUE_FULL"] = "yes";
    expect(() => getConfig(logger)).toThrow(
      'PULSAR_BLOCK_IF_QUEUE_FULL must be either "false" or "true"',
    );
  });

  test("A non-numeric HEALTH_CHECK_PORT becomes NaN", () => {
    process.env["HEALTH_CHECK_PORT"] = "not-a-port";
    expect(getConfig(logger).healthCheck.port).toBeNaN();
  });

  test("Pulsar client logs are forwarded to the logger at the same level", () => {
    const spyLogger = {
      debug: jest.fn(),
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    } as unknown as pino.Logger;
    const { log } = getConfig(spyLogger).pulsar.clientConfig;
    expect(log).toBeDefined();
    log?.(Pulsar.LogLevel.DEBUG, "a.cc", 1, "debug message");
    log?.(Pulsar.LogLevel.INFO, "b.cc", 2, "info message");
    log?.(Pulsar.LogLevel.WARN, "c.cc", 3, "warn message");
    log?.(Pulsar.LogLevel.ERROR, "d.cc", 4, "error message");
    expect(spyLogger.debug).toHaveBeenCalledWith(
      { file: "a.cc", line: 1 },
      "debug message",
    );
    expect(spyLogger.info).toHaveBeenCalledWith(
      { file: "b.cc", line: 2 },
      "info message",
    );
    expect(spyLogger.warn).toHaveBeenCalledWith(
      { file: "c.cc", line: 3 },
      "warn message",
    );
    expect(spyLogger.error).toHaveBeenCalledWith(
      { file: "d.cc", line: 4 },
      "error message",
    );
  });
});
