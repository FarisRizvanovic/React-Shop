import React, { useEffect, useState } from "react";
import CategoryTable from "./CategoryTable";
import { categoriesWithNumberOfItems } from "../../api/Api";
import { toast } from "react-toastify";

const AddANewCatrgory = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategoriesData = async () => {
      try {
        const response = await categoriesWithNumberOfItems();
        const data = response.data;
        setCategories(data);
      } catch {
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

export default AddANewCatrgory;
