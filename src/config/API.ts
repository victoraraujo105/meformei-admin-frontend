import axios from "axios";

import { parseCookies } from "nookies";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";

const { token } = parseCookies();

export const getApi = () => {
  const api = axios.create({
    baseURL: API_BASE_URL,
  });

  if (token) {
    api.defaults.headers["Authorization"] = `Bearer ${token}`;
  }

  return api;
};
const API = getApi();

export default API;
