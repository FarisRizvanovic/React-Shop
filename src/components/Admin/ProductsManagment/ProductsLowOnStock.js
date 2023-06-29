import React from "react";
import ProductLowOnStockTable from "./ProductLowOnStockTable";

const ProductsLowOnStock = ({ refreshCalback }) => {
  const refreshData = () => {
    refreshCalback();
    console.log("refreshData");
  };

  return (
    <div>
      <ProductLowOnStockTable refreshCallback={refreshData} />
    </div>
  );
};

export default ProductsLowOnStock;
