import { instance } from "../../shared/api/axiosInstance.js";

export const CreateOrderServices = async (orderData) => {
    try {
        const response = await instance.post("/api/orders", orderData);
        return response.data;
    } catch (error) {
        throw error;
    }
} 