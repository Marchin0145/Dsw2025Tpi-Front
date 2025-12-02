import { Outlet, useNavigate, useLocation, NavLink } from "react-router-dom";
import { BuildingStorefrontIcon } from "@heroicons/react/20/solid";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react';
import {useAuth} from "../../auth/hooks/useAuth";
function DashboardUser() {
  const {isAuthenticated, singOut} = useAuth();
  const nav=useNavigate();
  const location = useLocation();
  const isCartActive = location.pathname === '/cart';
  const isProductsActive = location.pathname === '/';
  
  const handleSingOut=()=>{
    singOut();
    nav('/');
  }

  const DropdownMenu=()=>{
  return( <Menu>
    {({ open }) => (
      <>
        <MenuButton className='bg-gray-300 text-black px-4 py-2 rounded'>
          {open ? '✕' : '☰'}
        </MenuButton>
    <MenuItems className='absolute right-0 mt-4 w-48 p-2 bg-white shadow-lg rounded-md z-50 space-y-2' >
      <MenuItem>
        {({close}) =>(
          <NavLink
            to="/"
            onClick={close}
            className={({ isActive }) =>
              isActive
                ? "flex items-center space-x-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md text-white bg-gray-600 border-2 border-gray-600 hover:bg-gray-700 hover:border-gray-700"
                : "flex items-center space-x-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md text-gray-700 bg-white border-2 border-gray-400 hover:bg-gray-50 hover:border-gray-500"
            }
          >
            Productos
          </NavLink>
        )}
      </MenuItem>
      <MenuItem>
        {({close}) =>(
          <NavLink
            to="/cart"
            onClick={close}
            className={({ isActive }) =>
              isActive
                ? "flex items-center space-x-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md text-white bg-gray-600 border-2 border-gray-600 hover:bg-gray-700 hover:border-gray-700"
                : "flex items-center space-x-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md text-gray-700 bg-white border-2 border-gray-400 hover:bg-gray-50 hover:border-gray-500"
            }
          >
            <span>Carrito</span>
          </NavLink>
        )}
      </MenuItem>
      {isAuthenticated ? (
        <>
          <MenuItem>
            {({close}) =>(
              <NavLink
                to="/orders"
                onClick={close}
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center space-x-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md text-white bg-gray-600 border-2 border-gray-600 hover:bg-gray-700 hover:border-gray-700"
                    : "flex items-center space-x-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md text-gray-700 bg-white border-2 border-gray-400 hover:bg-gray-50 hover:border-gray-500"
                }
              >
                <span>Mis Ordenes</span>
              </NavLink>
            )}
          </MenuItem>
          <MenuItem>
            {({close}) =>(
              <button
                onClick={() => {close(); handleSingOut();}}
                className="w-full flex items-center space-x-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md text-gray-700 bg-white border-2 border-gray-400 hover:bg-gray-50 hover:border-gray-500"
              >
                Salir
              </button>
            )}
          </MenuItem>
        </>
      ) : (
        <>
          <MenuItem>
            {({close}) =>(
              <button
                onClick={() => {close(); nav('/login');}}
                className="w-full flex items-center space-x-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md text-gray-700 bg-white border-2 border-gray-400 hover:bg-gray-50 hover:border-gray-500"
              >
                Iniciar Sesión
              </button>
            )}
          </MenuItem>
          <MenuItem>
            {({close}) =>(
              <button
                onClick={() => {close(); nav('/signup');}}
                className="w-full flex items-center space-x-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md text-gray-700 bg-white border-2 border-gray-400 hover:bg-gray-50 hover:border-gray-500"
              >
                Registrarse
              </button>
            )}
          </MenuItem>
        </>
      )}
 
    </MenuItems>
      </>
    )}
  </Menu>)
}
  return (
    <div className="min-h-screen w-full bg-gray-50">
      {/* Header */}
      <header className="bg-gray-300 shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-14">
            {/* Left Side - Logo + Navigation */}
            <div className="flex items-center space-x-6">
              <BuildingStorefrontIcon className="h-8 w-8 text-gray-800" />
              <nav className="flex items-center space-x-3">
                <button onClick={()=>{nav('/')}} className={`hidden md:flex items-center space-x-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md ${
                  isProductsActive 
                    ? 'text-white bg-gray-600 border-2 border-gray-600 hover:bg-gray-700 hover:border-gray-700' 
                    : 'text-gray-700 bg-white border-2 border-gray-400 hover:bg-gray-50 hover:border-gray-500'
                }`}>
                  Productos
                </button>
                <button onClick={()=>{nav('/cart')}} className={`hidden md:flex items-center space-x-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md ${
                  isCartActive 
                    ? 'text-white bg-gray-600 border-2 border-gray-600 hover:bg-gray-700 hover:border-gray-700' 
                    : 'text-gray-700 bg-white border-2 border-gray-400 hover:bg-gray-50 hover:border-gray-500'
                }`}>
                  <span>Carrito de compras</span>
                </button>
              </nav>
            </div>

            {/* Right Side - Auth Buttons */}
              <div className="md:hidden">
                  <DropdownMenu />
              </div>
            
            <div className="hidden md:flex items-center space-x-3">
              {isAuthenticated ? (
                <>
                  <button onClick={() => {nav('/orders')}} className="text-gray-700 bg-white border-2 border-gray-400 hover:bg-gray-50 hover:border-gray-500 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md">
                    Mis Ordenes
                  </button>
                  <button onClick={handleSingOut} className="text-gray-700 bg-white border-2 border-gray-400 hover:bg-gray-50 hover:border-gray-500 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md">
                    Salir
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => {nav('/login')}} className="text-gray-700 bg-white border-2 border-gray-400 hover:bg-gray-50 hover:border-gray-500 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md">
                    Iniciar Sesión
                  </button>
                  <button onClick={() => {nav('/signup')}} className="text-gray-700 bg-white border-2 border-gray-400 hover:bg-gray-50 hover:border-gray-500 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md">
                    Registrarse
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}

export { DashboardUser };
export default DashboardUser;