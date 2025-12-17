import axios from "axios";
import { getAuthToken, clearAuthData } from "../../utils/authUtils";

// Get API base URL from environment variable or use default
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 10000, // 10 seconds
});

// Request interceptor - automatically add auth tokens
apiClient.interceptors.request.use(
  (config) => {
    // Check both 'token' (Redux) and 'authToken' (AuthContext) for compatibility
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle errors globally (including 401)
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors here
    if (error.response) {
      // Server responded with error status
      // Handle unauthorized (401)
      if (error.response.status === 401) {
        // Clear auth data and redirect to login using utility
        clearAuthData();
        // Components using AuthContext will automatically update when auth state changes
        if (
          window.location.pathname !== "/user" &&
          window.location.pathname !== "/login"
        ) {
          window.location.href = "/login";
        }
      }
    } else if (error.request) {
      // Request was made but no response received
    } else {
      // Something else happened
    }
    return Promise.reject(error);
  }
);

export default apiClient;
export { API_BASE_URL };
