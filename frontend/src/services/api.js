import axios from 'axios';

const BASE_URL = `http://192.168.1.104:3000/api`;

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
export const API_URL = BASE_URL;
export default api;
