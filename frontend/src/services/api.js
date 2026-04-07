import axios from 'axios';

const API_BASE_URL = "/api";
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getProducts = async () => {
  const response = await api.get('/products');
  return response.data;
};

export const getCategories = async () => {
  const response = await api.get('/categories');
  return response.data;
};

export const getCart = async () => {
  const response = await api.get('/cart');
  return response.data;
};

export const getCartTotal = async () => {
  const response = await api.get('/cart/total');
  return response.data;
};

export const addToCart = async (productId) => {
  const response = await api.post('/cart/add', { productId });
  return response.data;
};

export const removeFromCart = async (productId) => {
  const response = await api.post('/cart/remove', { productId });
  return response.data;
};

export default api;