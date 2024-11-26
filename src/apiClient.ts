/* eslint-disable @typescript-eslint/ban-ts-comment */
// src/api/apiClient.ts
import { BASE_URL } from "./constant/constant";
import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
const handleLogout = async () => {
  try {
    localStorage.clear();
    window.location.href = "/";
  } catch (error) {
    console.log("error :", error);
  }
};
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
    const token = localStorage.getItem("a_token"); // Example: Retrieve token from localStorage
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
    // Return the API response data on success
    if (
      response.config.url === "/users/new-access-token" &&
      response.data?.accessToken
    ) {
      localStorage.setItem("a_token", response.data.accessToken);
    }
    // if (response.status >= 200 && response.status < 300) {
    //   return response;
    // }
    return response;
  },
  async (error) => {
    // Handle errors globally
    if (error.response?.status === 440) {
      const { config } = error;
      if (config.rd_state) {
        config.rd_state++;
      } else {
        config.rd_state = 1;
      }
      if (config.rd_state > 2) {
        handleLogout();
        return Promise.reject();
        // we can send user top login screen if request faild 2 times
      }
      //call regen api
      await apiClient.post(
        "/users/new-access-token",
        { token: localStorage.getItem("r_token") },
        // @ts-expect-error
        { rd_state: config.rd_state }
      );
      return apiClient(config);
      // Handle unauthorized access (e.g., redirect to login)
    }
    return Promise.reject(error);
  }
);

export default apiClient;
