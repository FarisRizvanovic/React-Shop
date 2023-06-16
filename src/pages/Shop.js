import React, { useEffect, useState, useRef } from "react";
import ShopProducts from "../components/ShopProducts";
import { useLoaderData } from "react-router-dom";
import Categories from "../components/Categories";

const Shop = () => {
  const [products, setProducts] = useState([]);

  const data = useLoaderData();

  useEffect(() => {
    setProducts(data.data.items);
  }, [data]);
  const categoriesRef = useRef(null);
  const productsRef = useRef(null);

  const handleCategoriesHover = (e) => {
    const { current } = categoriesRef;
    if (current) {
      current.style.overflowY = e.type === "mouseenter" ? "scroll" : "hidden";
    }
  };

  const handleProductsHover = (e) => {
    const { current } = productsRef;
    if (current) {
      current.style.overflowY = e.type === "mouseenter" ? "scroll" : "hidden";
    }
  };

  return (
    <div>
      <div className="flex h-screen">
        <div
          className="w-1/6 flex sticky scroll-m-0 h-screen hid justify-between no-scrollbar"
          ref={categoriesRef}
          onMouseEnter={handleCategoriesHover}
          onMouseLeave={handleCategoriesHover}
        >
          <Categories />
          <span className="h-screen w-[2px] bg-gray-300"></span>
        </div>

        <div
          className="w-5/6 bg-gray-100 px-10 no-scrollbar"
          ref={productsRef}
          onMouseEnter={handleProductsHover}
          onMouseLeave={handleProductsHover}
        >
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
