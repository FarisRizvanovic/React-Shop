import React, { useEffect, useState } from "react";
import { ordersWithCustomers, productsForOrderId } from "../../api/Api";
import { toast } from "react-toastify";
import OrderDetailsProductsTable from "./OrderDetailsProductsTable";
import { Button } from "@material-tailwind/react";

const OrderManagment = () => {
  const [ordersWCustomers, setOrdersWCustomers] = useState([]);
  const [currentOrderId, setCurrentOrderId] = useState(0);
  const [currentCustomer, setCurrentCustomer] = useState({});
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const getOrdersWithCustomers = async () => {
      try {
        const request = await ordersWithCustomers();
        const data = request;
        setOrdersWCustomers(data);
        setCurrentOrderId(data[0].order_id);
        setCurrentCustomer(data[0].customer);
      } catch {
        toast.error("Couldn't get the orders.");
      }
    };
    getOrdersWithCustomers();
  }, []);

  const getCurrentCustomer = () => {
    try {
      const order = ordersWCustomers.filter((element) => {
        if (element.order_id == currentOrderId) {
          return true;
        }
        return false;
      })[0];

      setCurrentCustomer(order.customer);
    } catch {}
  };

  useEffect(() => {
    getCurrentCustomer();
  }, [currentOrderId]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productsForOrderId(currentOrderId);

        setProducts(response);
      } catch (error) {}
    };
    fetchProducts();
  }, [currentOrderId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;

    return formattedDate;
  };

  useEffect(() => {
    let productTotal = 0;
    products.map((product) => {
      productTotal += product.price;
    });
    setTotal(productTotal);
  }, [products]);

  return (
    <div className="flex min-h-screen flex-col mx-16 mt-10 mb-16 gap-7 max-w-[90vw]">
      <div className="flex gap-4 min-h-screen  ">
        <div className="bg-white flex-2 shadow-2xl pt-7 pl-7 rounded-l-3xl w-72 overflow-scroll overflow-x-hidden no-scrollbar">
          <p className="font-medium mt-2 text-3xl bg-gray-700 text-white py-6 pl-7  rounded-l-2xl">
            Orders
          </p>
          <div className="flex flex-col gap-3 mt-7">
            {ordersWCustomers.map((orderWCustomer) => (
              <div
                key={orderWCustomer.order_id}
                onClick={() => setCurrentOrderId(orderWCustomer.order_id)}
                className={`flex items-center shadow-2xl cursor-pointer  ${
                  orderWCustomer.order_id === currentOrderId
                    ? "rounded-l-2xl bg-blue-400 "
                    : " mr-7 rounded-2xl bg-blue-300 "
                }  p-4  text-white font-semibold hover:bg-blue-400 duration-200`}
              >
                <div>
                  <h2 className="p-0 m-0">{orderWCustomer.customer.name}</h2>
                  <p className="p-0 m-0 text-sm ml-2 text-gray-200">
                    {formatDate(orderWCustomer.created_at)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white flex-1 shadow-2xl py-7 rounded-r-3xl ">
          <div className="flex justify-between font-medium mt-2 mr-7 text-3xl pl-11 bg-gray-700 text-white p-6 rounded-r-2xl">
            <p>Order details</p>
            <div className="flex gap-2">
              <Button className="h-max bg-red-500">Cancel order</Button>
              <Button className="h-max bg-green-500">Confirm order</Button>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex flex-1 flex-col mx-5 mt-4 text-white">
              <div className="flex gap-5 justify-between">
                <div className="bg-blue-400 flex-1 shadow-xl p-3 rounded-3xl flex flex-col justify-center ">
                  <p className="text-center font-semibold">Customer</p>
                  <p className=" mt-2 text-center  ml-0">
                    {currentCustomer.name}
                  </p>
                </div>
                <div className="bg-green-400 flex-1 shadow-xl p-3 rounded-3xl flex flex-col justify-center">
                  <p className="text-center font-semibold">Phone number</p>
                  <p className="font-medium text-center mt-2 ">
                    {currentCustomer.phone_number}
                  </p>
                </div>
                <div className="bg-red-400 flex-1 shadow-xl p-3 rounded-3xl flex flex-col justify-center">
                  <p className="text-center font-semibold">Delivery adress</p>
                  <p className="font-medium mt-2">{currentCustomer.address}</p>
                </div>

                <div className="bg-purple-400 flex-1 shadow-xl p-3 rounded-3xl flex flex-col justify-center">
                  <p className="text-center font-semibold">Items</p>
                  <p className="font-medium text-center text-4xl mt-2">
                    {products.length}
                  </p>
                </div>
                <div className="bg-black flex-1 shadow-xl p-3 rounded-3xl flex flex-col justify-center">
                  <p className="text-center font-semibold">Total</p>
                  <p
                    className={`${
                      total.toString().length > 6 ? "text-2xl" : "text-3xl"
                    } font-medium mt-2 text-center`}
                  >
                    ${total.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-3 flex-1 h-max">
              <OrderDetailsProductsTable products={products} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderManagment;
