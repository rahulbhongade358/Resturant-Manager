import React from "react";
import { motion } from "framer-motion";

const Rightsection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7 }}
      className="w-full lg:w-1/2 flex justify-center items-center mt-8 lg:mt-0 relative"
    >
      {/* Glow */}
      <div className="absolute w-52 h-52 sm:w-64 sm:h-64 bg-amber-400/30 blur-3xl rounded-full"></div>

      <motion.img
        src="https://themewagon.github.io/restoran/img/hero.png"
        alt="Food"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
        className="w-52 sm:w-64 md:w-80 lg:w-[420px] relative z-10"
      />
    </motion.div>
  );
};

export default Rightsection;
