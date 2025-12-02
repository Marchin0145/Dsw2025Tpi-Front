import { useState } from 'react';
import ProductCard from './ProductCard';

function ProductCarousel({ products, onAddCart }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  if (products.length === 0) return null;

  const currentProduct = products[currentIndex];

  return (
    <div className="relative">
      <div className="w-full">
        <ProductCard product={currentProduct} onAddCart={()=>onAddCart(currentProduct)} />
      </div>
      
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white bg-teal-500 rounded-full p-2 shadow-lg hover:bg-teal-600"
      >
        ←
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 transform -translate-y-1/2  text-white bg-teal-500  rounded-full p-2 shadow-lg hover:bg-teal-600"
      >
        →
      </button>
      
      <div className="flex justify-center mt-4 space-x-2">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? 'bg-teal-500' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
} export default ProductCarousel;
