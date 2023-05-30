import React from "react";
import { logoDark, cart } from "../assets/index";

function Header() {
  return (
    <div className="w-full h-20 bg-white border-b-[2px] border-b-gray-300 font-titleFont sticky top-0 left-0 z-10">
      <div className="max-w-screen-x1 h-full mx-auto flex items-center justify-around">
        <div>
          <img className="w-[240px]" src={logoDark} alt="logoDark" />
        </div>
        <div className="flex items-center gap-8">
          <ul className="flex items-center gap-8">
            <li
              className="text-base text-black font-bold hover:text-orange-900 
              hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300"
            >
              Home
            </li>
            <li
              className="text-base text-black font-bold hover:text-orange-900 
              hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300"
            >
              Pages
            </li>
            <li
              className="text-base text-black font-bold hover:text-orange-900
              hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300"
            >
              Shop
            </li>
            <li
              className="text-base text-black font-bold hover:text-orange-900 
              hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300"
            >
              Element
            </li>
            <li
              className="text-base text-black font-bold hover:text-orange-900 
              hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300"
            >
              Blog
            </li>
          </ul>
          <div className="relative">
            <img className="w-6" src={cart} alt="cart" />
            <span className="absolute w-6 top-1.5 left-0 text-sm flex items-center justify-center font-semibold">
              0
            </span>
          </div>
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
