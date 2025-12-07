import React, { useContext } from "react";
import { CartContext } from "../Context/CartContext.jsx";
import Navbar from "../Component/Navbar.jsx";

const CartPage = () => {
  const { cartItem } = useContext(CartContext);
  console.log(cartItem);
  return (
    <div>
      <Navbar />
      <h1>Cart Item</h1>
      <div className="flex flex-col items-center justify-center mt-4">
        {cartItem.map((i) => (
          <div key={i._id}>
            <h1>{i.Dishname}</h1>
            <h1>{i.quantity}</h1>
            <h1>{i.price}</h1>
            <img
              src={i.imageURL}
              alt={i.Dishname}
              className="w-full h-[260px] object-cover group-hover:brightness-75 transition-all duration-300"
            />
          </div>
        ))}
      </div>
      <p>
        Total Amount :{" "}
        {cartItem.reduce(
          (price, item) => price + item.price * item.quantity,
          0
        )}
      </p>
    </div>
  );
};

export default CartPage;
