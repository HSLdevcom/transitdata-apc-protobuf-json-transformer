import http from "node:http";
import util from "node:util";
import type Pulsar from "pulsar-client";
import type { HealthCheckConfig } from "./config";

const createHealthCheckServer = (
  { port }: HealthCheckConfig,
  producer: Pulsar.Producer,
  consumer: Pulsar.Consumer,
) => {
  let isHealthSetToOk = false;
  let server: http.Server | undefined = http.createServer((req, res) => {
    if (req.url === "/healthz") {
      if (isHealthSetToOk && producer.isConnected() && consumer.isConnected()) {
        res.writeHead(204);
      } else {
        res.writeHead(500);
      }
    } else {
      res.writeHead(404);
    }
    res.end();
  });
  server.listen(port);
  const setHealth = (isOk: boolean) => {
    isHealthSetToOk = isOk;
  };
  const closeHealthCheckServer = async () => {
    if (server && server.listening) {
      await util.promisify(server.close.bind(server))();
      server = undefined;
    }
  };
  return { closeHealthCheckServer, setHealth };
};

export default createHealthCheckServer;
