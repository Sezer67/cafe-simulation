import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getMasalar } from "../api/masaApi";
import ErrorCard from "../components/ErrorCard";
import HesapModal from "../components/HesapModal";

const PHome = () => {
  const [masalar, setMasalar] = useState([]);
  const [selectedDatas,setSelectedDatas] = useState();
  const [showHesapModal,setShowHesapModal] = useState(false);
  const [refresh,setRefresh] = useState(0);

  const hesapClick = (masa) =>{
    if(masa.adisyonId){
      setSelectedDatas({
        masaId:masa.id,
        adisyonId:masa.adisyonId,
        siparisId:masa.siparisId,
        masaAdi:masa.masaAdi
      });
      setShowHesapModal(true);
    }else{
      toast.error('Bu masa boş',{position:'top-center'})
    }
  }

  const fetchData = () => {
    getMasalar()
      .then((res) => {
        setMasalar(res.data);
      })
      .catch((err) => {
        toast.info(err.response.data.description,{position:toast.POSITION.TOP_LEFT});
      });
  };

  useEffect(() => {
    fetchData();
  }, [refresh]);

  return (
    <div className="w-full h-screen">
      <ToastContainer />
      <div className="w-full pt-5 px-10 sm:px-20 flex flex-row flex-wrap justify-around">
        {
          masalar.length < 1 && <ErrorCard msg={'Admin Sayfasına Gidip Bir Masa OLuşturunuz.'} link={'/admin/home'} />
        }
        {masalar.map((masa, index) => (
          <div
            key={masa.id}
            className={`flex shadow-lg rounded-md flex-col m-3 justify-center items-center w-52 hover:shadow-primary transition-shadow
                      ${
                        index % 2 === 0
                          ? "bg-light text-dark"
                          : "bg-secondary text-light"
                      }`}
          >
            <div className="w-full px-4 mt-3 mb-5 flex flex-row justify-between items-center">
              <p className="top-3 left-3 font-bold text-lg">{masa.masaAdi}</p>
              <span className="top-3 right-3 text-xl">
                {masa.dolu ? (
                  <i
                    title="Dolu"
                    className="text-2xl fa-solid fa-users-line"
                  ></i>
                ) : (
                  <i title="Boş" className="fa-solid fa-users-slash"></i>
                )}
              </span>
            </div>
            <div className="w-full mb-3 px-3 flex flex-row justify-between items-center">
              <Link to={`/personel/masa/siparis-ver/${masa.masaAdi}`} className="px-2 py-1 bg-orange-700 text-white rounded-md border-0 shadow-md">Sipariş</Link>
              <button onClick={()=>{hesapClick(masa)}} className="px-2 py-1 bg-green-600 text-white rounded-md border-0 shadow-md">Hesap</button>
            </div>
          </div>
        ))}
      </div>
      {
        showHesapModal && <HesapModal refresh={refresh} setRefresh={setRefresh} selectedDatas={selectedDatas} setShowModal={setShowHesapModal} />
      }
    </div>
  );
};

export default PHome;
