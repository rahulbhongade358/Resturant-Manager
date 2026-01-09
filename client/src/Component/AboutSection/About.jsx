import Aboutleft from "./LeftSection/Aboutleft";
import Aboutright from "./RightSection/Aboutright";

const About = () => {
  return (
    <section className="w-full px-4 sm:px-8 lg:px-20 py-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 ">
        <Aboutleft />
        <Aboutright />
      </div>
    </section>
  );
};

export default About;
