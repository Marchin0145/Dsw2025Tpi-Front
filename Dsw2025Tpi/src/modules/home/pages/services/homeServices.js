import axios from "axios";

export const getHomeStats = async () => {
  const token = localStorage.getItem("token");
  let ordersCount = 0;
  let productsCount = 0;

  // Try to get orders count
  try {
    const ordersResponse = await axios.get("/api/orders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Orders Response:', ordersResponse.data);
    ordersCount = Array.isArray(ordersResponse.data) ? ordersResponse.data.length : 0;
  } catch (error) {
    console.log('Error fetching orders:', error.response?.status, error.message);
  }

  // Try to get products count
  try {
    const productsResponse = await axios.get("/api/products", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Products Response:', productsResponse.data);
    productsCount = Array.isArray(productsResponse.data) ? productsResponse.data.length : 0;
  } catch (error) {
    console.log('Error fetching products:', error.response?.status, error.message);
  }

  const result = {
    ordersCount,
    productsCount
  };

  console.log('Final result:', result);
  return result;
};