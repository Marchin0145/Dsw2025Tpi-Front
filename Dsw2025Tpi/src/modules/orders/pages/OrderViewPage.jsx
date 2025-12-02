import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { orderByIdServices } from "../services/ordersServices";
import Card from "../../shared/components/Card";
import { Button } from "../../shared/components/Button";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { parsearFechaAR } from "../helpers/ordersHelper";

function OrderViewPage() {
  const location = useLocation();
  const nav = useNavigate();
  const orderId = location.state.orderId;
  const [order, setOrder] = useState(null);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const getOrder = async () => {
    try {
      const response = await orderByIdServices(orderId);
      setOrder(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrder();
  }, []);

  if (!order) return <div className="p-4">Cargando...</div>;

  const formatDate = (dateString) => {
    if (!dateString || dateString.startsWith("0001-01-01"))
      return "No especificada";
    return new Date(dateString).toLocaleDateString("es-ES");
  };

  return (
    <div className="flex flex-col gap-4 h-full p-4">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Orden #{order.id}</h1>
          <Button
            onClick={() => {
              const isAdmin = window.location.pathname.includes('/admin/');
              nav(isAdmin ? "/admin/orders" : "/orders");
            }}
            style="flex items-center gap-2"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Volver
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h2 className="text-lg font-semibold mb-3">Información General</h2>
            <div className="space-y-2">
              <p>
                <span className="font-medium">Cliente:</span>{" "}
                {order.nameCustomer}
              </p>
              <p>
                <span className="font-medium">Fecha:</span>{" "}
                {parsearFechaAR(order.date)}
              </p>
              <p>
                <span className="font-medium">Total:</span> ${order.totalAmount}
              </p>
              <div className="flex items-center gap-2">
                <span className="font-medium">Estado:</span>
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    order.status === "Delivered"
                      ? "bg-green-100 text-green-800"
                      : order.status === "Shipped"
                      ? "bg-blue-100 text-blue-800"
                      : order.status === "Processing"
                      ? "bg-yellow-100 text-yellow-800"
                      : order.status === "Cancelled"
                      ? "bg-red-100 text-red-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {order.status}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3">Direcciones</h2>
            <div className="space-y-3">
              <div>
                <p className="font-medium">Dirección de Envío:</p>
                <p className="text-gray-600">{order.shippingAddress}</p>
              </div>
              <div>
                <p className="font-medium">Dirección de Facturación:</p>
                <p className="text-gray-600">{order.billingAddress}</p>
              </div>
            </div>
          </div>
        </div>

        {order.notes && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3">Notas</h2>
            <p className="text-gray-600">{order.notes}</p>
          </div>
        )}

        {order.orderItems && order.orderItems.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-3">Productos</h2>
            <div className="space-y-3">
              {order.orderItems.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded"
                >
                  <div>
                    <p className="font-medium">{item.nameProduct}</p>
                    <p className="text-sm text-gray-500">
                      Cantidad: {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${item.subtotal}</p>
                    <p className="text-sm text-gray-500">
                      ${item.currentUnitPrice} c/u
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
export default OrderViewPage;
