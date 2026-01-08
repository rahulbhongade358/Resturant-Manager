import React from "react";
import { motion } from "framer-motion";

const Leftsection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left gap-4"
    >
      <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-extrabold leading-tight">
        Enjoy Our <br />
        <span className="text-amber-400">Delicious Meal</span>
      </h1>

      <p className="text-gray-300 text-sm sm:text-base max-w-md">
        Fresh ingredients, bold flavors and chef-crafted meals made just for
        you.
      </p>

      <div className="flex gap-3 mt-2">
        <button className="bg-amber-400 text-black font-semibold px-6 py-2.5 rounded-full hover:bg-amber-500 transition">
          Menu
        </button>
      </div>
    </motion.div>
  );
};

export default Leftsection;
