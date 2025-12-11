import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../Component/Navbar.jsx";

const MyOrder = () => {
  const [myOrder, setMyOrder] = useState({});
  const [error, setError] = useState("");
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    const savedId = localStorage.getItem("MyOrderId");
    if (savedId) setOrderId(savedId);
  }, []);
  const fetchMyOrder = async () => {
    if (!orderId) return;
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/order?orderId=${orderId}`
      );

      setMyOrder(response.data.data);
      setError("");
    } catch (error) {
      setMyOrder([]);
      setError(
        error.response?.data?.message ||
          "No order found. Please enter your contact number."
      );
    }
  };

  useEffect(() => {
    if (orderId) {
      fetchMyOrder();
    }
  }, [orderId]);

  return (
    <div>
      <Navbar />

      <div>{error}</div>

      <div className="max-w-4xl mx-auto mt-10 p-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          🧾 My Order
        </h1>
        {myOrder.length > 0 ? (
          myOrder.map((order) => (
            <div
              key={order._id}
              className="border border-gray-300 rounded-lg p-4 mb-6 bg-white shadow"
            >
              <h2 className="text-2xl font-semibold mb-4">
                Order ID: {order._id}
              </h2>
              <p className="mb-2">
                {" "}
                <span className="font-semibold">Customer Name:</span>{" "}
                {order.customerName}{" "}
              </p>{" "}
              <p className="mb-2">
                {" "}
                <span className="font-semibold">Contact Number:</span>{" "}
                {order.customerContact}{" "}
              </p>{" "}
              <p className="mb-2">
                {" "}
                <span className="font-semibold">Table Number:</span>{" "}
                {order.tableNumber}{" "}
              </p>
              <p className="mb-2">
                {" "}
                <span className="font-semibold">Status:</span> {order.status}{" "}
              </p>
              <h3 className="text-xl font-semibold mb-2">Order Items:</h3>
              <ul className="mb-4">
                {order.orderItems.map((item, index) => (
                  <li key={index} className="mb-1">
                    {item.Dishname} - Qty: {item.quantity} - Price: ${" "}
                    {item.price}
                  </li>
                ))}{" "}
              </ul>{" "}
              <p className="font-bold">Total Amount: ${order.totalAmount}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">
            {error || "No orders found"}
          </p>
        )}
      </div>
    </div>
  );
};

export default MyOrder;
