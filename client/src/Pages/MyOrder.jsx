import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../Component/Navbar.jsx";
import { Clock, CheckCircle, ChefHat, Truck } from "lucide-react";
const MyOrder = () => {
  const [myOrder, setMyOrder] = useState({});
  const [error, setError] = useState("");
  const [orderId, setOrderId] = useState("");
  const statusStyle = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Approved":
        return "bg-blue-100 text-blue-700";
      case "Preparing":
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-green-100 text-green-700";
    }
  };
  const statusIcon = (status) => {
    switch (status) {
      case "Pending":
        return <Clock size={16} />;
      case "Approved":
        return <CheckCircle size={16} />;
      case "Preparing":
        return <ChefHat size={16} />;
      default:
        return <Truck size={16} />;
    }
  };
  useEffect(() => {
    const savedId = localStorage.getItem("CustomerUID");
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
    <div className="min-h-screen bg-amber-50">
      <Navbar />

      {/* Error */}
      {error && (
        <div className="max-w-4xl mx-auto mt-4 text-center text-red-600 font-medium">
          {error}
        </div>
      )}

      <div className="max-w-4xl mx-auto mt-8 p-4">
        <h1 className="text-3xl md:text-4xl font-bold text-amber-700 mb-8 text-center">
          🧾 My Orders
        </h1>

        {myOrder.length > 0 ? (
          myOrder.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-2xl shadow-md p-5 mb-8 border border-amber-200"
            >
              {/* Header */}
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-4">
                <h2 className="text-lg font-semibold">
                  Order ID:
                  <span className="text-amber-600 ml-2">
                    #{order._id.slice(-6)}
                  </span>
                </h2>

                <span
                  className={`flex items-center gap-2 px-4 py-1 rounded-full text-sm font-semibold w-fit ${statusStyle(
                    order.status
                  )}`}
                >
                  {statusIcon(order.status)}
                  {order.status}
                </span>
              </div>

              {/* Customer Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700 mb-4 text-sm">
                <p>
                  👤 <span className="font-medium">Name:</span>{" "}
                  {order.customerName}
                </p>
                <p>
                  🍽 <span className="font-medium">Table:</span>{" "}
                  {order.tableNumber}
                </p>
              </div>

              {/* Items */}
              <h3 className="font-semibold text-gray-800 mb-2">🍜 Items</h3>
              <ul className="divide-y text-sm">
                {order.orderItems.map((item, index) => (
                  <li key={index} className="flex justify-between py-2">
                    <span>
                      {item.Dishname} × {item.quantity}
                    </span>
                    <span className="font-medium">
                      ₹{item.price * item.quantity}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Total */}
              <div className="flex justify-between items-center mt-4 pt-4 border-t">
                <span className="font-semibold">Total</span>
                <span className="text-lg font-bold text-amber-600">
                  ₹{order.totalAmount}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 text-lg mt-20">
            😕 No orders yet. Pick something tasty from the menu!
          </p>
        )}
      </div>
    </div>
  );
};

export default MyOrder;
