import React, { useCallback, useContext } from "react";
import Navbar from "../Component/Navbar";
import { Link } from "react-router";
import { CartContext } from "../Context/CartContext.jsx";
import { useApi } from "../Context/ApiContext.jsx";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const Menu = () => {
  const { menu, errors, skeletonLoading } = useApi();
  const { cartItem, addtocart, increaseqty, decreaseqty } =
    useContext(CartContext);
  const totalItems = cartItem.reduce((sum, item) => sum + item.quantity, 0);
  const getQty = (id, portion) => {
    const item = cartItem.find((i) => i._id === id && i.portion === portion);
    return item ? item.quantity : 0;
  };

  const handleAddToCartFirstTime = (item) => {
    addtocart(item);
  };

  const handleinccount = (item, portion) => {
    const cartItemObj = cartItem.find(
      (i) => i._id === item._id && i.portion === portion
    );
    if (cartItemObj) increaseqty(cartItemObj);
  };

  const handledeccount = (item, portion) => {
    const cartItemObj = cartItem.find(
      (i) => i._id === item._id && i.portion === portion
    );
    if (cartItemObj) decreaseqty(cartItemObj);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-[1400px] mx-auto px-4 py-10">
        <h1 className="text-4xl font-serif font-bold text-center text-gray-800 mb-10">
          Our Menu
        </h1>

        {errors && <p className="text-red-500 text-center mb-4">{errors}</p>}

        {/* SKELETON LOADING */}
        {skeletonLoading.menu ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <Skeleton
                  key={index}
                  height={360}
                  borderRadius={16}
                  baseColor="#e5e7eb"
                  highlightColor="#f9fafb"
                />
              ))}
          </div>
        ) : (
          <>
            {/* MENU GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {menu.map((i) => (
                <div
                  key={i._id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                >
                  {/* IMAGE */}
                  <img
                    src={i.imageURL}
                    alt={i.Dishname}
                    className="w-full h-[220px] object-cover"
                  />

                  {/* CONTENT */}
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                      {i.Dishname}
                    </h3>

                    <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                      {i.decription}
                    </p>

                    {/* HALF */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-gray-600 font-medium">Half</span>

                      {getQty(i._id, "half") > 0 ? (
                        <div className="flex items-center gap-3">
                          <button
                            className="w-8 h-8 rounded-full bg-gray-200 text-lg font-bold hover:bg-gray-300"
                            onClick={() => handledeccount(i, "half")}
                          >
                            −
                          </button>

                          <span className="font-semibold">
                            {getQty(i._id, "half")}
                          </span>

                          <button
                            className="w-8 h-8 rounded-full bg-gray-200 text-lg font-bold hover:bg-gray-300"
                            onClick={() => handleinccount(i, "half")}
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <button
                          className="bg-amber-500 hover:bg-amber-600 text-white text-sm px-4 py-1.5 rounded-full font-semibold"
                          onClick={() =>
                            handleAddToCartFirstTime({
                              ...i,
                              portion: "half",
                              price: i.halfprice,
                            })
                          }
                        >
                          Add ₹{i.halfprice}
                        </button>
                      )}
                    </div>

                    {/* FULL */}
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 font-medium">Full</span>

                      {getQty(i._id, "full") > 0 ? (
                        <div className="flex items-center gap-3">
                          <button
                            className="w-8 h-8 rounded-full bg-gray-200 text-lg font-bold hover:bg-gray-300"
                            onClick={() => handledeccount(i, "full")}
                          >
                            −
                          </button>

                          <span className="font-semibold">
                            {getQty(i._id, "full")}
                          </span>

                          <button
                            className="w-8 h-8 rounded-full bg-gray-200 text-lg font-bold hover:bg-gray-300"
                            onClick={() => handleinccount(i, "full")}
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <button
                          className="bg-amber-500 hover:bg-amber-600 text-white text-sm px-4 py-1.5 rounded-full font-semibold"
                          onClick={() =>
                            handleAddToCartFirstTime({
                              ...i,
                              portion: "full",
                              price: i.fullprice,
                            })
                          }
                        >
                          Add ₹{i.fullprice}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* FLOATING CART BUTTON */}
            {cartItem.length > 0 && (
              <div className="fixed bottom-6 left-0 right-0 flex justify-center z-50">
                <Link to="/cartpage">
                  <button className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-3 rounded-full shadow-xl transition">
                    View Cart ({totalItems})
                  </button>
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Menu;
