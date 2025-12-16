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

      <div className="bg-white shadow rounded overflow-hidden">
        <div className="overflow-x-auto">
          <div className="max-h-[40vh] overflow-y-auto">
            <table className="min-w-full text-xs sm:text-sm text-left">
              <thead className="sticky top-0 bg-gray-100 z-10">
                <tr>
                  <th className="px-4 py-3 font-semibold">Order ID</th>
                  <th className="px-4 py-3 font-semibold">Customer</th>
                  <th className="px-4 py-3 font-semibold hidden md:table-cell">
                    Phone
                  </th>

                  <th className="px-4 py-3 font-semibold">Table No</th>
                  <th className="px-4 py-3 font-semibold">Items</th>
                  <th className="px-4 py-3 font-semibold">Total</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="border-b hover:bg-gray-50">
                   <td className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap">

                      {order._id.slice(-6)}
                    </td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                      {order.customerName}
                      </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      {order.customerContact}
                    </td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                  
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
                   <td className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap text-green-600 font-semibold ">
                        
                      ₹{order.totalAmount}
                    </td>
                   <td className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                        
                      <span className="px-2 py-1 rounded text-xs bg-yellow-100 text-yellow-800">
                        {order.status}
                      </span>
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
