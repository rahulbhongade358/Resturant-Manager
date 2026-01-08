import React from "react";
import { motion } from "framer-motion";
import Cards from "./Cards";
import {
  Headset,
  ShieldUser,
  ShoppingCart,
  UtensilsCrossed,
} from "lucide-react";

const containerVariant = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.25, // ⭐ one-by-one delay
    },
  },
};

const Featurescards = () => {
  const cardsdata = [
    {
      icon: ShieldUser,
      title: "Master Chefs",
      info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima.",
    },
    {
      icon: UtensilsCrossed,
      title: "Quality Food",
      info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima.",
    },
    {
      icon: ShoppingCart,
      title: "Easy to Order",
      info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima.",
    },
    {
      icon: Headset,
      title: "Easy to Order",
      info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima.",
    },
  ];

  return (
    <motion.div
      variants={containerVariant}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6 m-20 mt-30"
    >
      {cardsdata.map((card, index) => (
        <Cards key={index} props={card} />
      ))}
    </motion.div>
  );
};

export default Featurescards;
