import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./modules/auth/pages/LoginPage";
import RegisterPage from "./modules/auth/pages/RegisterPage";
import ListOrdersPage from "./modules/orders/pages/ListOrdersPage.jsx";
import { Dashboard } from "./modules/templeates/components/Dashboard.jsx";
import { HomePage } from "./modules/home/pages/HomePage.jsx";
import { ListProductsPage } from "./modules/products/pages/listProductsPage.jsx";
import { Protectedroute } from "./modules/auth/components/ProtectedRoute.jsx";
import { AuthProvider } from "./modules/auth/context/AuthProvider.jsx";
import { Outlet } from "react-router-dom";
import { CreateProductPage } from "./modules/products/pages/CreateProductPage.jsx";
import ProductsPage from "./modules/client/pages/ProductsPage.jsx";
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
          <Outlet />
        </>
      ),
      children: [
        {
          path: "/",
          element: <ProductsPage />,
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
