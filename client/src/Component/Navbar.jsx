import React, { useContext, useState } from "react";
import { Link } from "react-router";
import { CartContext } from "../Context/CartContext";
import {
  Menu,
  X,
  ShoppingCart,
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

  const navLink =
    "relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-amber-500 after:transition-all after:duration-300 hover:after:w-full";

  return (
    <nav className="sticky top-0 z-50 bg-slate-900 shadow-sm text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-bold text-amber-600"
          >
            <UtensilsCrossed className="w-7 h-7" />
            Golden Dragon
          </Link>
          <div className="hidden md:flex items-center gap-7 text-sm font-medium">
            <Link to="/" className={navLink}>
              Home
            </Link>
            <Link to="/menu" className={navLink}>
              Menu
            </Link>

            {(user?.role === "Waiter" || user?.role === "Chef") && (
              <Link to="/allorder" className={navLink}>
                Orders
              </Link>
            )}

            {(user?.role === "Waiter" ||
              user?.role === "Chef" ||
              user?.role === "Admin") && (
              <Link to="/dashboard" className={navLink}>
                Dashboard
              </Link>
            )}

            {!user && (
              <>
                <Link
                  to="/cartpage"
                  className="relative flex items-center gap-1"
                >
                  <ShoppingCart size={18} />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-3 bg-amber-500 text-white text-xs px-2 rounded-full">
                      {totalItems}
                    </span>
                  )}
                </Link>

                <Link to="/myorder" className={navLink}>
                  My Order
                </Link>
              </>
            )}

            {!user ? (
              <Link
                to="/login"
                className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition"
              >
                Login
              </Link>
            ) : (
              <button
                onClick={logoutHandler}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            )}
          </div>
          <button className="md:hidden" onClick={() => setOpen(!open)}>
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden bg-slate-900 text-white  border-t shadow-lg animate-slideDown">
          <div className="flex flex-col items-center gap-4 px-6 py-6 text-sm font-medium">
            <Link to="/" onClick={() => setOpen(false)}>
              Home
            </Link>
            <Link to="/menu" onClick={() => setOpen(false)}>
              Menu
            </Link>

            {user?.role === "Admin" && (
              <>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/signup" className="flex items-center gap-2">
                  <UserPlus size={16} /> Add Team
                </Link>
              </>
            )}

            {(user?.role === "Waiter" || user?.role === "Chef") && (
              <Link to="/allorder" className="flex items-center gap-2">
                <ClipboardList size={16} /> Orders
              </Link>
            )}

            {!user && (
              <>
                <Link to="/cartpage" className="flex items-center gap-2">
                  <ShoppingCart size={16} /> Cart ({totalItems})
                </Link>
                <Link to="/myorder">My Order</Link>
              </>
            )}

            {!user ? (
              <Link
                to="/login"
                className="bg-amber-500 text-white py-3.5 px-4 rounded-lg text-center"
              >
                Login
              </Link>
            ) : (
              <button
                onClick={logoutHandler}
                className="bg-red-500 text-white py-3.5 px-4 rounded-lg"
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

export default React.memo(Navbar);
