import { ApiError } from "../utils/ApiError.js";
import { userRepository } from "../utils/repository.js";
import bcrpyt from "bcrypt";
import { tokenUtil } from "../utils/token.js";
import type { RoleType } from "../types/user.js";

export class userService {
  static registerUser = async (
    firstName: string,
    lastName: string,
    password: string,
    email: string,
  ) => {
    const user = await userRepository.findOne({ where: { email } });
    if (user) {
      throw new ApiError(409, "User already exists");
    }
    const saltRounds = 10;

    const hashedPassword = await bcrpyt.hash(password, saltRounds);
    const newUser = userRepository.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    return await userRepository.save(newUser);
  };
  static loginUser = async (email: string, password: string) => {
    const existingUser = await userRepository.findOne({ where: { email } });
    if (
      !existingUser ||
      !(await bcrpyt.compare(password, existingUser.password))
    ) {
      throw new ApiError(401, "Email or Password Wrong");
    }
    const id = existingUser.id;
    const role = existingUser.role;
    const accessToken = await tokenUtil.createToken(id, role);
    const { password: _, createdAt, ...user } = existingUser;
    const newUser = {
      user,
      accessToken,
    };
    return newUser;
  };
  static getUser = async (id: string) => {
    const user = await userRepository.findOne({ where: { id } });
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    return user;
  };
  static getUsers = async () => {
    const users = await userRepository.find();
    const usersWithoutPassword = users.map(({ password: _, ...user }) => user);
    return usersWithoutPassword;
  };
  static editUser = async (id: string, role: RoleType) => {
    const user = await this.getUser(id);
    user.role = role;
    return await userRepository.save(user);
  };
  static deleteUser = async (id: string, adminId: string) => {
    const user = await this.getUser(id);
    if (user.id === adminId) {
      throw new ApiError(409, "This is your account");
    }
    await userRepository.remove(user);
    return user;
  };
}
