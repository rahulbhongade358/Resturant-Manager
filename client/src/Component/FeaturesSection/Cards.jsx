import React from "react";
import { motion } from "framer-motion";

const cardVariant = {
  hidden: {
    opacity: 0,
    y: 60,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

const Cards = ({ props }) => {
  const { icon, title, info } = props;
  const Icon = icon;

  return (
    <motion.div variants={cardVariant} className="flex justify-center">
      <div
        className="
          group
          bg-white
          w-full
          sm:w-64
          p-6
          rounded-xl
          space-y-6
          transition-all
          duration-300
          hover:bg-amber-500
          hover:shadow-2xl
        "
      >
        <Icon
          size={60}
          className="text-amber-500 group-hover:text-white transition-colors duration-300"
          strokeWidth={2.5}
        />

        <div className="space-y-2">
          <h1 className="text-xl font-bold group-hover:text-white transition-colors">
            {title}
          </h1>
          <p className="text-gray-600 group-hover:text-white transition-colors text-sm">
            {info}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Cards;
