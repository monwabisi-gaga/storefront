import { createReducer } from '@reduxjs/toolkit';
import { addToCart, removeFromCart, addToCartError } from './cartActions';
import { Product } from '../../types';

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  error: string | null;
}

const initialState: CartState = {
  items: [],
  error: null,
};

const cartReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addToCart, (state, action) => {
      const { product, quantity } = action.payload;

      // Check if the product already exists in the cart
      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ ...product, quantity });
      }
      state.error = null; // Clear any previous errors
    })
    .addCase(removeFromCart, (state, action) => {
      const indexToRemove = state.items.findIndex(
        (item) => item.id === action.payload
      );
      if (indexToRemove !== -1) {
        state.items.splice(indexToRemove, 1);
      }
    })
    .addCase(addToCartError, (state, action) => {
      state.error = action.payload;
    });
});

export default cartReducer;
