import commonAPI, { baseUrl } from "./commonApi"
export const getAllCategories=async (id:string) => {
    return await commonAPI('GET',`${baseUrl}/field/${id}/categories`)
    
}