import Card from "../../shared/components/Card";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  EyeIcon,
  ShoppingBagIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  ClockIcon,
  CheckCircleIcon,
  TruckIcon,
  XCircleIcon,
} from "@heroicons/react/20/solid";
import { Button } from "../../shared/components/Button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  orderByUserName,
} from "../../orders/services/ordersServices";
import { parsearFechaAR } from "../../orders/helpers/ordersHelper";

function OrdersPage() {
  const userName= localStorage.getItem('user')|null;
  const navigate = useNavigate();
  const [formData, setFormData] = useState([]);
  const [page, setPage] = useState(1);
  const [stateOrders, setStateOrders] = useState("all");

  useEffect(() => {
    getOrders();
  }, [page, stateOrders]);

  const getOrders = async () => {
    try {
      const response = await orderByUserName(
        stateOrders == "all" ? null : stateOrders,
        page,
        10,
        userName == "" ? null : userName
      );
      setFormData(response);
    } catch (error) {}
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Delivered": return <CheckCircleIcon className="h-5 w-5 text-green-600" />;
      case "Shipped": return <TruckIcon className="h-5 w-5 text-blue-600" />;
      case "Processing": return <ClockIcon className="h-5 w-5 text-yellow-600" />;
      case "Cancelled": return <XCircleIcon className="h-5 w-5 text-red-600" />;
      default: return <ClockIcon className="h-5 w-5 text-orange-600" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "Pending": return "Pendiente";
      case "Processing": return "Procesando";
      case "Shipped": return "Enviado";
      case "Delivered": return "Entregado";
      case "Cancelled": return "Cancelado";
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-teal-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center gap-3">
            <ShoppingBagIcon className="h-10 w-10 text-green-600" />
            Mis Órdenes
          </h1>
          <p className="text-gray-600">Gestiona y revisa todas tus compras</p>
        </div>

        {/* Filters */}
        <Card className="mb-6 p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-xl">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <label className="text-sm font-medium text-gray-700">Filtrar por estado:</label>
            <select
              value={stateOrders}
              onChange={(e) => setStateOrders(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white shadow-sm"
            >
              <option value="all">Todos los estados</option>
              <option value="Pending">Pendientes</option>
              <option value="Processing">Procesando</option>
              <option value="Shipped">Enviados</option>
              <option value="Delivered">Entregados</option>
              <option value="Cancelled">Cancelados</option>
            </select>
          </div>
        </Card>

        {/* Orders Grid */}
        {formData.length ? (
          <div className="grid gap-6 mb-8">
            {formData.map((order) => (
              <Card key={order.id} className="p-0 bg-white/90 backdrop-blur-sm border-0 shadow-xl transition-all duration-300 overflow-hidden rounded-xl">
                <div className="bg-teal-500 p-4 text-white rounded-xl">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="bg-white/20 p-2 rounded-xl">
                        <ShoppingBagIcon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">
                          Orden #{order.id.slice(0, 8)}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          {getStatusIcon(order.status)}
                          <span className="text-sm font-medium">
                            {getStatusText(order.status)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button
                      onClick={() => navigate('/orders/view', { state: { orderId: order.id } })}
                      style="bg-white hover:bg-gray-50 text-black border border-gray-300 px-6 py-2 rounded-xl transition-all duration-200 font-medium"
                    >
                      Ver Detalles
                    </Button>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <CalendarIcon className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Fecha</p>
                        <p className="font-semibold text-gray-800">{parsearFechaAR(order.date)}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <ShoppingBagIcon className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Productos</p>
                        <p className="font-semibold text-gray-800">
                          {order.orderItems ? `${order.orderItems.length} artículo${order.orderItems.length !== 1 ? 's' : ''}` : 'Sin productos'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                      <CurrencyDollarIcon className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="text-xs text-green-600 uppercase tracking-wide font-medium">Total</p>
                        <p className="text-2xl font-bold text-green-700">${order.totalAmount}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-xl">
            <ShoppingBagIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-600 mb-2">No tienes órdenes aún</h3>
            <p className="text-gray-500">¡Comienza a comprar para ver tus órdenes aquí!</p>
          </Card>
        )}

        {/* Pagination */}
        <div className="flex justify-center items-center gap-4">
          <Button
            onClick={() => setPage(page === 1 ? 1 : page - 1)}
            disabled={page === 1}
            className="flex items-center gap-2 px-6 py-3 bg-white shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 rounded-xl"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Anterior
          </Button>
          
          <div className="bg-teal-500 text-white px-6 py-3 rounded-xl font-bold text-lg shadow-lg">
            {page}
          </div>
          
          <Button
            onClick={() => setPage(page + 1)}
            className="flex items-center gap-2 px-6 py-3 bg-white shadow-lg hover:shadow-xl transition-all duration-200 rounded-xl"
          >
            Siguiente
            <ArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default OrdersPage;