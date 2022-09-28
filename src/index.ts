import Fastify, { FastifyInstance } from "fastify";

import { databaseInit } from "./store";
import routes from "./api";

const server: FastifyInstance = Fastify({
  logger: true,
});

const start = async () => {
  try {
    await databaseInit();
    server.register(routes);
    await server.listen({ port: 3000, host: "0.0.0.0" });
    console.log(server.printRoutes());
    const address = server.server.address();
    const port = typeof address === "string" ? address : address?.port;
    console.log({ port, address });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
start();
