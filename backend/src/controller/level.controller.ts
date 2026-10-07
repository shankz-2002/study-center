import type { Request, Response } from "express";
import { levelService } from "../service/level.service.js";

export class levelControler {
  static createLevel = async (req: Request, res: Response) => {
    const id = String(req.params.id);
    const { levelName, description, order } = req.body;
    const level = await levelService.createLevel(
      id,
      levelName,
      description,
      order,
    );
    res.status(200).json({
      success: true,
      level,
    });
  };
  static getAllLevels = async (req: Request, res: Response) => {
    const id = String(req.params.id);
    const levels = await levelService.getAllLevels(id);
    res.status(200).json({
      success: true,
      levels,
    });
  };
  static getLevel = async (req: Request, res: Response) => {
    const id = String(req.params.id);
    const level = await levelService.getLevel(id);
    res.status(200).json({
      success: true,
      level,
    });
  };
  static deleteLevel = async (req: Request, res: Response) => {
    const id = String(req.params.id);
    const level = await levelService.deleteLevel(id);
    res.status(200).json({
      success: true,
      level,
    });
  };
  static editLevel = async (req: Request, res: Response) => {
    const id = String(req.params.id);
    const { levelName, description, order } = req.body;
    const level = await levelService.editLevel(
      id,
      levelName,
      description,
      order,
    );
    res.status(200).json({
      success: true,
      level,
    });
  };
  static getLevels = async (req:Request, res: Response) => {
    const levels = await levelService.getLevels();
    res.status(200).json({
      success: true,
      levels,
    });
  };
}
