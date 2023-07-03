import React, { useEffect, useState } from "react";
import { logoDark, cart } from "../assets/index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "@material-tailwind/react";
import { useAuthUser, useIsAuthenticated, useSignOut } from "react-auth-kit";

function Header() {
  const auth = useAuthUser();

  const signOut = useSignOut();

  const signOutUser = () => {
    signOut();
    window.location.reload();
  };

  const productData = useSelector((state) => state.bazar.productData);
  const [isLoggedIn, setIsLoggedIn] = useState(useIsAuthenticated());
  const [user, setUser] = useState("test");

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      setUser(auth().username);
    }
  }, []);

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
            {isLoggedIn ? (
              <Link to="/profile">
                <li
                  className="text-base text-black font-bold hover:text-orange-900
            hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300"
                >
                  Profile
                </li>
              </Link>
            ) : null}

            {isLoggedIn ? (
              <Link to="/admin/dashboard">
                <li
                  className="text-base text-black font-bold hover:text-orange-900
              hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300"
                >
                  Admin
                </li>
              </Link>
            ) : null}
          </ul>
          <Link to="/cart">
            <div className="relative">
              <img className="w-6" src={cart} alt="cart" />
              <span className="absolute w-6 top-1.5 left-0 text-sm flex items-center justify-center font-semibold">
                {productData.length}
              </span>
            </div>
          </Link>

          {!isLoggedIn ? (
            <div className="flex gap-2">
              <Button
                color="blue"
                className="h-10 w-32 font-bold flex items-center justify-center"
              >
                <Link to="/login" className="px-12 py-3">
                  Login
                </Link>
              </Button>

              <Button
                color="green"
                className="h-10 w-32 font-bold flex items-center justify-center"
              >
                <Link to="/register" className="px-10 py-3">
                  Register
                </Link>
              </Button>
            </div>
          ) : (
            <div className="">
              <h2
                onClick={() => {
                  setIsUserMenuOpen(!isUserMenuOpen);
                }}
                className="select-none m-0 font-bold text-xl text-white bg-blue-600 px-4 py-2 rounded-full hover:bg-blue-500 duration-100 cursor-pointer"
              >
                {user.slice(0, 1).toUpperCase()}
              </h2>
            </div>
          )}
        </div>
      </div>
      {isUserMenuOpen ? (
        <div className="flex justify-end  pr-10">
          <div className="bg-white flex-row w-44 justify-end rounded-md mt-0.5 shadow-2xl ">
            <p className="text-blue-600 text-xl text-center font-bold p-2 hover:bg-blue-600 hover:text-white duration-100 rounded-md cursor-pointer">
              Profile
            </p>
            <p
              onClick={() => signOutUser()}
              className="text-blue-600 text-xl text-center font-bold p-2 hover:bg-blue-600 hover:text-white duration-100 rounded-md cursor-pointer"
            >
              Sign out
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Header;
