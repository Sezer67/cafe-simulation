import { Link } from "react-router-dom";
import homecafe from "./assets/icons/Cafe.png";
function App() {
  return (
    <div className="w-full h-screen flex flex-col justify-around items-center bg-[url('https://wallpaper.dog/large/976062.jpg')]">
      <div className="w-1/2 text-center py-4 bg-dark text-white rounded-md animate-pulse">
        <h4 className="font-bold italic">
          KAFE SİMÜLASYONUNA HOŞGELDİNİZ
        </h4>
      </div>
      <div className="w-full flex flex-row justify-center md:justify-around items-center">
        
        <div className=" rounded-md h-96 flex flex-col justify-center items-center">
          <Link
            to="/personel/home"
            className="bg-primary px-4 h-5/6 flex items-center justify-center"
          >
            <div className="btn sm:w-72 w-48 btn-three">
              <span>PERSONEL</span>
            </div>
          </Link>


          <Link
            to="/admin/home"
            className="bg-dark px-4 h-5/6 flex items-center justify-center"
          >
            <div className="btn sm:w-72 w-48 btn-two">
              <span>ADMIN</span>
            </div>
          </Link>
          <Link
            to="/mutfak/home"
            className="bg-secondary px-4 h-5/6 flex items-center justify-center"
          >
            <div className="btn sm:w-72 w-48 btn-three">
              <span>MUTFAK</span>
            </div>
          </Link>
        </div>
        <div>
          <img src={homecafe} alt="Resim" className="hidden md:inline w-96 h-96" />
        </div>
      </div>
    </div>
  );
}

export default App;
