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

    default:
      return state;
  }
};
