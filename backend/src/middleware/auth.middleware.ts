import type { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError.js";
import { tokenUtil } from "../utils/token.js";
import type { AuthRequest } from "../types/authRequest.js";

export class authMiddleware {
  static authenticate = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      throw new ApiError(401, "Unauthorized:Token is missing");
    }
    const token = authHeader.split(" ")[1];
    try {
      const decode = await tokenUtil.verifyToken(token);
      req.user = {
        id: decode.id
      };
      next();
    } catch (error) {
      throw new ApiError(401, "Invalid or Expired Token");
    }
  };
}
