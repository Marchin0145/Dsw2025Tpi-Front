import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "../../shared/components/Button";
import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import useAuth from "../../auth/hooks/useAuth";
export function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const { singOut } = useAuth();
  const logout = () => {
    singOut();
    navigate("/login");
  };
  // si se cambia de ruta en movil se oculta el sidebar

  const [isSideBarVisible, SetSideBarVisible] = useState(false);
  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
      <header className="z-10 relative">
        <div className="w-full flex justify-between items-center gap-4 p-4 bg-gray-600 shadow-xl">
          <h2 className="text-gray-100 text-4xl">
            {location.pathname == "/admin/home" && "Bienvenido"}
            {location.pathname == "/admin/orders" && "Ordenes"}
            {location.pathname == "/admin/products" && "Productos"}
            {location.pathname == "/admin/products/create" && "Crear Producto"}
          </h2>
          {}
          <Button
            style={"hidden md:block bg-gray-200 text-black w-30 h-10 text-xl "}
            onClick={logout}
          >
            Cerrar sesion
          </Button>
          <button
            className="block md:hidden w-10 h-10 text-2xl border-2 border-white bg-gray-600 rounded-lg text-white flex items-center justify-center"
            onClick={() => SetSideBarVisible(!isSideBarVisible)}
          >
            {isSideBarVisible ? "×" : "☰"}
          </button>
        </div>
      </header>

      <main className="relative bg-gray-100 md:flex">
        <aside
          className={`md:block md:relative fixed right-0 h-screen md:h-auto w-48 bg-gray-300 p-4 z-5 transition-transform duration-300 transform ${
            isSideBarVisible
              ? "translate-x-0 shadow-lg"
              : "translate-x-full md:translate-x-0"
          } md:shadow-none`}
        >
          <ul className="flex flex-col gap-2 mt-12">
            <li>
              <NavLink
                to="/admin/home"
                className={({ isActive }) =>
                  isActive
                    ? "block bg-gray-600 text-white text-xl p-2 rounded-md shadow-md"
                    : "block bg-gray-200 text-black text-xl p-2 rounded-md shadow-md hover:bg-gray-400 transition-colors duration-300"
                }
              >
                Principal
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/products"
                className={({ isActive }) =>
                  isActive
                    ? "block bg-gray-600 text-white text-xl p-2 rounded-md shadow-md"
                    : "block bg-gray-200 text-black text-xl p-2 rounded-md shadow-md hover:bg-gray-400 transition-colors duration-300"
                }
              >
                Productos
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/orders"
                className={({ isActive }) =>
                  isActive
                    ? "block bg-gray-600 text-white text-xl p-2 rounded-md shadow-md"
                    : "block bg-gray-200 text-black text-xl p-2 rounded-md shadow-md hover:bg-gray-400 transition-colors duration-300"
                }
              >
                Ordenes
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  isActive
                    ? "block bg-gray-600 text-white text-xl p-2 rounded-md shadow-md"
                    : "block bg-gray-200 text-black text-xl p-2 rounded-md shadow-md hover:bg-gray-400 transition-colors duration-300"
                }
                >
                  Registar empleado
              </NavLink>
            </li>
            <li>
              <button
                onClick={logout}
                className="block md:hidden bg-gray-200 text-black text-xl p-2 rounded-md shadow-md hover:bg-gray-400 transition-colors duration-300 w-full text-left"
              >
                Cerrar sesion
              </button>
            </li>
          </ul>
        </aside>
        <div className="p-6 w-full h-full">
          <Outlet></Outlet>
        </div>
      </main>
      <footer className="bg-gray-600 p-4 text-white z-10 relative shadow-2xl">
        Footer content
      </footer>
    </div>
  );
}
