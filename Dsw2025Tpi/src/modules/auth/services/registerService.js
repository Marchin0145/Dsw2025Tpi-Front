
import { instance } from "../../shared/api/axiosInstance.js";
import axios from "axios";
import { data } from "react-router-dom";

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
    const response = await instance.post(
      "/api/auth/Register/Customers",
      userData

    );

    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: error};
  }
};
