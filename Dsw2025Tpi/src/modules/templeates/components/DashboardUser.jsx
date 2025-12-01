import { Outlet, useNavigate } from "react-router-dom";
import { BuildingStorefrontIcon, ShoppingCartIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Input } from "../../shared/components/Input";
import { use } from "react";

function DashboardUser() {
  const nav=useNavigate();
  return (
    <div className="min-h-screen w- bg-gray-50">
      {/* Header */}
      <header className="bg-gray-300 shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center h-14">
            {/* Left Side - Logo + Navigation */}
            <div className="flex items-center space-x-6">
              <BuildingStorefrontIcon className="h-8 w-8 text-gray-800" />
              <nav className="flex items-center space-x-3">
                <button onClick={()=>{nav('/')}} className="flex items-center space-x-2 text-gray-700 bg-white border-2 border-gray-400 hover:bg-gray-50 hover:border-gray-500 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md">
                  Productos
                </button>
                <button onClick={()=>{nav('/cart')}}className="flex items-center space-x-2 text-gray-700 bg-white border-2 border-gray-400 hover:bg-gray-50 hover:border-gray-500 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md">
                  <ShoppingCartIcon className="h-4 w-4" />
                  <span>Carrito de compras</span>
                </button>
              </nav>
            </div>

            {/* Center - Search Bar */}
            <div className="flex-1 flex justify-center">
              <div className="relative max-w-md w-full">
                <Input 
                  inputProps={{
                    placeholder: "Search",
                    className: "pl-4 pr-10 py-2 w-full text-sm border border-gray-200 rounded-md bg-gray-50 focus:bg-white focus:ring-1 focus:ring-blue-300 focus:border-blue-300 transition-colors"
                  }}
                />
                <MagnifyingGlassIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>

            {/* Right Side - Auth Buttons */}
            <div className="flex items-center space-x-3">
              <button onClick={() => {nav('/login')}} className="text-white bg-gray-600 hover:bg-gray-700 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md">
                Iniciar Sesión
              </button>
              <button className="text-gray-600 bg-white border-2 border-gray-600 hover:bg-gray-50 hover:border-gray-700 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md">
                Registrarse
              </button>
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