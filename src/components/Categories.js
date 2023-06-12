import React, { useEffect, useState } from "react";
import SidebarItem from "./SidebarItem";
import { categoriesData } from "../api/Api";
import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

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

  const [selectedMenuItem, setSelectedMenuItem] = useState("All Categories");

  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };

  return (
    <div className="bg-gray-900 text-white w-full text-sm h-screen">
      <div className="w-full relative flex items-center justify-center p-4 text-black">
        <input
          type="text"
          placeholder="Start typing..."
          className="pl-2 pr-6 w-full py-2 rounded-lg border border-gray-400 focus:outline-none focus:ring focus:border-blue-400"
        />
        <MagnifyingGlassIcon className="absolute right-5 h-6 w-6 text-gray-400" />
      </div>
      <ul className="flex flex-col p-4">
        {categories.map((item) => (
          <li className="mb-4" key={item.category_id}>
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
