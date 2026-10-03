import { ApiError } from "../utils/ApiError.js";
import { levelRepository, topicRepository } from "../utils/repository.js";

export class levelService {
  static createLevel = async (
    id: string,
    levelName: string,
    description: string,
    order: number,
  ) => {
    const topic = await topicRepository.findOne({ where: { id } });
    if (!topic) {
      throw new ApiError(404, "Topic not Found");
    }
    const level = levelRepository.create({
      levelName,
      description,
      order,
      topic,
    });
    return await levelRepository.save(level);
  };
  static getAllLevels = async (id: string) => {
    const topic = await topicRepository.find({ where: { id } });
    if (!topic) {
      throw new ApiError(404, "Topic Not Found");
    }
    const levels = await levelRepository.find({ where: { topic: { id } } });
    return levels;
  };
  static getLevel = async (id: string) => {
    const level = await levelRepository.findOne({ where: { id } });
    if (!level) {
      throw new ApiError(404, "Level not found");
    }
    return level;
  };

  static deleteLevel = async (id: string) => {
    const level = await this.getLevel(id);
    if (!level) {
      throw new ApiError(404, "Level not found");
    }
    await levelRepository.remove(level);
    return level;
  };
  
  static editLevel=async (id:string,levelName:string,description:string,order:number) => {
    const level=await this.getLevel(id);
    if(!level){
        throw new ApiError(404,"Level not found")
    }
    level.levelName=levelName;
    level.description=description;
    level.order=order;
    return await levelRepository.save(level);
    
  }
}
