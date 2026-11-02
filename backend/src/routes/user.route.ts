import express from "express";
import { userController } from "../controller/user.controller.js";
const userRouter = express.Router();
userRouter.post("/register", userController.registerUser);
userRouter.post("/login", userController.loginUser);
userRouter.post("/forgot", userController.forgotPassword);
userRouter.post("/reset/:id", userController.resetPassword);
userRouter.post("/google", userController.googleAuth);

export default userRouter;
