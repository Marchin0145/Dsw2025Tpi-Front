
import { Button } from "../../shared/components/Button";
function ProductCard({ product,onAddCart}) {
  return (
    <div className="bg-white/90 backdrop-blur-sm border-0 shadow-xl transition-all duration-300 overflow-hidden rounded-xl p-0">
      <div className="w-full h-48 bg-gray-200 rounded-t-xl mb-0">
        <img 
          src="https://cloudfront-us-east-1.images.arcpublishing.com/infobae/AGIRPQNJ6VDK7P53ARG2OFQNU4.jpg"
          alt={product.name}
          className="w-full h-full object-cover rounded-t-xl"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 text-gray-800">{product.name || 'Text'}</h3>
        <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl mb-4">
          <div>
            <p className="text-xs text-green-600 uppercase tracking-wide font-medium">Precio</p>
            <p className="text-2xl font-bold text-green-700">${product.currentUnitPrice || 0}</p>
          </div>
        </div>
        <Button onClick={onAddCart} style="w-full bg-teal-500 hover:bg-teal-600 text-white border-2 border-teal-500 hover:border-teal-600 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md">
          Agregar al carrito
        </Button>
      </div>
    </div>
  );
}

export default ProductCard;