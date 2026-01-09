import React from "react";
import Leftsection from "./LeftSection/Leftsection.jsx";
import Rightsection from "./RightSection/Rightsection.jsx";

const Hero = () => {
  return (
    <section className="min-h-screen bg-slate-900 text-white flex flex-col lg:flex-row items-center justify-center px-5 sm:px-8 md:px-12 lg:px-20 py-10 lg:py-0 overflow-hidden">
      <Leftsection />
      <Rightsection />
    </section>
  );
};

export default Hero;
