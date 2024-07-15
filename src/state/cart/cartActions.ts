// src/state/cart/cartActions.ts

import { createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Product } from '../../types';
import { AppDispatch } from '../store';

export const addToCart = createAction<{
  product: Product;
  quantity: number;
}>('cart/addToCart');

export const removeFromCart = createAction<number>('cart/remove');

export const addToCartError = createAction<string>('cart/addToCartError');

export const addToUserCart = (product: Product, quantity: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_BASE_URL}/carts/7`, {
        userId: 3,
        date: '2020-02-03',
        products: [{ productId: product.id, quantity: quantity }],
      });
      dispatch(addToCart({ product, quantity }));
    } catch (error) {
      dispatch(addToCartError('Failed to add item to cart. Please try again.'));
    }
  };
};
