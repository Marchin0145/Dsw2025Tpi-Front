import { instance } from "../../shared/api/axiosInstance.js";
export const listOrderServices = async (status, page = 1, limit = 10,nameCustomer=null) => {
  try {
    const response = await instance.get("/api/orders", {
      params: {
        status: status,
        page: page,
        limit: limit,
        nameCustomer: nameCustomer
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const orderByIdServices= async (orderId)=>{
    try {
        const response = await instance.get(`/api/orders/${orderId}`,{
            params:{
                page:1,
                limit:1
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
} ;
export const orderByUserName=async (status, page = 1, limit = 10,userName=null) => {
  try {
    const response = await instance.get("/api/orders", {
      params: {
        status: status,
        page: page,
        limit: limit,
        userName: userName
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

