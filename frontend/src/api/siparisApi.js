import axios from "axios"

const url = "http://localhost:8080/siparis";

export const allOrders = async() =>{
    const result = await axios.get(url);
    return result;
}

export const deleteProduct = async(id,productId) =>{
    const result = await axios.delete(`${url}/${id}/${productId}`);
    return result;
}

export const deleteOrder = async(id)=>{
    const result = await axios.delete(`${url}/${id}`);
    return result;
}