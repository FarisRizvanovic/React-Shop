import React, { useState } from "react";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState("Dashboard");

  return (
    <div className="bg-gray-900 text-white text-sm">
      <div className="text-white flex items-center justify-center text-2xl font-bold mt-3">
        <h2>Admin</h2>
      </div>
      <ul className="flex flex-col p-4">
        <li className="mb-4">
          <Link
            onClick={() => setSelectedMenuItem("Dashboard")}
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
            onClick={() => setSelectedMenuItem("Content Managment")}
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
            onClick={() => setSelectedMenuItem("Products Managment")}
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
            onClick={() => setSelectedMenuItem("Orders Managment")}
            to="/admin/order-managment"
            className={`block py-2 px-4 rounded hover:bg-gray-700 duration-200 cursor-pointer ${
              selectedMenuItem === "Orders Managment" ? "bg-gray-700" : ""
            }`}
          >
            Orders Managment
          </Link>
        </li>
        {/* <li className="mb-4">
          <Link
            onClick={() => setSelectedMenuItem("Customers Managment")}
            to="/admin/customers-managment"
            className={`block py-2 px-4 rounded hover:bg-gray-700 duration-200 cursor-pointer ${
              selectedMenuItem === "Customers Managment" ? "bg-gray-700" : ""
            }`}
          >
            Customers Managment
          </Link>
        </li> */}
        <li className="mb-4">
          <Link
            onClick={() => setSelectedMenuItem("User Managment")}
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
