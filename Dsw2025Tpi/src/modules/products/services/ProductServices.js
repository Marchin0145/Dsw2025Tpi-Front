import { instance } from "../../shared/api/axiosInstance.js";
export const ListProductsServices = async (
  search = null,
  page = null,
  limit =null,
  isActive=null
) => {
  try {
    const response = await instance.get(
      `/api/products?page=${page}&limit=${limit}&search=${search ?? ""}&isActive=${isActive ?? ""}`
    );
    return response.data;
  } catch (error) {
    throw error.response;
  }
};
export const CreateProductServices = async (product) => {
  try {
    const response = await instance.post("/api/products", product);
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
    const response = await instance.get(
      `/api/products?page=${page}&limit=${limit}&isActive=${isActive ?? ""}&isMostStock=${true ?? ""}`
    );
    return response.data;
  } catch (error) {
    throw error.response;
  }
};

export const GetProductByIdServices = async (id) => {
  try {
    const response = await instance.get(`/api/products/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const UpdateProductServices = async (id, product) => {
  try {
    const response = await instance.put(`/api/products/${id}`, product);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const ChangeProductState = async (id) => {
  try {
    const response = await instance.patch(`/api/products/${id}`, {});
    return response.data;
  } catch (error) {
    throw error;
  }
};

