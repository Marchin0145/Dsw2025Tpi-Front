import { instance } from "../../../shared/api/axiosInstance.js";

export const getHomeStats = async () => {
  try {
    // Get all orders to count them
    const ordersResponse = await instance.get("/api/orders", {
      params: {
        page: 1,
        limit: 1000
      }
    });

    // Get all products to count them
    const productsResponse = await instance.get("/api/products", {
      params: {
        page: 1,
        limit: 1000
      }
    });

    return {
      ordersCount: Array.isArray(ordersResponse.data) ? ordersResponse.data.length : 0,
      productsCount: Array.isArray(productsResponse.data) ? productsResponse.data.length : 0
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};