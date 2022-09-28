import { FastifyPluginCallback, RouteOptions } from "fastify";
import {
  getUserAuthPredictionListByBoard,
  createPredictioInBoard,
} from "./service";

// const opts: RouteShorthandOptions = {
//   schema: {},
// };

const routes: RouteOptions[] = [
  {
    url: "/",
    method: "GET",
    handler: getUserAuthPredictionListByBoard,
  },
  {
    url: "/",
    method: "POST",
    handler: createPredictioInBoard,
  },
];

const predictionRoutes: FastifyPluginCallback = (fastify, _, done) => {
  routes.forEach((route) => fastify.route(route));

  done();
};

export default predictionRoutes;
