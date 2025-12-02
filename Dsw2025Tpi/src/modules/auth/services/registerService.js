<<<<<<< HEAD
import { instance } from "../../shared/api/axiosInstance.js";
=======
import axios from "axios";
import { data } from "react-router-dom";
>>>>>>> origin/Lucas

export const registerEmployee = async (userData) => {
  try {
    const response = await instance.post(
      "/api/auth/Register/Employee",
      userData
    );

    return { data: response.data, error: null };
  } catch (error) {
    return {data: null , error : error};
  }
};

export const registerUser = async (userData) => {
  try {
<<<<<<< HEAD
    const response = await instance.post(
      "/api/auth/Register/Customer",
      userData
=======
    const response = await axios.post(
      "/api/auth/Register/Customers",
      userData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
>>>>>>> origin/Lucas
    );

    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: error};
  }
};
