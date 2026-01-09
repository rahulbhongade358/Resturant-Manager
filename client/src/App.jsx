import React from "react";
import Navbar from "./Component/Navbar";
import Hero from "./Component/HomeSection/HeroSection/Hero";
import Featurescards from "./Component/FeaturesSection/Featurescards";
import About from "./Component/AboutSection/About";
import Food from "./Component/FoodSection/Food";
import Work from "./Component/WorkSection/Work";
import Testimonials from "./Component/Testimonals/Testimonals";
import Footer from "./Component/Footer/Footer";

const App = () => {
  return (
    <div>
      <Navbar />

      <div className="bg-gray-100">
        <section id="home">
          <Hero />
        </section>

        <section id="features">
          <Featurescards />
        </section>

        <section id="about">
          <About />
        </section>

        <section id="menu">
          <Food />
        </section>

        <section id="work">
          <Work />
        </section>

        <section id="testimonials">
          <Testimonials />
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default App;
