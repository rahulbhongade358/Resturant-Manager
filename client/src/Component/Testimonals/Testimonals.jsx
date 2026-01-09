import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    name: "Rahul Patil",
    role: "Customer",
    text: "The QR ordering system is super fast and very easy to use. The food arrived exactly as ordered. Loved the experience!",
  },
  {
    name: "Amit Sharma",
    role: "Food Lover",
    text: "I really liked how smooth the ordering process was. No waiting for waiters and the UI looks premium.",
  },
  {
    name: "Sneha Kulkarni",
    role: "Regular Customer",
    text: "Placing orders directly from the table is such a great idea. Everything was simple and convenient.",
  },
];

const Testimonials = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full px-4 sm:px-10 lg:px-24 py-20  text-black overflow-hidden">
      <div className="text-center mb-14">
        <h2 className="text-3xl sm:text-4xl font-extrabold">
          What Our <span className="text-amber-400">Customers Say</span>
        </h2>
        <p className="mt-3 text-gray-400 max-w-lg mx-auto">
          Real feedback from people who love ordering with us.
        </p>
      </div>

      <div className="relative max-w-3xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ x: 80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -80, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 sm:p-10 shadow-2xl text-center"
          >
            <p className="text-lg sm:text-xl text-gray-800 leading-snug">
              “{testimonials[index].text}”
            </p>

            <div className="mt-6">
              <h4 className="text-lg font-semibold">
                {testimonials[index].name}
              </h4>
              <span className="text-sm text-gray-500">
                {testimonials[index].role}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center gap-2 mt-8">
        {testimonials.map((_, i) => (
          <span
            key={i}
            className={`h-2 w-2 rounded-full transition ${
              i === index ? "bg-amber-400" : "bg-gray-600"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
