import express from "express";
import { levelControler } from "../controller/level.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
const levelRouter = express.Router();
levelRouter.use(authMiddleware.authenticate);
levelRouter.get("/:id/topics", levelControler.getAllLevels);
levelRouter.get("/:id", levelControler.getLevel);


export default levelRouter;
