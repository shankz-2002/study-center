import jwt from "jsonwebtoken";
import "dotenv/config";
const secretKey = process.env.SECRET_KEY!;

export class tokenUtil {
  static createToken = async (id: string) => {
    return jwt.sign({ id }, secretKey, { expiresIn: "1h" });
  };
  static verifyToken = async (token: string) => {
    return jwt.verify(token, secretKey) as { id: string };
  };
}
