import axios from "axios";
export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(
      "/api/auth/login",
      {
        username,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return { data:response.data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};
