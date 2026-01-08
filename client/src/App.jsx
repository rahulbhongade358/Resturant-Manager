import React from "react";
import Navbar from "./Component/Navbar";
import Hero from "./Component/HomeSection/HeroSection/Hero";
import Featurescards from "./Component/FeaturesSection/Featurescards";
import About from "./Component/AboutSection/About";

const App = () => {
  return (
    <div>
      <Navbar />
      {/* <div className="mt-6 flex justify-center items-center font-serif font-semibold text-2xl">
        <h1>Welcome to the Restaurant </h1>
      </div> */}
      <div className="bg-gray-100">
        <Hero />
        <Featurescards />
        <About />
      </div>
    </div>
  );
};

export default App;
