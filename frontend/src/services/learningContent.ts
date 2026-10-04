import commonAPI, { baseUrl } from "./commonApi"
export const getLearningContent=async (id:string) => {
    return await commonAPI("GET",`${baseUrl}/learning/${id}`)
}