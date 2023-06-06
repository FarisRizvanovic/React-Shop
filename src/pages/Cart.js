import React, { useEffect, useState } from "react";
import { logoDark, cart } from "../assets/index";
import CartItem from "../components/CartItems";
import { Button } from "bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HiOutlineArrowLeft } from "react-icons/hi";

const Cart = () => {
  const productData = useSelector((state) => state.bazar.productData);
  const [totalAmmount, setTotalAmmout] = useState("");
  const [showEmpty, setShowEmpty] = useState(true);

  useEffect(() => {
    if (productData.length > 0) {
      setShowEmpty(false);
    }
  }, [productData]);

  useEffect(() => {
    let price = 0;
    productData.map((item) => {
      price += item.price * item.quantity;
      return price;
    });
    setTotalAmmout(price.toFixed(2));
  }, [productData]);
  return (
    <div>
      <img
        className="w-full h-60 object-cover"
        src="https://images.pexels.com/photos/1435752/pexels-photo-1435752.jpeg?auto=compress"
        alt="cartImage"
      />

      {!showEmpty ? (
        <div className="max-w-screen-xl mx-auto py-20 flex">
          <CartItem />
          <div className="w-1/3 bg-[#fafafa] py-6 px-4">
            <div className="flex flex-col gap-6 border-b-[1px] border-b-gray-400 pb-6">
              <h2 className="text-2xl font-medium">Cart totals</h2>
              <p className="flex items-center gap-4 text-base">
                Subtotal{" "}
                <span className="font-titleFont font-bold text-lg">
                  ${totalAmmount}
                </span>
              </p>
              <p className="flex items-start gap-4 text-base">
                Shipping{" "}
                <span>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Cumque dolores quia provident!
                </span>
              </p>
            </div>
            <p className="font-titleFont font-semibold flex justify-between mt-6">
              {" "}
              Total <span className="text-xl font-bold">${totalAmmount}</span>
            </p>
            <button className="w-full text-base bg-black text-white py-3 mt-6 hover:bg-gray-800 duration-300">
              Proceed to checkout
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center my-10 flex-col">
          <h2 className=" text-lg font-bodyFont text-red-700 font-medium">
            Your cart is empty. Please go back to shopping to add items to cart.
          </h2>
          <Link to="/">
            <button className="mt-3 flex items-center gap-1 text-gray-400 hover:text-black duration-300 mb-40">
              <span>
                <HiOutlineArrowLeft />
              </span>{" "}
              back to shopping
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
