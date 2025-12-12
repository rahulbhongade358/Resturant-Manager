import React, { useContext } from "react";
import { Link } from "react-router";
import { CartContext } from "../Context/CartContext";
const Navbar = () => {
  const { cartItem } = useContext(CartContext);
  const totalItems = cartItem.reduce((sum, item) => sum + item.quantity, 0);
  const user = JSON.parse(localStorage.getItem("userlogin"));

  return (
    <div className="flex justify-evenly bg-gray-200 p-4 font-serif font-semibold text-lg">
      <Link to="/">Home</Link>
      <Link to="/menu">Menu</Link>

      {user?.role === "Admin" && (
        <>
          <Link to="/addmenu">Add Menu</Link>
          <Link to="/allorder">Order</Link>
          <Link to="/signup">Signup</Link>
        </>
      )}

      {user?.role === "Waiter" && <Link to="/allorder">Order</Link>}
      {user?.role === "Chef" && <Link to="/allorder">Order</Link>}

      {!user && (
        <>
          <Link to="/cartpage">Cart ({totalItems})</Link>
          <Link to="/myorder">My Order</Link>
        </>
      )}

      {!user ? (
        <div>
          <Link to="/login">Login</Link>
        </div>
      ) : (
        <button
          onClick={() => {
            localStorage.removeItem("userlogin");
            window.location.reload();
          }}
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default Navbar;
