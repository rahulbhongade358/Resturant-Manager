import React from "react";
import { motion } from "framer-motion";

const steps = [
  {
    title: "Scan QR Code",
    text: "Scan the QR code placed on your table or use the Order Menu option from the navigation bar.",
  },
  {
    title: "View Menu",
    text: "You will be redirected to the menu page where all dishes are listed with images and details.",
  },
  {
    title: "Customize Order",
    text: "Choose your favourite dish, select half or full plate, adjust quantity, and add it to the cart.",
  },
  {
    title: "Review Cart",
    text: "On the cart page, you can modify quantities and view the total price before placing the order.",
  },
  {
    title: "Enter Details",
    text: "Enter your name and table number. If a waiter is ordering for you, simply share your name.",
  },
  {
    title: "Place Order",
    text: "Confirm your order and track it live from the My Orders page.",
  },
];

const Work = () => {
  return (
    <section className="relative w-full px-4 sm:px-10 lg:px-28 py-20 bg-gray-100 text-black">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-20"
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          How It <span className="text-amber-400">Works</span>
        </h1>
        <p className="mt-4 text-gray-500 max-w-xl mx-auto">
          Order your food in seconds using our smart QR-based ordering system.
        </p>
      </motion.div>

      <div className="relative max-w-5xl mx-auto">
        <div className="absolute left-4 sm:left-1/2 top-0 h-full w-0.5 bg-linear-to-b from-amber-400/60 to-transparent" />

        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={`relative mb-16 pl-16 sm:pl-0 sm:w-1/2 ${
              index % 2 === 0 ? "sm:pr-12 sm:ml-auto" : "sm:pl-12"
            }`}
          >
            <div className="absolute left-0 sm:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-amber-300 text-black font-bold flex items-center justify-center shadow-lg">
              {index + 1}
            </div>

            <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-6 shadow-xl">
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-800 text-sm leading-relaxed">
                {step.text}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Work;
