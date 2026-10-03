import commonAPI from "./commonApi"
const baseUrl=import.meta.env.VITE_BASE_URL
export const getLearningContent=async (id:string) => {
    return await commonAPI("GET",`${baseUrl}/learning/${id}`)
}