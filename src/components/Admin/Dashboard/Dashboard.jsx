import React, { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import SalesChart from "./SalesChart";
import { Link, useLoaderData } from "react-router-dom";
import SalesPerCategoryChart from "../Dashboard/SalesPerCategoryChart";

const Dashboard = () => {
  const dashboardData = useLoaderData();

  const [productCount, setProductCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);
  const [productsLowOnStockCount, setProductsLowOnStockCount] = useState(0);

  useEffect(() => {
    setProductCount(dashboardData.productCount);
    setCategoryCount(dashboardData.categoryCount);
    setProductsLowOnStockCount(dashboardData.lowOnStockCount);
  }, [dashboardData]);

  return (
    <div className="flex min-h-[75vh] flex-col mx-16 mt-10 mb-16 gap-7 ">
      <div className="flex gap-10 justify-between text-white">
        <div className="bg-blue-400 flex-1 shadow-xl p-7 rounded-3xl">
          <p className="">Total Products</p>
          <p className="font-medium mt-2 text-3xl ml-4">{productCount}</p>
        </div>
        <div className="bg-green-400 flex-1 shadow-xl p-7 rounded-3xl">
          <p className="">Total Categories</p>
          <p className="font-medium mt-2 text-3xl ml-4">{categoryCount}</p>
        </div>
        <div className="bg-red-400 flex-1 shadow-xl p-7 rounded-3xl">
          <p className="">Products Low On Stock</p>
          <p className="font-medium mt-2 text-3xl ml-4">
            {productsLowOnStockCount}
          </p>
        </div>
        <div className="bg-gray-700 flex-1 shadow-xl p-7 rounded-3xl">
          <p className="">New orders</p>
          <p className="font-medium mt-2 text-3xl ml-4">TODO</p>
          <div className="mb-4"></div>
        </div>
      </div>

      <div className="flex gap-7 max-h-full">
        <div className="flex-1 flex flex-col justify-center items-center bg-white shadow-2xl px-7 pb-7 pt-5 rounded-3xl ">
          <h2 className="text-center font-semibold text-gray-500">
            Sales per month
          </h2>
          <SalesChart />
        </div>
        <div className="flex-1 flex flex-col bg-white shadow-2xl rounded-3xl justify-center items-center pt-5 pb-5 mx-2">
          <h2 className="text-center font-semibold text-gray-500 mb-2">
            Top selling categories
          </h2>
          <SalesPerCategoryChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
