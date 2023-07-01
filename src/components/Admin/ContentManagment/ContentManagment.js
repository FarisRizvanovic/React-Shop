import React from "react";
import { ImGithub } from "react-icons/im";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const ContentManagment = () => {
  return (
    <div className="mx-16  mt-10 mb-16 gap-7 flex flex-col ">
      {/* Locate us */}
      <div className=" bg-white p-5 rounded-3xl shadow-2xl flex flex-col gap-3">
        <h2 className="text-3xl font-bold mb-5">Locate us:</h2>
        {/* Address */}
        <div className="flex gap-3 items-center  ml-4">
          <h2 className="h-fit text-lg w-24 text-gray-500">Address:</h2>
          <input
            className="border-[1px] border-gray-300 p-2 w-full rounded-xl  pl-3"
            type="text"
            placeholder="Enter page adress..."
            name=""
            id=""
          />
        </div>
        {/* Phone */}
        <div className="flex gap-3 items-center ml-4">
          <h2 className="h-fit text-lg w-24 text-gray-500">Phone:</h2>
          <input
            className="border-[1px] border-gray-300 p-2 w-full rounded-xl pl-3"
            type="text"
            placeholder="Enter page phone..."
            name=""
            id=""
          />
        </div>
        {/* Email */}
        <div className="flex gap-3 items-center ml-4">
          <h2 className="h-fit text-lg w-24 text-gray-500">Email:</h2>
          <input
            className="border-[1px] border-gray-300 p-2 w-full rounded-xl pl-3"
            type="text"
            placeholder="Enter page email..."
            name=""
            id=""
          />
        </div>
      </div>

      {/* Socials */}
      <div className=" bg-white p-5 rounded-3xl shadow-2xl flex flex-col gap-3">
        <h2 className="text-3xl font-bold mb-5">Socials:</h2>
        {/* GitHub */}
        <div className="flex gap-3 items-center  ml-4">
          <div className="flex gap-1">
            <ImGithub className="w-7 h-7" />
            <h2 className="h-fit text-lg w-24 text-gray-500">Github:</h2>
          </div>
          <input
            className="border-[1px] border-gray-300 p-2 w-full rounded-xl  pl-3"
            type="text"
            placeholder="Enter Github link..."
            name=""
            id=""
          />
        </div>
        {/* Facebook */}
        <div className="flex gap-3 items-center ml-4">
          <div className="flex gap-1">
            <FaFacebookF className="w-7 h-7" />
            <h2 className="h-fit text-lg w-24 text-gray-500">Facebook:</h2>
          </div>
          <input
            className="border-[1px] border-gray-300 p-2 w-full rounded-xl pl-3"
            type="text"
            placeholder="Enter Facebook link..."
            name=""
            id=""
          />
        </div>
        {/* Twitter */}
        <div className="flex gap-3 items-center ml-4">
          <div className="flex gap-1">
            <FaTwitter className="w-7 h-7" />
            <h2 className="h-fit text-lg w-24 text-gray-500">Twitter:</h2>
          </div>
          <input
            className="border-[1px] border-gray-300 p-2 w-full rounded-xl pl-3"
            type="text"
            placeholder="Enter Twitter link..."
            name=""
            id=""
          />
        </div>
        {/* Instagram */}
        <div className="flex gap-3 items-center ml-4">
          <div className="flex gap-1">
            <FaInstagram className="w-7 h-7" />
            <h2 className="h-fit text-lg w-24 text-gray-500">Instagram:</h2>
          </div>
          <input
            className="border-[1px] border-gray-300 p-2 w-full rounded-xl pl-3"
            type="text"
            placeholder="Enter Instagram link..."
            name=""
            id=""
          />
        </div>
        {/* Youtube */}
        <div className="flex gap-3 items-center ml-4">
          <div className="flex gap-1">
            <FaYoutube className="w-7 h-7" />
            <h2 className="h-fit text-lg w-24 text-gray-500">Youtube:</h2>
          </div>
          <input
            className="border-[1px] border-gray-300 p-2 w-full rounded-xl pl-3"
            type="text"
            placeholder="Enter Youtbue link..."
            name=""
            id=""
          />
        </div>
      </div>

      {/* Homepage */}
      <div className=" bg-white p-5 rounded-3xl shadow-2xl flex flex-col gap-3">
        <h2 className="text-3xl font-bold mb-5">Homepage:</h2>

        {/* Homepage carousel images  */}
        <div className=" ">
          <h2 className="h-fit text-lg  text-gray-500">
            Home carousel images:
          </h2>
          <img
            src="https://amazonproone.vercel.app/static/media/img3.c80809bb40bee5c34372.jpg"
            alt=""
            className="border-gray border-[3px]"
          />
        </div>
        {/* Homepage featured products description */}
        <div className="flex gap-3 items-center  ml-4">
          <h2 className="h-fit text-lg w-24 text-gray-500">Description:</h2>
          <textarea
            className="border-[1px] border-gray-300 p-2 w-full rounded-xl min-h-[25vh] pl-3"
            type="text"
            placeholder="Enter description..."
            name=""
            id=""
          />
        </div>
      </div>

      {/* Cart */}
      <div className=" bg-white p-5 rounded-3xl shadow-2xl flex flex-col gap-3">
        <h2 className="text-3xl font-bold mb-5">Cart:</h2>

        {/* Cart image  */}
        <div className=" ">
          <h2 className="h-fit text-lg  text-gray-500">Cart image:</h2>
          <img
            src="https://images.pexels.com/photos/1435752/pexels-photo-1435752.jpeg?auto=compress"
            alt=""
            className="border-gray border-[3px] w-full h-60 object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default ContentManagment;
