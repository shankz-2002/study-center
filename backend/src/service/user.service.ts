import { ApiError } from "../utils/ApiError.js";
import { resetTokenRepository, userRepository } from "../utils/repository.js";
import bcrpyt from "bcrypt";
import { tokenUtil } from "../utils/token.js";
import type { RoleType } from "../types/user.js";
import crypto from "crypto";
import { sendEmail } from "../email/email.service.js";
import type { OAuth2Client } from "google-auth-library";
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
      !existingUser.password ||
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
  static forgotPassword = async (email: string) => {
    const user = await userRepository.findOne({ where: { email } });
    if (!user) {
      return;
    }
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    await resetTokenRepository.delete({
      userId: user.id,
    });
    await resetTokenRepository.save({
      userId: user.id,
      token: hashedToken,
      expiresAt: new Date(Date.now() + 15 * 60 * 1000),
    });
    await sendEmail(
      user.email,
      "Reset Your Password",
      `
        <h2>Password Reset</h2>
        <p>Click the link below to reset your password.</p>

        <a href="${resetUrl}">
            Reset Password
        </a>

        <p>This link expires in 15 minutes.</p>
    `,
    );
  };
  static resetPassword = async (newPassword: string, resetToken: string) => {
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    const token = await resetTokenRepository.findOne({
      where: { token: hashedToken },
    });
    if (!token) {
      throw new ApiError(409, "invalid reset token");
    }
    if (token.expiresAt.getTime() <= Date.now()) {
      await resetTokenRepository.remove(token);
      throw new Error("Reset token has expired");
    }
    const user = await userRepository.findOne({ where: { id: token.userId } });
    if (!user) {
      throw new ApiError(404, "user not found");
    }
    const hashedPassword = await bcrpyt.hash(newPassword, 10);
    user.password = hashedPassword;
    await userRepository.save(user);
    await resetTokenRepository.remove(token);
  };

  static googleAuth = async (
    credential: string,
    googleClient: OAuth2Client,
  ) => {
    if (!credential) {
      throw new ApiError(400, "Google Credential is Required");
    }
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    if (!payload || !payload.email || !payload.email_verified) {
      throw new ApiError(409, "Invalid Google Credential");
    }
    const existingUser = await userRepository.findOne({
      where: { email: payload.email },
    });
    if (existingUser) {
      if (existingUser.googleId !== payload.sub) {
        throw new ApiError(
          409,
          "This email is already registered. Please log in using your existing method.",
        );
      }
      const id = existingUser.id;
      const role = existingUser.role;
      const accessToken = await tokenUtil.createToken(id, role);
      const { password: _, ...user } = existingUser;
      const newUser = {
        user,
        accessToken,
      };
      return newUser;
    }
    const newUser = userRepository.create({
      email: payload.email,
      firstName: payload.given_name ?? null,
      lastName: payload.family_name ?? null,
      googleId: payload.sub,
      password: null,
    });
    const savedUser = await userRepository.save(newUser);
    const accessToken = await tokenUtil.createToken(
      savedUser.id,
      savedUser.role,
    );
    const { password: _, ...user } = savedUser;
    return {
      user,
      accessToken,
    };
  };
  static updateUser=async (firstName:string,lastName:string,userId:string) => {
    const user=await this.getUser(userId);
    user.firstName=firstName;
    user.lastName=lastName;
    return await userRepository.save(user);
    
  }
 
}
