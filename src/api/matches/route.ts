import { FastifyPluginCallback, RouteOptions } from "fastify";
import { Match } from "./model";
import {
  getMatchList,
  createMatch,
  createMatchMaster,
  closeMatch,
  predictionListByMatchId,
  matchById,
} from "./service";

// const opts: RouteShorthandOptions = {
//   schema: {},
// };

const routes: RouteOptions[] = [
  {
    url: "/",
    method: "GET",
    handler: async () => {
      const data = await getMatchList();
      return { data };
    },
  },
  {
    url: "/:matchId/group/:groupId/predictions",
    method: "GET",
    handler: async (request) => {
      const { matchId, groupId } = request.params as {
        matchId: string;
        groupId: string;
      };
      const data = await predictionListByMatchId(matchId, groupId);
      return { data };
    },
  },
  {
    url: "/:matchId",
    method: "GET",
    handler: async (request) => {
      const { matchId } = request.params as { matchId: string };
      const data = await matchById(matchId);
      return { data };
    },
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
  {
    url: "/:matchId/close",
    method: "PATCH",
    handler: async (request) => {
      const { matchId } = request.params as { matchId: string };
      const newMatch = request.body as Match;

      const data = await closeMatch(matchId, newMatch);
      return { data };
    },
  },
];

const matchRoutes: FastifyPluginCallback = (fastify, _, done) => {
  routes.forEach((route) => fastify.route(route));

  done();
};

export default matchRoutes;
