import React, { useEffect, useState } from "react";
import Sidebar from "../components/Admin/Sidebar";
import Dashboard from "../components/Admin/Dashboard";
import ContentManagment from "../components/Admin/ContentManagment";
import ProductsManagment from "../components/Admin/ProductManagment";
import OrderManagment from "../components/Admin/OrderManagment";
import UserManagment from "../components/Admin/UserManagment";
import CustomerManagment from "../components/Admin/CustomerManagment";

const Admin = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState("Dashboard");

  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar onItemClick={handleMenuItemClick} />
      <div className="w-full">
        {selectedMenuItem === "Dashboard" ? (
          <Dashboard />
        ) : selectedMenuItem === "Content Managment" ? (
          <ContentManagment />
        ) : selectedMenuItem === "Products Managment" ? (
          <ProductsManagment />
        ) : selectedMenuItem === "Orders Managment" ? (
          <OrderManagment />
        ) : selectedMenuItem === "Customers Managment" ? (
          <CustomerManagment />
        ) : (
          <UserManagment />
        )}
      </div>
    </div>
  );
};

export default Admin;
