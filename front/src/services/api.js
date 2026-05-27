import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically add the JWT token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  const accountType = localStorage.getItem("demo_plan") || "free";
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers["X-Account-Type"] = accountType;
  return config;
});

export default api;