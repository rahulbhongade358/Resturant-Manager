import { createContext, useReducer } from "react";
import { cartreducer } from "../Reducer/CartReducer.js";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItem, dispatch] = useReducer(cartreducer, []);

  const addtocart = (item) => {
    dispatch({ type: "ADD_TO_CART", payload: item });
  };

  return (
    <CartContext.Provider value={{ cartItem, addtocart }}>
      {children}
    </CartContext.Provider>
  );
};
