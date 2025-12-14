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
      <div className="bg-white shadow rounded overflow-hidden">
        <div className="overflow-x-auto">
          <div className="max-h-[30vh] overflow-y-auto">
            <table className="min-w-full text-xs sm:text-sm text-left">
              <thead className="sticky top-0 bg-gray-100 z-11">
                <tr>
                  <th className="font-semibold hidden lg:table-cell px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                    Order ID
                  </th>
                  <th className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap font-semibold">
                    Customer
                  </th>
                  <th className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap font-semibold hidden md:table-cell">
                    Phone
                  </th>

                  <th className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap font-semibold">
                    Table No
                  </th>
                  <th className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap font-semibold">
                    Items
                  </th>
                  <th className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap font-semibold">
                    Total
                  </th>
                  <th className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap font-semibold">
                    Status
                  </th>
                  <th className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap font-semibold">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="border-b hover:bg-gray-50">
                    <td className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap hidden md:table-cell">
                      {order._id.slice(-6)}
                    </td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                      {order.customerName}
                    </td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap hidden md:table-cell">
                      {order.customerContact}
                    </td>

                    <td className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap text-center">
                      {order.tableNumber}
                    </td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                      <ul className="list-disc pl-4 space-y-1">
                        {order.orderItems.map((item) => (
                          <li key={item.itemId}>
                            {item.Dishname} × {item.quantity}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap font-semibold text-green-600">
                      ₹{order.totalAmount}
                    </td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                      <span className="px-2 py-1 rounded text-[10px] sm:text-xs bg-yellow-100 text-yellow-800">
                        {order.status}
                      </span>
                    </td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                      <button className="bg-amber-600 text-white px-2 sm:px-3 py-1 text-xs sm:text-sm rounded hover:bg-amber-700 transition">
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersTable;
