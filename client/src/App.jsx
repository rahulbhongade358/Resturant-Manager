import React from "react";
import Navbar from "./Component/Navbar";

const App = () => {
  return (
    <div>
      <Navbar />
      <div className="mt-6 flex justify-center items-center font-serif font-semibold text-2xl">
        <h1>Welcome to the Restaurant </h1>
      </div>
    </div>
  );
};

export default App;
