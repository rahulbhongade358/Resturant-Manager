import React from "react";
import Aboutleft from "./LeftSection/Aboutleft";
import Aboutright from "./RightSection/Aboutright";

const About = () => {
  return (
    <div className="flex mt-30 m-20">
      <Aboutleft />
      <Aboutright />
    </div>
  );
};

export default About;
