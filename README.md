# transitdata-apc-protobuf-json-transformer

Transform APC messages from Protobuf back to JSON.

For internal use at HSL, we need to redeliver the expanded and combined APC messages back to the MQTT broker.
First the messages need to be transformed from Protobuf back to original APC JSON.

This project depends indirectly on [transitdata-common](https://github.com/HSLdevcom/transitdata-common) project for its Protobuf proto definition files though the files have been slightly modified.

## Development

1. Install [the build dependencies for the Apache Pulsar C++ client](https://pulsar.apache.org/docs/en/client-libraries-cpp/#system-requirements).
1. Create a suitable `.env` file for configuration.
   Check below for the configuration reference.
1. Install dependencies:

   ```sh
   npm install
   ```

1. Run linters and tests and build:

   ```sh
   npm run check-and-build
   ```

1. Load the environment variables:

   ```sh
   set -a
   source .env
   set +a
   ```

1. Run the application:

   ```sh
   npm start
   ```

## Docker

You can use the Docker image `hsldevcom/transitdata-apc-protobuf-json-transformer:edge`.
Check out [the available tags](https://hub.docker.com/r/hsldevcom/transitdata-apc-protobuf-json-transformer).

## Configuration

| Environment variable         | Required? | Default value | Description                                                                                                                                                               |
| ---------------------------- | --------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `HEALTH_CHECK_PORT`          | ❌ No     | `8080`        | Which port to use to respond to health checks.                                                                                                                            |
| `PINO_LOG_LEVEL`             | ❌ No     | `info`        | The level of logging to use. One of "fatal", "error", "warn", "info", "debug", "trace" or "silent".                                                                       |
| `PULSAR_BLOCK_IF_QUEUE_FULL` | ❌ No     | `true`        | Whether the send operations of the producer should block when the outgoing message queue is full. If false, send operations will immediately fail when the queue is full. |
| `PULSAR_COMPRESSION_TYPE`    | ❌ No     | `LZ4`         | The compression type to use in the topic `PULSAR_PRODUCER_TOPIC`. Must be one of `Zlib`, `LZ4`, `ZSTD` or `SNAPPY`.                                                       |
| `PULSAR_CONSUMER_TOPIC`      | ✅ Yes    |               | The topic to consume APC Protobuf messages from.                                                                                                                          |
| `PULSAR_SUBSCRIPTION`        | ✅ Yes    |               | The name of the subscription for reading messages from `PULSAR_CONSUMER_TOPIC`.                                                                                           |
| `PULSAR_PRODUCER_TOPIC`      | ✅ Yes    |               | The topic to send APC JSON messages to.                                                                                                                                   |
| `PULSAR_SERVICE_URL`         | ✅ Yes    |               | The service URL.                                                                                                                                                          |
