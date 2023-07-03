import React, { useEffect, useState } from "react";
import SidebarItem from "./SidebarItem";
import { categoriesData } from "../api/Api";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";

const Categories = ({ searchCallback }) => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMenuItem, setSelectedMenuItem] = useState("All Categories");

  useEffect(() => {
    try {
      if (selectedMenuItem === "All Categories") {
        searchCallback(searchTerm, 1);
        return;
      }
      const category = categories.find((c) => c.name === selectedMenuItem);
      const categoryId = category.category_id;
      searchCallback(searchTerm, categoryId);
    } catch {}
  }, [searchTerm, selectedMenuItem]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoriesData();
        const categories = response.data;

        const categoriesWithAll = [
          { category_id: 1000000, name: "All Categories" },
          ...categories,
        ];

        setCategories(categoriesWithAll);
      } catch {
        toast.error("Error fetching categories");
      }
    };
    fetchCategories();
  }, []);

  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };

  return (
    <div className="bg-gray-900 text-white text-sm h-full w-max  border-r-2 border-gray-300">
      <div className="w-full relative flex items-center justify-center p-4 text-black">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Start typing..."
          className="pl-2 pr-6 w-full py-2 rounded-lg border border-gray-400 focus:outline-none focus:ring focus:border-blue-400"
        />
        <MagnifyingGlassIcon className="absolute right-5 h-6 w-6 text-gray-400" />
      </div>
      <div className=" h-max ">
        <ul className="flex flex-col p-4 ">
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
    </div>
  );
};

export default Categories;
