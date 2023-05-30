import React from "react";
import { logoLight, paymentlogo } from "../assets";
import { ImGithub } from "react-icons/im";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaHome,
} from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { BsPersonFill, BsPaypal } from "react-icons/bs";

const Footer = () => {
  return (
    <div className="bg-black text-[#949494] py-20 font-titleFont">
      <div className="max-w-screen-xl mx-auto grid grid-cols-4">
        <div className="flex flex-col gap-4">
          <img className="w-[200px]" src={logoLight} alt="logoLight " />
          <p className="text-white text-sm tracking-wide">Faris Rizvanovic</p>
          {/* PAYMENT IMAGE AKO HOCU */}
          <div className="flex gap-5 text-gray-400">
            <ImGithub className="hover:text-white duration-300 cursor-pointer" />
            <FaFacebookF className="hover:text-white duration-300 cursor-pointer" />
            <FaTwitter className="hover:text-white duration-300 cursor-pointer" />
            <FaInstagram className="hover:text-white duration-300 cursor-pointer" />
            <FaYoutube className="hover:text-white duration-300 cursor-pointer" />
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white mb-4">Locate us</h2>
          <div className="flex flex-col gap-2 textbase">
            <p>Bosna i Hercegovina, Sarajevo.</p>
            <p>Phone: 061-111-111</p>
            <p>E-mail: test@gmail.com</p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white mb-4">Profile</h2>
          <div className="flex flex-col gap-2 textbase">
            <p className="flex items-center gap-2 hover:text-white duration-300 cursor-pointer">
              <span>
                <BsPersonFill />
              </span>
              My account
            </p>
            <p className="flex items-center gap-2 hover:text-white duration-300 cursor-pointer">
              <span>
                <BsPaypal />
              </span>
              Checkout
            </p>
            <p className="flex items-center gap-2 hover:text-white duration-300 cursor-pointer">
              <span>
                <FaHome />
              </span>
              Order tracking
            </p>
            <p className="flex items-center gap-2 hover:text-white duration-300 cursor-pointer">
              <span>
                <MdLocationOn />
              </span>
              Help & Support
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-2">
          <input
            type="text"
            placeholder="E-mail"
            className="bg-transparent border px-4 py-2 text-sm text-white "
          />
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
