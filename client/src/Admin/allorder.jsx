import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Navbar from "../Component/Navbar";

const Allorder = () => {
  const [orders, setOrders] = useState([]);
  const [errors, setErrors] = useState("");
  const fetcorder = async () => {
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
    fetcorder();
  }, []);
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>{errors}</div>
      {orders.map((order) => (
        <div key={order._id} className="border p-4 m-4">
          <h2 className="font-bold text-xl mb-2">Order ID: {order._id}</h2>
          <p>Customer Name: {order.customerName}</p>
          <p>Contact: {order.customerContact}</p>
          <p>Table Number: {order.tableNumber}</p>
          <p>Total Amount: ${order.totalAmount}</p>
          <p>Status: {order.status}</p>
          <h3 className="font-semibold mt-4">Order Items:</h3>
          <ul className="list-disc list-inside">
            {order.orderItems.map((item) => (
              <li key={item.itemId} className="mb-2">
                {item.Dishname} - Quantity: {item.quantity} - Price: $
                {item.price}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Allorder;
