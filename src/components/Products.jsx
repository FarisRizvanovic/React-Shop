import React from "react";
import ProductsCard from "./ProductsCard";

const Products = ({ products }) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-2xl bg-black text-white py-2 w-80 text-center">
        Featured products
      </h1>
      <span className="w-20 h-[3px] bg-black"></span>
      <p className="max-w-[700px] text-gray-600 text-center">
        Discover our hand-picked selection of top-quality products that are sure
        to impress. Our featured products are carefully chosen to bring you the
        best in design, functionality, and innovation. From stylish home decor
        to cutting-edge gadgets, we have something for everyone. Whether you're
        looking to upgrade your living space or find the perfect gift, our
        featured products showcase the latest trends and must-have items.
        Explore our collection and elevate your lifestyle with these exceptional
        products.
      </p>
      <div className="max-w-screen-xl mx-auto py-10 grid grid-cols-4 gap-10">
        {products.map((item) => (
          <ProductsCard key={item.product_id} product={item} />
        ))}
      </div>
    </div>
  );
};

export default Products;
