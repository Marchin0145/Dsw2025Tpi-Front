import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./modules/auth/pages/LoginPage";
import RegisterPage from "./modules/auth/pages/RegisterPage";
import ListOrdersPage from "./modules/orders/pages/ListOrdersPage.jsx";
import { Dashboard } from "./modules/templeates/components/Dashboard.jsx";
import { HomePage } from "./modules/home/pages/HomePage.jsx";
import { ListProductsPage } from "./modules/products/pages/listProductsPage.jsx";
import { Protectedroute } from "./modules/auth/components/ProtectedRoute.jsx";
import { AuthProvider } from "./modules/auth/context/AuthProvider.jsx";
import { CreateProductPage } from "./modules/products/pages/CreateProductPage.jsx";
import OrderViewPage from "./modules/orders/pages/OrderViewPage.jsx";
import DashboardUser from "./modules/templeates/components/DashboardUser.jsx";
import OrdersPage from "./modules/client/pages/OrdersPage.jsx";
import ProductsPage from "./modules/client/pages/ProductsPage.jsx";
import CartPage from "./modules/cart/pages/CartPage.jsx";
import {EditProductPage} from "./modules/products/pages/EditProductPage.jsx";
function App() {
  const routes = createBrowserRouter([
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/signup",
      element: <RegisterPage />,
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
          element: <ProductsPage />,
        },
        {
          path: "/cart",
          element: <CartPage/>,
        },
          {
          path: "/orders",
          element: <OrdersPage/>,
        },
        {
          path: "/orders/view",
          element: <OrderViewPage/>,
        },
      ],
    },
      {
      path: "/admin/login",
      element: <LoginPage />,
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
           { path: "/admin/products/edit/:id",
          element: <EditProductPage/> },
        {
          path: "/admin/orders",
          element: <ListOrdersPage />,
        },
        {
          path: "/admin/orders/view",
          element: <OrderViewPage/>,
        },
         {
      path: "/admin/register",
      element: <RegisterPage />,
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
