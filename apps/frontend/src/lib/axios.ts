import axios from 'axios';

import Cookies from 'js-cookie';
import { JWT_COOKIE_NAME } from '@/app/auth/constanst';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = Cookies.get(JWT_COOKIE_NAME) || '';
  console.log('Using token:', token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
