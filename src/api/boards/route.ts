import { FastifyPluginCallback, RouteOptions } from "fastify";
import { verifyToken } from "../../middlewares";
import { Board } from "./model";
import {
  getCurrentUserBoardsByGroup,
  createBoardInGroup,
  activateBoard,
} from "./service";

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
    preHandler: [verifyToken],
    handler: async (request) => {
      const data = await createBoardInGroup(request.body as Board);
      return { data };
    },
  },
  {
    url: "/:boardId/activate",
    method: "POST",
    preHandler: [verifyToken],
    handler: async (request) => {
      const { boardId = "" } = request.params as { boardId: string };
      const data = await activateBoard(boardId);
      return { data };
    },
  },
];

const boardRoutes: FastifyPluginCallback = (fastify, _, done) => {
  routes.forEach((route) => fastify.route(route));

  done();
};

export default boardRoutes;
