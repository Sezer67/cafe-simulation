import React, { useState } from "react";
import { toast , ToastContainer} from "react-toastify";
import { addOrder } from "../api/masaApi";

const SiparisModal = ({ products, setProducts, setShowModal , masaID ,setRefresh ,refresh }) => {
 
  const decreaseProduct = async (product) => {
    let newProducts = products;
    var decreaseItem = await newProducts.find((item) => item.id === product.id);
    decreaseItem.quantity -= 1;
    if (decreaseItem.quantity === 0) {
      //ürünü sil
      newProducts = products.filter((item) => item.id !== product.id);
    }
    setRefresh(refresh + 1);
    setProducts(newProducts);
  };

  const siparisVer  = async() =>{
    const siparis = {
        urunler:[]
    }
    await products.forEach(product => {
        for(let i=0;i<product.quantity;i++){    
            siparis.urunler.push(product.id);
        }
    });
    addOrder(masaID,siparis).then(res=>{
        toast.success('Masaya Siparişler Eklendi',{position:toast.POSITION.TOP_RIGHT});
    }).catch(err=>{
      console.log(err.response.data.description);
        toast.error(err.response.data.description,{position:toast.POSITION.TOP_CENTER});
    });
    setTimeout(()=>{
      setRefresh(refresh + 1);
      setShowModal(false);
    },1000);
  }

  return (
    <>
    <ToastContainer/>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-2xl relative flex flex-col items-center w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start bg-dark  justify-between p-5 w-full border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-xl text-white font-semibold">
                Sipariş Listesi
              </h3>
            </div>
            <div className="p-5 flex flex-col w-96">
              {products.length > 0 ? (
                products.map((item) => (
                  <div
                    key={item.id}
                    className="w-full flex flex-row py-2 justify-between my-2 bg-secondary rounded-md shadow-md"
                  >
                    <span className="py-1  text-lg font-semibold  text-dark  pl-4 ">
                      {item.name}
                    </span>
                    <div className="flex flex-row items-center pr-4">
                      <span className="py-1 pr-3  text-lg font-semibold  text-dark">
                        <span className="text-sm">x </span>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => decreaseProduct(item)}
                        className="text-sm px-3 py-1 rounded-md  bg-red-600 text-white"
                      >
                        Sil
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="font-semibold text-lg">
                  Sipariş Listeniz Boş Durumda
                </div>
              )}
            </div>
            {/*footer*/}
            <div className="flex items-center w-full justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(false)}
              >
                KAPAT
              </button>
              {products.length > 0 && (
                <button
                  className="bg-green-600 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={siparisVer}
                >
                  ONAYLA
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default SiparisModal;
