import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../Context/CartContext.jsx";
import Navbar from "../Component/Navbar.jsx";
import axios from "axios";

const CartPage = () => {
  const { cartItem, increaseqty, decreaseqty, removeitem, clearcart } =
    useContext(CartContext);
  const [customerData, setCustomerData] = useState({
    customername: "",
    contactnumber: "",
    tableno: "",
  });
  useEffect(() => {
    const savedContact = localStorage.getItem("MyOrderId");
    const savedName = localStorage.getItem("CustomerName");
    setCustomerData({
      customername: savedName || "",
      contactnumber: savedContact || "",
      tableno: "",
    });
  }, []);
  const totalamount = cartItem.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );
  const orderitem = cartItem.map((item) => ({
    itemId: item._id,
    Dishname: item.Dishname,
    price: item.price,
    quantity: item.quantity,
  }));
  const orderData = {
    customerName: customerData.customername,
    customerContact: customerData.contactnumber,
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

      console.log("Order Response:", response.data);

      localStorage.setItem("MyOrderId", customerData.contactnumber);
      localStorage.setItem("CustomerName", customerData.customername);

      clearcart();
      setCustomerData({
        customername: "",
        contactnumber: "",
        tableno: "",
      });
    } catch (error) {
      console.error(
        "Error placing order:",
        error.response?.data || error.message
      );
    }
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto mt-10 p-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          🛒 Your Cart
        </h1>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <table className="w-full text-sm text-gray-700">
            <thead className="bg-gray-200 text-gray-800">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">Dish Name</th>
                <th className="px-6 py-3 text-center font-semibold">
                  Quantity
                </th>
                <th className="px-6 py-3 text-center font-semibold">
                  Dish Price
                </th>
                <th className="px-6 py-3 text-center font-semibold">Price</th>
                <th className="px-6 py-3 text-center font-semibold">Action</th>
              </tr>
            </thead>

            <tbody>
              {cartItem.map((item) => (
                <tr key={item._id} className="border-b">
                  <td className="px-6 py-4 font-medium">{item.Dishname}</td>

                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={() => decreaseqty(item._id)}
                        className="px-2 py-1 bg-gray-300 rounded"
                      >
                        -
                      </button>

                      <span className="font-semibold">{item.quantity}</span>

                      <button
                        onClick={() => increaseqty(item._id)}
                        className="px-2 py-1 bg-gray-300 rounded"
                      >
                        +
                      </button>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-center">₹ {item.price}</td>
                  <td className="px-6 py-4 text-center">
                    ₹ {item.price * item.quantity}
                  </td>

                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => removeitem(item._id)}
                      className="text-red-600 font-semibold"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

            <tfoot className="bg-gray-100 font-semibold">
              <tr>
                <td className="px-6 py-3 text-lg">Total</td>
                <td className="px-6 py-3 text-center text-lg">
                  {cartItem.reduce((sum, item) => sum + item.quantity, 0)}
                </td>
                <td className="px-6 py-3 text-center">—</td>
                <td className="px-6 py-3 text-center text-lg">
                  ₹ {totalamount}
                </td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
        {cartItem.length > 0 && (
          <div>
            <form className="max-w-md mx-auto mt-5">
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  value={customerData.customername}
                  onChange={(e) =>
                    setCustomerData({
                      ...customerData,
                      customername: e.target.value,
                    })
                  }
                  className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
                  placeholder=" "
                  required
                />
                <label className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                  Customer Name
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  value={customerData.contactnumber}
                  onChange={(e) =>
                    setCustomerData({
                      ...customerData,
                      contactnumber: e.target.value,
                    })
                  }
                  className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
                  placeholder=" "
                  required
                />
                <label className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                  Contact Number
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  value={customerData.tableno}
                  onChange={(e) =>
                    setCustomerData({
                      ...customerData,
                      tableno: e.target.value,
                    })
                  }
                  className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
                  placeholder=" "
                  required
                />
                <label className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                  Table Number
                </label>
              </div>
            </form>
            <div className="flex justify-end mt-6 space-x-4">
              <button
                onClick={clearcart}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Clear Cart
              </button>
              <button
                onClick={postOrder}
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                Place Order
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
