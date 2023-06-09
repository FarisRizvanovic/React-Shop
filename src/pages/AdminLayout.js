import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/Admin/AdminSidebar";
import React from "react";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen ">
      <AdminSidebar />
      <div className="w-full bg-gray-100">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
