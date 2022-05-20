import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { allOrders } from "../api/siparisApi";
import { findByIdsProducts } from "../api/urunApi";
import ErrorCard from "../components/ErrorCard";
import SiparisTable from "./SiparisTable";

const MHome = () => {
  const [orders, setOrders] = useState([]); //siparişteki ürünlerimin id leri
  const [refresh, setRefresh] = useState(0);
  const [products, setProducts] = useState([]); //sipariş ürünlerinin tam bilgileri

  useEffect(() => {
    console.log("girdi",refresh)
    const getOrders = () => {
      allOrders()
        .then((res) => {
          setOrders(res.data);
        })
        .catch((err) => {
          toast.info(err.response.data.description,{position:toast.POSITION.TOP_LEFT})
        });
    };
    getOrders();
  }, [refresh]);
  useEffect(() => {
    //ürün id lerinden ürünleri bul ve çek
    orders.forEach((order) => {
      if (order.urunler) {
        findByIdsProducts(order.urunler)
          .then((res) => {
            setProducts(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  }, [orders]);

  return (
    <div className="w-full h-screen">
      {
          orders.length < 1 && <div className="w-full pt-5 px-4 flex justify-center items-center"> <ErrorCard msg={'Aktif Bir Sipariş Bulunmamaktadır. Personel Bölümünden Bir Masaya Sipariş Verebilirsiniz.'} link={'/personel/home'} /> </div>
      }
      <div className="pt-5 px-10 sm:px-20">
        {orders.map((order,i) => {
          if (order.urunler) {
            if (order.urunler.length > 0) {
              return (
                <div key={i} className="w-full flex flex-row justify-around items-center flex-wrap border-b border-slate-200 pb-4">
                  <div className="w-1/6 sm:w-1/12 mt-0 sm:mt-5 flex flex-row justify-between items-center">
                    <h4 className="font-semibold">{order.masa.masaAdi}</h4>
                    <i className="fa-solid fa-angle-right pt-0.5"></i>
                  </div>
                  <div className="w-full sm:w-10/12 mt-2 xl:w-9/12 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                      <div className="overflow-hidden rounded-lg shadow-md">
                        <table className="min-w-full overflow-y-scroll">
                          <tbody>
                            {order.urunler.map((urun, index) => {
                              const product = products.find(
                                (item) => item.id === urun
                              );
                              return (
                                <SiparisTable
                                  setRefresh={setRefresh}
                                  refresh={refresh}
                                  siparisId={order.id}
                                  adisyonId={order.masa.adisyonId}
                                  key={index}
                                  product={product}
                                  index={index}
                                  masaAdi={order.masa.masaAdi}
                                />
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          }
        })}
      </div>
    </div>
  );
};

export default MHome;
