import React from "react";
import ProductsCard from "./ProductsCard";

const ShopProducts = ({ products }) => {
  return (
    <div>
      <div className="py-10 grid grid-cols-4 gap-10">
        {products.map((item) => (
          <ProductsCard key={item._id} product={item} />
        ))}
      </div>
    </div>
  );
};

export default ShopProducts;
