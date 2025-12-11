import React, { useContext } from "react";
import { Link } from "react-router";
import { CartContext } from "../Context/CartContext";
const Navbar = () => {
  const { cartItem } = useContext(CartContext);
  const totalItems = cartItem.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="flex justify-evenly bg-gray-200 p-4 font-serif font-semibold text-lg">
      <Link to="/">Home</Link>
      <Link to="/menu">Menu</Link>
      <Link to="/addmenu">Add Menu</Link>
      <Link to="/allorder">Order</Link>
      <Link to="/cartpage">Cart ({totalItems})</Link>
      <Link to="/myorder">My Order</Link>
    </div>
  );
};

export default Navbar;
