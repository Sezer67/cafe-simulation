import React, { useEffect, useState } from "react";
import { updateAdisyon } from "../api/adisyonApi";
import { deleteOrder } from "../api/siparisApi";
import { getBill, updateMasa } from "../api/masaApi";
import { findByIdsProducts } from "../api/urunApi";
import { toast, ToastContainer } from "react-toastify";

const HesapModal = ({ selectedDatas, setShowModal, refresh, setRefresh }) => {
  const [products, setProducts] = useState([]); //adisyondaki ürünler
  const [order, setOrder] = useState([]); //adisyon ürün biçimim
  const [productIds, setProductIds] = useState([]); //adisyondaki ürünlerin id bilgileri
  const [totalPrice, setTotalPrice] = useState(0);

  const hesapOde = async () => {
    //masa dolu = 0 yapılacak
    //masadan o adisyon ve sipariş id leri silinecek
    //adisyon aktifliği kapanacak

    //updateAdisyon(adisyonId,updateAdisyonDto);

    //sipariş direkt silinebilir
    //deleteOrder(siparisId);
    const updateMasaDto = {
      siparisId: null,
      adisyonId: null,
      dolu: 0,
    };
    const updateAdisyonDto = {
      aktif: 0,
      masaAdi:selectedDatas.masaAdi
    };
    //updateMasa(masaId,updateMasaDto);
    try {
      await updateMasa(selectedDatas.masaId, updateMasaDto);
      await updateAdisyon(selectedDatas.adisyonId, updateAdisyonDto);
      await deleteOrder(selectedDatas.siparisId);
      toast.success('Bedel Ödendi',{position:'top-right'});
      setRefresh(refresh + 1);
      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBill(selectedDatas.masaId)
      .then((res) => {
        setProductIds(res.data.urunler);
        findByIdsProducts(res.data.urunler).then((res) => {
          setProducts(res.data);
        });
      })
      .catch((err) => {
        console.log(err);
      });
    //hangi üründen kaç tane var
  }, []);
  useEffect(() => {
    const newProductsArray = [];
    let total = 0;
    if (!productIds)
      toast.error("Bu masanın teslim edilmiş bir siparişi bulunmuyor");
    else{
      productIds.forEach((productId) => {
        const control = newProductsArray.find(
          (product) => product.id === productId
        );
        if (control) {
          control.quantity += 1;
          total += control.price;
        } else {
          const product = products.find((item) => item.id === productId);
          newProductsArray.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
          });
  
          total += product.price;
        }
      });
      setTotalPrice(total);
      setOrder(newProductsArray);
    }
    
  }, [products]);
  return (
    <>
      <ToastContainer />
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative my-6 w-full mx-20 lg:mx-60">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-dark bg-dark rounded-t">
              <h3 className="text-xl text-light font-semibold">Adisyon</h3>
            </div>
            {/*body*/}
            <div className="w-full px-5 py-3 flex bg-dark justify-center items-center">
              <div className="w-full lg:w-3/4 overflow-x-auto">
                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="overflow-hidden rounded-lg shadow-md">
                    <table className="min-w-full overflow-y-scroll">
                      <tbody>
                        {order.map((product, index) => {
                          return (
                            <tr
                              key={product.id}
                              className={`${
                                index % 2 === 0 ? "bg-light" : "bg-primary"
                              }`}
                            >
                              <td
                                className={`"px-6  py-4 text-center whitespace-nowrap font-semibold " ${
                                  index % 2 === 1 ? "text-white" : "text-dark"
                                }`}
                              >
                                {product.name}
                              </td>
                              <td
                                className={`"px-6  py-4 text-center whitespace-nowrap font-semibold " ${
                                  index % 2 === 1 ? "text-white" : "text-dark"
                                }`}
                              >
                                {product.price} ₺
                              </td>
                              <td
                                className={`"px-6 pr-0 py-4 text-center whitespace-nowrap font-semibold " ${
                                  index % 2 === 1 ? "text-white" : "text-dark"
                                }`}
                              >
                                {product.quantity} adet
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/*footer*/}
            <div className="flex items-center flex-wrap justify-center sm:justify-between p-6 border-t border-solid border-dark rounded-b">
              <div className="mb-4 sm:mb-0">
                <p className="border-b border-dark">
                  Toplam Hesap :{" "}
                  <span className="font-bold text-lg">{totalPrice} ₺</span>
                </p>
              </div>
              <div>
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  KAPAT
                </button>
                {productIds && (
                  <button
                    className="bg-secondary text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={hesapOde}
                  >
                    Öde
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default HesapModal;
