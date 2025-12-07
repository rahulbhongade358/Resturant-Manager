import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Component/Navbar";
import axios from "axios";
import { CartContext } from "../Context/CartContext.jsx";
const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [errors, setErrors] = useState("");
  const { addtocart } = useContext(CartContext);
  const fetchmenu = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/menu`);
      setMenu(response.data.data);
    } catch (e) {
      setErrors(e.response.data.message);
      setMenu([]);
    }
  };
  useEffect(() => {
    fetchmenu();
  }, []);

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
                <button
                  className="mt-3 w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold py-2 rounded-xl shadow-md transition-all duration-200 cursor-pointer"
                  onClick={() => addtocart(i)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
