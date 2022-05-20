import axios from "axios"

const url = "http://localhost:8080/adisyon"

export const getAllAdisyon = async() =>{
    const result = await axios.get(url);
    return result;
}
export const updateAdisyon = async(id,dto) =>{
    //dto = {aktif?:int,urunler?:string[],masaAdi:string}
    const result = await axios.put(`${url}/${id}`,dto);
    return result;
}

export const getAllBetweenDateAdisyon = async(dto) =>{
    //dto = {startDate ? && endDate}
    const result  = await axios.get(`${url}/date?startDate=${dto.startDate}&endDate=${dto.endDate}`);
    return result;
}