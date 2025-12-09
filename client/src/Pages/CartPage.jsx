import React, { useContext, useState } from "react";
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

      console.log("Order Placed Successfully:", response.data);

      alert("Order Placed Successfully!");

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
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {item.Dishname}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={() => decreaseqty(item._id)}
                        className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
                      >
                        -
                      </button>

                      <span className="font-semibold">{item.quantity}</span>

                      <button
                        onClick={() => increaseqty(item._id)}
                        className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
                      >
                        +
                      </button>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-center font-semibold">
                    ₹ {item.price}
                  </td>
                  <td className="px-6 py-4 text-center font-semibold">
                    ₹ {item.price * item.quantity}
                  </td>

                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => removeitem(item._id)}
                      className="text-red-600 hover:text-red-800 font-semibold"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

            <tfoot className="bg-gray-100 text-gray-800 font-semibold">
              <tr>
                <td className="px-6 py-3 text-lg">Total</td>
                <td className="px-6 py-3 text-center text-lg">
                  {cartItem.reduce((sum, item) => sum + item.quantity, 0)}
                </td>
                <td className="px-6 py-3 text-center text-lg">__</td>
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
            <form className="max-w-md mx-auto mt-8">
              <div className="mb-5">
                <input
                  type="text"
                  placeholder="Customer Name"
                  value={customerData.customername}
                  onChange={(e) =>
                    setCustomerData({
                      ...customerData,
                      customername: e.target.value,
                    })
                  }
                  className="w-full border-b-2 p-2"
                  required
                />
              </div>

              <div className="mb-5">
                <input
                  type="text"
                  placeholder="Contact Number"
                  value={customerData.contactnumber}
                  onChange={(e) =>
                    setCustomerData({
                      ...customerData,
                      contactnumber: e.target.value,
                    })
                  }
                  className="w-full border-b-2 p-2"
                  required
                />
              </div>

              <div className="mb-5">
                <input
                  type="text"
                  placeholder="Table Number"
                  value={customerData.tableno}
                  onChange={(e) =>
                    setCustomerData({
                      ...customerData,
                      tableno: e.target.value,
                    })
                  }
                  className="w-full border-b-2 p-2"
                  required
                />
              </div>
            </form>

            <div className="flex justify-end mt-6 space-x-4">
              <button
                onClick={clearcart}
                className="px-4 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600"
              >
                Clear Cart
              </button>

              <button
                onClick={postOrder}
                className="px-4 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600"
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
