import type { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError.js";
import { tokenUtil } from "../utils/token.js";
import type { AuthRequest } from "../types/authRequest.js";
import type { RoleType } from "../types/user.js";

export class authMiddleware {
  static authenticate = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      throw new ApiError(403, "Unauthorized:Token is missing");
    }
    const token = authHeader.split(" ")[1];
    try {
      const decode = await tokenUtil.verifyToken(token);
      req.user = {
        id: decode.id,
        role: decode.role,
      };
      next();
    } catch (error) {
      throw new ApiError(403, "Invalid or Expired Token");
    }
  };
  static authorize = (...allowedRoles: RoleType[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction): void => {
      if (!req.user || !allowedRoles.includes(req.user.role)) {
        res.status(403).json({ message: "Forbidden: Access denied" });
        return;
      }
      next();
    };
  };
}
