import { instance } from "../../shared/api/axiosInstance.js";
export const loginUser = async (username, password) => {
  try {
    const response = await instance.post(
      "/api/auth/login",
      {
        username,
        password,
      }
    );

    return { data:response.data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};
