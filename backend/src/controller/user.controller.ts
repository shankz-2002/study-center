import type { Request, Response } from "express";
  import { userService } from "../service/user.service.js";
export class userController {
  static registerUser = async (req: Request, res: Response) => {
    const { firstName,lastName, password, email } = req.body;
    const user = await userService.registerUser(firstName,lastName, password, email);
    const { password: _, ...userWithoutPassword } = user;
    res.status(200).json({
      success: true,
      userWithoutPassword,
    });
  };
  static loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const result = await userService.loginUser(email, password);
    res.status(200).json({
      success: true,
      result,
    });
  };
}
