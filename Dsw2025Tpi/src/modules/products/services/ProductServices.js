import axios, { AxiosHeaders } from "axios";
export const ListProductsServices = async (
  search = null,
  page = null,
  limit =null,
  isActive=null
) => {
  try {
    const response = await axios.get(
      `/api/products?page=${page}&limit=${limit}&search=${search ?? ""}&isActive=${isActive ?? ""}`
    );
    return response.data;
  } catch (error) {
    throw error.response;
  }
};
export const CreateProductServices = async (product) => {
  const token=localStorage.getItem("token");
  try {

    const response = await axios.post("/api/products",product,{
      headers:{
        'content-Type': "application/json",
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

