import React, { useEffect, useState } from "react";

function Unauthorized() {
  const [counter, setCounter] = useState(5);

  useEffect(() => {
    if (counter === 0) {
      window.location.href = "/";
      return;
    }

    const timer = setTimeout(() => {
      setCounter(counter - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [counter]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold text-red-600 mb-4">
        Unauthorized Access!
      </h1>
      <p className="text-lg mb-2">
        You will be redirected to Home Page in {counter} seconds...
      </p>
    </div>
  );
}

export default Unauthorized;
