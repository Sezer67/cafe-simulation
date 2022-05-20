import React from "react";
import home from "../assets/icons/House.png";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
//dışarıdan gelecekler
//hangi kullanıcı ? ve linki
const Header = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  return (
    <>
      {location.pathname == "/home" ? null : (
        <nav className="relative flex flex-wrap items-center justify-between px-4 py-1 bg-dark mb-6">
          <div className=" relative container px-4 mx-auto flex flex-wrap items-center justify-between ">
            <div className="absolute -bottom-11 bg-slate-200 border-0 px-11 py-2 rounded-b-lg transition-all delay-300">
              <span className="font-bold uppercase">{path}</span>
            </div>
            <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
              <Link
                className="text-md font-bold leading-relaxed flex mr-4 py-2 whitespace-nowrap text-light items-center"
                to={'/'}
              >
                <img src={home} alt="home" className="inline w-10 h-10 mr-1" />
                <p className="inline p-0 m-0">Home Cafe</p>
              </Link>
              <button
                className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
                type="button"
                onClick={() => setNavbarOpen(!navbarOpen)}
              >
                <i className="fas fa-bars"></i>
              </button>
            </div>
            <div
              className={
                "lg:flex flex-grow items-center" +
                (navbarOpen ? " flex" : " hidden")
              }
              id="example-navbar-danger"
            >
              <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
                <li className="nav-item">
                  <NavLink
                    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                    to="/mutfak/home"
                  >
                    <i className="fa-solid fa-kitchen-set opacity-75"></i>
                    <span className="ml-2">MUTFAK</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                    to="/personel/home"
                  >
                    <i className="fa-solid fa-user-pen text-white opacity-75"></i>
                    <span className="ml-2">PERSONEL</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                    to="/admin/home"
                  >
                    <i className="fa-solid fa-user-secret text-white opacity-75"></i>
                    <span className="ml-2">ADMIN</span>
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      )}
    </>
  );
};

export default Header;
