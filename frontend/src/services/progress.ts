import commonAPI, { baseUrl } from "./commonApi";

export const getProgress = async (levelId: string) => {
  return await commonAPI("GET", `${baseUrl}/progress/${levelId}`);
};
