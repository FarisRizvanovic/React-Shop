import React, { useEffect, useState } from "react";
import CategoryTable from "./CategoryTable";
import { categoriesWithNumberOfItems } from "../../../api/Api";
import { toast } from "react-toastify";

const CategoryManagment = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategoriesData = async () => {
      try {
        const response = await categoriesWithNumberOfItems(1, "");
        const data = response.data.items;
        console.log(response);
        setCategories(data);
      } catch (e) {
        console.log(e);
        toast.error("Couldn't get categories.");
      }
    };
    getCategoriesData();
    console.log("ALOOOOOOO");
  }, []);

  return (
    <div>
      <CategoryTable categories />
    </div>
  );
};

export default CategoryManagment;
