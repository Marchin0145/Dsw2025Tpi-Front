import { instance } from "../../shared/api/axiosInstance.js";

export const CreateOrderServices = async (orderData) => {
    try {
        const response = await instance.post("/api/orders", orderData);
        return response.data;
    } catch (error) {
        console.log('Error creating order:', error.response?.status, error.message);
        throw error;
    }
} 