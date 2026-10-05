import type { Response } from "express";
import type { AuthRequest } from "../types/authRequest.js";
import { levelProgressService } from "../service/levelProgress.service.js";

export class levelProgressController {
  static checkProgress = async (req: AuthRequest, res: Response) => {
    const levelId = String(req.params.id);
    const userId = String(req.user?.id);
    const progress = await levelProgressService.checkProgress(userId, levelId);
    res.status(200).json({
      success: true,
      progress,
    });
  };
}
