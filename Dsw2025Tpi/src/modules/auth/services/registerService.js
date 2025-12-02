import { instance } from "../../shared/api/axiosInstance.js";

export const registerEmployee = async (userData) => {
  try {
    const response = await instance.post(
      "/api/auth/Register/Employee",
      userData
    );

    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: error.response?.data?.message || error.message || "Error al registrar el usuario" };
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await instance.post(
      "/api/auth/Register/Customer",
      userData
    );

    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: error.response?.data?.message || error.message || "Error al registrar el usuario" };
  }
};
