import React, { useEffect, useState } from "react";
import { toast ,ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { getMasa , updateMasa} from "../api/masaApi";

export default function EditMasaModal({ showModal, setShowModal, id ,setRefresh ,refresh}) {
  const [masa, setMasa] = useState();
  
  const masaGuncelle = () =>{
  const updateDTO = {
    masaAdi:masa.masaAdi,
    kisiSayisi:masa.kisiSayisi,
    dolu:masa.dolu
  }
    updateMasa(id,updateDTO).then(res=>{
      toast.success(res.data.description,{
        position:toast.POSITION.TOP_RIGHT
      })
      setRefresh(refresh+1);
    }).catch(err=>{
      toast.error(err.msg.description,{
        position:toast.POSITION.TOP_CENTER
      })
    });
    setShowModal(false);
  }

  const fetchData = async () => {
    getMasa(id)
      .then((res) => {
        setMasa(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
    <ToastContainer />
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-dark rounded-t">
              <h3 className="text-xl font-semibold">
               Masa Düzenleme Formu - <span className="text-light"> {masa && masa.masaAdi} </span>
              </h3>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <div className=" flex flex-col mb-3">
                <label className="text-gray pb-1 font-semibold">Masa Adı</label>
                <input
                  type="text"
                  className="rounded-md px-2 py-2 border-gray border-2 focus:outline-none"
                  value={masa&&masa.masaAdi}
                  onChange={(e)=>setMasa({...masa,masaAdi:e.target.value})}
                />
              </div>

              <div className=" flex flex-col mb-3">
                <label className="text-gray pb-1 font-semibold">
                  Kişi Sayısı
                </label>
                <input
                  defaultValue="1"
                  min="1"
                  type="number"
                  className="rounded-md px-2 py-2 border-gray border-2 focus:outline-none"
                  value={masa&&masa.kisiSayisi}
                  onChange={(e)=>setMasa({...masa,kisiSayisi:e.target.value})}
                />
              </div>

              <div className=" flex flex-row justify-between mb-3">
                <label className="text-gray pb-1 font-semibold">
                  Masa Dolu mu ?
                </label>
                <input
                  type="checkbox"
                  className="w-5 h-5 inline cursor-pointer border-0 focus:ring-0 rounded-full bg-dark"
                  checked={masa&&masa.dolu}
                  onChange={(e)=>{
                    if(e.target.checked)
                      setMasa({...masa,dolu:1})
                    else
                      setMasa({...masa,dolu:0})
                  }}
                  
                />
              </div>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-dark rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(false)}
              >
                KAPAT
              </button>
              <button
                className="bg-secondary text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={masaGuncelle}
              >
                KAYDET
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
