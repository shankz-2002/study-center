import { ApiError } from "../utils/ApiError.js";
import { fieldRepository } from "../utils/repository.js";

export class fieldService {
  static createField = async (fieldName: string, description: string) => {
    const field = await fieldRepository.findOne({ where: { fieldName } });
    if (field) {
      throw new ApiError(409, "Field already exists");
    }

    const newField = fieldRepository.create({
      fieldName,
      description,
    });
    return await fieldRepository.save(newField);
  };

  static deleteField = async (id: string) => {
    const field = await fieldRepository.findOne({ where: { id } });
    if (!field) {
      throw new ApiError(404, "Field not found");
    }
    await fieldRepository.remove(field);
    return field;
  };
  static editField = async (
    fieldName: string,
    description: string,
    id: string,
  ) => {
    const field = await fieldRepository.findOne({ where: { id } });
    if (!field) {
      throw new ApiError(404, "Field not found");
    }
    field.fieldName = fieldName;
    field.description = description;
    return await fieldRepository.save(field);
  };
}
