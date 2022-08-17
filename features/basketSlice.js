import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    increment: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    decrement: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      const newItems = [...state.items];

      if (index >= 0) {
        newItems.splice(index, 1);
        state.items = newItems;
      } else {
        console.warn("cannot decrement item that is not in basket");
      }
    },
    removeAll: (state, actions) => {
      state.items = [];
    },
  },
});

export const { increment, decrement, removeAll } = basketSlice.actions;

export const selectedBasketItems = (state) => state.basket.items;

export const selectedBasketItemsWithId = (state, id) => {
  return state.basket.items.filter((item) => item.id === id);
};

export const selectedBasketTotals = (state) =>
  state.basket.items.reduce((total, item) => total + item.price, 0);

export default basketSlice.reducer;
