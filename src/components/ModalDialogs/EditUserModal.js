import { Button, IconButton } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import RoleDropdown from "../Admin/RoleDropdown";

const EditUserModal = ({ user, setModalVisible }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [userName, setuserName] = useState(user.username);
  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setlastName] = useState(user.last_name);
  const [role, setRole] = useState(user.role);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const closeModal = () => {
    setIsOpen(false);
    setTimeout(() => {
      setModalVisible(false);
    }, 200); // Adjust the delay to match your desired animation duration
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-25 backdrop-blur-none flex justify-center items-center transition-opacity ${
        isOpen
          ? "opacity-100 transition duration-200"
          : "opacity-0 pointer-events-none transition duration-200"
      }`}
    >
      <div className="w-[500px]">
        <div className=" bg-white px-10 py-5 rounded-xl">
          {/* Headline */}
          <div className="mt-2 flex justify-between">
            <h2 className="text-2xl ">Edit user details</h2>
            <IconButton
              variant="outlined"
              color="blue-gray"
              size="sm"
              onClick={() => closeModal()}
              className="flex items-center justify-center  focus:ring-0"
            >
              X
            </IconButton>
          </div>
          {/* Body */}
          <div className="flex flex-col gap-2">
            {/* Username */}
            <div className="mt-5">
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-gray-600 dark:text-white"
              >
                Username:
              </label>
              <input
                type="text"
                name="username"
                id="username"
                className="bg-gray-50 border select-none pointer-events-none text-gray-400 border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="Username"
                value={userName}
                required
              ></input>
            </div>
            {/* Name */}
            <div className="mt-3">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-600 dark:text-white"
              >
                First Name:
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="Name"
                required
              ></input>
            </div>
            {/* Last Name */}
            <div className="mt-3">
              <label
                htmlFor="lastname"
                className="block mb-2 text-sm font-medium text-gray-600 dark:text-white"
              >
                Last Name:
              </label>
              <input
                type="text"
                name="lastname"
                id="lastname"
                value={lastName}
                onChange={(e) => setlastName(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="Last Name"
                required
              ></input>
            </div>
            {/* Role */}

            <div className="mt-3">
              <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-white">
                Role:
              </label>
              <RoleDropdown selection={role} setSelection={setRole} />
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 flex gap-5">
            <Button color="red" className="flex-1" onClick={() => closeModal()}>
              Cancle
            </Button>
            <Button color="green" className="flex-1">
              Save user
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
