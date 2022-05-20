import axios from "axios"

const url = 'http://localhost:8080/category'
const productURL = "http://localhost:8080/product"
export const addCategory = async(category) =>{
    const result = await axios.post(url,{name:category});
    return result;
}

export const allCategory = async() =>{
    const result = await axios.get(url);
    return result;
}

export const addProduct = async(categoryId,product) =>{
    const result = await axios.post(`${url}/${categoryId}/product`,product);
    return result;
}

export const allProducts = async() =>{
    const result = await axios.get(productURL);
    return result;
}

export const getProductsByCategoryId = async(categoryId) =>{
    const result = await axios.get(`${url}/${categoryId}/product`);
    return result;
}

export const deleteProduct = async(categoryId,productId) =>{
    const result = await axios.delete(`${url}/${categoryId}/product/${productId}`);
    return result;
}

export const getProduct = async(categoryId,productId) =>{
    const result = await axios.get(`${url}/${categoryId}/product/${productId}`);
    return result;
}

export const updateProduct = async(categoryId,productId,product) =>{
    const result = await axios.put(`${url}/${categoryId}/product/${productId}`,product);
    return result;
}

export const findByIdsProducts = async(productIds) =>{
    const result = await axios.post(productURL,productIds);
    return result;
}