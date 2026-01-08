import React from "react";
import Cards from "./Cards";
import {
  Headset,
  ShieldUser,
  ShoppingCart,
  UtensilsCrossed,
} from "lucide-react";

const Featurescards = () => {
  const cardsdata = [
    {
      icon: ShieldUser,
      title: "Master Chefs",
      info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima.",
    },
    {
      icon: UtensilsCrossed,
      title: "Quality Food",
      info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima.",
    },
    {
      icon: ShoppingCart,
      title: "Easy to Order",
      info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima.",
    },
    {
      icon: Headset,
      title: "Easy to Order",
      info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima.",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  px-4">
      {cardsdata.map((card, index) => (
        <Cards key={index} props={card} />
      ))}
    </div>
  );
};

export default Featurescards;
