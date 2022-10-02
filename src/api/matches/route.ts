import { FastifyPluginCallback, RouteOptions } from "fastify";
import { getMatchList, createMatch, createMatchMaster } from "./service";

// const opts: RouteShorthandOptions = {
//   schema: {},
// };

const routes: RouteOptions[] = [
  {
    url: "/",
    method: "GET",
    handler: getMatchList,
  },
  {
    url: "/",
    method: "POST",
    handler: createMatch,
  },
  {
    url: "/seeder",
    method: "POST",
    handler: createMatchMaster,
  },
];

const matchRoutes: FastifyPluginCallback = (fastify, _, done) => {
  routes.forEach((route) => fastify.route(route));

  done();
};

export default matchRoutes;
