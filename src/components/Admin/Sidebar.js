import React from "react";

const Sidebar = ({ onItemClick }) => {
  const handleItemClick = (menuItem) => {
    onItemClick(menuItem);
  };

  return (
    <div className="bg-gray-900 text-white">
      <ul className="flex flex-col p-4">
        <li className="mb-4">
          <a
            className="block py-2 px-4 rounded hover:bg-gray-800 cursor-pointer"
            onClick={() => handleItemClick("Dashboard")}
          >
            Dashboard
          </a>
        </li>
        <li className="mb-4">
          <a
            className="block py-2 px-4 rounded hover:bg-gray-800 cursor-pointer"
            onClick={() => handleItemClick("Content Managment")}
          >
            Content Managment
          </a>
        </li>
        <li className="mb-4">
          <a
            className="block py-2 px-4 rounded hover:bg-gray-800 cursor-pointer"
            onClick={() => handleItemClick("Products Managment")}
          >
            Products Managment
          </a>
        </li>
        <li className="mb-4">
          <a
            className="block py-2 px-4 rounded hover:bg-gray-800 cursor-pointer"
            onClick={() => handleItemClick("Orders Managment")}
          >
            Orders Managment
          </a>
        </li>
        <li className="mb-4">
          <a
            className="block py-2 px-4 rounded hover:bg-gray-800 cursor-pointer"
            onClick={() => handleItemClick("Customers Managment")}
          >
            Customers Managment
          </a>
        </li>
        <li className="mb-4">
          <a
            className="block py-2 px-4 rounded hover:bg-gray-800 cursor-pointer"
            onClick={() => handleItemClick("User Managment")}
          >
            User Managment
          </a>
        </li>
        {/* Add more sidebar menu items */}
      </ul>
    </div>
  );
};

export default Sidebar;
