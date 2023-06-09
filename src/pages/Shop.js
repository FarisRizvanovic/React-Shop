import React, { useEffect, useState } from "react";
import ShopProducts from "../components/ShopProducts";
import { useLoaderData } from "react-router-dom";
import Categories from "../components/Categories";

const Shop = () => {
  const [products, setProducts] = useState([]);

  const data = useLoaderData();

  useEffect(() => {
    setProducts(data.data);
  }, [data]);
  return (
    <div>
      <div className="flex">
        <div className="w-1/6 flex sticky justify-between h-full top-20 left-0">
          <Categories />
          <span className="h-screen w-[2px] bg-gray-300"></span>
        </div>

        <div className="w-5/6 bg-gray-100 px-10">
          <ShopProducts products={products} />
          <h2 className="text-center text-gray-400 mb-16">
            You have reached the end...
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Shop;
