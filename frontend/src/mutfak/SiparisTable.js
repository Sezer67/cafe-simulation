import React from "react";
import { toast ,ToastContainer } from "react-toastify";
import {updateAdisyon} from '../api/adisyonApi';
import { deleteProduct } from "../api/siparisApi";

const SiparisTable = ({ product,index,adisyonId ,siparisId , masaAdi, setRefresh ,refresh}) => {

  const adisyonaYaz = () =>{
    const dto={urunler:[],masaAdi:masaAdi};
    dto.urunler.push(product.id);

    updateAdisyon(adisyonId,dto).then(res=>{
      toast.success('Adisyona Kaydedildi',{position:'top-center'});
      //adisyona kayıttan sonra sipariş tablomuzdan silinsin
      deleteProduct(siparisId,product.id).then(res=>{console.log("Silindi");
      setRefresh(refresh + 1);}).catch(err=>console.log(err))
    }).catch(err=>console.log(err));
  }

  return (
    <tr
      key={product&&product.id}
      className={`${index % 2 === 0 ? "bg-light" : "bg-primary"}`}
    >
      <ToastContainer />
      <td
        className={`"px-6 pr-8 py-4 text-center whitespace-nowrap font-semibold " ${
          index % 2 === 1 ? "text-white" : "text-dark"
        }`}
      >
        {product&&product.name}
      </td>
      <td
        className={`text-sm text-center px-6 py-4 whitespace-nowrap ${
          index % 2 === 1 ? "text-white" : "text-dark"
        }`}
      >
        <button
          className={`px-3 py-1 ${
            index % 2 === 1 ? "bg-light text-primary" : "bg-primary text-white"
          } rounded-md font-semibold shadow-md`}
          onClick={adisyonaYaz}
        >
          Hazır
        </button>
      </td>
    </tr>
  );
};

export default SiparisTable;
