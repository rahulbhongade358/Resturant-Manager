import { createContext, useReducer } from "react";
import { cartreducer } from "../Reducer/CartReducer.js";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItem, dispatch] = useReducer(cartreducer, []);

  const addtocart = (item) => {
    dispatch({ type: "ADD_TO_CART", payload: item });
  };
  const increaseqty = (id) => {
    dispatch({ type: "INCREASE_QTY", payload: id });
  };
  const decreaseqty = (id) => {
    dispatch({ type: "DECREASE_QTY", payload: id });
  };
  const removeitem = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };
  const clearcart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <CartContext.Provider
      value={{
        cartItem,
        addtocart,
        increaseqty,
        decreaseqty,
        removeitem,
        clearcart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
