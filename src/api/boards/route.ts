import { FastifyPluginCallback, RouteOptions } from "fastify";
import { getCurrentUserBoardsByGroup, createBoardInGroup } from "./service";

// const opts: RouteShorthandOptions = {
//   schema: {},
// };

const routes: RouteOptions[] = [
  {
    url: "/",
    method: "GET",
    handler: getCurrentUserBoardsByGroup,
  },
  {
    url: "/",
    method: "POST",
    handler: createBoardInGroup,
  },
];

const boardRoutes: FastifyPluginCallback = (fastify, _, done) => {
  routes.forEach((route) => fastify.route(route));

  done();
};

export default boardRoutes;
