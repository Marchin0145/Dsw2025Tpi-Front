import axios from "axios";

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(
      "/api/auth/Register/Employee",
      userData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: error.response?.data?.message || error.message || "Error al registrar el usuario" };
  }
};