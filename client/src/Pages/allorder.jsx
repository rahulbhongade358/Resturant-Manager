import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Navbar from "../Component/Navbar";

const Allorder = () => {
  const [orders, setOrders] = useState([]);
  const [errors, setErrors] = useState("");
  const fetchorder = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/allorders`
      );
      setOrders(response.data.data);
    } catch (e) {
      setErrors(e.response.data.message);
      setOrders([]);
    }
  };
  useEffect(() => {
    fetchorder();
  }, []);
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>{errors}</div>
      <div className="bg-white shadow rounded p-4">
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-sm sm:text-base">
                  Order #{order._id.slice(-6)}
                </span>
                <span className="px-2 py-1 rounded text-xs bg-yellow-100 text-yellow-800">
                  {order.status}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 mb-2 text-sm">
                <div>
                  <span className="font-medium">Customer:</span>{" "}
                  {order.customerName}
                </div>
                <div>
                  <span className="font-medium">Phone:</span>{" "}
                  {order.customerContact}
                </div>
                <div>
                  <span className="font-medium">Table:</span>{" "}
                  {order.tableNumber}
                </div>
                <div className="text-right sm:text-left">
                  <span className="font-medium">Total:</span>{" "}
                  <span className="text-green-600 font-semibold">
                    ₹{order.totalAmount}
                  </span>
                </div>
              </div>
              <div className="mb-2">
                <span className="font-medium text-lg">Items:</span>
                <ul className="list-disc pl-5 mt-1 text-lg space-y-1">
                  {order.orderItems.map((item) => (
                    <li key={item.itemId}>
                      {item.Dishname} × {item.quantity}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex justify-end">
                <button className="bg-amber-600 text-white px-4 py-1 text-sm rounded hover:bg-amber-700 transition">
                  Update
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Allorder;
