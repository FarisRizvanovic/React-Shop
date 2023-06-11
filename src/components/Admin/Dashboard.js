import React, { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import SalesChart from "./SalesChart";
import { useLoaderData } from "react-router-dom";
import SalesPerCategoryChart from "./SalesPerCategoryChart";

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
    <div className="flex min-h-screen flex-col mx-16 mt-10 mb-16 gap-7 ">
      <div className="flex gap-10 justify-between">
        <div className="bg-white flex-1 shadow-xl p-7 rounded-3xl">
          <p className="text-gray-500">Total Products</p>
          <p className="font-medium mt-2 text-3xl ml-4">{productCount}</p>
          <Button className="rounded-none mt-1 text-sm bg-blue-500">
            Add a new product
          </Button>
        </div>
        <div className="bg-white flex-1 shadow-xl p-7 rounded-3xl">
          <p className="text-gray-500">Total Categories</p>
          <p className="font-medium mt-2 text-3xl ml-4">{categoryCount}</p>
          <Button className="rounded-none mt-1 text-sm bg-green-500">
            Category managment
          </Button>
        </div>
        <div className="bg-white flex-1 shadow-xl p-7 rounded-3xl">
          <p className="text-gray-500">Products Low On Stock</p>
          <p className="font-medium mt-2 text-3xl ml-4">
            {productsLowOnStockCount}
          </p>
          <Button className="rounded-none mt-1 text-sm bg-red-500">
            View products low on stock
          </Button>
        </div>
        <div className="bg-white flex-1 shadow-xl p-7 rounded-3xl">
          <p className="text-gray-500">New orders</p>
          <p className="font-medium mt-2 text-3xl ml-4">{4}</p>
          <Button className="rounded-none mt-1 text-sm bg-yellow-500">
            View orders
          </Button>
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
