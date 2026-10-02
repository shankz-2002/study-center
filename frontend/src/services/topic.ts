import commonAPI from "./commonApi";
const baseUrl = import.meta.env.VITE_BASE_URL;
export const getAllTopics = async (id: string) => {
  return await commonAPI("GET", `${baseUrl}/category/${id}/topics`);
};
