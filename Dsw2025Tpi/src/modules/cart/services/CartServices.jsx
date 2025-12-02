import axios from "axios";

export const CreateOrderServices = async (orderData) => {
    const token = localStorage.getItem("token");
    try {
        const response = await axios.post("/api/orders", orderData, {
            headers: {
                'Content-Type': "application/json",
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
} 