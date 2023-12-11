import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors/ApiError";
import { DecodedUser } from "../types/user";
import { TOKEN_SECRET } from "./secret";

export interface WithAuthRequest extends Request {
  decoded?: DecodedUser;
}

export function checkAuth(
  req: WithAuthRequest,
  _: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    next(ApiError.forbidden("Token is missing"));
    return;
  }

  try {
    const decoded = jwt.verify(token, TOKEN_SECRET) as DecodedUser;
    req.decoded = decoded;
    next();
  } catch (err) {
    next(ApiError.forbidden("Invalid token"));
  }
}

export function checkIsAdmin(
  req: WithAuthRequest,
  _: Response,
  next: NextFunction
) {
  if (req?.decoded?.role === "ADMIN") {
    next();
  } else {
    next(ApiError.forbidden("Not admin"));
  }
}
