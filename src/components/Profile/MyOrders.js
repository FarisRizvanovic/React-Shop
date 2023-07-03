import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getOrdersForUser } from "../../api/Api";

const MyOrders = ({ onViewOrderClickCallback }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getUserOrders();
  }, []);

  const getUserOrders = async () => {
    try {
      const request = await getOrdersForUser();
      const orders = request.data;
      setOrders(orders);
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

  return (
    <div className="bg-white w-full h-full ml-16 py-7 px-10 rounded-2xl flex flex-col gap-10 shadow-2xl">
      <div>
        <h2 className="text-3xl">Orders</h2>
        <p className="text-gray-400 text-sm">10 ITEMS</p>
      </div>
      {/* ORDERS W ITEMS */}
      <div className="flex flex-col gap-3">
        {orders.map((order) => (
          <div className="border-gray-300 border-[1px] flex items-center justify-between p-3 rounded-xl hover:bg-blue-50 duration-100">
            <div className=" min-w-[150px]">
              <p className=" text-2xl">Order #{order.order_id}</p>
              <p
                onClick={() => onViewOrderClickCallback(order)}
                className="text-sm text-green-500 cursor-pointer"
              >
                VIEW ORDER {"->"}
              </p>
            </div>
            {/* DELIVERY STATUS */}
            <div className="flex justify-center items-center gap-2">
              <div className=" h-2 w-2 bg-green-400 rounded-full" />
              <p className="text-sm text-gray-400">
                {order.status.toUpperCase()}
              </p>
            </div>
            {/* ORDER DATE/TIME */}
            <div>
              <p className="text-sm text-gray-400 text-end">Ordered:</p>
              <p className="text-sm text-gray-400">
                {formatDate(order.created_at)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
