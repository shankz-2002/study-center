import commonAPI, { baseUrl } from "./commonApi"
export const getLevels=async (id:string) => {
    return await commonAPI("GET",`${baseUrl}/level/${id}/topics`)
}
export const getAllLevels=async () => {
    return await commonAPI("GET",`${baseUrl}/admin/levels`)
}
