import { verifyToken } from "./../../middlewares";
import { FastifyPluginCallback, RouteOptions } from "fastify";
import {
  getUserAuthPredictionListByBoard,
  createPredictioInBoard,
  updatePredictById,
} from "./service";

// const opts: RouteShorthandOptions = {
//   schema: {},
// };

const routes: RouteOptions[] = [
  {
    url: "/",
    method: "GET",
    preHandler: [verifyToken],
    handler: getUserAuthPredictionListByBoard,
  },
  {
    url: "/",
    method: "POST",
    preHandler: [verifyToken],
    handler: createPredictioInBoard,
  },
  {
    url: "/:predictId",
    method: "PATCH",
    preHandler: [verifyToken],
    schema: {
      body: {
        type: "object",
        required: ["localGoalPrediction", "visitorGoalPrediction"],
        properties: {
          localGoalPrediction: { type: "number" },
          visitorGoalPrediction: { type: "number" },
        },
      },
    },
    handler: async (request) => {
      const { predictId } = request.params as { predictId: string };
      const newPrediction = request.body as {
        localGoalPrediction: number;
        visitorGoalPrediction: number;
      };

      const data = await updatePredictById(predictId, newPrediction);

      return { data };
    },
  },
];

const predictionRoutes: FastifyPluginCallback = (fastify, _, done) => {
  routes.forEach((route) => fastify.route(route));

  done();
};

export default predictionRoutes;
