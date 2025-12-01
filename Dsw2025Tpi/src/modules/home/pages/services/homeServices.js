import axios from "axios";

export const getHomeStats = async () => {
  const token = localStorage.getItem("token");
  try {
    // Get all orders to count them
    const ordersResponse = await axios.get("/api/orders", {
      params: {
        page: 1,
        limit: 1000
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Get all products to count them
    const productsResponse = await axios.get("/api/products", {
      params: {
        page: 1,
        limit: 1000
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
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