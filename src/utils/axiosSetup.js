import axios from "axios";
import { clearAuthData } from "./authUtils";

// Set up global axios interceptor to handle 401 errors
// This will catch all axios requests, not just apiClient
let isRedirecting = false;

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 errors globally
    if (error.response && error.response.status === 401) {
      // Only redirect once to prevent multiple redirects
      if (!isRedirecting) {
        isRedirecting = true;

        // Clear auth data
        clearAuthData();

        // Clear user state by dispatching a custom event
        // This allows AuthContext to listen and update
        window.dispatchEvent(new CustomEvent("auth:token-expired"));

        // Redirect to login if not already there
        if (
          window.location.pathname !== "/login" &&
          window.location.pathname !== "/user"
        ) {
          // Use a small delay to ensure state is cleared
          setTimeout(() => {
            window.location.href = "/login";
            isRedirecting = false;
          }, 100);
        } else {
          isRedirecting = false;
        }
      }
    }
    return Promise.reject(error);
  }
);

export default axios;


