import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAllAdisyon, getAllBetweenDateAdisyon } from "../api/adisyonApi";

const AdisyonTable = ({ adisyonQueryDto }) => {
  const [adisyonlar, setAdisyonlar] = useState([]); //urunlerin listei
  const [count,setCount] = useState({active:false,count:0});
  const fetchData = () => {
    if (adisyonQueryDto.active) {
      const dto = {
        startDate: adisyonQueryDto.startDate,
        endDate: adisyonQueryDto.endDate,
      };
      getAllBetweenDateAdisyon(dto)
        .then((res) => {
          setCount({active:true,count:res.data[1]});
          setAdisyonlar(res.data[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      getAllAdisyon()
        .then((res) => {
          setAdisyonlar(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    fetchData();
  }, [adisyonQueryDto.refresh]);
  return (
    <div className="flex relative flex-col min-h-fit bg-light rounded-b-md rounded-r-md">
      {
        count.active && <p className="absolute right-3 -top-8">{count.count} adet sonuç bulundu</p>
      }
      <ToastContainer />
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table
              style={{ maxHeight: "400px", overflow: "scroll" }}
              className="min-w-full overflow-y-scroll"
            >
              <thead className="bg-white border-b">
                <tr>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray px-6 py-4 text-center"
                  >
                    Masa Adı
                  </th>
                  <th
                    scope="col"
                    className="text-sm  font-medium text-gray px-6 py-4 text-center"
                  >
                    Ücret
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray px-6 py-4 text-center"
                  >
                    Aktif
                  </th>
                  
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray px-6 py-4 text-center"
                  >
                    Tarih
                  </th>
                </tr>
              </thead>
              <tbody>
                {adisyonlar.map((adisyon, index) => (
                  <tr
                    key={adisyon.id}
                    className={`${index % 2 === 0 ? "bg-light" : "bg-dark"}`}
                  >
                    <td
                      className={`"px-6  py-4 text-center whitespace-nowrap text-sm font-medium" ${
                        index % 2 === 1 ? "text-white" : "text-dark"
                      }`}
                    >
                      {adisyon.masaAdi ? adisyon.masaAdi : "Bilinmiyor"}
                    </td>
                    <td
                      className={`text-sm flex items-center justify-center px-6 py-4 whitespace-nowrap ${
                        index % 2 === 1 ? "text-white" : "text-dark"
                      }`}
                    >
                      {adisyon.ucret ? `${adisyon.ucret} ₺` : "Hesaplanıyor"}
                    </td>
                    <td
                      className={`text-sm  text-center font-light px-6 py-4 whitespace-nowrap ${
                        index % 2 === 1 ? "text-white" : "text-dark"
                      }`}
                    >
                      {adisyon.aktif === 1 ? (
                        <i className="fa-solid fa-check"></i>
                      ) : (
                        <i className="fa-solid fa-xmark"></i>
                      )}
                    </td>
                    <td
                      className={`text-sm text-center  px-6 py-4 whitespace-nowrap ${
                        index % 2 === 1 ? "text-white" : "text-dark"
                      }`}
                    >
                      {adisyon.tarih}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdisyonTable;
