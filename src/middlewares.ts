import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";
import createHttpError from "http-errors";
import dayjs from "dayjs";

import { User } from "./api/users/model";
import { decodeToken } from "./utils";

export const verifyToken = (
  request: FastifyRequest,
  _reply: FastifyReply,
  done: HookHandlerDoneFunction
) => {
  try {
    if (!request.headers.authorization) {
      throw new createHttpError.BadRequest("Token es requerido");
    }
    const [bearer, token] = (request.headers.authorization || "").split(" ");

    if (bearer !== "Bearer" || !token) {
      throw new createHttpError.Unauthorized("token no es válido");
    }

    const payloadDecoded = decodeToken<{ user: User; expires_at: number }>(
      token
    );

    if (!payloadDecoded || !payloadDecoded.user || !payloadDecoded.expires_at) {
      throw new createHttpError.Unauthorized("token no es válido");
    }

    if (payloadDecoded.expires_at < dayjs().unix()) {
      throw new createHttpError.Unauthorized("token ya expiró");
    }

    request.auth = {
      user: payloadDecoded.user,
    };

    done();
  } catch (error) {
    throw new createHttpError.Unauthorized("token no es válido");
  }
};
