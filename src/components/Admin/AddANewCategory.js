import React, { useEffect, useState } from "react";
import CategoryTable from "./CategoryTable";
import { categoriesWithNumberOfItems } from "../../api/Api";
import { toast } from "react-toastify";

const AddANewCategory = () => {
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
  }, []);

  return (
    <div>
      <CategoryTable categories={categories} />
    </div>
  );
};

export default AddANewCategory;
