import type { Request, Response } from "express";
import { fieldService } from "../service/field.service.js";
import { fieldRepository } from "../utils/repository.js";
import { ApiError } from "../utils/ApiError.js";
export class fieldController {
  static createField = async (req: Request, res: Response) => {
    const { fieldName, description } = req.body;
    const field = await fieldService.createField(fieldName, description);

    res.status(200).json({
      success: true,
      field,
    });
  };

  static deleteField = async (req: Request, res: Response) => {
    const id = String(req.params.id);
    const deletedField = await fieldService.deleteField(id);
    res.status(200).json({
      success: true,
      deletedField,
    });
  };
  static getAllFields = async (req: Request, res: Response) => {
    const fields = await fieldRepository.find();
    res.status(200).json({
      success: true,
      fields,
    });
  };
  static editField = async (req: Request, res: Response) => {
    const id = String(req.params.id);
    const { fieldName, description } = req.body;
    const updatedField = await fieldService.editField(fieldName, description, id);
    res.status(200).json({
      success: true,
      updatedField,
    });
  };
  static getField = async (req: Request, res: Response) => {
    const id = String(req.params.id);
    const field = await fieldRepository.findOne({ where: { id } });
    if (!field) {
      throw new ApiError(404, "Field not Found");
    }
    res.status(200).json({
      success: true,
      field,
    });
  };
}
