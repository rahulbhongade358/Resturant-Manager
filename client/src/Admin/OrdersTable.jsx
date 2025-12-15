import axios from "axios";
import React, { useEffect, useState } from "react";

const OrdersTable = () => {
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
      <div>{errors}</div>
      <div className="mb-4">
        <h1 className="text-xl font-bold">Orders Table</h1>
      </div>
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-lg shadow p-4 border"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-lg">
                Order #{order._id.slice(-5)}
              </h3>

              <span
                className={`px-2 py-1 text-xs rounded font-semibold
            ${
              order.status === "Pending"
                ? "bg-red-100 text-red-700"
                : order.status === "Preparing"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-green-100 text-green-700"
            }
          `}
              >
                {order.status}
              </span>
            </div>
            <p className="text-lg mb-2">
              🍽 Table:{" "}
              <span className="font-semibold">{order.tableNumber}</span>
            </p>
            <div className="text-lg mb-3">
              <p className="font-semibold mb-1">Items:</p>
              <ul className="list-disc pl-5 space-y-1">
                {order.orderItems.map((item) => (
                  <li key={item.itemId}>
                    {item.Dishname} × {item.quantity}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex gap-2">
              {order.status === "Pending" && (
                <button className="flex-1 bg-yellow-500 text-white py-2 rounded text-sm font-semibold">
                  Start Preparing
                </button>
              )}

              {order.status === "Preparing" && (
                <button className="flex-1 bg-green-600 text-white py-2 rounded text-sm font-semibold">
                  Mark Done
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersTable;
