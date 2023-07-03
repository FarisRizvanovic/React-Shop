import React, { useEffect, useState } from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { addCategory } from "../../api/Api";
import { toast } from "react-toastify";

const AddCategoryModal = ({ setModalVisible, refreshCallback }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const closeModal = () => {
    setIsOpen(false);
    setTimeout(() => {
      setModalVisible(false);
    }, 200);
  };

  const saveCategory = async () => {
    try {
      await addCategory(categoryName, categoryDescription);
      toast.success("Category saved");
      closeModal();
      refreshCallback();
    } catch {
      toast.error("Error while saving category");
    }
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
            <h2 className="text-2xl ">Add category</h2>
            <IconButton
              variant="outlined"
              color="blue-gray"
              onClick={() => closeModal()}
              className="flex items-center justify-center w-7 h-7 focus:ring-0"
            >
              X
            </IconButton>
          </div>
          {/* Body */}
          <div className="flex flex-col gap-2">
            {/* Category name */}
            <div className="mt-3">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-600 dark:text-white"
              >
                Category Name:
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="Category name"
                required
              ></input>
            </div>
            {/* Description */}

            <div className="mt-3">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-600 dark:text-white"
              >
                Description:
              </label>
              <textarea
                type="text"
                name="description"
                id="description"
                onChange={(e) => setCategoryDescription(e.target.value)}
                value={categoryDescription}
                className="bg-gray-50 border min-h-[150px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="Description"
                required
              ></textarea>
            </div>
            {/* Role */}
          </div>

          {/* Footer */}
          <div className="mt-6 flex gap-5">
            <Button color="red" className="flex-1" onClick={() => closeModal()}>
              Cancle
            </Button>
            <Button
              color="green"
              className="flex-1"
              onClick={() => saveCategory()}
            >
              Save category
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCategoryModal;
