import { FastifyPluginCallback, RouteOptions } from "fastify";

import { verifyToken } from "./../../middlewares";
import { getGroupList, requestCreateGroup } from "./service";

// const opts: RouteShorthandOptions = {
//   schema: {},
// };

const routes: RouteOptions[] = [
  {
    url: "/",
    method: "GET",
    handler: async (_request) => {
      const data = await getGroupList();

      return { data };
    },
    preHandler: [verifyToken],
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
