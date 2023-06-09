import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineClose } from "react-icons/md";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { Link } from "react-router-dom";
import {
  deleteItem,
  incrementQuantity,
  decrementQuantity,
} from "../redux/bazarSlice";
import { toast } from "react-toastify";
import { resetCart } from "../redux/bazarSlice";

const CartItem = () => {
  const productData = useSelector((state) => state.bazar.productData);
  const hostLink = "http://localhost:5108/";

  const dispatch = useDispatch();
  return (
    <div className="w-2/3 pr-10">
      <div className="w-full">
        <h2 className="font-titleFont text-2xl font-bold">Shopping cart</h2>
      </div>
      <div>
        {productData.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between gap-6 mt-6 bg-[#fafafa] p-5"
          >
            <div className="flex items-center gap-2">
              <MdOutlineClose
                onClick={() =>
                  dispatch(deleteItem(item._id)) &
                  toast.error(`${item.title} is removed.`)
                }
                className="text-xl text-gray-600 hover:text-red-600 cursor-pointer duration-300"
              />
              <img
                className="w-32 h-32 object-cover"
                src={hostLink + item.image}
                alt="productImage"
              />
            </div>
            <h2 className="w-52">{item.title}</h2>
            <p className="w-10">${item.price}</p>

            <div className="w-52 flex items-center justify-between text-gray-500 gap-4 border p-3 bg-white">
              <p className="text-sm">Quantity</p>
              <div className="flex items-center gap-4 text-sm font-semibold">
                <span
                  onClick={() => dispatch(decrementQuantity(item._id))}
                  className="border h-5 font-normal text-lg flex items-center justify-center 
                  px-2 hover:bg-gray-700 hover::text-white cursor-pointer duration-300 active:bg-black"
                >
                  -
                </span>
                {item.quantity}
                <span
                  onClick={() => dispatch(incrementQuantity(item._id))}
                  className="border h-5 font-normal text-lg flex items-center justify-center 
                  px-2 hover:bg-gray-700 hover::text-white cursor-pointer duration-300 active:bg-black"
                >
                  +
                </span>
              </div>
            </div>
            <p className="w-14">${item.quantity * item.price}</p>
          </div>
        ))}
      </div>
      <button
        onClick={() =>
          dispatch(resetCart()) & toast.error("Your cart is empty!")
        }
        className="bg-red-600 text-white mt-8 ml-7 py-1 px-6 hover:bg-red-800 duration-300"
      >
        Reset cart
      </button>
      <Link to="/">
        <button className="mt-8 ml-7 flex items-center gap-1 text-gray-400 hover:text-black duration-300">
          <span>
            <HiOutlineArrowLeft />
          </span>{" "}
          back to shopping
        </button>
      </Link>
    </div>
  );
};

export default CartItem;
