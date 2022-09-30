import { FastifyPluginCallback, RouteOptions } from "fastify";
import { User } from "../users/model";
import { login, registerUser } from "./service";

// const opts: RouteShorthandOptions = {
//   schema: {},
// };

const routes: RouteOptions[] = [
  {
    url: "/login",
    method: "POST",
    handler: async (request) => {
      const data = await login(request.body as User);
      return { data };
    },
  },
  {
    url: "/",
    method: "POST",
    schema: {},
    handler: async (request) => {
      const data = await registerUser(request.body as User);
      return { data };
    },
  },
];

const authRoutes: FastifyPluginCallback = (fastify, _, done) => {
  routes.forEach((route) => fastify.route(route));

  done();
};

export default authRoutes;
