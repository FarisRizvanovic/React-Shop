import React from "react";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import AdminLayout from "./pages/AdminLayout";
import ProductDetails from "./components/ProductDetails";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  ScrollRestoration,
} from "react-router-dom";
import { productsData, getDashboardData } from "./api/Api";
import Shop from "./pages/Shop";
import Dashboard from "./components/Admin/Dashboard/Dashboard";
import ContentManagment from "./components/Admin/ContentManagment/ContentManagment";
import ProductManagment from "./components/Admin/ProductsManagment/ProductManagment";
import OrderManagment from "./components/Admin/OrdersManagment/OrderManagment";
import CustomerManagment from "./components/Admin/CustomerManagment";
import UserManagment from "./components/Admin/UserManagment/UserManagment";
import Other from "./pages/Other";
import InternalServerError from "./pages/InternalServerError";

const Layout = () => {
  return (
    <div>
      <Header />
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        limit={3}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ScrollRestoration />
      <Outlet />
      <Footer />
    </div>
  );
};

const productDataLoader = () => productsData(1, "");

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <InternalServerError />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: productDataLoader,
      },
      {
        path: "/product/:id",
        element: <ProductDetails />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/shop",
        element: <Shop />,
        loader: productDataLoader,
      },
      {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          {
            path: "/admin/dashboard",
            element: <Dashboard />,
            loader: getDashboardData,
          },
          {
            path: "/admin/content-managment",
            element: <ContentManagment />,
          },
          {
            path: "/admin/products-managment",
            element: <ProductManagment />,
          },
          {
            path: "/admin/order-managment",
            element: <OrderManagment />,
          },
          {
            path: "/admin/customers-managment",
            element: <CustomerManagment />,
          },
          {
            path: "/admin/user-managment",
            element: <UserManagment />,
          },
        ],
      },
      {
        path: "*",
        element: <Other />,
      },
    ],
  },
]);

function App() {
  return (
    <div className="font-bodyFont">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
