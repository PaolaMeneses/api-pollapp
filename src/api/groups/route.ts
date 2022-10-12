import { FastifyPluginCallback, RouteOptions } from "fastify";
import { User } from "../users/model";

import { verifyToken } from "./../../middlewares";
import { Group } from "./model";
import {
  getCurrentGroupListOrByCode,
  getGroupById,
  getGroupList,
  requestCreateGroup,
} from "./service";

// const opts: RouteShorthandOptions = {
//   schema: {},
// };

const routes: RouteOptions[] = [
  {
    url: "/",
    method: "GET",
    preHandler: [verifyToken],
    handler: async () => {
      const data = await getGroupList();

      return { data };
    },
  },
  {
    url: "/search",
    method: "GET",
    preHandler: [verifyToken],
    handler: async (request) => {
      const data = await getCurrentGroupListOrByCode(
        request.query as { code?: string },
        request.auth as { user: User }
      );

      return { data };
    },
  },
  {
    url: "/:groupId",
    method: "GET",
    preHandler: [verifyToken],
    handler: async (request) => {
      const data = await getGroupById(
        request.params as { groupId: string },
        request.auth as { user: User }
      );

      return { data };
    },
  },
  {
    url: "/",
    method: "POST",
    preHandler: [verifyToken],
    handler: async (request) => {
      const data = await requestCreateGroup(
        request.body as Group,
        request.auth as { user: User }
      );

      return { data };
    },
  },
];

const groupRoutes: FastifyPluginCallback = (fastify, _, done) => {
  routes.forEach((route) => fastify.route(route));

  done();
};

export default groupRoutes;
