import type { LevelData } from "../types/Level";
import commonAPI, { baseUrl } from "./commonApi";
export const getLevels = async (id: string) => {
  return await commonAPI("GET", `${baseUrl}/level/${id}/topics`);
};
export const getAllLevels = async () => {
  return await commonAPI("GET", `${baseUrl}/admin/levels`);
};
export const createLevel = async (data: LevelData, id: string) => {
  return await commonAPI("POST", `${baseUrl}/admin/level/${id}`, data);
};
export const updateLevel = async (id: string, data: LevelData) => {
  return await commonAPI("PUT", `${baseUrl}/admin/level/${id}`, data);
};
export const deleteLevel = async (id: string) => {
  return await commonAPI("DELETE", `${baseUrl}/admin/level/${id}`);
};
