import { FastifyPluginCallback, RouteShorthandOptions } from "fastify";
import { getUsers as _getUsers, registryUser } from "./service";

const opts: RouteShorthandOptions = {
  schema: {},
};

const userRoutes: FastifyPluginCallback = (fastify, _p, done) => {
  fastify.get("/", opts, async (_request, _reply) => registryUser());
  done();
};

// const groupRoutes: RouteOptions[] = [
//   {
//     url: "/products",
//     method: "GET",
//     handler: registryUser,
//   },
// ];

export default userRoutes;
