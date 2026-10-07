import type { CategoryData } from "../types/Category";
import commonAPI, { baseUrl } from "./commonApi";
export const getAllCategories = async (id: string) => {
  return await commonAPI("GET", `${baseUrl}/field/${id}/categories`);
};
export const getCategories = async () => {
  return await commonAPI("GET", `${baseUrl}/admin/categories`);
};

export const createCategory = async (id: string, data: CategoryData) => {
  return await commonAPI("POST", `${baseUrl}/admin/category/${id}`, data);
};

export const updateCategory = async (id: string, data: CategoryData) => {
  return await commonAPI("PUT", `${baseUrl}/admin/category/${id}`, data);
};
export const deleteCategory = async (id: string) => {
  return await commonAPI("DELETE", `${baseUrl}/admin/category/${id}`);
};
