import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { deleteMasa, getMasalar } from "../api/masaApi";
import EditMasaModal from "./EditMasaModal";
import ErrorCard from "./ErrorCard";

const MasaTable = ({ refresh, setRefresh }) => {
  const [masalar, setMasalar] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const [deleteModal, setDeleteModal] = useState(false);

  const handleDelete = () => {
    deleteMasa(selectedId)
      .then((res) => {
        toast.success(res.data.description, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setRefresh(refresh + 1);
      })
      .catch((err) => {
        toast.error(err.response.data.description, {
          position: toast.POSITION.TOP_CENTER,
        });
      });
    setDeleteModal(false);
  };

  const fetchData = () => {
    getMasalar()
      .then((res) => {
        setMasalar(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, [refresh]);
  return (
    <>
      {masalar.length < 1 ? (
        <ErrorCard msg={"Form Kısmından Masa Ekleyebilirsiniz"} />
      ) : (
        <div className="flex flex-col min-h-fit bg-light rounded-b-md rounded-r-md">
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
                        className="text-sm font-medium text-gray px-6 py-4 text-center"
                      >
                        Kişi Sayısı
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray px-6 py-4 text-center"
                      >
                        Dolu
                      </th>
                      

                      <th
                        scope="col"
                        className="text-sm font-medium text-gray px-6 py-4 text-center"
                      >
                        Düzenle
                      </th>

                      <th
                        scope="col"
                        className="text-sm font-medium text-gray px-6 py-4 text-center"
                      >
                        Sil
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {masalar.map((masa, index) => (
                      <tr
                        key={masa.id}
                        className={`${
                          index % 2 === 0 ? "bg-light" : "bg-dark"
                        }`}
                      >
                        <td
                          className={`"px-6 py-4 text-center whitespace-nowrap text-sm font-medium" ${
                            index % 2 === 1 ? "text-white" : "text-dark"
                          }`}
                        >
                          {masa.masaAdi}
                        </td>
                        <td
                          className={`text-sm text-center px-6 py-4 whitespace-nowrap ${
                            index % 2 === 1 ? "text-white" : "text-dark"
                          }`}
                        >
                          {masa.kisiSayisi}
                        </td>
                        <td
                          className={`text-sm  text-center font-light px-6 py-4 whitespace-nowrap ${
                            index % 2 === 1 ? "text-white" : "text-dark"
                          }`}
                        >
                          {masa.dolu === 1 ? (
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
                          <button
                            className="w-7 h-7 rounded-md"
                            onClick={() => {
                              setShowModal(true);
                              setSelectedId(masa.id);
                            }}
                          >
                            <i className="fa-solid fa-pen-to-square"></i>
                          </button>
                        </td>

                        <td
                          className={`text-sm text-center  px-6 py-4 whitespace-nowrap ${
                            index % 2 === 1 ? "text-white" : "text-dark"
                          }`}
                        >
                          <button
                            className="w-7 h-7 rounded-md"
                            onClick={() => {
                              setSelectedId(masa.id);
                              setDeleteModal(true);
                            }}
                          >
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {showModal ? (
            <EditMasaModal
              setShowModal={setShowModal}
              id={selectedId}
              refresh={refresh}
              setRefresh={setRefresh}
            />
          ) : null}
          {deleteModal ? (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-row items-center w-full bg-white outline-none focus:outline-none">
                    <div className="pl-5 flex flex-row justify-between items-center w-full">
                      <i className="fa-solid fa-circle-exclamation text-yellow-500 pr-4 text-2xl"></i>
                      <span>Masayı Silmek istediğinizden Emin misiniz ? </span>
                    </div>
                    <div className="relative p-6 flex-auto">
                      <p className="my-4 text-slate-500 text-lg leading-relaxed"></p>
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setDeleteModal(false)}
                      >
                        İPTAL
                      </button>
                      <button
                        className="bg-red-700 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={handleDelete}
                      >
                        SİL
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : null}
        </div>
      )}
    </>
  );
};

export default MasaTable;
