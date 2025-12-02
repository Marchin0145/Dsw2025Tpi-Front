import Card from "../../shared/components/Card";
import { MagnifyingGlassIcon,PlusIcon,ArrowLeftIcon,ArrowRightIcon,PencilIcon  } from "@heroicons/react/20/solid";
import { Button } from "../../shared/components/Button";
import { useState, useEffect } from "react";
import { ListProductsServices, ChangeProductState } from "../services/ProductServices";
import { useNavigate } from "react-router-dom";
export function ListProductsPage() {
  const [formData, setFormData] = useState([])
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [stateProduct,setStateProduct]=useState(null);
  const limit = 20;
  const nav=useNavigate();
  useEffect(() => {
    getProducts()
  }, [searchTerm,page,stateProduct])

  const handleChange= (e)=>{
    
     if(e.target.value=='all'){
       setStateProduct(null);
     }
     if(e.target.value=='enabled'){
      setStateProduct(true);
     }
     if(e.target.value=='disabled'){
      setStateProduct(false);
     }
  }
  
  const getProducts = async () => {
    const products = await ListProductsServices(searchTerm,page,limit,stateProduct)
    setFormData(products)
  }

  const handleToggleProductState = async (productId) => {
    try {
      await ChangeProductState(productId)
      await getProducts()
    } catch (error) {
      console.error('Error Cambiando el usuario', error)
    }
  }
  return (
    <>
      <div className="flex flex-col gap-4 h-full">
        <Card className="flex flex-col gap-3 w-full">
          <div className="flex  justify-between">
            <p className="text-xl">Productos</p>
            <Button onClick={()=>{nav('/admin/products/create')}} style="p-1 rounded-xl sm:hidden ">
              <PlusIcon className="h-5 w-5" />
            </Button>
            <Button style="hidden sm:block" onClick={()=>{nav("/admin/products/create")}}>Crear Producto</Button>
          </div>
          <div className="flex flex-col sm:flex-row  gap-2">
            <div className="flex items-center gap-2">
              <input type="text" onChange={(e)=>setSearchTerm(e.target.value)} placeholder="Buscar" className="flex-1" />
              <Button onClick={null} style="p-1 rounded-xl">
                <MagnifyingGlassIcon className="h-5 w-5" />
              </Button>
            </div>

            <select onChange={handleChange}>
              <option value="all">Todos</option>
              <option value="enabled">Habilitados</option>
              <option value="disabled">Inhabilitados</option>
            </select>
          </div>
        </Card>
        {formData.length ? (
          <div className="flex-1 flex flex-col gap-3 overflow-y-auto">
            {formData.map((product) => (
              <Card key={product.id} className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <span className={`px-2 py-1 rounded-xl text-sm ${
                    product.isActive ? 'bg-green-100 text-black' : 'bg-red-100 text-red-800'
                  }`}>
                    {product.isActive ? 'Activo' : 'Inactivo'}
                  </span>
                </div>
                <p className="text-gray-600 mb-2">{product.description}</p>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">SKU: {product.sku}</p>
                    <p className="text-sm text-gray-500">Stock: {product.stockQuantity}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="text-xl font-bold text-gray-600">${product.currentUnitPrice}</p>
                   
                    <div className="flex flex-col gap-2">
                      <Button 
                      onClick={() => nav(`/admin/products/edit/${product.id}`)}
                      style="px-3 py-1 text-sm bg-blue-500 hover:bg-blue-600 text-white"
                    >
                      <PencilIcon className="h-4 w-4 sm:hidden" />
                      <span className="hidden sm:inline text-black">Modificar</span>
                    </Button>
                    <Button 
                      onClick={() => handleToggleProductState(product.id)}
                      style={`px-3 py-1 text-sm ${
                        product.isActive 
                          ? 'bg-red-400 hover:bg-red-600 text-white' 
                          : 'bg-green-400 hover:bg-green-600 text-white'
                      }`}
                    >
                      {product.isActive ? 'Deshabilitar' : 'Habilitar'}
                    </Button>
                    </div>
                    
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-2xl text-gray-500">No hay productos</p>
          </div>
        )}
        <div className="flex justify-center gap-2">
          <Button onClick={()=>{setPage(page==1?1:page-1)}}><ArrowLeftIcon className="h-4 w-4"/></Button>
          <p className="bg-gray-300 text-xl px-2 py-1 rounded-xl shadow-xl">{page}</p>
          <Button onClick={()=>{formData.length==limit?setPage(page+1):null}}><ArrowRightIcon  className="h-4 w-4"/></Button>
        </div>
      </div>
    </>
  );
}
