import React from "react";
import { Link } from "react-router";
const Navbar = () => {
  return (
    <div className="flex justify-evenly bg-gray-200 p-4 font-serif font-semibold text-lg">
      <Link to="/">Home</Link>
      <Link to="/menu">Menu</Link>
      <Link to="/addmenu">Add Menu</Link>
      <Link to="/cartpage">Cart</Link>
    </div>
  );
};

export default Navbar;
