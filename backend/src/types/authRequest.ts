import type { Request } from "express";
import type { RoleType } from "./user.js";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: RoleType;
  };
}
