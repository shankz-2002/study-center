import commonAPI from "./commonApi"
const baseUrl=import.meta.env.VITE_BASE_URL
export const getLevels=async (id:string) => {
    return await commonAPI("GET",`${baseUrl}/level/${id}/topics`)
}