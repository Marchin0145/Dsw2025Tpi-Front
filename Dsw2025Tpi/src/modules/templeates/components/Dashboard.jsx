import { useNavigate } from "react-router-dom";
import { Button } from "../../shared/components/Button";
import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {useAuth} from "../../auth/hooks/useAuth";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react';
export function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const { singOut } = useAuth();
  const logout = () => {
    singOut();
    navigate("/login");
  };
const DropdownMenu=()=>{
  return( <Menu>
    {({ open }) => (
      <>
        <MenuButton className='bg-white/20 text-white px-4 py-2 rounded-xl border border-white/30 hover:bg-white/30 transition-all duration-200'>
          {open ? '✕' : '☰'}
        </MenuButton>
    <MenuItems className='absolute right-0 mt-4 w-48 p-2 bg-white/90 backdrop-blur-sm shadow-xl rounded-xl z-50' >
      <MenuItem>
        {({close}) =>(
          <NavLink
            to="/admin/home"
            onClick={close}
            className={({ isActive }) =>
              isActive
                ? "block bg-teal-500 text-white text-xl p-3 rounded-xl shadow-md mb-2 font-semibold"
                : "block bg-white text-teal-600 text-xl p-3 rounded-xl shadow-md hover:bg-teal-50 hover:text-teal-700 transition-all duration-200 mb-2 font-medium border border-teal-200"
            }
          >
            Principal
          </NavLink>
        )}
      </MenuItem>
      <MenuItem>
        {({close}) =>(
          <NavLink
            to="/admin/products"
            onClick={close}
            className={({ isActive }) =>
              isActive
                ? "block bg-teal-500 text-white text-xl p-3 rounded-xl shadow-md mb-2 font-semibold"
                : "block bg-white text-teal-600 text-xl p-3 rounded-xl shadow-md hover:bg-teal-50 hover:text-teal-700 transition-all duration-200 mb-2 font-medium border border-teal-200"
            }
          >
            Productos
          </NavLink>
        )}
      </MenuItem>
      <MenuItem>
        {({close}) =>(
          <NavLink
            to="/admin/orders"
            onClick={close}
            className={({ isActive }) =>
              isActive
                ? "block bg-teal-500 text-white text-xl p-3 rounded-xl shadow-md mb-2 font-semibold"
                : "block bg-white text-teal-600 text-xl p-3 rounded-xl shadow-md hover:bg-teal-50 hover:text-teal-700 transition-all duration-200 mb-2 font-medium border border-teal-200"
            }
          >
            Ordenes
          </NavLink>
        )}
      </MenuItem>
      <MenuItem>
        {({close}) =>(
          <NavLink
            to="/admin/register"
            onClick={close}
            className={({ isActive }) =>
              isActive
                ? "block bg-teal-500 text-white text-md p-3 rounded-xl shadow-md mb-2 font-semibold"
                : "block bg-white text-teal-600 text-md p-3 rounded-xl shadow-md hover:bg-teal-50 hover:text-teal-700 transition-all duration-200 mb-2 font-medium border border-teal-200"
            }
          >
            Registrar empleado
          </NavLink>
        )}
      </MenuItem>
      <MenuItem>
        {({close}) =>(
          <button
            onClick={() => {
              close();
              logout();
            }}
            className="block bg-white text-teal-600 text-md p-3 rounded-xl shadow-md hover:bg-teal-50 hover:text-teal-700 transition-all duration-200 w-full text-left font-medium border border-teal-200"
          >
            Cerrar Sesión
          </button>
        )}
      </MenuItem>
    </MenuItems>
      </>
    )}
  </Menu>)
}

  
  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto] bg-teal-50">
      <header className="z-10 relative">
        <div className="w-full flex justify-between items-center gap-4 p-4 bg-teal-500 shadow-xl">
          <h2 className="text-white text-4xl font-bold">
            {location.pathname == "/admin/home" && "Inicio"}
            {location.pathname == "/admin/orders" && "Ordenes"}
            {location.pathname == "/admin/products" && "Productos"}
            {location.pathname == "/admin/products/create" && "Crear Producto"}
          </h2>
          <div className="flex flex-row gap-2">
            <button 
              onClick={logout}
              className="hidden md:block bg-white hover:bg-teal-50 text-teal-500 border-2 border-white hover:border-teal-600 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Cerrar Sesión
            </button>
            <div className="block md:hidden w-fit h-fit">
              <DropdownMenu/>
            </div>
          </div>
         
        </div>
      </header>

      <main className="relative bg-teal-50 md:flex">
        <aside className="hidden md:block w-48 bg-white/80 backdrop-blur-sm p-4 shadow-lg">
          <ul className="flex flex-col gap-2">
            <li>
              <NavLink
                to="/admin/home"
                className={({ isActive }) =>
                  isActive
                    ? "block bg-teal-500 text-white text-xl p-3 rounded-xl shadow-md font-semibold"
                    : "block bg-white text-teal-600 text-xl p-3 rounded-xl shadow-md hover:bg-teal-50 hover:text-teal-700 transition-all duration-200 font-medium border border-teal-200"
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
                    ? "block bg-teal-500 text-white text-xl p-3 rounded-xl shadow-md font-semibold"
                    : "block bg-white text-teal-600 text-xl p-3 rounded-xl shadow-md hover:bg-teal-50 hover:text-teal-700 transition-all duration-200 font-medium border border-teal-200"
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
                    ? "block bg-teal-500 text-white text-xl p-3 rounded-xl shadow-md font-semibold"
                    : "block bg-white text-teal-600 text-xl p-3 rounded-xl shadow-md hover:bg-teal-50 hover:text-teal-700 transition-all duration-200 font-medium border border-teal-200"
                }
              >
                Ordenes
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/register"
                className={({ isActive }) =>
                  isActive
                    ? "block bg-teal-500 text-white text-md p-3 rounded-xl shadow-md font-semibold"
                    : "block bg-white text-teal-600 text-md p-3 rounded-xl shadow-md hover:bg-teal-50 hover:text-teal-700 transition-all duration-200 font-medium border border-teal-200"
                }
                >
                  Registar empleado
              </NavLink>
            </li>


          </ul>
        </aside>
        <div className="p-6 w-full h-full">
          <Outlet></Outlet>
        </div>
      </main>
      <footer className="bg-teal-500 p-4 text-white z-10 relative shadow-2xl">
        <div className="text-center font-medium">
          Panel de Administración
        </div>
      </footer>
    </div>
  );
}
