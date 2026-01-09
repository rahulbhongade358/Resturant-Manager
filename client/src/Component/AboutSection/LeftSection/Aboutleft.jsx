import React from "react";
import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, scale: 0.9, y: 30 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const Aboutleft = () => {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="w-full"
    >
      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto lg:max-w-none">
        {[
          "https://img.freepik.com/premium-photo/manchurian-hakka-schezwan-noodles-popular-indochinese-food-served-bowl-selective-focus_466689-34621.jpg",
          "https://i.ytimg.com/vi/NfQ7p_LzpUA/hq720.jpg",
          "https://thumbs.dreamstime.com/b/triple-schezwan-fried-rice-lip-smacking-complete-meal-combination-rice-chicken-egg-crispy-fried-noodles-served-223918658.jpg",
          "https://www.shutterstock.com/image-photo/chicken-lollipop-dry-6-pieces-600nw-1936368526.jpg",
        ].map((img, i) => (
          <motion.div
            key={i}
            variants={item}
            className="aspect-square overflow-hidden rounded-2xl shadow-lg border border-gray-200 group"
          >
            <img
              src={img}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              alt=""
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Aboutleft;
