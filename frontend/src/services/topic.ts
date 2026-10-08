import type { TopicData } from "../types/Topic";
import commonAPI, { baseUrl } from "./commonApi";
export const getAllTopics = async (id: string) => {
  return await commonAPI("GET", `${baseUrl}/category/${id}/topics`);
};
export const getTopics = async () => {
  return await commonAPI("GET", `${baseUrl}/admin/topics`);
};
export const createTopic = async (data: TopicData, id: string) => {
  return await commonAPI("POST", `${baseUrl}/admin/topic/${id}`, data);
};
export const updateTopic = async (id: string, data: TopicData) => {
  return await commonAPI("PUT", `${baseUrl}/admin/topic/${id}`, data);
};
export const deleteTopic = async (id: string) => {
  return await commonAPI("DELETE", `${baseUrl}/admin/topic/${id}`);
};
export const checkTopicCompletion = async (id: string) => {
  return await commonAPI("GET", `${baseUrl}/topic/${id}/completion`);
};
