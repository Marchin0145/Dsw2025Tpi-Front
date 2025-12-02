import axios from "axios";
import { data } from "react-router-dom";

export const registerEmployee = async (userData) => {
  try {
    const response = await axios.post(
      "/api/auth/Register/Employee",
      userData,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    return { data: response.data, error: null };
  } catch (error) {
    return {data: null , error : error};
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(
      "/api/auth/Register/Customers",
      userData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: error};
  }
};
