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
    <section className=" text-black px-6 sm:px-10 lg:px-24 py-20">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="max-w-6xl"
      >
        {/* Heading */}
        <motion.h1
          variants={item}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-8"
        >
          About <span className="text-amber-400">Us</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={item}
          className="text-gray-700 text-base sm:text-lg leading-relaxed max-w-3xl"
        >
          We create unforgettable dining experiences by combining fresh
          ingredients, authentic recipes, and a passion for excellence.
        </motion.p>

        <motion.p
          variants={item}
          className="text-gray-700 text-base sm:text-lg leading-relaxed max-w-3xl mt-4"
        >
          Our journey is built on trust, taste, and the love of our customers
          who inspire us every single day.
        </motion.p>

        {/* Stats Cards */}
        <motion.div
          variants={item}
          className="grid grid-cols-1 sm:grid-cols-2 gap-15 mt-14"
        >
          {/* Experience */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex items-center gap-2 hover:border-amber-400 transition">
            <p className="text-5xl sm:text-6xl font-extrabold text-amber-400">
              <AnimatedNumber value={15} />
            </p>
            <div>
              <p className="uppercase text-xs tracking-widest text-gray-400">
                Years
              </p>
              <p className="text-lg font-semibold">Experience</p>
            </div>
          </div>

          {/* Chefs */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex items-center gap-6 hover:border-amber-400 transition">
            <p className="text-5xl sm:text-6xl font-extrabold text-amber-400">
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
