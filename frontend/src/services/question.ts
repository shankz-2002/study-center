import commonAPI, { baseUrl } from "./commonApi"

export const getQuestions=async (id:string) => {
    return await commonAPI("GET",`${baseUrl}/question/${id}`)
    
}