import type { RoleType } from "../types/User";
import commonAPI, { baseUrl } from "./commonApi";

export const getUsers = async () => {
  return await commonAPI("GET", `${baseUrl}/admin/users`);
};

export const editUser = async (id: string, role: RoleType) => {
  return await commonAPI("PUT", `${baseUrl}/admin/user/${id}`, {role});
};
export const deleteUser = async (id: string) => {
  return await commonAPI("DELETE", `${baseUrl}/admin/user/${id}`);
};
