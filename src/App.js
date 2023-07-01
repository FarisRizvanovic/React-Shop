import React, { useEffect } from "react";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import AdminLayout from "./pages/AdminLayout";
import ProductDetails from "./components/ProductDetails";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import {
  BrowserRouter,
  createBrowserRouter,
  Outlet,
  RouterProvider,
  Routes,
  Route,
  ScrollRestoration,
  Router,
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
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider, RequireAuth, useSignOut } from "react-auth-kit";
import Cookies from "js-cookie";
import PrivateRoute from "./pages/PrivateRoute";

function App() {
  return (
    <div className="font-bodyFont">
      <AuthProvider
        authName="_auth"
        authType="cookie"
        cookieDomain={window.location.hostname}
        cookieSecure={false}
      >
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<ScrollRestoration /> && <Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<ScrollRestoration /> && <Cart />} />
            <Route path="/shop" element={<ScrollRestoration /> && <Shop />} />

            <Route element={<PrivateRoute />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route path="/admin/dashboard" element={<Dashboard />} />
                <Route
                  path="/admin/content-managment"
                  element={<ContentManagment />}
                />
                <Route
                  path="/admin/products-managment"
                  element={<ProductManagment />}
                />
                <Route
                  path="/admin/order-managment"
                  element={<OrderManagment />}
                />
                <Route
                  path="/admin/customers-managment"
                  element={<CustomerManagment />}
                />
                <Route
                  path="/admin/user-managment"
                  element={<UserManagment />}
                />
              </Route>
            </Route>

            <Route path="*" element={<Other />} />
          </Routes>

          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
