import React from "react";
import { BsArrowRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/bazarSlice";
import { toast } from "react-toastify";

const ProductsCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const hostLink = "http://localhost:5108/";

  const handleDetails = () => {
    navigate(`/product/${product.product_id}`, {
      state: {
        item: product,
      },
    });
  };

  return (
    <div className="group relative">
      <div
        onClick={handleDetails}
        className="w-full h-96 cursor-pointer overflow-hidden"
      >
        <img
          className="w-full h-full object-cover group-hover:scale-110 duration-500"
          src={hostLink + product.image}
          alt="productImg"
        />
      </div>
      <div className="w-full border-[1px] px-2 py-2">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="font-titleFont text-base font-bold">
              {product.title.substring(0, 15)}
            </h2>
          </div>
          <div className="flex justify-end gap-2 relative overflow-hidden w-28 text-sm">
            <div className="flex gap-2 transform group-hover:translate-x-24 transition-transform duration-500">
              <p className="line-through text-gray-500">${product.oldPrice}</p>
              <p className="font-semibold text-green-600">${product.price}</p>
            </div>
            <p
              onClick={() =>
                dispatch(
                  addToCart({
                    product_id: product.product_id,
                    category_id: product.category_id,
                    title: product.title,
                    isNew: product.isNew,
                    description: product.description,
                    rating: product.rating,
                    stock: product.stock,
                    oldPrice: product.oldPrice,
                    price: product.price,
                    image: product.image,
                    quantity: 1,
                  })
                ) & toast.success(`${product.title} added to cart.`)
              }
              className="absolute z-20 w-[100px] text-gray-500 hover:text-gray-900 flex 
              items-center gap-1 top-0 transform -translate-x-32 group-hover:translate-x-0 transition-transform cursor-pointer duration-500"
            >
              Add to cart{" "}
              <span>
                <BsArrowRight />
              </span>
            </p>
          </div>
        </div>
        <div>
          <p>{product.category}</p>
        </div>
        <div className="absolute top-5 right-0">
          {product.isNew && (
            <p className="bg-black bg-opacity-50 text-opacity-70 text-white font-semibold font-titleFont px-6 py-1">
              New in collection
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsCard;
