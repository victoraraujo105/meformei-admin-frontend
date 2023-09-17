import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";

const API = axios.create({
  baseURL: API_BASE_URL,
});

export default API;