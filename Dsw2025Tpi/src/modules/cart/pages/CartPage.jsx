import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from "../../shared/components/Card";
import { Button } from '../../shared/components/Button';
import { CreateOrderServices } from '../services/CartServices';
import { Input } from '../../shared/components/Input';
import { useForm } from 'react-hook-form';
import {useAuth}from "../../auth/context/AuthProvider";
function CartPage(){
  
    const {isAuthenticated} = useAuth();
    const [cartItems, setCartItems] = useState([]);
    const [showSuccess, setShowSuccess] = useState(false);
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            shippingAddress: "",
            billingAddress: "",
            notes: ""
        }
    });

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('Cart') || '[]');
        setCartItems(cart);
    }, []);

    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity <= 0) {
            removeFromCart(productId);
            return;
        }
        const updatedCart = cartItems.map(item => 
            item.id === productId ? { ...item, quantity: newQuantity } : item
        );
        setCartItems(updatedCart);
        localStorage.setItem('Cart', JSON.stringify(updatedCart));
    };

    const removeFromCart = (productId) => {
        const updatedCart = cartItems.filter(item => item.id !== productId);
        setCartItems(updatedCart);
        localStorage.setItem('Cart', JSON.stringify(updatedCart));
    };

    const onSubmit = async (data) => {
       
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }
        
        try {
            const orderData = {
                ...data,
                orderItems: cartItems.map(p => ({
                    productId: p.id,
                    name: p.name,
                    quantity: p.quantity
                }))
            };
            await CreateOrderServices(orderData);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
            setCartItems([]);
            localStorage.removeItem('Cart');
        } catch (error) {
            console.error('Error al crear la orden:', error);
        }
    };

    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return(
        <div className="max-w-6xl mx-auto p-4">
            {showSuccess && (
                <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                    ¡Orden creada exitosamente!
                </div>
            )}
            <h1 className="text-2xl font-bold mb-6">Carrito de Compras</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Columna de productos */}
                <div>
                    <h2 className="text-xl font-bold mb-4">Productos</h2>
                    <div className="grid gap-4">
                        {cartItems.map(item => (
                            <Card key={item.id} className="p-4">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="font-semibold">{item.name}</h3>
                                        <p className="text-gray-600">${item.price}</p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-2">
                                            <Button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                style="px-3 py-1.5 bg-teal-500 hover:bg-teal-600 text-white rounded-xl font-semibold transition-all duration-200 shadow-sm hover:shadow-md"
                                            >
                                                -
                                            </Button>
                                            <span className="px-3 py-1.5 border-2 border-teal-300 rounded-xl bg-white text-center font-semibold">{item.quantity}</span>
                                            <Button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                style="px-3 py-1.5 bg-teal-500 hover:bg-teal-600 text-white rounded-xl font-semibold transition-all duration-200 shadow-sm hover:shadow-md"
                                            >
                                                +
                                            </Button>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                                            <Button
                                                onClick={() => removeFromCart(item.id)}
                                                style="mt-1 px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-sm rounded-xl font-semibold transition-all duration-200 shadow-sm hover:shadow-md"
                                            >
                                                Eliminar
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                        {cartItems.length > 0 && (
                            <Card className="p-4 bg-gray-50">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-bold">Total</h3>
                                    <p className="text-xl font-bold">${total.toFixed(2)}</p>
                                </div>
                            </Card>
                        )}
                    </div>
                </div>

                {/* Columna de datos de orden */}
                <div>
                    <Card className="p-6">
                        <h2 className="text-xl font-bold mb-4">Datos de la Orden</h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Dirección de Envío</label>
                                <Input
                                    inputProps={{
                                        ...register('shippingAddress', { required: 'La dirección de envío es requerida' }),
                                        className: "w-full p-2 border rounded"
                                    }}
                                />
                                {errors.shippingAddress && <p className="text-red-500 text-sm mt-1">{errors.shippingAddress.message}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Dirección de Facturación</label>
                                <Input
                                    inputProps={{
                                        ...register('billingAddress', { required: 'La dirección de facturación es requerida' }),
                                        className: "w-full p-2 border rounded"
                                    }}
                                />
                                {errors.billingAddress && <p className="text-red-500 text-sm mt-1">{errors.billingAddress.message}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Notas</label>
                                <textarea
                                    {...register('notes')}
                                    className="w-full p-2 border rounded h-20"
                                />
                            </div>
                            <Button
                                type="submit"
                                style={`w-full px-6 py-3 text-white font-semibold rounded-xl transition-all duration-200 shadow-sm hover:shadow-md ${
                                    cartItems.length === 0 
                                        ? 'bg-gray-400 cursor-not-allowed' 
                                        : 'bg-teal-500 hover:bg-teal-600 border-2 border-teal-500 hover:border-teal-600'
                                }`}
                                disabled={cartItems.length === 0}
                            >
                                Crear Orden
                            </Button>
                        </form>
                    </Card>
                </div>
            </div>
        </div>
    )
} export default CartPage;