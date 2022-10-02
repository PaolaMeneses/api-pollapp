import { FastifyPluginCallback, RouteOptions } from "fastify";
import { User } from "../users/model";

import { verifyToken } from "./../../middlewares";
import { Group } from "./model";
import { getGroupList, requestCreateGroup } from "./service";

// const opts: RouteShorthandOptions = {
//   schema: {},
// };

const routes: RouteOptions[] = [
  {
    url: "/",
    method: "GET",
    handler: async () => {
      const data = await getGroupList();

      return { data };
    },
    preHandler: [verifyToken],
  },
  {
    url: "/",
    method: "POST",
    handler: async (request) => {
      const data = await requestCreateGroup(
        request.body as Group,
        request.auth as { user: User }
      );

      return { data };
    },
    preHandler: [verifyToken],
  },
];

const groupRoutes: FastifyPluginCallback = (fastify, _, done) => {
  routes.forEach((route) => fastify.route(route));

  done();
};

export default groupRoutes;
