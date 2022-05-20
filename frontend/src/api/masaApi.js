import axios from "axios"

const masaApiUrl = "http://localhost:8080/masa";
//localhost:8080/masa/1/siparis
export const addMasa = async(masa) =>{
    const result = await axios.post(masaApiUrl,masa);
    return result;
}

export const getMasalar = async() =>{
    const result = await axios.get(masaApiUrl);
    return result;
}

export const getMasa = async(id) =>{
    const result = await axios.get(`${masaApiUrl}/${id}`);
    return result;
}

export const getMasaByName = async(name) =>{
    const result = await axios.get(`${masaApiUrl}/name/${name}`);
    return result;
}

export const updateMasa = async(id,masa) =>{
    const result = await axios.put(`${masaApiUrl}/${id}`,masa);
    return result;
}

export const deleteMasa = async(id) =>{
    const result = await axios.delete(`${masaApiUrl}/${id}`);
    return result;
}

export const createOrder = async(id) =>{
    //masaya sipariş oluşturma
    const result = await axios.post(`${masaApiUrl}/${id}/siparis`);
    return result;
}

export const addOrder = async(id,siparis) =>{
    //masaya sipariş ekleme
    console.log(siparis);
    const result = await axios.put(`${masaApiUrl}/${id}/siparis`,siparis);
    return result;
}

export const createBill = async(id) =>{
    const result = await axios.post(`${masaApiUrl}/${id}/adisyon`);
    return result;
}

export const getBill = async(id) =>{
    const result = await axios.get(`${masaApiUrl}/${id}/adisyon`);
    return result;
}