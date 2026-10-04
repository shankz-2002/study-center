import commonAPI, { baseUrl } from "./commonApi";


export const getFields=async () => {
    return await commonAPI('GET',`${baseUrl}/field`);
    
}