import React, { useEffect, useState } from "react";
import SidebarItem from "./SidebarItem";
import { categoriesData } from "../api/Api";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoriesData();
        const categories = response.data;

        setCategories(categories);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const [selectedMenuItem, setSelectedMenuItem] = useState("All categories");

  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };

  return (
    <div className="bg-gray-900 text-white w-full text-sm h-screen">
      <ul className="flex flex-col p-4">
        {categories.map((item) => (
          <li className="mb-4">
            <SidebarItem
              text={item.name}
              onItemClick={handleMenuItemClick}
              selectedMenuItem={selectedMenuItem}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
