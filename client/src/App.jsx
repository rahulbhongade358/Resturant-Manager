import React from "react";
import Navbar from "./Component/Navbar";
import Hero from "./Component/HomeSection/HeroSection/Hero";
import Featurescards from "./Component/FeaturesSection/Featurescards";
import About from "./Component/AboutSection/About";
import Food from "./Component/FoodSection/Food";
import Work from "./Component/WorkSection/Work";
import Testimonials from "./Component/Testimonals/Testimonals";

const App = () => {
  return (
    <div>
      <Navbar />

      <div className="bg-gray-100">
        <Hero />
        <Featurescards />
        <About />
        <Food />
        <Work />
        <Testimonials />
      </div>
    </div>
  );
};

export default App;
