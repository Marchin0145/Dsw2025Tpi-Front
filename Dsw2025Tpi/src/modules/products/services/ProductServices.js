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

export const ListProductsByStock= async (
  page = null,
  limit =null,
  isActive=null,
) => {
  try {
    const response = await axios.get(
      `/api/products?page=${page}&limit=${limit}&isActive=${isActive ?? ""}&isMostStock=${true ?? ""}`
    );
    return response.data;
  } catch (error) {
    throw error.response;
  }
};

export const GetProductByIdServices = async (id) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(`/api/products/${id}`,{
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

export const UpdateProductServices = async (id, product) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.put(`/api/products/${id}`, product, {
      headers: {
        'Content-Type': "application/json",
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const ChangeProductState = async (id) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.patch(`/api/products/${id}`, {}, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

