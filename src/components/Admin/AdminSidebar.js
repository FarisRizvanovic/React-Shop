import React, { useState } from "react";
import SidebarItem from "../SidebarItem";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState("");

  return (
    <div className="bg-gray-900 text-white text-sm">
      <ul className="flex flex-col p-4">
        <li className="mb-4">
          <Link
            to="/admin/dashboard"
            className={`block py-2 px-4 rounded hover:bg-gray-700 duration-200 cursor-pointer ${
              selectedMenuItem === "Dashboard" ? "bg-gray-700" : ""
            }`}
          >
            Dashboard
          </Link>
        </li>
        <li className="mb-4">
          <Link
            to="/admin/content-managment"
            className={`block py-2 px-4 rounded hover:bg-gray-700 duration-200 cursor-pointer ${
              selectedMenuItem === "Content Managment" ? "bg-gray-700" : ""
            }`}
          >
            Content Managment
          </Link>
        </li>
        <li className="mb-4">
          <Link
            to="/admin/products-managment"
            className={`block py-2 px-4 rounded hover:bg-gray-700 duration-200 cursor-pointer ${
              selectedMenuItem === "Products Managment" ? "bg-gray-700" : ""
            }`}
          >
            Products Managment
          </Link>
        </li>
        <li className="mb-4">
          <Link
            to="/admin/order-managment"
            className={`block py-2 px-4 rounded hover:bg-gray-700 duration-200 cursor-pointer ${
              selectedMenuItem === "Orders Managment" ? "bg-gray-700" : ""
            }`}
          >
            Orders Managment
          </Link>
        </li>
        <li className="mb-4">
          <Link
            to="/admin/customers-managment"
            className={`block py-2 px-4 rounded hover:bg-gray-700 duration-200 cursor-pointer ${
              selectedMenuItem === "Customers Managment" ? "bg-gray-700" : ""
            }`}
          >
            Customers Managment
          </Link>
        </li>
        <li className="mb-4">
          <Link
            to="/admin/user-managment"
            className={`block py-2 px-4 rounded hover:bg-gray-700 duration-200 cursor-pointer ${
              selectedMenuItem === "User Managment" ? "bg-gray-700" : ""
            }`}
          >
            User Managment
          </Link>
        </li>
        {/* Add more sidebar menu items */}
      </ul>
    </div>
  );
};

export default AdminSidebar;
