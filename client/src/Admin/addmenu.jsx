import React, { useState } from "react";
import Navbar from "../Component/Navbar";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
const Addmenu = () => {
  const [foodData, setFoodData] = useState({
    Dishname: "",
    Dishtype: "",
    decription: "",
    price: "",
    imageURL: "",
  });
  const postMenu = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/uploadmenu`,
        foodData
      );
      toast.success("Menu Item Added Successfully!", {
        icon: "🍜",
        duration: 3000,
      });
      setFoodData({
        Dishname: "",
        Dishtype: "",
        decription: "",
        price: "",
        imageURL: "",
      });
    } catch (error) {
      console.error("Error adding pet:", error.response?.data || error.message);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center mt-10 px-4">
        <div className="w-full max-w-lg bg-white shadow-lg rounded-xl p-6 sm:p-8">
          {/* Heading */}
          <h2 className="text-2xl font-serif font-semibold text-center mb-8">
            Add New Menu Item
          </h2>
          <form className="space-y-6">
            {/* Dish Name */}
            <div className="relative z-0 w-full group">
              <input
                type="text"
                className="block py-3 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
                placeholder=" "
                value={foodData.Dishname}
                onChange={(e) =>
                  setFoodData({ ...foodData, Dishname: e.target.value })
                }
                required
              />
              <label className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Dish Name
              </label>
            </div>

            {/* Dish Type */}
            <div className="relative z-0 w-full group">
              <input
                type="text"
                className="block py-3 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
                placeholder=" "
                value={foodData.Dishtype}
                onChange={(e) =>
                  setFoodData({ ...foodData, Dishtype: e.target.value })
                }
                required
              />
              <label className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Dish Type
              </label>
            </div>

            {/* Description */}
            <div className="relative z-0 w-full group">
              <input
                type="text"
                className="block py-3 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
                placeholder=" "
                value={foodData.decription}
                onChange={(e) =>
                  setFoodData({ ...foodData, decription: e.target.value })
                }
                required
              />
              <label className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Description
              </label>
            </div>

            {/* Price */}
            <div className="relative z-0 w-full group">
              <input
                type="text"
                className="block py-3 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
                placeholder=" "
                value={foodData.price}
                onChange={(e) =>
                  setFoodData({ ...foodData, price: e.target.value })
                }
                required
              />
              <label className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Price
              </label>
            </div>

            {/* Image URL */}
            <div className="relative z-0 w-full group">
              <input
                type="text"
                className="block py-3 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
                placeholder=" "
                value={foodData.imageURL}
                onChange={(e) =>
                  setFoodData({ ...foodData, imageURL: e.target.value })
                }
                required
              />
              <label className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Image URL
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={postMenu}
              className="w-full mt-6 bg-brand text-black bg-green-400 cursor-pointer py-3 rounded-lg font-semibold tracking-wide hover:opacity-90 active:scale-95 transition-all"
            >
              Add Menu Item
            </button>
          </form>
        </div>
      </div>
      <Toaster position="top-center" />
    </div>
  );
};

export default Addmenu;
