import commonAPI, { baseUrl } from "./commonApi";
export const loginApi=async (form:object) => {
    return await commonAPI('POST',`${baseUrl}/auth/login`,form)
    
}
export const registerApi=async (form:object) => {
    return await commonAPI('POST',`${baseUrl}/auth/register`,form)
    
}