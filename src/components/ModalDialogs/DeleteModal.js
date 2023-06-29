import React, { useEffect, useState } from "react";
import { Button, IconButton } from "@material-tailwind/react";

const DeleteModal = ({ onDelete, title, setModalVisible }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const closeModal = () => {
    setIsOpen(false);
    setTimeout(() => {
      setModalVisible(false);
    }, 200);
  };

  const deleteClicked = () => {
    onDelete();
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
            <h2 className="text-2xl ">Do you want to proceed?</h2>
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
          <div className="flex flex-col gap-2 mt-4">
            <h2>Are you sure you want to delete "{title}"</h2>
          </div>

          {/* Footer */}
          <div className="mt-6 flex gap-5">
            <Button color="red" className="flex-1" onClick={() => closeModal()}>
              Cancle
            </Button>
            <Button
              color="green"
              className="flex-1"
              onClick={() => deleteClicked()}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
