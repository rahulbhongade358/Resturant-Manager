import axios from "axios";
import React from "react";
import { useState } from "react";
import Navbar from "../Component/Navbar";
import { useApi } from "../Context/ApiContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const Allorder = () => {
  const { orders, errors, skeletonLoading } = useApi();
  const [filterStatus, setFilterStatus] = useState("All");

  const filteredOrders =
    filterStatus === "All"
      ? orders
      : orders.filter((order) => order.status === filterStatus);

  const getNextStatus = (currentStatus) => {
    switch (currentStatus) {
      case "Pending":
        return "Approved";
      case "Approved":
        return "Preparing";
      case "Preparing":
        return "Delivered";
      default:
        return null;
    }
  };

  const updateOrder = async (orderId, currentStatus) => {
    const nextStatus = getNextStatus(currentStatus);
    if (!nextStatus) return;

    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/updateorderstatus/${orderId}`,
        { status: nextStatus }
      );

      fetchorder();
    } catch (error) {
      console.error("Update failed", error);
    }
  };
  return (
    <div>
      <div>
        <Navbar />
      </div>
      {errors && <p className="text-red-500">{errors}</p>}
      {skeletonLoading.orders ? (
        <div className="bg-white shadow rounded-xl p-4">
          <div className="space-y-4">
            {Array(4)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="border rounded-xl p-4 bg-gray-50">
                  <div className="flex justify-between mb-3">
                    <Skeleton width={120} height={18} />
                    <Skeleton width={90} height={28} borderRadius={50} />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                    <Skeleton height={16} />
                    <Skeleton height={16} />
                    <Skeleton height={16} />
                  </div>

                  <div className="space-y-2 mb-3">
                    <Skeleton height={14} />
                    <Skeleton height={14} />
                    <Skeleton height={14} width="70%" />
                  </div>

                  <div className="flex justify-end">
                    <Skeleton width={140} height={36} borderRadius={8} />
                  </div>
                </div>
              ))}
          </div>
        </div>
      ) : (
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
            <h2 className="text-xl font-semibold">Orders</h2>

            <div className="flex gap-2 flex-wrap">
              {["All", "Pending", "Approved", "Preparing", "Delivered"].map(
                (status) => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`px-4 py-2 text-sm rounded-full border transition
            ${
              filterStatus === status
                ? "bg-orange-500 text-white border-orange-500"
                : "bg-white text-gray-700 hover:bg-orange-100"
            }`}
                  >
                    {status}
                  </button>
                )
              )}
            </div>
          </div>
          <div className="bg-white shadow rounded-xl p-4">
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <div
                  key={order._id}
                  className="border rounded-xl p-4 bg-gray-50 hover:shadow-md transition-all"
                >
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-semibold text-sm sm:text-base">
                      Order #{order._id.slice(-6)}
                    </span>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold
              ${
                order.status === "Pending"
                  ? "bg-blue-100 text-blue-700"
                  : order.status === "Approved"
                  ? "bg-yellow-100 text-yellow-700"
                  : order.status === "Preparing"
                  ? "bg-orange-100 text-orange-700"
                  : "bg-green-100 text-green-700"
              }`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 text-sm mb-3">
                    <div>
                      <span className="font-medium">Customer:</span>{" "}
                      {order.customerName}
                    </div>
                    <div>
                      <span className="font-medium">Table:</span>{" "}
                      {order.tableNumber}
                    </div>
                    <div className="sm:text-right">
                      <span className="font-medium">Total:</span>{" "}
                      <span className="text-green-600 font-semibold">
                        ₹{order.totalAmount}
                      </span>
                    </div>
                  </div>
                  <div className="mb-3">
                    <span className="font-medium">Items:</span>
                    <ul className="list-disc pl-5 mt-1 space-y-1 text-sm">
                      {order.orderItems.map((item) => (
                        <li key={item.itemId}>
                          {item.Dishname} × {item.quantity}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex justify-end">
                    {order.status !== "Delivered" && (
                      <button
                        onClick={() => updateOrder(order._id, order.status)}
                        className={`px-5 py-2 text-sm text-white rounded-lg font-medium transition active:scale-95
                      ${
                        order.status === "Pending"
                          ? "bg-blue-600 hover:bg-blue-700"
                          : order.status === "Approved"
                          ? "bg-yellow-500 hover:bg-yellow-600"
                          : "bg-green-600 hover:bg-green-700"
                      }`}
                      >
                        {order.status === "Pending"
                          ? "Approve Order"
                          : order.status === "Approved"
                          ? "Start Preparing"
                          : "Mark Delivered"}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Allorder;
