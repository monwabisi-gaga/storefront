import axios from 'axios';


export const getProducts = async (page = 1, limit = 6) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/products?limit=${limit}&page=${page}`
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Failed to load products", error.response?.data?.message);
    } else {
      console.error('Failed to load products', error);
    }
    throw error;
  }
};

export const registerUser = async (userData: {
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
      console.error("Error registering user", error.response?.data?.message);
    } else {
      console.error("Error registering user", error);
    }
    throw error;
  }
};

export const loginUser = async (credentials: {
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
      console.error("Error loging in", error.response?.data?.message);
    } else {
      console.error("Error loging in", error);
    }
    throw error;
  }
};

export const deleteUser = async (userId: number) => {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_API_BASE_URL}/users/${userId}`
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Error deleting user", error.response?.data?.message);
    } else {
      console.error("Error deleting user", error);
    }
    throw error;
  }
};

export const createCart = async (userId: number) => {
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
      console.error("Failed creating cart", error.response?.data?.message);
    } else {
      console.error("Failed creating cart", error);
    }
    throw error;
  }
};

export const addProduct = async (productData: {
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
      console.error("Error adding product", error.response?.data?.message);
    } else {
      console.error("Error adding product", error);
    }
    throw error;
  }
};

export const updateProduct = async (
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
      console.error("Error updating product", error.response?.data?.message);
    } else {
      console.error("Error updating product", error);
    }
    throw error;
  }
};

export const deleteProduct = async (productId: number) => {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_API_BASE_URL}/products/${productId}`
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Error deleting product", error.response?.data?.message);
    } else {
      console.error("Error deleting product", error);
    }
    throw error;
  }
};
