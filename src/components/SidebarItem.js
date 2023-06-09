import React from "react";

const SidebarItem = ({ onItemClick, selectedMenuItem, text }) => {
  const handleItemClick = (menuItem) => {
    onItemClick(menuItem);
  };

  return (
    <a
      className={`block py-2 px-4 rounded hover:bg-gray-700 duration-200 cursor-pointer ${
        selectedMenuItem === text ? "bg-gray-700" : ""
      }`}
      onClick={() => handleItemClick(text)}
    >
      {text}
    </a>
  );
};

export default SidebarItem;
