import { Button, IconButton } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import RoleDropdown from "../Admin/RoleDropdown";
import { toast } from "react-toastify";
import { categoriesData, addANewProduct } from "../../api/Api";

const hostLink = "http://localhost:5108/";

const EditProductModal = ({ product, setModalVisible }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [title, setTitle] = useState(product.title);
  const [prevPrice, setPrevPrice] = useState(product.oldPrice);
  const [currPrice, setCurrPrice] = useState(product.price);
  const [description, setDescription] = useState(product.description);
  const [category, setCategory] = useState(product.category_id);
  const [image, setImage] = useState(product.image);
  const [stock, setStock] = useState(product.stock);
  const [newInColl, setNewInColl] = useState(product.isNew);

  const [categories, setCategories] = useState([]);
  const [prevPriceErrorShown, setPrevPriceErrorShown] = useState(false);
  const [currPriceErrorShown, setCurrPriceErrorShown] = useState(false);

  const [file, setFile] = useState(null);

  const [selectedImage, setSelectedImage] = useState(null);

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

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const closeModal = () => {
    setIsOpen(false);
    setTimeout(() => {
      setModalVisible(false);
    }, 200);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setFile(file);
    const reader = new FileReader();

    reader.onload = (e) => {
      setSelectedImage(e.target.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const checkAndSetOldPrice = (value) => {
    if (
      (typeof value === "number" && Number.isFinite(value)) ||
      (typeof value === "string" && !isNaN(Number(value)))
    ) {
      setPrevPrice(value);
      setPrevPriceErrorShown(false);
    } else if (!prevPriceErrorShown) {
      setPrevPriceErrorShown(true);
      toast.error("Old price must be a number!");
    }
  };

  const checkAndSetCurrPrice = (value) => {
    if (
      (typeof value === "number" && Number.isFinite(value)) ||
      (typeof value === "string" && !isNaN(Number(value)))
    ) {
      setCurrPrice(value);
      setCurrPriceErrorShown(false);
    } else if (!currPriceErrorShown) {
      setCurrPriceErrorShown(true);
      toast.error("Current price must be a number!");
    }
  };

  return (
    <div
      className={`fixed inset-0 mt-10 bg-black bg-opacity-25 backdrop-blur-none flex justify-center items-center transition-opacity ${
        isOpen
          ? "opacity-100 transition duration-200"
          : "opacity-0 pointer-events-none transition duration-200"
      }`}
    >
      <div className="w-fit">
        <div className=" bg-white px-10 py-7 rounded-xl">
          {/* Headline */}
          <div className="mt-2 flex justify-end">
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
          <div>
            <div className="max-w-screen-xl mx-auto flex gap-10">
              {/* Image */}
              <div className="w-2/5 relative bg-gray-200 hover:bg-gray-100 duration-300">
                <img
                  className="w-full max-w-xs object-cover"
                  src={
                    selectedImage === null ? hostLink + image : selectedImage
                  }
                  alt="productImg"
                />

                <div className="absolute top-5 right-0">
                  {newInColl && (
                    <p className="bg-black bg-opacity-50 text-white text-opacity-70 font-semibold font-titleFont px-8 py-1">
                      New in collection
                    </p>
                  )}
                </div>
              </div>
              <div className="w-3/5 flex flex-col justify-center gap-5">
                <div>
                  {/* Title */}
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="text-4xl w-full font-semibold"
                  />

                  <div className="flex  gap-4 mt-3 flex-col">
                    {/* Old price */}
                    <div>
                      <label htmlFor="oldPrice">Old price $</label>
                      <input
                        type="text"
                        id="oldPrice"
                        value={prevPrice}
                        onChange={(e) => checkAndSetOldPrice(e.target.value)}
                        className="text-2xl font-medium text-red-500"
                      />
                    </div>
                    {/* New price */}
                    <div>
                      <label htmlFor="newPrice">Current price $</label>
                      <input
                        type="text"
                        id="newPrice"
                        value={currPrice}
                        onChange={(e) => {
                          checkAndSetCurrPrice(e.target.value);
                        }}
                        className="text-2xl font-medium text-green-600"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-base">
                  {/* Is new in collection */}
                  <input
                    type="checkbox"
                    value={newInColl}
                    checked={newInColl}
                    onChange={(e) => setNewInColl(!newInColl)}
                  />
                  <p className=" text-gray-500">New in collection</p>
                </div>
                {/* Description */}
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="text-base text-gray-500 -mt-3"
                />

                {/* Image selector */}
                <div className="flex gap-4">
                  <div className="w-52 flex items-center justify-between text-gray-500 gap-4 border p-3">
                    <p className="text-sm">Stock</p>
                    <div className="flex items-center gap-4 text-sm font-semibold">
                      <button
                        type="button"
                        onClick={() => setStock(stock === 1 ? 1 : stock - 1)}
                        className="border h-6 font-normal text-lg flex items-center justify-center
                  px-2 hover:bg-gray-700 hover:text-white cursor-pointer duration-300 active:bg-black"
                      >
                        -
                      </button>
                      <span>{stock}</span>
                      <button
                        type="button"
                        onClick={() => setStock(stock + 1)}
                        className="border h-6 font-normal text-lg flex items-center justify-center
                  px-2 hover:bg-gray-700 hover:text-white cursor-pointer duration-300 active:bg-black"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div className="text-base text-gray-500">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option key={"Select a category"} value="">
                      Select a category
                    </option>
                    {categories.map((item) => (
                      <option key={item.category_id} value={item.category_id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center h-10 w-min  whitespace-nowrap">
                  <input
                    id="upload-image"
                    className="hidden"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                  <label
                    className="py-2 px-4 bg-blue-500 hover:bg-blue-700 duration-300 text-white font-bold cursor-pointer"
                    htmlFor="upload-image"
                  >
                    Change product image
                  </label>
                  <p className="ml-2">{file?.name}</p>
                </div>
              </div>
            </div>
          </div>
          {/* Footer */}
          <div className="mt-6 flex gap-5">
            <Button color="red" className="flex-1" onClick={() => closeModal()}>
              Cancle
            </Button>
            <Button color="green" className="flex-1">
              Save product
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;
