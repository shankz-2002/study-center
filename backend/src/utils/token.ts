import jwt from "jsonwebtoken";
import "dotenv/config";
import type { RoleType } from "../types/user.js";
const secretKey = process.env.SECRET_KEY!;

export class tokenUtil {
  static createToken = async (id: string,role:RoleType) => {
    return jwt.sign({ id,role }, secretKey, { expiresIn: "20m" });
  };
  static verifyToken = async (token: string) => {
    return jwt.verify(token, secretKey) as { id: string,role:RoleType };
  };
}
