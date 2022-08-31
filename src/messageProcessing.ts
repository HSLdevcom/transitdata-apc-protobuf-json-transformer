import type pino from "pino";
import type Pulsar from "pulsar-client";
import { initializeTransformer } from "./transformer";

const keepProcessingMessages = async (
  logger: pino.Logger,
  producer: Pulsar.Producer,
  consumer: Pulsar.Consumer
): Promise<void> => {
  const transform = initializeTransformer(logger);
  // Errors are handled in the calling function.
  /* eslint-disable no-await-in-loop */
  for (;;) {
    const protobufMessage = await consumer.receive();
    const jsonMessage = transform(protobufMessage);
    if (jsonMessage !== undefined) {
      // In case of an error, exit via the listener on unhandledRejection.
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      producer
        .send(jsonMessage)
        .then(() => consumer.acknowledge(protobufMessage).then(() => {}));
    } else {
      await consumer.acknowledge(protobufMessage);
    }
  }
  /* eslint-enable no-await-in-loop */
};

export default keepProcessingMessages;
