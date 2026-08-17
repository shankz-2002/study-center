import commonAPI from "./commonApi";

const baseUrl=import.meta.env.VITE_BASE_URL;

export const getFields=async () => {
    return await commonAPI('GET',`${baseUrl}/field`);
    
}