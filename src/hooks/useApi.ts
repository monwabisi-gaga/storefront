// src/hooks/useApi.ts
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const useApi = () => {
  const { t } = useTranslation();

  const getProducts = async (page = 1, limit = 6) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/products?limit=${limit}&page=${page}`
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(t('failToLoadProducts'), error.response?.data?.message);
      } else {
        console.error(t('failToLoadProducts'), error);
      }
      throw error;
    }
  };

  const registerUser = async (userData: {
    username: string;
    password: string;
    email: string;
  }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/users`,
        userData
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(t('errorRegisteringUser'), error.response?.data?.message);
      } else {
        console.error(t('errorRegisteringUser'), error);
      }
      throw error;
    }
  };

  const loginUser = async (credentials: {
    username: string;
    password: string;
  }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/auth/login`,
        credentials
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(t('loginFail'), error.response?.data?.message);
      } else {
        console.error(t('loginFail'), error);
      }
      throw error;
    }
  };

  const deleteUser = async (userId: number) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/users/${userId}`
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(t('errorDeletingUser'), error.response?.data?.message);
      } else {
        console.error(t('errorDeletingUser'), error);
      }
      throw error;
    }
  };

  const createCart = async (userId: number) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/carts`,
        {
          userId,
          date: new Date(),
          products: [],
        }
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(t('failedCreatingCart'), error.response?.data?.message);
      } else {
        console.error(t('failedCreatingCart'), error);
      }
      throw error;
    }
  };

  const addProduct = async (productData: {
    title: string;
    price: number;
    description: string;
    image: string;
    category: string;
  }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/products`,
        productData
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(t('errorAddingProduct'), error.response?.data?.message);
      } else {
        console.error(t('errorAddingProduct'), error);
      }
      throw error;
    }
  };

  const updateProduct = async (
    productId: number,
    productData: {
      title: string;
      price: number;
      description: string;
      image: string;
      category: string;
    }
  ) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/products/${productId}`,
        productData
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(t('errorUpdatingProduct'), error.response?.data?.message);
      } else {
        console.error(t('errorUpdatingProduct'), error);
      }
      throw error;
    }
  };

  const deleteProduct = async (productId: number) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/products/${productId}`
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(t('errorDeletingProduct'), error.response?.data?.message);
      } else {
        console.error('errorDeletingProduct:', error);
      }
      throw error;
    }
  };

  return {
    getProducts,
    registerUser,
    loginUser,
    deleteUser,
    createCart,
    addProduct,
    updateProduct,
    deleteProduct,
  };
};

export default useApi;
