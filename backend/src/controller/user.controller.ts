import type { Request, Response } from "express";
import { userService } from "../service/user.service.js";
import type { AuthRequest } from "../types/authRequest.js";
import type { RoleType } from "../types/user.js";
export class userController {
  static registerUser = async (req: Request, res: Response) => {
    const { firstName, lastName, password, email } = req.body;
    const user = await userService.registerUser(
      firstName,
      lastName,
      password,
      email,
    );
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
  static getUser = async (req: AuthRequest, res: Response) => {
    const userId = String(req.user?.id);
    const user = await userService.getUser(userId);
    res.status(200).json({
      success: true,
      user,
    });
  };
  static getUsers = async (req: Request, res: Response) => {
    const users = await userService.getUsers();
    res.status(200).json({
      success: true,
      users,
    });
  };
  static editUser = async (req: Request, res: Response) => {
    const id = String(req.params.id);
    const { role } = req.body;
    const user = await userService.editUser(id, role);
    res.status(200).json({
      success: true,
      user,
    });
  };
  static deleteUser = async (req: AuthRequest, res: Response) => {
    const adminId = req.user?.id!;
    const id = String(req.params.id);
    const user = await userService.deleteUser(id, adminId);
    res.status(200).json({
      success: true,
      user,
    });
  };
}
