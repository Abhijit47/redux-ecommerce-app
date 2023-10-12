import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  carts: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // add to cart
    addToCart: (state, action) => {
      const itemIndex = state.carts.findIndex((item) => item.id === action.payload.id);

      if (itemIndex >= 0) {
        state.carts[itemIndex].quantity += 1;
      } else {
        const prevCount = { ...action.payload, quantity: 1 };
        state.carts = [...state.carts, prevCount];
      }

    },

    // remove particular item
    removeToCart: (state, action) => {
      const filteredItem = state.carts.filter((item) => item.id !== action.payload);
      state.carts = filteredItem;
    },

    // decrement cart item count
    decrementCartItem: (state, action) => {
      const itemIndex = state.carts.findIndex((item) => item.id === action.payload.id);

      if (state.carts[itemIndex].quantity >= 1) {
        state.carts[itemIndex].quantity -= 1;
      }
    },

    // clear all items in cart
    emptyCartItems: (state, action) => {
      state.carts = [];
    }
  }
});

export const { addToCart, removeToCart, decrementCartItem, emptyCartItems } = cartSlice.actions;

export default cartSlice.reducer;