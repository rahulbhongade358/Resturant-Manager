export const cartreducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const exit = state.find((item) => item._id === action.payload._id);

      if (exit) {
        return state.map((item) =>
          item._id === action.payload._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...state, { ...action.payload, quantity: 1 }];

    case "INCREASE_QTY":
      return state.map((item) =>
        item._id === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

    case "DECREASE_QTY":
      return state
        .map((item) =>
          item._id === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);

    case "REMOVE_ITEM":
      return state.filter((item) => item._id !== action.payload);

    case "CLEAR_CART":
      return [];

    default:
      return state;
  }
};
