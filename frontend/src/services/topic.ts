import commonAPI, { baseUrl } from "./commonApi";
export const getAllTopics = async (id: string) => {
  return await commonAPI("GET", `${baseUrl}/category/${id}/topics`);
};
export const getTopics=async () => {

  return await commonAPI("GET",`${baseUrl}/admin/topics`)
}