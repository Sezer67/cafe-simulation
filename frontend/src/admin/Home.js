import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MasaTable from "../components/MasaTable";
import { addMasa } from "../api/masaApi";
import { addCategory, addProduct, allCategory } from "../api/urunApi";
import CategoryModal from "../components/CategoryModal";
import UrunTable from "../components/UrunTable";
import AdisyonTable from "../components/AdisyonTable";

const Home = () => {
  const [masa, setMasa] = useState({ masaAdi: "", kisiSayisi: 1 }); //masa ekleme inputu verileri
  const [urun, setUrun] = useState({
    categoryId: "",
    name: "",
    price: 0,
    description: "",
    imgUrl: "",
  }); // urun ekleme input verileri
  const [category, setCategory] = useState(""); //category ekleme input verisi (name tutuyor)

  const [categoryList, setCategoryList] = useState([]); //kategori listesi

  const [refresh, setRefresh] = useState(0); //yapılan işlemlerden sonra refresh sağlar
  const [dropdown, setDropdown] = useState({
    masa: true,
    urun: false,
    adisyon: false,
  }); //kontrol panellerinin açılıp kapanmasını sağlar
  const date = new Date();
  let month = date.getMonth() +1;
  if(month<10){
    month = "0"+month.toString();
  }
  const today = date.getFullYear().toString()  + "-" + month + "-" + date.getDate().toString();
  
  const [adisyonQueryDto,setAdisyonQueryDto] = useState({startDate:'2022-01-01',endDate:today,active:false,refresh:0})
  const [catModalShow, setCatModalShow] = useState(false); // kateogri görüntüleme modali
  const [filter, setFilter] = useState(""); // ürün listeleme filtresi

  useEffect(() => {
    allCategory()
      .then((res) => {
        setCategoryList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refresh]);

  const validationMasa = () => {
    if (masa.masaAdi === "") {
      toast.error("Masa Adı Bilgisi Boş Bırakılamaz", {
        position: toast.POSITION.TOP_CENTER,
      });
      return false;
    }
    return true;
  };

  const validationCategory = () => {
    if (category === "") {
      toast.error("Kategori Adı Boş Bırakılamaz", {
        position: toast.POSITION.TOP_CENTER,
      });
      return false;
    }
    return true;
  };

  const validationUrun = () => {
    if (urun.name === "" || urun.imgUrl === "") {
      toast.error("Lütfen Tüm Alanları Doldurunuz", {
        position: toast.POSITION.TOP_CENTER,
      });
      return false;
    } else if (urun.price === 0) {
      toast.error("Ürün Fiyatı Girmeyi Unuttunuz :))", {
        position: toast.POSITION.TOP_CENTER,
      });
      return false;
    }
    return true;
  };

  const categoryEkle = () => {
    const validation = validationCategory();
    const upperCat =
      category.charAt(0).toUpperCase() + category.substring(1, category.length);

    if (validation) {
      addCategory(upperCat)
        .then((res) => {
          toast.success("Yeni Ürün Kategorisi Başarıyla Oluşturuldu", {
            position: toast.POSITION.TOP_RIGHT,
          });
          setRefresh(refresh + 1);
        })
        .catch((err) => {
          toast.error(err.response.data.description, {
            position: toast.POSITION.TOP_CENTER,
          });
        });
    }
  };

  const masaEkle = () => {
    const validControl = validationMasa();
    if (validControl) {
      addMasa(masa)
        .then((res) => {
          toast.success("Yeni Masa Başarıyla Oluşturuldu", {
            position: toast.POSITION.TOP_RIGHT,
          });
          setRefresh(refresh + 1);
        })
        .catch((err) => {
          toast.error(err.response.data.description, {
            position: toast.POSITION.TOP_CENTER,
          });
        });
    }
  };

  const urunEkle = async () => {
    const validation = validationUrun();
    if (validation) {
      if (!urun.categoryId) {
        urun.categoryId = categoryList[0].name;
      }

      const catId = await categoryList.find(
        (item) => item.name === urun.categoryId
      );

      addProduct(catId.id, urun)
        .then((res) => {
          toast.success("Yeni Ürün Başarıyla Oluşturuldu", {
            position: toast.POSITION.TOP_RIGHT,
          });
          setRefresh(refresh + 1);
          setUrun({
            categoryId: urun.categoryId,
            name: "",
            price: 0,
            description: "",
            imgUrl: "",
          });
        })
        .catch((err) => {
          toast.error(err.response.data.description, {
            position: toast.POSITION.TOP_CENTER,
          });
        });
    }
  };

  return (
    <div className="relative w-full h-screen">
      <ToastContainer />
      {/* Masa kontrolleri masa ekle - masaların tablosu kisi say. masa adi */}
      <div className="w-full px-20 pt-5">
        <div className="bg-primary w-full flex flex-row items-center justify-between px-5 py-3 rounded-t-xl ">
          <h2 className="text-white font-semibold ">MASA KONTROLLERİ</h2>
          <button
            onClick={() =>
              setDropdown({ ...dropdown, masa: dropdown.masa ? false : true })
            }
          >
            <div className="w-6 h-6 bg-white opacity-75 shadow-lg shadow-dark rounded-full flex justify-center items-center">
              {dropdown.masa ? (
                <i className="fa-solid fa-caret-up text-dark"></i>
              ) : (
                <i className="fa-solid fa-caret-down text-dark"></i>
              )}
            </div>
          </button>
        </div>
        {dropdown.masa ? (
          <div
            className={`mt-2 flex flex-row flex-wrap justify-between ${
              dropdown.masa
                ? "opacity-100 transition-all delay-500"
                : "opacity-5 transition-all delay-500"
            }`}
          >
            <div className="w-full md:w-4/12">
              <h5 className="bg-secondary w-10 text-center py-1 rounded-t-md ">
                <i className="fa-solid fa-plus text-white"></i>
              </h5>
              <div className="flex flex-col px-10 w-full bg-light rounded-b-lg rounded-r-lg">
                <div className="my-3">
                  <h2 className="text-dark font-bold pb-2">
                    Masa Ekleme Formu
                  </h2>
                  <div className="border-b-2 border-dark opacity-60" />
                </div>

                <div className=" flex flex-col mb-3">
                  <label className="text-gray pb-1 font-semibold">
                    Masa Adı
                  </label>
                  <input
                    type="text"
                    className="rounded-md px-2 py-2 border-gray border-2 focus:outline-none"
                    value={masa.masaAdi}
                    onChange={(e) =>
                      setMasa({ ...masa, masaAdi: e.target.value })
                    }
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
                    value={masa.kisiSayisi}
                    onChange={(e) =>
                      setMasa({ ...masa, kisiSayisi: e.target.value })
                    }
                  />
                </div>

                <div className="flex flex-row justify-end mb-5">
                  <button
                    onClick={masaEkle}
                    className="px-4 py-2 bg-secondary btn-three text-white rounded-lg shadow-md"
                  >
                    Gönder
                  </button>
                </div>
              </div>
            </div>
            <div className="w-full mt-3 md:mt-0 md:w-7/12">
              <h5 className="bg-dark w-10 text-center py-1 rounded-t-md ">
                <i className="fa-solid fa-table text-white"></i>
              </h5>
              <MasaTable refresh={refresh} setRefresh={setRefresh} />
            </div>
          </div>
        ) : null}

        {/* Kategori , Ürün ekleme  */}
        <div className="mt-5 bg-primary w-full flex flex-row items-center justify-between px-5 py-3 rounded-t-xl ">
          <h2 className="text-white font-semibold">ÜRÜN KONTROLLERİ</h2>
          <button
            onClick={() =>
              setDropdown({ ...dropdown, urun: dropdown.urun ? false : true })
            }
          >
            <div className="w-6 h-6 bg-white rounded-full opacity-75 shadow-lg shadow-dark flex justify-center items-center">
              {dropdown.urun ? (
                <i className="fa-solid fa-caret-up text-dark"></i>
              ) : (
                <i className="fa-solid fa-caret-down text-dark"></i>
              )}
            </div>
          </button>
        </div>
        {dropdown.urun ? (
          <div className="w-full flex flex-col">
            <div className="w-full flex flex-row justify-between flex-wrap">
              <div className="w-full md:w-4/12 my-4">
                <h5 className="bg-secondary w-10 text-center py-1 rounded-t-md ">
                  <i className="fa-solid fa-plus text-white"></i>
                </h5>
                <div className="flex flex-col px-10 w-full bg-light rounded-b-lg rounded-r-lg">
                  <div className="my-3">
                    <h2 className="text-dark font-bold pb-2">
                      Kategori Ekleme Formu
                    </h2>
                    <div className="border-b-2 border-dark opacity-60" />
                  </div>

                  <div className=" flex flex-col mb-3">
                    <label className="text-gray pb-1 font-semibold">
                      Kategori Adı
                    </label>
                    <input
                      className="rounded-md px-2 py-2 border-gray border-2 focus:outline-none"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-row flex-wrap justify-between ">
                    <button
                      className="px-4 py-2 w-full mb-5 sm:w-auto bg-dark btn-three text-white rounded-lg shadow-md"
                      onClick={() => setCatModalShow(true)}
                    >
                      Kategorileri Görüntüle
                    </button>
                    <button
                      onClick={categoryEkle}
                      className="px-4 py-2 w-full mb-5 sm:w-auto bg-secondary btn-three text-white rounded-lg shadow-md"
                    >
                      Gönder
                    </button>
                  </div>
                </div>
              </div>
              {catModalShow && (
                <CategoryModal
                  list={categoryList}
                  modalShow={setCatModalShow}
                />
              )}
              <div className="w-full md:w-7/12 my-4">
                <h5 className="bg-secondary w-10 text-center py-1 rounded-t-md ">
                  <i className="fa-solid fa-plus text-white"></i>
                </h5>
                <div className="flex flex-col px-10 w-full bg-light rounded-b-lg rounded-r-lg">
                  <div className="my-3">
                    <h2 className="text-dark font-bold pb-2">
                      Ürün Ekleme Formu
                    </h2>
                    <div className="border-b-2 border-dark opacity-60" />
                  </div>

                  <div className=" flex flex-col mb-3">
                    <label className="text-gray pb-1 font-semibold">
                      Kategori
                    </label>
                    <div className="relative mb-3">
                      <select
                        className="relative block appearance-none w-full bg-gray-200 border-2 border-gray py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none"
                        onChange={(e) =>
                          setUrun({ ...urun, categoryId: e.target.value })
                        }
                      >
                        {categoryList.map((item) => (
                          <option key={item.id}>{item.name}</option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg
                          className="fill-current h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                    <div className=" flex flex-col mb-3">
                      <label className="text-gray pb-1 font-semibold">
                        Ürün Adı *
                      </label>
                      <input
                        className="rounded-md px-2 py-2 border-gray border-2 focus:outline-none"
                        type="text"
                        value={urun.name}
                        onChange={(e) =>
                          setUrun({ ...urun, name: e.target.value })
                        }
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
                        value={urun.price.toString()}
                        onChange={(e) =>
                          setUrun({ ...urun, price: parseInt(e.target.value) })
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
                        value={urun.description}
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
                        value={urun.imgUrl}
                        onChange={(e) =>
                          setUrun({ ...urun, imgUrl: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="flex flex-row justify-end mb-5">
                    <button
                      onClick={urunEkle}
                      className="px-4 py-2 bg-secondary btn-three text-white rounded-lg shadow-md"
                    >
                      Gönder
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full mb-5">
              <div className="w-full mb-5 flex flex-row flex-wrap justify-start items-center">
                <button
                  className={`px-5 py-1 rounded-md hover:bg-dark shadow-lg mr-2 text-center text-white transition-all ease-in ${
                    filter === "" ? "bg-dark" : "bg-primary"
                  }`}
                  onClick={() => {
                    setFilter("");
                    setRefresh(refresh + 1);
                  }}
                >
                  Tüm Kategoriler
                </button>
                {categoryList.map((item) => (
                  <button
                    key={item.id}
                    className={`px-5 py-1 my-2 w-full sm:w-auto rounded-md hover:bg-dark shadow-lg mr-2 text-center text-white transition-all ease-in ${
                      item.id === filter ? "bg-dark" : "bg-primary"
                    }`}
                    onClick={() => {
                      setFilter(item.id);
                      setRefresh(refresh + 1);
                    }}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
              <h5 className="bg-dark w-10 text-center py-1 rounded-t-md ">
                <i className="fa-solid fa-table text-white"></i>
              </h5>
              <UrunTable
                refresh={refresh}
                setRefresh={setRefresh}
                filter={filter}
              />
            </div>
          </div>
        ) : null}

        {/* Adisyon Listeleme */}
        <div className="my-5 bg-primary w-full flex flex-row items-center justify-between px-5 py-3 rounded-t-xl ">
          <h2 className="text-white font-semibold">ADİSYON KONTROLLERİ</h2>
          <button
            onClick={() =>
              setDropdown({
                ...dropdown,
                adisyon: dropdown.adisyon ? false : true,
              })
            }
          >
            <div className="w-6 h-6 bg-white opacity-75 shadow-lg shadow-dark rounded-full flex justify-center items-center">
              {dropdown.adisyon ? (
                <i className="fa-solid fa-caret-up text-dark"></i>
              ) : (
                <i className="fa-solid fa-caret-down text-dark"></i>
              )}
            </div>
          </button>
        </div>
        {dropdown.adisyon && (
          <div className="w-full">
            <div className="mb-3 w-full flex flex-row flex-wrap sm:justify-between justify-center">
              <input type="date"  value={adisyonQueryDto.startDate} onChange={(e)=>setAdisyonQueryDto({...adisyonQueryDto,startDate:e.target.value})} className="mb-1 sm:mb-0 w-auto md:w-60 focus:outline-none border border-primary rounded-md px-4" />
              <input type="date" value={adisyonQueryDto.endDate} onChange={(e)=>setAdisyonQueryDto({...adisyonQueryDto,endDate:e.target.value})} className=" mb-1 sm:mb-0 w-auto md:w-60 focus:outline-none border border-primary rounded-md px-4" />
              <button onClick={()=>setAdisyonQueryDto({...adisyonQueryDto,active:true,refresh:adisyonQueryDto.refresh+1})} className="px-5 py-1 w-auto md:w-60 rounded-md bg-primary shadow-lg mr-2 text-center text-white">Görüntüle</button>
            </div>
            <h5 className="bg-dark w-10 text-center py-1 rounded-t-md ">
              <i className="fa-solid fa-table text-white"></i>
            </h5>
            
            <AdisyonTable adisyonQueryDto={adisyonQueryDto} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
