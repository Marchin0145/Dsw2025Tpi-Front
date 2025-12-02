
import { Button } from "../../shared/components/Button";
function ProductCard({ product,onAddCart}) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="w-full h-48 bg-gray-200 rounded-lg mb-4">
        <img 
          src="https://cloudfront-us-east-1.images.arcpublishing.com/infobae/AGIRPQNJ6VDK7P53ARG2OFQNU4.jpg"
          alt={product.name}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div>
        <h3 className="text-lg font-medium mb-2">{product.name || 'Text'}</h3>
         <p className="text-xl font-bold mb-4">${product.currentUnitPrice || 0}</p>
    
      </div>
      <div className="flex justify-between items-center">
        <Button onClick={onAddCart} style="bg-blue-500 hover:bg-blue-600 text-black px-4 py-2 rounded-lg">
          Agregar al carrito
        </Button>
      </div>
    </div>
  );
}

export default ProductCard;