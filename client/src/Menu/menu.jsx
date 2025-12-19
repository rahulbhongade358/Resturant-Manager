import React, { useContext, useEffect } from "react";
import Navbar from "../Component/Navbar";
import { Link } from "react-router";
import { CartContext } from "../Context/CartContext.jsx";
import { useApi } from "../Context/ApiContext.jsx";
const Menu = () => {
  const { menu, errors } = useApi();
  const { cartItem, addtocart, increaseqty, decreaseqty } =
    useContext(CartContext);

  const getQty = (id) => {
    const item = cartItem.find((i) => i._id === id);
    return item ? item.quantity : 0;
  };
  const handleAddToCartFirstTime = (item) => {
    addtocart(item);
  };

  const handleinccount = (_id) => {
    increaseqty(_id);
  };
  const handledeccount = (_id) => {
    decreaseqty(_id);
  };
  return (
    <div>
      <Navbar />
      <div className="flex flex-col justify-center items-center mt-10">
        <h1 className="font-serif font-semibold text-3xl mb-4">Menu</h1>

        {errors && <p className="text-red-500">{errors}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4 w-full max-w-[1300px]">
          {menu.map((i) => (
            <div
              key={i._id}
              className="relative rounded-2xl overflow-hidden shadow-xl shadow-gray-700/30 hover:scale-105 transition-all duration-300 cursor-pointer group bg-black"
            >
              <img
                src={i.imageURL}
                alt={i.Dishname}
                className="w-full h-[260px] object-cover group-hover:brightness-75 transition-all duration-300"
              />

              <div className="absolute bottom-0 w-full h-[55%] bg-gradient-to-t: from-black via-black/60 to-transparent"></div>

              <div className="absolute bottom-3 left-4 right-4 text-white drop-shadow-md">
                <div className="flex justify-between items-center">
                  <h3 className="text-[20px] font-bold text-amber-200">
                    {i.Dishname}
                  </h3>

                  <p className="bg-amber-400/90 text-black px-3 py-1 rounded-lg text-[14px] font-semibold">
                    ₹ {i.price}
                  </p>
                </div>

                <p className="mt-1 text-[14px] text-gray-300 font-light leading-tight">
                  {i.decription}
                </p>
                {getQty(i._id) > 0 ? (
                  <div className="flex items-center gap-3 mt-3">
                    <button
                      className="px-3 py-1 bg-gray-700 rounded"
                      onClick={() => handledeccount(i._id)}
                    >
                      -
                    </button>

                    <span className="font-semibold text-lg">
                      {getQty(i._id)}
                    </span>

                    <button
                      className="px-3 py-1 bg-gray-700 rounded"
                      onClick={() => handleinccount(i._id)}
                    >
                      +
                    </button>
                    <Link to="/cartpage">
                      {" "}
                      <button className=" w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold py-2 rounded-xl ml-4">
                        {" "}
                        Go to Cart{" "}
                      </button>
                    </Link>
                  </div>
                ) : (
                  <button
                    className="mt-3 w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold py-2 rounded-xl"
                    onClick={() => handleAddToCartFirstTime(i)}
                  >
                    ADD TO CART
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
