import { createSlice } from "@reduxjs/toolkit";

const loadCart = () => {
  try {
    const data = localStorage.getItem("cartItems");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

const save = items => {
  localStorage.setItem("cartItems", JSON.stringify(items));
}

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: loadCart(), },
  reducers: {
    addCart: (state, { payload }) => {
      const { qty = 1, ...product } = payload;
      const item = state.items.find(i => i.id === product.id);

      if (item) return;
      state.items.push({
        ...product, quantity: Math.min(qty, 10),
      });
      save(state.items);
    },

    removeCart: (state, { payload }) => {
      const item = state.items.find(i => i.id === payload.id);

      if (item) {
        item.quantity > 1 ? item.quantity-- : state.items.splice(state.items.indexOf(item), 1);
      }
      save(state.items);
    },

    clearAll: state => {
      state.items = [];
      save(state.items);
    }
  }
});
export const { addCart, removeCart, clearAll } = cartSlice.actions;
export default cartSlice.reducer;