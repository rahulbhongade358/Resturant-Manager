import React, { useContext } from "react";
import { CartContext } from "../Context/CartContext.jsx";
import Navbar from "../Component/Navbar.jsx";

const CartPage = () => {
  const { cartItem, increaseqty, decreaseqty, removeitem, clearcart } =
    useContext(CartContext);
  console.log(cartItem);
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

                  {/* Qty controls */}
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
                  ₹{" "}
                  {cartItem.reduce(
                    (sum, item) => sum + item.quantity * item.price,
                    0
                  )}
                </td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>

        {cartItem.length > 0 && (
          <div className="flex justify-end mt-6 space-x-4">
            <button
              onClick={clearcart}
              className="px-4 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600"
            >
              Clear Cart
            </button>
            <button
              onClick={clearcart}
              className="px-4 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600"
            >
              Place Order
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
