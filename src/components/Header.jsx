import React from "react";
import { logoDark, cart } from "../assets/index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const productData = useSelector((state) => state.bazar.productData);

  return (
    <div className="w-full h-20 bg-white border-b-[2px] border-b-gray-300 font-titleFont sticky top-0 left-0 z-10">
      <div className="max-w-screen-x1 h-full flex items-center justify-between mx-10">
        <Link to="/" className="select-none">
          <div>
            <img
              className="w-[240px] pointer-events-none"
              src={logoDark}
              alt="logoDark"
            />
          </div>
        </Link>
        <div className="flex items-center gap-8">
          <ul className="flex items-center gap-8">
            <Link to="/">
              <li
                className="text-base text-black font-bold hover:text-orange-900 
              hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300"
              >
                Home
              </li>
            </Link>
            <Link to="/shop">
              <li
                className="text-base text-black font-bold hover:text-orange-900
              hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300"
              >
                Shop
              </li>
            </Link>
            <Link to="/admin/dashboard">
              <li
                className="text-base text-black font-bold hover:text-orange-900
              hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300"
              >
                Admin
              </li>
            </Link>
          </ul>
          <Link to="/cart">
            <div className="relative">
              <img className="w-6" src={cart} alt="cart" />
              <span className="absolute w-6 top-1.5 left-0 text-sm flex items-center justify-center font-semibold">
                {productData.length}
              </span>
            </div>
          </Link>
          <img
            className="w-8 h-8 rounded-full"
            src="https://media.licdn.com/dms/image/C5603AQGKTGbZ1NZcug/profile-displayphoto-shrink_800_800/0/1618007191604?e=2147483647&v=beta&t=zbj2zNKvb8UcyOy_z3c129NudkJnB--aG1WHTpw0vBo"
            alt="userProfileImage"
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
