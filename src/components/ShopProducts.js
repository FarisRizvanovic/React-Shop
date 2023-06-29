import React from "react";
import ProductsCard from "./ProductsCard";

const ShopProducts = ({ products }) => {
  return (
    <div>
      <div className="py-10 grid grid-cols-4 gap-10 min-h-screen">
        {products.map((item) => (
          <ProductsCard product={item} key={item.product_id} />
        ))}
      </div>
    </div>
  );
};

export default ShopProducts;
