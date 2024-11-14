// src/api/apiClient.ts
import { BASE_URL } from "./constant/constant";
import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

// Create an Axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL, // Replace with your API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor (use InternalAxiosRequestConfig)
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Ensure headers are always an object
    config.headers = config.headers || {};

    // Add token or any custom header if needed
    const token = localStorage.getItem("token"); // Example: Retrieve token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor (optional)
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    // Handle errors globally
    if (error.response?.status === 401) {
      // Handle unauthorized access (e.g., redirect to login)
    }
    return Promise.reject(error);
  }
);

export default apiClient;
