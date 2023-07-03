import React, { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Products from "../components/Products";
import { Link } from "react-router-dom";
import { productsData } from "../api/Api";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await productsData(1, "");
      const data = response.data.items;
      setProducts(data);
    } catch {}
  };

  return (
    <div>
      <Banner />
      <Products products={products} />
      <div className="flex flex-col items-center gap-4 mb-20">
        <h1 className="text-2xl bg-black text-white px-5 py-2 w-100 text-center">
          To see more products go to Shop tab
        </h1>
        <Link to="/shop">
          <h2 className="text-xl text-gray-400 hover:text-black duration-500">
            - Shop -
          </h2>
        </Link>
        <span className="w-20 h-[3px] bg-black"></span>
        <p className="max-w-[700px] text-gray-600 text-center"></p>
      </div>
    </div>
  );
};

export default Home;
