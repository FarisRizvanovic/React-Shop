import React from "react";

const Categories = () => {
  const clothingCategories = [
    "T-shirts",
    "Shirts",
    "Blouses",
    "Pants",
    "Jeans",
    "Shorts",
    "Dresses",
    "Skirts",
    "Jackets",
    "Coats",
    "Sweaters",
    "Hoodies",
    "Activewear",
    "Swimwear",
    "Sleepwear",
    "Underwear",
    "Socks",
    "Accessories",
    "Shoes",
    "Bags",
  ];

  return (
    <div className="h-full w-full sticky left-0 top-20 pt-5 flex gap-3 flex-col">
      <h2 className="text-center font-medium text-2xl">Categories</h2>
      <span className="w-full h-[1px] bg-black"></span>
      <div className="flex w-full flex-col justify-center items-center">
        {clothingCategories.map((element) => (
          <div className="hover:bg-gray-50 w-full py-3">
            <p>{element}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
