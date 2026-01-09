import React, { useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

const AnimatedNumber = ({ value }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const controls = animate(count, value, {
      duration: 2.2,
      ease: "easeOut",
    });
    return controls.stop;
  }, [value]);

  return <motion.span>{rounded}</motion.span>;
};

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

const Aboutright = () => {
  return (
    <section className="w-full text-black">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="max-w-xl"
      >
        <motion.h1
          variants={item}
          className="text-4xl sm:text-5xl font-extrabold mb-6"
        >
          About <span className="text-amber-400">Us</span>
        </motion.h1>
        <motion.p
          variants={item}
          className="text-gray-600 text-base sm:text-lg leading-relaxed"
        >
          We create unforgettable dining experiences by combining fresh
          ingredients, authentic recipes, and a passion for excellence.
        </motion.p>

        <motion.p
          variants={item}
          className="text-gray-600 text-base sm:text-lg leading-relaxed mt-4"
        >
          Our journey is built on trust, taste, and the love of our customers
          who inspire us every single day.
        </motion.p>

        <motion.div
          variants={item}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12"
        >
          <div className="rounded-2xl p-6 bg-white shadow-md flex items-center gap-5 hover:shadow-xl transition">
            <p className="text-5xl font-extrabold text-amber-400">
              <AnimatedNumber value={15} />
            </p>
            <div>
              <p className="uppercase text-xs tracking-widest text-gray-400">
                Years
              </p>
              <p className="text-lg font-semibold">Experience</p>
            </div>
          </div>

          <div className="rounded-2xl p-6 bg-white shadow-md flex items-center gap-5 hover:shadow-xl transition">
            <p className="text-5xl font-extrabold text-amber-400">
              <AnimatedNumber value={4} />
            </p>
            <div>
              <p className="uppercase text-xs tracking-widest text-gray-400">
                Experts
              </p>
              <p className="text-lg font-semibold">Master Chefs</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Aboutright;
