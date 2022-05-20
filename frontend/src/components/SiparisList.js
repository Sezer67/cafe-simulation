import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {  getMasaByName } from "../api/masaApi";
import { allProducts } from "../api/urunApi";

const SiparisList = ({refresh}) => {
  const { name } = useParams();
  //masa çekilecek içindki ürünler alınacak
  //ürünlerin id leri tutuluyor o yüzden products tablosu çekilecek
  //içerisinden filtrelenecek
  const [filterProduct, setFilterProduct] = useState();
  const [productIds, setProductIds] = useState([]);
  const [urunler, setUrunler] = useState([]);

  useEffect(() => {
    console.log("REFRESH YAPILDI SIPARISLIST");
    const getSiparis = () => {
      getMasaByName(name)
        .then((res) => {
          if (res.data.sipasler !== null && res.data.siparisler.urunler !== null) {
            setProductIds(res.data.siparisler.urunler);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getSiparis();
  }, [refresh]);

  useEffect(() => {
    const getUrunler = () => {
        allProducts()
          .then((res) => {
            setUrunler(res.data);
          })
          .catch((err) => console.log(err));
      };
    getUrunler();
  }, [productIds]);
  useEffect(() => {
    const getOrders = () => {
        const orders = [];
        /*{id, name , quantity}*/
        //tekrar eden ürünleri bul
        productIds.forEach((product) => {
          const control = orders.find((item) => item.id === product);
          if (control) {
            control.quantity += 1;
          } else {
            orders.push({
              id: product,
              quantity: 1,
            });
          }
        });
        //bu ürünleri ürünler tablosunda bul ve name değerlerini al
        orders.forEach((order) => {
          const item = urunler.find((urun) => urun.id === order.id);
          if (item) {
            order.name = item.name;
          }
        });
        setFilterProduct(orders);
      };
    getOrders();
  }, [urunler]);



  return (
    <>
      {productIds.length > 0 ? (
        <div className="p-5 flex flex-col w-96">
          {filterProduct.length > 0 && (
            filterProduct.map((item) => (
              <div
                key={item.id}
                className="w-full flex flex-row py-2 justify-between my-2 bg-light rounded-md shadow-md"
              >
                <span className="py-1  text-lg font-semibold  text-dark  pl-4 ">
                  {item.name}
                </span>
                <div className="flex flex-row items-center pr-4">
                  <span className="py-1 pr-3  text-lg font-semibold  text-dark">
                    <span className="text-sm">x </span>
                    {item.quantity}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        <div>Bu masanın bekleyen siparişi yok</div>
      )}
    </>
  );
};

export default SiparisList;
