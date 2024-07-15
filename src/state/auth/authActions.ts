import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  loginUser as loginService,
  registerUser as registerService,
} from '../../services/api';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: { username: string; password: string }, thunkAPI) => {
    try {
      const response = await loginService(credentials);
      return response.token;
    } catch (error) {
      return thunkAPI.rejectWithValue('Login failed');
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (
    userData: { username: string; password: string; email: string },
    thunkAPI
  ) => {
    try {
      await registerService(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue('Registration failed');
    }
  }
);
