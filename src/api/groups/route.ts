import { FastifyPluginCallback, RouteOptions } from "fastify";
import { getGroupList, requestCreateGroup } from "./service";

// const opts: RouteShorthandOptions = {
//   schema: {},
// };

const routes: RouteOptions[] = [
  {
    url: "/",
    method: "GET",
    handler: getGroupList,
  },
  {
    url: "/",
    method: "POST",
    handler: requestCreateGroup,
  },
];

const groupRoutes: FastifyPluginCallback = (fastify, _, done) => {
  routes.forEach((route) => fastify.route(route));

  done();
};

export default groupRoutes;
