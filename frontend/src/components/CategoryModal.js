import React from "react";

const CategoryModal = ({modalShow,list}) => {


  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-2xl relative flex flex-col items-center w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start bg-dark  justify-between p-5 w-full border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-xl text-white font-semibold">
                Kategori Listesi
              </h3>
            </div>
            <div className="p-5 flex flex-col w-96">
                {
                    list.map((item)=>(
                        <span className="py-1 my-2 text-lg w-auto font-semibold bg-secondary text-dark rounded-md pl-4 shadow-md" key={item.id}>{item.name}</span>       
                    ))
                }
            </div>
            {/*footer*/}
            <div className="flex items-center w-full justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={()=>modalShow(false)}
              >
                KAPAT
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default CategoryModal;
