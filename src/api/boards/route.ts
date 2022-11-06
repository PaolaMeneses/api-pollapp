import { FastifyPluginCallback, RouteOptions } from "fastify";
import { verifyToken } from "../../middlewares";
import { Board } from "./model";
import {
  getCurrentUserBoardsByGroup,
  createBoardInGroup,
  activateBoard,
  getBoardWithPreds,
  getBoardActiveIfExistByBoardId,
  getBoardWithPreviousPreds,
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
    url: "/:boardId/matches/active",
    method: "GET",
    preHandler: [verifyToken],
    handler: async (request) => {
      const { boardId } = request.params as { boardId: string };
      const data = await getBoardWithPreds(boardId);
      return { data };
    },
  },
  {
    url: "/:boardId/matches/closed",
    method: "GET",
    preHandler: [verifyToken],
    handler: async (request) => {
      const { boardId } = request.params as { boardId: string };
      const data = await getBoardWithPreviousPreds(boardId);
      return { data };
    },
  },
  {
    url: "/:boardId",
    method: "GET",
    preHandler: [verifyToken],
    handler: async (request) => {
      const { boardId } = request.params as { boardId: string };

      const data = await getBoardActiveIfExistByBoardId(boardId);
      return { data };
    },
  },
  {
    url: "/",
    method: "POST",
    preHandler: [verifyToken],
    handler: async (request) => {
      const board = request.body as Board;
      const data = await createBoardInGroup(board);
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
