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
      className="w-full p-4 sm:p-6"
    >
      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          sm:grid-rows-2
          gap-4
        "
      >
        {/* Top Left - Large */}
        <motion.div variants={item} className="h-56 sm:h-52">
          <img
            src="https://img.freepik.com/premium-photo/manchurian-hakka-schezwan-noodles-popular-indochinese-food-served-bowl-selective-focus_466689-34621.jpg"
            alt=""
            className="w-full h-full object-cover rounded-xl"
          />
        </motion.div>

        {/* Top Right - Small */}
        <motion.div variants={item} className="relative h-56 sm:h-auto">
          <div
            className="
              w-full h-full
              sm:absolute sm:bottom-0
              sm:h-[75%] sm:w-[75%]
            "
          >
            <img
              src="https://i.ytimg.com/vi/NfQ7p_LzpUA/hq720.jpg"
              alt=""
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </motion.div>

        {/* Bottom Left - Small */}
        <motion.div variants={item} className="relative h-56 sm:h-auto">
          <div
            className="
              w-full h-full
              sm:absolute sm:left-10
              sm:h-[75%] sm:w-[75%]
            "
          >
            <img
              src="https://thumbs.dreamstime.com/b/triple-schezwan-fried-rice-lip-smacking-complete-meal-combination-rice-chicken-egg-crispy-fried-noodles-served-223918658.jpg"
              alt=""
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </motion.div>

        {/* Bottom Right - Large */}
        <motion.div variants={item} className="h-56 sm:h-52">
          <img
            src="https://www.shutterstock.com/image-photo/chicken-lollipop-dry-6-pieces-600nw-1936368526.jpg"
            alt=""
            className="w-full h-full object-cover rounded-xl"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Aboutleft;
