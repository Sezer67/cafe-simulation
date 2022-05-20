import React, { useEffect, useState } from "react";
import {toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { getProduct, updateProduct } from "../api/urunApi";

const EditUrunModal = ({ id,categoryId, setShowModal, refresh, setRefresh }) => {

  const [urun,setUrun] = useState();

  const urunGuncelle = () =>{
      updateProduct(categoryId,id,urun).then(res=>{
        console.log(res.data);
        toast.success('Ürün Güncellemesi Başarıyla Yapıldı',{
          position:toast.POSITION.TOP_RIGHT
        });
        setRefresh(refresh+1);
      }).catch(err=>{
        toast.error(err.msg.description,{
          position:toast.POSITION.TOP_CENTER
        })
      });
      setShowModal(false);
  }


  useEffect(()=>{
    const fetchData = () =>{
        getProduct(categoryId,id).then(res=>{
            setUrun(res.data);
        }).catch(err=>{
            console.log(err);
        });
      }
    fetchData();
  },[])


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
                Ürün Düzenleme Formu - <span className="text-gray">{urun&&urun.name}</span>
              </h3>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <div className=" flex flex-col mb-3">
                <label className="text-gray pb-1 font-semibold">
                  Ürün Adı *
                </label>
                <input
                  className="rounded-md px-2 py-2 border-gray border-2 focus:outline-none"
                  type="text"
                  value={urun&&urun.name}
                  onChange={(e) => setUrun({ ...urun, name: e.target.value })}
                />
              </div>
              <div className=" flex flex-col mb-3">
                <label className="text-gray pb-1 font-semibold">
                  Ürün Fiyatı *
                </label>
                <input
                  className="rounded-md px-2 py-2 border-gray border-2 focus:outline-none"
                  type="number"
                  id="arrowhide"
                  min="0"
                  value={urun&&urun.price.toString()}
                  onChange={(e) =>
                    setUrun({ ...urun, price: Number(e.target.value) })
                  }
                />
              </div>
              <div className=" flex flex-col mb-3">
                <label className="text-gray pb-1 font-semibold">
                  Ürün Açıklaması
                </label>
                <input
                  className="rounded-md px-2 py-2 border-gray border-2 focus:outline-none"
                  type="text"
                  value={urun&&urun.description}
                  onChange={(e) =>
                    setUrun({ ...urun, description: e.target.value })
                  }
                />
              </div>
              <div className=" flex flex-col mb-3">
                <label className="text-gray pb-1 font-semibold">
                  Ürün Resmi (URL) *
                </label>
                <input
                  className="rounded-md px-2 py-2 border-gray border-2 focus:outline-none"
                  type="url"
                  value={urun&&urun.imgUrl}
                  onChange={(e) => setUrun({ ...urun, imgUrl: e.target.value })}
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
                onClick={urunGuncelle}
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
};

export default EditUrunModal;
