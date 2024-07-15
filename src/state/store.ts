import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types';
import authReducer from './auth/authSlice';
import axios from 'axios';

interface CartState {
  items: (Product & { quantity: number })[];
}

interface ProductState {
  items: Product[];
  categories: string[];
  loading: boolean;
  error: string | null;
}

const initialCartState: CartState = {
  items: [],
};

const initialProductState: ProductState = {
  items: [],
  categories: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartState,
  reducers: {
    addToCart(
      state,
      action: PayloadAction<{ product: Product; quantity: number }>
    ) {
      const { product, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ ...product, quantity });
      }
    },
    removeFromCart(state, action: PayloadAction<number>) {
      const index = state.items.findIndex((item) => item.id === action.payload);
      if (index !== -1) {
        state.items.splice(index, 1);
      }
    },
  },
});

const productSlice = createSlice({
  name: 'products',
  initialState: initialProductState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    setProducts(state, action: PayloadAction<Product[]>) {
      state.items = action.payload;
    },
    addProducts(state, action: PayloadAction<Product[]>) {
      state.items = [...state.items, ...action.payload];
    },
    removeProducts(state, action: PayloadAction<string>) {
      state.items = state.items.filter(
        (product) => product.category !== action.payload
      );
    },
    setCategories(state, action: PayloadAction<string[]>) {
      state.categories = action.payload;
    },
  },
});

export const {
  setLoading,
  setError,
  setProducts,
  addProducts,
  removeProducts,
  setCategories,
} = productSlice.actions;
export const { addToCart, removeFromCart } = cartSlice.actions;

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    products: productSlice.reducer,
    auth: authReducer,
  },
});

export const fetchAllProducts = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/products`
    );
    dispatch(setProducts(response.data));
  } catch (error) {
    dispatch(setError('Failed to fetch products'));
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchCategories = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/products/categories`
    );
    dispatch(setCategories(response.data));
  } catch (error) {
    dispatch(setError('Failed to fetch categories'));
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchProductsByCategory =
  (category: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/products/category/${category}`
      );
      dispatch(addProducts(response.data));
    } catch (error) {
      dispatch(setError('Failed to fetch products'));
    } finally {
      dispatch(setLoading(false));
    }
  };

export const removeProductsByCategory =
  (category: string) => (dispatch: AppDispatch) => {
    dispatch(removeProducts(category));
  };

export const fetchProductsSorted =
  (sortOrder: 'asc' | 'desc') => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/products?sort=${sortOrder}`
      );
      dispatch(setProducts(response.data));
    } catch (error) {
      dispatch(setError('Failed to fetch sorted products'));
    } finally {
      dispatch(setLoading(false));
    }
  };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
