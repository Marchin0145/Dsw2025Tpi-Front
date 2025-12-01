import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./modules/auth/pages/LoginPage";
import ListOrdersPage from "./modules/orders/pages/ListOrdersPage.jsx";
import { Dashboard } from "./modules/templeates/components/Dashboard.jsx";
import { HomePage } from "./modules/home/pages/HomePage.jsx";
import { ListProductsPage } from "./modules/products/pages/listProductsPage.jsx";
import { Protectedroute } from "./modules/auth/components/ProtectedRoute.jsx";
import { AuthProvider } from "./modules/auth/context/AuthProvider.jsx";
import { Outlet } from "react-router-dom";
import { CreateProductPage } from "./modules/products/pages/CreateProductPage.jsx";
import OrderViewPage from "./modules/orders/pages/OrderViewPage.jsx";
import DashboardUser from "./modules/templeates/components/DashBoardUser.jsx";
function App() {
  const routes = createBrowserRouter([
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/",
      element: (
        <>
          <DashboardUser/>
        </>
      ),
      children: [
        {
          path: "/",
          element: <>Listado de producto</>,
        },
        {
          path: "/cart",
          element: <>Carrito de compra</>,
        },
      ],
    },
    {
      path: "/admin",
      element: (
        <Protectedroute>
          <Dashboard />
        </Protectedroute>
      ),
      children: [
        {
          path: "/admin/home",
          element: <HomePage />,
        },
        {
          path: "/admin/products",
          element: <ListProductsPage />,
        },
        { path: "/admin/products/create",
          element: <CreateProductPage/> },
        {
          path: "/admin/orders",
          element: <ListOrdersPage />,
        },
        {
          path: "/admin/orders/view",
          element: <OrderViewPage/>,
        },
      ],
    },
  ]);
  return (
    <AuthProvider>
      <RouterProvider router={routes} />
    </AuthProvider>
  );
}

export default App;
