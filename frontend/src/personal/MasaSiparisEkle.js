import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { createBill, createOrder, getMasaByName } from "../api/masaApi";
import { allProducts } from "../api/urunApi";
import SiparisModal from "../components/SiparisModal";
import searchIcon from "../assets/icons/Magnifier.png";
import SiparisList from "../components/SiparisList";
const MasaSiparisEkle = () => {
  const { name } = useParams();

  const [urunler, setUrunler] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showConfirm, setShowconfirm] = useState(false);
  const [masaID, setMasaID] = useState("");
  const [refresh, setRefresh] = useState(0);

  //   {
  //      selectedProduct arrayi obje modeli
  //       id:urun.id,
  //       name:urun.name,
  //       quantity:siparisAdedi,

  //   }
  //ürünler çekilecek ve listelenecek

  const addToProduct = async (product) => {
    let products = selectedProducts;
    var addedItem = await products.find((item) => item.id === product.id);

    if (addedItem) {
      addedItem.quantity += 1;
    } else {
      products.push({
        id: product.id,
        name: product.name,
        quantity: 1,
      });
    }
    toast.success(`${product.name} sipariş listesine eklendi.`, {
      position: toast.POSITION.TOP_RIGHT,
      
    });
    setSelectedProducts(products);
  };

  const urunlerDatas = () => {
    allProducts()
      .then((res) => {
        setUrunler(res.data);
        setFilteredProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createSiparis = () => {
    getMasaByName(name)
      .then((res) => {
        setMasaID(res.data.id);
        if (!res.data.siparisler) {
          //masaya sipariş oluştur
          createOrder(res.data.id)
            .then((res) => {
              console.log("Masaya Sipariş oluşturuldu");
            })
            .catch((err) => {
              console.log(err);
            });
        }
        if(!res.data.adisyon){
          //masaya bir de adisyon oluşturulması lazım
          createBill(res.data.id).then((res) => {
            console.log("Masaya Adisyon oluşturuldu");
          })
          .catch((err) => {
            console.log(err);
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
      
  };

  const searchProduct = (e) => {
    e.preventDefault();
    const filter = urunler.filter((item) => {
      const a = item.name.toLowerCase().search(e.target.value);
      if (a !== -1) {
        return item;
      }
    });
    setFilteredProducts(filter);
  };

  useEffect(() => {
    setUrunler([]);
    urunlerDatas();
    createSiparis();
  }, [refresh]);

  return (
    <div className="w-full h-auto relative pt-5 px-10 sm:px-20 flex flex-col justify-center items-center">
      <ToastContainer />
      <div className="fixed bottom-10 right-10">
        <button
          onClick={() => setShowconfirm(true)}
          className={`px-5 py-3 btn-three bg-secondary text-white rounded-md font-semibold shadow-md`}
        >
          ONAYLA
        </button>
      </div>
      <div className="border px-5 py-3 rounded-md border-primary">
        <h3 className="text-dark font-semibold">
          {name} Masası Sipariş Ekleme Ekranı
        </h3>
      </div>
      <form
        onChange={searchProduct}
        className="w-full lg:w-1/2 px-10 mt-3 relative"
      >
        <input
          type="text"
          className="rounded-md bg-light  px-2 py-3 border-light border-b-0 border-2 w-full focus:outline-none"
          placeholder="Search"
        />
        <button className="absolute animate-spin hover:animate-none right-12 top-2">
          <img src={searchIcon} alt="resim" className="w-8 h-8" />
        </button>
      </form>
      <div className="w-full mt-2 xl:w-9/12 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-lg rounded-tl-none shadow-md">
            <table className="min-w-full overflow-y-scroll">
              <tbody>
                {filteredProducts.map((urun, index) => (
                  <tr
                    key={urun.id}
                    className={`${index % 2 === 0 ? "bg-light" : "bg-primary"}`}
                  >
                    <td
                      className={`"px-6 pr-8 py-4 text-center whitespace-nowrap font-semibold " ${
                        index % 2 === 1 ? "text-white" : "text-dark"
                      }`}
                    >
                      {urun.name}
                    </td>
                    <td
                      className={`text-sm text-center px-6 py-4 whitespace-nowrap font-semibold ${
                        index % 2 === 1 ? "text-white" : "text-dark"
                      }`}
                    >
                      {urun.price} ₺
                    </td>
                    <td
                      className={`text-sm text-center px-6 py-4 whitespace-nowrap ${
                        index % 2 === 1 ? "text-white" : "text-dark"
                      }`}
                    >
                      <button
                        onClick={() => {
                          addToProduct(urun);
                        }}
                        className={`px-3 py-1 ${
                          index % 2 === 1
                            ? "bg-light text-primary"
                            : "bg-primary text-white"
                        } rounded-md font-semibold shadow-md`}
                      >
                        Sipariş Ver
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {showConfirm && (
        <SiparisModal
          refresh={refresh}
          setRefresh={setRefresh}
          masaID={masaID}
          products={selectedProducts}
          setShowModal={setShowconfirm}
          setProducts={setSelectedProducts}
        />
      )}
      <div className="border px-5 py-3 mt-3 rounded-md border-primary flex flex-row items-center">
        <div className="w-4 h-4 border border-b-0 border-r-0 rounded-full mr-3 animate-spin"></div>
        <h3 className="text-dark font-semibold">Hazırlanıyor</h3>
      </div>
      <SiparisList refresh={refresh} urunler={urunler} />
    </div>
  );
};

export default MasaSiparisEkle;
