import React, { useContext, useState } from "react";
import { Link } from "react-router";
import { CartContext } from "../Context/CartContext";
import {
  Menu,
  X,
  ShoppingCart,
  LogIn,
  LogOut,
  UtensilsCrossed,
  ClipboardList,
  UserPlus,
} from "lucide-react";
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { cartItem } = useContext(CartContext);
  const totalItems = cartItem.reduce((sum, item) => sum + item.quantity, 0);
  const user = JSON.parse(localStorage.getItem("userlogin"));

  const logoutHandler = () => {
    localStorage.removeItem("userlogin");
    window.location.reload();
  };
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-bold text-amber-600"
          >
            <UtensilsCrossed className="w-7 h-7" />
            Golden Dragon
          </Link>
          <div className="hidden md:flex items-center gap-6 font-medium">
            <Link to="/" className="hover:text-amber-600">
              Home
            </Link>
            <Link to="/menu" className="hover:text-amber-600">
              Menu
            </Link>

            {(user?.role === "Waiter" || user?.role === "Chef") && (
              <Link to="/allorder" className="hover:text-amber-600">
                Orders
              </Link>
            )}
            {(user?.role === "Waiter" ||
              user?.role === "Chef" ||
              user?.role === "Admin") && (
              <Link to="/dashboard" className="hover:text-amber-600">
                Dashboard
              </Link>
            )}

            {!user && (
              <>
                <Link
                  to="/cartpage"
                  className="flex items-center gap-1 hover:text-amber-600"
                >
                  <ShoppingCart size={18} /> Cart ({totalItems})
                </Link>
                <Link to="/myorder" className="hover:text-amber-600">
                  My Order
                </Link>
              </>
            )}

            {!user ? (
              <Link
                to="/login"
                className="flex items-center gap-1 bg-amber-500 text-white px-4 py-2 rounded-lg"
              >
                <LogIn size={18} /> Login
              </Link>
            ) : (
              <button
                onClick={logoutHandler}
                className="flex items-center gap-1 bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                <LogOut size={18} /> Logout
              </button>
            )}
          </div>

          <button className="md:hidden" onClick={() => setOpen(!open)}>
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t">
          <div className="flex flex-col p-4 space-y-4 font-medium">
            <Link to="/" onClick={() => setOpen(false)}>
              Home
            </Link>
            <Link to="/menu" onClick={() => setOpen(false)}>
              Menu
            </Link>

            {user?.role === "Admin" && (
              <>
                <Link to="/admindashboard" className="hover:text-amber-600">
                  Dashboard
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-1"
                >
                  <UserPlus size={18} /> Add Team
                </Link>
              </>
            )}

            {(user?.role === "Waiter" || user?.role === "Chef") && (
              <Link
                to="/allorder"
                onClick={() => setOpen(false)}
                className="flex items-center gap-1"
              >
                <ClipboardList size={18} /> Orders
              </Link>
            )}

            {!user && (
              <>
                <Link
                  to="/cartpage"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-1"
                >
                  <ShoppingCart size={18} /> Cart ({totalItems})
                </Link>
                <Link to="/myorder" onClick={() => setOpen(false)}>
                  My Order
                </Link>
              </>
            )}

            {!user ? (
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="bg-amber-500 text-white px-4 py-2 rounded-lg text-center"
              >
                Login
              </Link>
            ) : (
              <button
                onClick={logoutHandler}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
