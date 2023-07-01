import React, { useEffect, useRef, useState } from "react";
import {
  deleteOrder,
  ordersWithCustomers,
  productsForOrderId,
} from "../../../api/Api";
import { toast } from "react-toastify";
import OrderDetailsProductsTable from "./OrderDetailsProductsTable";
import { Button } from "@material-tailwind/react";
import CancleOrderModal from "../../ModalDialogs/CancelOrderModal";

const OrderManagment = () => {
  const [ordersWCustomers, setOrdersWCustomers] = useState([]);
  const [currentOrderId, setCurrentOrderId] = useState(1);
  const [currentCustomer, setCurrentCustomer] = useState({});
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [totalOrders, setTotalOrders] = useState(0);

  const [cancelOrderModalVisible, setCancelOrderModalVisible] = useState(false);

  useEffect(() => {
    getOrdersWithCustomers();
  }, []);

  const getOrdersWithCustomers = async () => {
    try {
      const request = await ordersWithCustomers();
      const data = request;
      setTotalOrders(data.length);
      setOrdersWCustomers(data);
      setCurrentOrderId(data[0].order_id);
      setCurrentCustomer(data[0].customer);
    } catch {
      toast.error("Couldn't get the orders.");
    }
  };

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
    setPage(1);
    getCurrentCustomer();
  }, [currentOrderId]);

  useEffect(() => {
    fetchProducts();
  }, [currentOrderId, page]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
    const formattedTime = `${date.getHours().toString().padStart(2, "0")}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;

    return `${formattedDate} at ${formattedTime}h`;
  };

  const fetchProducts = async () => {
    try {
      const response = await productsForOrderId(page, currentOrderId);
      setProducts(response.items);
      setTotalPages(response.totalPages);
    } catch (error) {}
  };

  useEffect(() => {
    let productTotal = 0;
    products.map((product) => {
      productTotal += product.price;
    });
    setTotal(productTotal);
  }, [products]);

  const onPrevious = () => {
    setPage(page === 1 ? 1 : page - 1);
  };

  const onNext = () => {
    setPage(page === totalPages ? page : page + 1);
  };

  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(null);
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    const container = containerRef.current;

    const handleMouseDown = (event) => {
      setIsDragging(true);
      setStartY(event.pageY - container.offsetTop);
      setScrollTop(container.scrollTop);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const handleMouseMove = (event) => {
      if (!isDragging) return;
      event.preventDefault();
      const y = event.pageY - container.offsetTop;
      const scroll = y - startY;
      container.scrollTop = scrollTop - scroll;
    };

    container.addEventListener("mousedown", handleMouseDown);
    container.addEventListener("mouseup", handleMouseUp);
    container.addEventListener("mousemove", handleMouseMove);

    return () => {
      container.removeEventListener("mousedown", handleMouseDown);
      container.removeEventListener("mouseup", handleMouseUp);
      container.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isDragging, startY, scrollTop]);

  const cancelOrder = async () => {
    try {
      await deleteOrder(currentOrderId);
      toast.success("Order canceled.");
      setCancelOrderModalVisible(false);
      getOrdersWithCustomers();
    } catch {
      toast.error("Couldn't cancel the order.");
    }
  };

  const refreshData = async () => {
    await fetchProducts();
  };

  return (
    <>
      <div className="flex min-h-screen flex-col mx-16 mt-10 mb-16 gap-7 max-w-[90vw]">
        {/* Order list */}
        <div className="flex gap-4 min-h-screen  ">
          <div className="bg-white flex-2 shadow-2xl pt-7  rounded-l-3xl w-72 h-fit">
            <p className="font-medium mt-2 ml-6 text-3xl bg-gray-700 text-white py-6 pl-7  rounded-l-2xl">
              Orders ({totalOrders})
            </p>
            <div
              className="overflow-scroll overflow-x-hidden no-scrollbar max-h-96"
              ref={containerRef}
            >
              <div className="flex flex-col gap-3 pt-7 mb-4 pl-9 min-h-[1000px]">
                {ordersWCustomers.length > 0 ? (
                  ordersWCustomers.map((orderWCustomer) => (
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
                        <h2 className="p-0 m-0">
                          {orderWCustomer.customer.name}
                        </h2>
                        <p className="p-0 m-0 text-sm ml-2 text-gray-200">
                          {formatDate(orderWCustomer.created_at)}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex justify-center items-center min-h-[300px] w-full pr-9">
                    <p className="text-gray-400 text-xl">No orders...</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Order details */}
          <div className="bg-white flex-1 shadow-2xl py-7 rounded-r-3xl rounded-bl-3xl ">
            <div className="flex justify-between font-medium mt-2 mr-7 text-3xl pl-11 bg-gray-700 text-white p-6 rounded-r-2xl">
              <p>Order details</p>
              <div className="flex gap-2">
                <Button
                  className="h-max bg-red-500"
                  onClick={() => setCancelOrderModalVisible(true)}
                >
                  Cancel order
                </Button>
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
                    <p className="font-medium mt-2">
                      {currentCustomer.address}
                    </p>
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
                <OrderDetailsProductsTable
                  products={products}
                  onPrevious={onPrevious}
                  onNext={onNext}
                  page={page}
                  totalPages={totalPages}
                  refreshCallback={refreshData}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {cancelOrderModalVisible && (
        <CancleOrderModal
          setModalVisible={setCancelOrderModalVisible}
          onDelete={cancelOrder}
        />
      )}
    </>
  );
};

export default OrderManagment;
