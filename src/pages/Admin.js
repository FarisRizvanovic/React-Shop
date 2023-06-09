import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { categoriesData } from "../api/Api";

const Admin = () => {
  const [categories, setCategories] = useState([]);
  const [prevPriceErrorShown, setPrevPriceErrorShown] = useState(false);
  const [currPriceErrorShown, setCurrPriceErrorShown] = useState(false);

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

  // Product data states
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("Click to enter a new title");
  const [prevPrice, setPrevPrice] = useState(0.0);
  const [currPrice, setCurrPrice] = useState(0.0);
  const [newInColl, setNewInColl] = useState(false);
  const [description, setDescription] = useState("No description");
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState("Select a category");
  const [selectedImage, setSelectedImage] = useState(null);

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
      console.log(prevPrice);
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
      console.log(currPrice);
      setCurrPriceErrorShown(false);
    } else if (!currPriceErrorShown) {
      setCurrPriceErrorShown(true);
      toast.error("Current price must be a number!");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedCategory = categories.find((c) => c.name === category);

    console.log(selectedCategory);

    if (selectedCategory === undefined || selectedCategory === null) {
      toast.error("Please select a category");
      return;
    }
    if (!file) {
      toast.error("Please select an image");
      return;
    }

    const formData = new FormData();

    formData.append("Title", title);
    formData.append("IsNew", newInColl);
    formData.append("OldPrice", prevPrice.replace(/\./g, ","));
    formData.append("Price", currPrice.replace(/\./g, ","));
    formData.append("Description", description);
    formData.append("CategoryId", 1);
    formData.append("Rating", 0);
    formData.append("ImageFile", file);

    console.log(formData);

    fetch("http://localhost:5108/api/Products/AddProduct", {
      method: "POST",
      body: formData,
    })
      .then(() => {
        toast.success("Product added succesfully");
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  };

  return (
    <div className="mt-5">
      <form onSubmit={handleSubmit}>
        {/*  */}
        <h2 className="text-3xl font-bold text-green-500 text-center">
          Add a new product
        </h2>
        <div className="max-w-screen-xl mx-auto my-10 flex gap-10">
          <div className="w-2/5 relative bg-gray-200 hover:bg-gray-100 duration-300">
            {selectedImage ? (
              <img
                className="w-full  object-cover"
                src={selectedImage}
                alt="productImg"
              />
            ) : (
              <div className="flex justify-center items-center h-full text-gray-500">
                <input
                  id="imageSelector"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
                <label
                  htmlFor="imageSelector"
                  className="h-full w-full flex justify-center items-center cursor-pointer"
                >
                  Click here to select an image
                </label>
              </div>
            )}
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
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-4xl w-full font-semibold"
              />

              <div className="flex  gap-4 mt-3 flex-col">
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
              <input
                type="checkbox"
                value={newInColl}
                onChange={(e) => setNewInColl(!newInColl)}
              />
              <p className=" text-gray-500">New in collection</p>
            </div>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="text-base text-gray-500 -mt-3"
            />
            <div className="flex gap-4">
              <div className="w-52 flex items-center justify-between text-gray-500 gap-4 border p-3">
                <p className="text-sm">Stock</p>
                <div className="flex items-center gap-4 text-sm font-semibold">
                  <button
                    type="button"
                    onClick={() =>
                      setQuantity(quantity === 1 ? 1 : quantity - 1)
                    }
                    className="border h-6 font-normal text-lg flex items-center justify-center
                  px-2 hover:bg-gray-700 hover:text-white cursor-pointer duration-300 active:bg-black"
                  >
                    -
                  </button>
                  <span>{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
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
                onChange={(e) =>
                  setCategory(e.target.value) & console.log(e.target.value)
                }
              >
                <option key={"Select a category"} value="">
                  Select a category
                </option>
                {categories.map((item) => (
                  <option key={item.id} value={item.id}>
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
                Select an image
              </label>
              <p className="ml-2">{file?.name}</p>
            </div>
            <button
              onClick={handleSubmit}
              className="bg-black text-white font-bold py-3 px-6 hover:bg-slate-600 duration-300"
            >
              Save product
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Admin;
