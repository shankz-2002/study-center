import express from "express";
import { userController } from "../controller/user.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
const userRouter = express.Router();
userRouter.post("/register", userController.registerUser);
userRouter.post("/login", userController.loginUser);
userRouter.post("/forgot", userController.forgotPassword);
userRouter.post("/reset/:id", userController.resetPassword);
userRouter.post("/google", userController.googleAuth);

userRouter.get("",authMiddleware.authenticate,userController.getCurrentUser);
userRouter.put("",authMiddleware.authenticate,userController.updateUser);


export default userRouter;
