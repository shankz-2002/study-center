import commonAPI, { baseUrl } from "./commonApi";
export const loginApi = async (form: object) => {
  return await commonAPI("POST", `${baseUrl}/auth/login`, form);
};
export const registerApi = async (form: object) => {
  return await commonAPI("POST", `${baseUrl}/auth/register`, form);
};

export const forgotPassword = async (email: string) => {
  return await commonAPI("POST", `${baseUrl}/auth/forgot`, { email });
};
export const resetPassword = async (newPassword: string, token: string) => {
  return await commonAPI("POST", `${baseUrl}/auth/reset/${token}`, {
    newPassword,
  });
};

export const sendCredential = async (credential: string) => {
  return await commonAPI("POST", `${baseUrl}/auth/google`, { credential });
};
