import { useEffect, useRef, useState } from "react";

const Dropdown = ({ selection, setSelection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    selection.charAt(0).toUpperCase() + selection.slice(1)
  );
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    setSelection(option);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div className="relative inline-block text-left w-full " ref={dropdownRef}>
      <div className="w-fill ">
        <button
          type="button"
          className="w-full inline-flex justify-between items-center
          px-4 py-2.5 border border-gray-300 shadow-sm text-sm font-medium rounded-xl text-gray-700
           bg-gray-50 hover:bg-gray-50 focus:outline-none focus:ring-2  focus:ring-blue-500"
          onClick={toggleDropdown}
        >
          {selectedOption || "Select Role"}
          <svg
            className={`-mr-1 ml-2 h-5 w-5 transition-transform ${
              isOpen ? "transform rotate-180" : ""
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 00-.707.293l-6 6a1 1 0 101.414 1.414L10 5.414l5.293 5.293a1 1 0 001.414-1.414l-6-6A1 1 0 0010 3z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-full rounded-xl
        shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 "
        >
          <div
            className=""
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {/* Option admin */}
            <a
              href="#"
              className={`block px-4 py-2 text-sm rounded-t-xl ${
                selectedOption === "Admin"
                  ? "font-medium text-blue-500"
                  : "text-gray-700"
              } hover:bg-gray-100 hover:text-gray-900`}
              role="menuitem"
              onClick={() => handleOptionSelect("Admin")}
            >
              Admin
            </a>
            {/* Option user */}
            <a
              href="#"
              className={`block px-4 py-2 text-sm rounded-b-xl ${
                selectedOption === "User"
                  ? "font-medium text-blue-500"
                  : "text-gray-700"
              } hover:bg-gray-100 hover:text-gray-900`}
              role="menuitem"
              onClick={() => handleOptionSelect("User")}
            >
              User
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
