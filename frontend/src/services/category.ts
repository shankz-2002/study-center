import commonAPI from "./commonApi"
const baseUrl=import.meta.env.VITE_BASE_URL
export const getAllCategories=async (id:string) => {
    return await commonAPI('GET',`${baseUrl}/field/${id}/categories`)
    
}