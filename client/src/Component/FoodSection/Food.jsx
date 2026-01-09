import React from "react";
import { useApi } from "../../Context/ApiContext";
import { Link } from "react-router";

const Food = () => {
  const { menu } = useApi();
  return (
    <section className="w-full px-4 sm:px-8 lg:px-20 py-20 ">
      <div className="text-center mb-14">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-3">
          Most Popular <span className="text-amber-400">Dishes</span>
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Discover our most loved dishes crafted with fresh ingredients and
          authentic flavors.
        </p>
      </div>

      <div className="max-h-[50vh] overflow-y-auto scrollbar-hide pr-1 border-l-6 border-amber-400">
        <div className="flex flex-col gap-3">
          {menu.map((item) => (
            <div
              key={item._id}
              className="flex items-center bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition p-3 sm:p-4"
            >
              <div className="w-24 h-24 sm:w-28 sm:h-28 shrink-0 rounded-lg overflow-hidden">
                <img
                  src={item.imageURL}
                  alt={item.Dishname}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="ml-4">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                  {item.Dishname}
                </h3>

                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {item.decription}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center items-center m-5 ">
        <Link
          to="/menu"
          className="bg-amber-500 p-5 rounded-2xl text-lg text-white font-semibold cursor-pointer active:scale-90 active:bg-amber-400 uppercase"
        >
          Order menu
        </Link>
      </div>
    </section>
  );
};

export default Food;
