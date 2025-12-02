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
        <MenuButton className='bg-gray-300 text-black px-4 py-2 rounded'>
          {open ? '✕' : '☰'}
        </MenuButton>
    <MenuItems className='absolute right-0 mt-4 w-48 p-2 bg-gray-300 shadow-lg rounded-md z-50' >
      <MenuItem>
        {({close}) =>(
          <NavLink
            to="/admin/home"
            onClick={close}
            className={({ isActive }) =>
              isActive
                ? "block bg-gray-600 text-white text-xl p-2 rounded-md shadow-md mb-2"
                : "block bg-gray-200 text-black text-xl p-2 rounded-md shadow-md hover:bg-gray-400 transition-colors duration-300 mb-2"
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
                ? "block bg-gray-600 text-white text-xl p-2 rounded-md shadow-md mb-2"
                : "block bg-gray-200 text-black text-xl p-2 rounded-md shadow-md hover:bg-gray-400 transition-colors duration-300 mb-2"
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
                ? "block bg-gray-600 text-white text-xl p-2 rounded-md shadow-md mb-2"
                : "block bg-gray-200 text-black text-xl p-2 rounded-md shadow-md hover:bg-gray-400 transition-colors duration-300 mb-2"
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
                ? "block bg-gray-600 text-white text-md p-2 rounded-md shadow-md mb-2"
                : "block bg-gray-200 text-black text-md p-2 rounded-md shadow-md hover:bg-gray-400 transition-colors duration-300 mb-2"
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
            className="block bg-gray-200 text-black text-md p-2 rounded-md shadow-md hover:bg-gray-400 transition-colors duration-300 w-full text-left"
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
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
      <header className="z-10 relative">
        <div className="w-full flex justify-between items-center gap-4 p-4 bg-gray-600 shadow-xl">
          <h2 className="text-gray-100 text-4xl">
            {location.pathname == "/admin/home" && "Inicio"}
            {location.pathname == "/admin/orders" && "Ordenes"}
            {location.pathname == "/admin/products" && "Productos"}
            {location.pathname == "/admin/products/create" && "Crear Producto"}
          </h2>
          <div className="flex flex-row gap-2">

          <div className="block md:hidden w-fit h-fit">
            <DropdownMenu/>
          </div>
          </div>
         
        </div>
      </header>

      <main className="relative bg-gray-100 md:flex">
        <aside className="hidden md:block w-48 bg-gray-300 p-4">
          <ul className="flex flex-col gap-2">
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
                to="/admin/register"
                className={({ isActive }) =>
                  isActive
                    ? "block bg-gray-600 text-white text-md p-2 rounded-md shadow-md"
                    : "block bg-gray-200 text-black text-md p-2 rounded-md shadow-md hover:bg-gray-400 transition-colors duration-300"
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
      <footer className="bg-gray-600 p-4 text-white z-10 relative shadow-2xl">
        Footer content
      </footer>
    </div>
  );
}
