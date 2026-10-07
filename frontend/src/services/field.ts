import type { FieldData } from "../types/Field";
import commonAPI, { baseUrl } from "./commonApi";

export const getFields = async () => {
  return await commonAPI("GET", `${baseUrl}/field`);
};

export const createField = async (data: FieldData) => {
  return await commonAPI("POST", `${baseUrl}/admin/field`, data);
};
export const updateField = async (id: string, data: FieldData) => {
  return await commonAPI("PUT", `${baseUrl}/admin/field/${id}`, data);
};
export const deleteField = async (id: string) => {
  return await commonAPI("DELETE", `${baseUrl}/admin/field/${id}`);
};
