import axios from "axios";

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
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle errors globally (including 401/403)
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors here
    if (error.response) {
      // Server responded with error status
      console.error("API Error:", error.response.data);

      // Handle unauthorized (401) or forbidden (403) errors
      if (error.response.status === 401 || error.response.status === 403) {
        // Clear auth data and redirect to login
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        // Optionally dispatch logout action if you have access to store
        // For now, we'll let components handle this
        if (window.location.pathname !== "/user") {
          window.location.href = "/user";
        }
      }
    } else if (error.request) {
      // Request was made but no response received
      console.error("Network Error:", error.request);
    } else {
      // Something else happened
      console.error("Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
export { API_BASE_URL };

