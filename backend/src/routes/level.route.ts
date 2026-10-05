import express from "express";
import { levelControler } from "../controller/level.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
const levelRouter = express.Router();
levelRouter.use(authMiddleware.authenticate);
levelRouter.post("/:id", levelControler.createLevel);
levelRouter.get("/:id/topics", levelControler.getAllLevels);
levelRouter.get("/:id", levelControler.getLevel);
levelRouter.delete("/:id", levelControler.deleteLevel);
levelRouter.put("/:id", levelControler.editLevel);

export default levelRouter;
