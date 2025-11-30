import axios from "axios";
export const listOrderServices = async (status, page = 1, limit = 10,nameCustomer=null) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get("/api/orders", {
      params: {
        status: status,
        page: page,
        limit: limit,
        nameCustomer: nameCustomer
      },

      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const orderByIdServices= async (orderId)=>{
    const token = localStorage.getItem("token");
    try {
        const response = await axios.get(`/api/orders/${orderId}`,{
            params:{
                page:1,
                limit:1
            },
            headers:{
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
} ;
