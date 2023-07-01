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

const Layout = () => {
  const signOut = useSignOut();

  useEffect(() => {
    const loginExpiryTimestap = Cookies.get("_auth_storage");
    console.log(loginExpiryTimestap);
    const loginExpiryDate = new Date(loginExpiryTimestap);
    console.log(loginExpiryDate);
    loginExpiryDate.setSeconds(loginExpiryDate.getSeconds() + 20);
    console.log(loginExpiryDate);
    console.log(new Date());
    // fix this the loginexpirydate is always one day behind

    if (loginExpiryDate > new Date()) {
      signOut();
      console.log("logged out");
    }
  }, []);
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
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
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
  // return (
  //   <div className="font-bodyFont">
  //   <AuthProvider
  //     authName="_auth"
  //     authType="cookie"
  //     cookieDomain={window.location.hostname}
  //     cookieSecure={false}
  //   >
  //     <RouterProvider router={router} />
  //   </AuthProvider>
  //   </div>
  // );

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
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/shop" element={<Shop />} />

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
          </Routes>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
