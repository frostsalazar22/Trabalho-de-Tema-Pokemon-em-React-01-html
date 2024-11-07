// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api'  // Ajuste o URL conforme necessário
});

export default api;
