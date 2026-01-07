import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../Context/CartContext.jsx";
import Navbar from "../Component/Navbar.jsx";
import axios from "axios";
import { Minus, Plus, Trash2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { generateMixedId } from "../utils/Helper.jsx";

const CartPage = () => {
  const { cartItem, increaseqty, decreaseqty, removeitem, clearcart } =
    useContext(CartContext);

  const [customerData, setCustomerData] = useState({
    customername: "",
    CustomerUID: "",
    tableno: "",
  });

  const user = localStorage.getItem("userlogin");

  useEffect(() => {
    if (!user) {
      const savedUID = localStorage.getItem("CustomerUID");
      const savedName = localStorage.getItem("CustomerName");

      if (savedUID) {
        setCustomerData({
          customername: savedName || "",
          CustomerUID: savedUID,
          tableno: "",
        });
      } else {
        const newUID = generateMixedId(savedName || "Guest");

        localStorage.setItem("CustomerUID", newUID);

        setCustomerData({
          customername: savedName || "",
          CustomerUID: newUID,
          tableno: "",
        });
      }
    } else {
      const adminUID = generateMixedId("ADMIN");

      setCustomerData({
        customername: "Walk-in Customer",
        CustomerUID: adminUID,
        tableno: "",
      });
    }
  }, [user]);

  const totalamount = cartItem.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const orderitem = cartItem.map((item) => ({
    itemId: item._id,
    Dishname: item.Dishname,
    portion: item.portion,
    price: item.price,
    quantity: item.quantity,
  }));

  const orderData = {
    customerName: customerData.customername,
    CustomerUID: customerData.CustomerUID,
    tableNumber: customerData.tableno,
    orderItems: orderitem,
    totalAmount: totalamount,
  };
  const postOrder = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/order`,
        orderData
      );

      toast.success("Order Placed Successfully!", {
        icon: "🍜",
        duration: 3000,
      });
      localStorage.removeItem("cartItems");

      if (!user) {
        localStorage.setItem("CustomerName", customerData.customername);
      }

      clearcart();

      setCustomerData({
        customername: "",
        CustomerUID: customerData.CustomerUID,
        tableno: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to place order", {
        duration: 3000,
      });
    }
  };

  return (
    <div className="min-h-screen bg-amber-50">
      <Navbar />

      <div className="max-w-5xl mx-auto mt-10 p-4">
        <h1 className="text-3xl font-extrabold text-amber-700 mb-8 text-center">
          🛒 Your Cart
        </h1>
        <div className="hidden md:block bg-white shadow-xl rounded-2xl overflow-hidden border border-amber-200">
          <table className="w-full text-sm">
            <thead className="bg-amber-200 text-amber-900">
              <tr className="border-b hover:bg-amber-50 transition">
                <th className="px-6 py-3 text-left">Dish</th>
                <th className="px-6 py-3 text-center">Qty</th>
                <th className="px-6 py-3 text-center">Price</th>
                <th className="px-6 py-3 text-center">Total</th>
                <th className="px-6 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItem.map((item) => (
                <tr key={item._id} className="border-b">
                  <td className="px-6 py-4 font-medium">
                    {item.Dishname} ({item.portion})
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center items-center gap-3">
                      <button
                        onClick={() => decreaseqty(item)}
                        className="p-1 bg-amber-200 hover:bg-amber-300 rounded-full"
                      >
                        <Minus size={16} />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => increaseqty(item)}
                        className="p-1 bg-amber-200 hover:bg-amber-300 rounded-full"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">₹{item.price}</td>
                  <td className="px-6 py-4 text-center">
                    ₹{item.price * item.quantity}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => removeitem(item)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="md:hidden space-y-4">
          {cartItem.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl shadow-md border border-amber-200 p-4"
            >
              <div className="flex justify-between">
                <h3 className="font-semibold">
                  {" "}
                  {item.Dishname} ({item.portion})
                </h3>
                <button
                  onClick={() => removeitem(item)}
                  className="text-red-500"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              <p className="text-sm text-gray-500">₹{item.price} each</p>

              <div className="flex justify-between items-center mt-3">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => decreaseqty(item)}
                    className="p-1 bg-gray-200 rounded"
                  >
                    <Minus size={16} />
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => increaseqty(item)}
                    className="p-1 bg-gray-200 rounded"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <span className="font-semibold">
                  ₹{item.price * item.quantity}
                </span>
              </div>
            </div>
          ))}
        </div>
        {cartItem.length > 0 && (
          <div className="bg-white rounded-2xl shadow-md border border-amber-300 p-4 mt-6">
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span className="text-xl font-bold text-amber-700">
                ₹{totalamount}
              </span>
            </div>
          </div>
        )}
        {cartItem.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg border border-amber-300 p-6 mt-6 max-w-md mx-auto">
            <h2 className="font-semibold text-lg mb-4">Customer Details</h2>

            <input
              className="w-full mb-4 p-2 border border-amber-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
              type="text"
              placeholder="Customer Name"
              value={customerData.customername}
              onChange={(e) =>
                setCustomerData({
                  ...customerData,
                  customername: e.target.value,
                })
              }
            />

            <input
              type="text"
              placeholder="Table Number"
              value={customerData.tableno}
              onChange={(e) =>
                setCustomerData({ ...customerData, tableno: e.target.value })
              }
              className="w-full mb-6 p-2 border rounded"
            />

            <div className="flex justify-between">
              <button
                onClick={clearcart}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
              >
                Clear Cart
              </button>

              <button
                onClick={postOrder}
                className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold shadow-md"
              >
                Place Order 🍽
              </button>
            </div>
          </div>
        )}
      </div>
      <Toaster />
    </div>
  );
};

export default CartPage;
