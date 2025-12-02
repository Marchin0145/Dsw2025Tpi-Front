import Card from "../../shared/components/Card";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  EyeIcon,
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

  return (
    <>
      <div className="flex flex-col gap-4 h-full">
        <Card className="flex flex-col gap-3 w-full">
          <div className="flex justify-between">
            <p className="text-xl">Mis Órdenes</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
           
            <select
              onChange={(e) => {
                setStateOrders(e.target.value);
              }}
            >
              <option value="all">Todos</option>
              <option value="Pending">Pendientes</option>
              <option value="Processing">Procesados</option>
              <option value="Shipped">Enviados</option>
              <option value="Delivered">Entregados</option>
              <option value="Cancelled">Cancelados</option>
            </select>
          </div>
        </Card>
        {formData.length ? (
          <div className="flex-1 flex flex-col gap-3 overflow-y-auto">
            {formData.map((order) => (
              <Card key={order.id} className="p-4">
                <div className="flex flex-column justify-between items-start mb-3">

                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-lg">
                      Orden #{order.id.slice(0, 8)}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-800"
                          : order.status === "Shipped"
                          ? "bg-blue-100 text-blue-800"
                          : order.status === "Processing"
                          ? "bg-yellow-100 text-yellow-800"
                          : order.status === "Cancelled"
                          ? "bg-red-100 text-red-800"
                          : order.status === "Pending"
                          ? "bg-orange-100 text-orange-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {order.status === "Pending" ? "Pendiente" : order.status}
                    </span>
                  </div>
                     <Button
                        onClick={() => navigate('/orders/view', { state: { orderId: order.id } })}
                        className="mt-2 flex items-center gap-1 text-sm px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-200 shadow-md hover:shadow-lg"
                      >
                        Ver
                      </Button>
                </div>
                
                <div className="space-y-2">
                  <p className="text-gray-700"><span className="font-medium">Fecha:</span> {parsearFechaAR(order.date)}</p>
                  <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                    <div>
                      <p className="text-sm text-gray-500">
                        {order.orderItems ? `${order.orderItems.length} producto${order.orderItems.length !== 1 ? 's' : ''}` : 'Sin productos'}
                      </p>
                    </div>
                    <p className="text-xl font-bold text-green-600">${order.totalAmount}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-2xl text-gray-500">No tienes órdenes</p>
          </div>
        )}
        <div className="flex justify-center gap-2">
          <Button
            onClick={() => {
              setPage(page == 1 ? 1 : page - 1);
            }}
          >
            <ArrowLeftIcon className="h-4 w-4" />
          </Button>
          <p className="bg-gray-300 text-xl px-2 py-1 rounded-xl shadow-xl">
            {page}
          </p>
          <Button
            onClick={() => {
              setPage(page + 1);
            }}
          >
            <ArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </>
  );
}

export default OrdersPage;