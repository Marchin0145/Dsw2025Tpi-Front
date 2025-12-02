import { useState, useEffect } from "react";
import { ListProductsServices,ListProductsByStock } from "../../products/services/ProductServices";
import ProductCard from "../components/ProductCard";
import ProductCarousel from "../components/ProductCarousel";
import { useNavigate } from "react-router-dom";
import {Input} from "../../shared/components/Input";
import {MagnifyingGlassIcon, ShoppingCartIcon} from "@heroicons/react/20/solid";
function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [productsInCart, setProductsInCart] = useState(0);
  const limit = 8;

  const navigate = useNavigate();
  useEffect(() => {
    fetchProducts();
    fetchFeaturedProducts();
    countProductsInCart();
  }, [currentPage, searchTerm]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await ListProductsServices(
        searchTerm ? searchTerm : null,
        currentPage,
        limit,
        true
      );
      console.log(response);
      setProducts(response);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    setLoading(false);
  };

  const fetchFeaturedProducts = async () => {
    try {
      const response = await ListProductsByStock(
        1,
        5,
        true,
      );
      setFeaturedProducts(response);
    } catch (error) {
      console.error("Error fetching featured products:", error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  
  const countProductsInCart = () => {
    const countProducts = JSON.parse(localStorage.getItem('Cart')) || [];
    setProductsInCart(countProducts.length)
  };
  const handleAddCart = (p) => {
    const cart = localStorage.getItem("Cart");
    if (cart) {
      const cartJson = JSON.parse(cart);
      const existingItem = cartJson.find((item) => item.id === p.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        cartJson.push({ id: p.id, name: p.name, price: p.currentUnitPrice, quantity: 1 });
      }
      localStorage.setItem("Cart", JSON.stringify(cartJson));
    } else {
      localStorage.setItem(
        "Cart",
        JSON.stringify([
          { id: p.id, name: p.name, price: p.currentUnitPrice, quantity: 1 },
        ])
      );
    }
    countProductsInCart();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      
            {/* Center - Search Bar and Cart */}
            <div className="flex justify-center items-center gap-4 mb-6">
              <div className="relative max-w-md w-full">
                <Input 
                  inputProps={{
                    placeholder: "Buscar productos...",
                    value: searchTerm,
                    onChange: handleSearch,
                    className: "pl-4 pr-10 py-3 w-full text-md border-2 border-gray-300 rounded-lg bg-white shadow-md focus:bg-white focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 hover:shadow-lg"
                  }}
                />
                <MagnifyingGlassIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
              </div>
              <button 
                onClick={() => navigate('/cart')}
                className="flex items-center gap-2 px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <ShoppingCartIcon className="w-5 h-5" />
                <span>({productsInCart})</span>
              </button>
            </div>

      {/* Carrusel de productos con más stock */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Imperdibles</h2>
        <ProductCarousel products={featuredProducts} onAddCart={handleAddCart} />
      </div>

      {/* Grid de todos los productos */}
      {loading ? (
        <div className="text-center py-8">Cargando productos...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                onAddCart={() => handleAddCart(product)}
                product={product}
              />
            ))}
          </div>

          {/* Paginación */}
          <div className="flex justify-center mt-8 space-x-2">
            {currentPage > 1 && (
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
              >
                Anterior
              </button>
            )}

            <span className="px-4 py-2 bg-gray-600 text-white rounded-lg">
              {currentPage}
            </span>
            {products.length==limit?(
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
              >
                Siguiente
              </button>
            ):null}
           
          </div>
        </>
      )}
    </div>
  );
}
export default ProductsPage;
