import { FastifyPluginCallback, RouteOptions } from "fastify";
import { getTeamList, createTeam, createTeamMaster } from "./service";

// const opts: RouteShorthandOptions = {
//   schema: {},
// };

const routes: RouteOptions[] = [
  {
    url: "/",
    method: "GET",
    handler: getTeamList,
  },
  {
    url: "/",
    method: "POST",
    handler: createTeam,
  },
  {
    url: "/seeder",
    method: "POST",
    handler: createTeamMaster,
  },
];

const teamRoutes: FastifyPluginCallback = (fastify, _, done) => {
  routes.forEach((route) => fastify.route(route));

  done();
};

export default teamRoutes;
