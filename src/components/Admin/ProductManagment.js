import React, { useEffect, useState } from "react";
import AddNewProduct from "./AddNewProduct";
import ProductsManagmentTable from "./ProductsManagmentTable";
import CategoryManagment from "./CategoryManagment";
import ProductsLowOnStock from "./ProductsLowOnStock";
import { Button } from "@material-tailwind/react";
import {
  getCategoryCount,
  getProductCount,
  getProductsLowOnStockCount,
} from "../../api/Api";
import { toast } from "react-toastify";
import CategoryTable from "./CategoryTable";

const ProductManagment = () => {
  const [currentSelectedOption, setCurrentSelectedOption] = useState(
    "Products Managment Table"
  );

  const [productCount, setProductCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);
  const [productsLowOnStockCount, setProductsLowOnStockCount] = useState(0);

  useEffect(() => {
    fetchProductCount();
    fetchCategoryCount();
    getProductsLowStockCount();
  }, []);

  const fetchProductCount = async () => {
    try {
      const productCountResonse = await getProductCount();
      const productCount = productCountResonse.data;
      setProductCount(productCount);
    } catch {
      toast.error("Couldn't get the number of products.");
    }
  };

  const fetchCategoryCount = async () => {
    try {
      const categoryCountResonse = await getCategoryCount();
      const categoryCount = categoryCountResonse.data;
      setCategoryCount(categoryCount);
    } catch {
      toast.error("Couldn't get the number of categories.");
    }
  };

  const getProductsLowStockCount = async () => {
    try {
      const productsLOSResponse = await getProductsLowOnStockCount();
      const productsLOSCount = productsLOSResponse.data;
      setProductsLowOnStockCount(productsLOSCount);
    } catch {
      toast.error("Couldn't get the number of products low on stock.");
    }
  };

  const handleChangeSelectedOptionItemClick = (menuItem) => {
    setCurrentSelectedOption(menuItem);
  };

  const reloadCountData = () => {
    fetchCategoryCount();
    fetchProductCount();
    getProductsLowStockCount();
  };

  return (
    <div className="flex min-h-screen flex-col mx-16 mt-10 mb-16 gap-7">
      <div className="flex gap-10 justify-between">
        <div className="bg-white flex-1 shadow-xl p-7 rounded-3xl">
          <p className="text-gray-500">Total Products</p>
          <p className="font-medium mt-2 text-3xl ml-4">{productCount}</p>
          <Button
            onClick={(e) =>
              e.target.textContent === "View all products"
                ? handleChangeSelectedOptionItemClick(
                    "Products Managment Table"
                  )
                : handleChangeSelectedOptionItemClick(e.target.textContent)
            }
            className=" mt-1 text-sm bg-blue-500"
          >
            {currentSelectedOption === "Products Managment Table"
              ? "Add a new product"
              : "View all products"}
          </Button>
        </div>
        <div className="bg-white flex-1 shadow-xl p-7 rounded-3xl">
          <p className="text-gray-500">Total Categories</p>
          <p className="font-medium mt-2 text-3xl ml-4">{categoryCount}</p>
          <Button
            onClick={(e) =>
              handleChangeSelectedOptionItemClick(e.target.textContent)
            }
            className=" mt-1 text-sm bg-green-500"
          >
            Category managment
          </Button>
        </div>
        <div className="bg-white flex-1 shadow-xl p-7 rounded-3xl">
          <p className="text-gray-500">Products Low On Stock</p>
          <p className="font-medium mt-2 text-3xl ml-4">
            {productsLowOnStockCount}
          </p>
          <Button
            onClick={(e) =>
              handleChangeSelectedOptionItemClick(e.target.textContent)
            }
            className=" mt-1 text-sm bg-red-500"
          >
            View products low on stock
          </Button>
        </div>
      </div>

      <div className="bg-white flex-1 shadow-xl p-5 rounded-3xl">
        {currentSelectedOption === "Products Managment Table" ? (
          <ProductsManagmentTable />
        ) : currentSelectedOption === "Add a new product" ? (
          <AddNewProduct onNewProductAdded={reloadCountData} />
        ) : currentSelectedOption === "Category managment" ? (
          <CategoryTable />
        ) : (
          <ProductsLowOnStock />
        )}
      </div>
    </div>
  );
};

export default ProductManagment;
