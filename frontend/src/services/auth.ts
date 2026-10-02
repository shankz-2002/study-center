import commonAPI from "./commonApi";
const baseUrl=import.meta.env.VITE_BASE_URL;
export const loginApi=async (form:object) => {
    return await commonAPI('POST',`${baseUrl}/auth/login`,form)
    
}
export const registerApi=async (form:object) => {
    return await commonAPI('POST',`${baseUrl}/auth/register`,form)
    
}