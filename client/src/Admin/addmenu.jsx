import React, { useState } from "react";
import Navbar from "../Component/Navbar";
import axios from "axios";
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
      console.log("Food Data:", response.data);
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
      <div className="flex flex-col justify-center items-center mt-10 font-serif font-semibold text-2xl">
        <h2>Add New Menu Item</h2>
      </div>
      <div>
        <form className="max-w-md mx-auto">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
              placeholder=" "
              value={foodData.Dishname}
              onChange={(e) => {
                setFoodData({ ...foodData, Dishname: e.target.value });
              }}
              required
            />
            <label className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
              Dish Name
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
              placeholder=" "
              value={foodData.Dishtype}
              onChange={(e) => {
                setFoodData({ ...foodData, Dishtype: e.target.value });
              }}
              required
            />
            <label className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
              Dish Type
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
              placeholder=" "
              value={foodData.decription}
              onChange={(e) => {
                setFoodData({ ...foodData, decription: e.target.value });
              }}
              required
            />
            <label className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
              Discription
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
              placeholder=" "
              value={foodData.price}
              onChange={(e) => {
                setFoodData({ ...foodData, price: e.target.value });
              }}
              required
            />
            <label className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
              Price
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
              placeholder=" "
              value={foodData.imageURL}
              onChange={(e) => {
                setFoodData({ ...foodData, imageURL: e.target.value });
              }}
              required
            />
            <label className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
              ImageURL
            </label>
          </div>
          <button onClick={postMenu}>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Addmenu;
