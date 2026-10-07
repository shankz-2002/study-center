import type { LearningContentData } from "../types/LearningContent";
import commonAPI, { baseUrl } from "./commonApi";
export const getLearningContent = async (id: string) => {
  return await commonAPI("GET", `${baseUrl}/learning/${id}`);
};
export const getContents = async () => {
  return await commonAPI("GET", `${baseUrl}/admin/contents`);
};

export const createContent = async (data: LearningContentData, id: string) => {
  return await commonAPI("POST", `${baseUrl}/admin/content/${id}`, data);
};

export const updateContent = async (id: string, data: LearningContentData) => {
  return await commonAPI("PUT", `${baseUrl}/admin/content/${id}`, data);
};
export const deleteContent = async (id: string) => {
  return await commonAPI("DELETE", `${baseUrl}/admin/content/${id}`);
};
