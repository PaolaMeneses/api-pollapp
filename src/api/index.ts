import { FastifyPluginCallback } from "fastify";
import boardRoutes from "./boards/route";
import groupRoutes from "./groups/route";
import matchRoutes from "./matches/route";
import predictionRoutes from "./predictions/route";
import teamRoutes from "./teams/route";
import userRoute from "./users/route";

const routes: FastifyPluginCallback = (fastify, _opts, done) => {
  fastify.register(userRoute, { prefix: "/api/users" });
  fastify.register(groupRoutes, { prefix: "/api/groups" });
  fastify.register(boardRoutes, { prefix: "/api/boards" });
  fastify.register(predictionRoutes, { prefix: "/api/predictions" });
  fastify.register(matchRoutes, { prefix: "/api/matches" });
  fastify.register(teamRoutes, { prefix: "/api/teams" });

  done();
};

export default routes;
