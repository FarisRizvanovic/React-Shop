import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { getOrdersForUser } from "../api/Api";
import MyOrders from "../components/Profile/MyOrders";
import ProfileDetails from "../components/Profile/ProfileDetails";

const Profile = () => {
  const [selectedOption, setSelectedOption] = useState("Orders");

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getUserOrders();
  }, []);

  const getUserOrders = async () => {
    try {
      const request = await getOrdersForUser();
      const orders = request.data;
      setOrders(orders);
      console.log(orders);
    } catch {
      toast.error("Something went wrong");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
    const formattedTime = `${date.getHours().toString().padStart(2, "0")}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;

    return `${formattedDate} at ${formattedTime}h`;
  };

  const onViewOrderClick = (order) => {
    console.log(order);
  };

  return (
    <div className="bg-gray-100">
      {/* BANNER */}
      <div className=" h-52 bg-blue-500 flex justify-between shadow-2xl">
        <div className="h-52 flex flex-col justify-center items-center w-1/3">
          <p className="text-white text-5xl font-bold">Faris Rizvanovic</p>
          <div className="">
            <p className="text-gray-200">User</p>
          </div>
        </div>
        <div className="w-1/3 flex justify-end items-center pr-14 pt-14 ">
          <div className=" border-white border-[1px] cursor-pointer hover:bg-white duration-100 hover:border-blue-600 ">
            <p className="text-white font-bold p-2 hover:text-blue-500">
              Log out
            </p>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="px-20 mt-7 min-h-screen flex">
        {/* MENU */}
        <div className="bg-white w-1/6 rounded-xl flex flex-col h-fit shadow-2xl">
          <p
            onClick={() => setSelectedOption("Orders")}
            className={`${
              selectedOption === "Orders" && "bg-blue-500 text-white"
            } text-md font-bold p-5 rounded-t-xl hover:bg-blue-400 duration-100 cursor-pointer hover:text-white`}
          >
            Orders
          </p>
          <p
            onClick={() => setSelectedOption("Profile")}
            className={`${
              selectedOption === "Profile" && "bg-blue-500 text-white"
            } text-md font-bold p-5 rounded-b-xl hover:bg-blue-400 duration-100 cursor-pointer hover:text-white`}
          >
            Profile
          </p>
        </div>
        {/* SELECTED OPTION */}

        {selectedOption === "Orders" && (
          <MyOrders onViewOrderClickCallback={onViewOrderClick} />
        )}

        {selectedOption === "Profile" && <ProfileDetails />}
      </div>
    </div>
  );
};

export default Profile;
