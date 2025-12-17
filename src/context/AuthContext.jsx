import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { API } from "../api";
import { getAuthToken, getStoredUser, clearAuthData } from "../utils/authUtils";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Initialize user state - only set if there's a valid user with email or name
  const getInitialUser = () => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return null;
    try {
      const parsed = JSON.parse(storedUser);
      // Only return user if it has required fields (email or name)
      return parsed && (parsed.email || parsed.name) ? parsed : null;
    } catch {
      return null;
    }
  };

  const [user, setUser] = useState(getInitialUser());
  const [token, setToken] = useState(localStorage.getItem("authToken") || null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loginAPI = API.login;
  const logoutAPI = API.logout;

  useEffect(() => {
    if (token) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          const parsed = JSON.parse(storedUser);
          // Only set user if it has required fields (email or name)
          if (parsed && (parsed.email || parsed.name)) {
            setUser(parsed);
          } else {
            // Invalid user data, clear it
            setUser(null);
            setToken(null);
            localStorage.removeItem("authToken");
            localStorage.removeItem("user");
          }
        } catch {
          // Invalid JSON, clear it
          setUser(null);
          setToken(null);
          localStorage.removeItem("authToken");
          localStorage.removeItem("user");
        }
      } else {
        // No user in storage but token exists - clear token
        setUser(null);
        setToken(null);
        localStorage.removeItem("authToken");
      }
    } else {
      // No token, ensure user is null
      setUser(null);
    }
  }, [token]);

  // Listen for token expiration events from axios interceptor
  useEffect(() => {
    const handleTokenExpired = () => {
      setUser(null);
      setToken(null);
    };

    window.addEventListener("auth:token-expired", handleTokenExpired);

    return () => {
      window.removeEventListener("auth:token-expired", handleTokenExpired);
    };
  }, []);

  const login = async ({ email, password, remember = false }) => {
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      if (!loginAPI) {
        throw new Error("Login API URL is not configured");
      }
      const res = await axios.post(
        loginAPI,
        { email, password, remember },
        { withCredentials: true }
      );
      const data = await res.data;
      setUser(data.user);
      setToken(data.token);
      setMessage("Logged in successfully");
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
    } catch (e) {
      setError(e.response?.data?.message || "Invalid email or password");
      setUser(null);
      setToken(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      if (token && logoutAPI) {
        await axios.post(
          logoutAPI,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }
    } catch (e) {
      // Logout even if API call fails
    } finally {
      clearAuthData();
      setMessage("Logged out successfully");
      setUser(null);
      setToken(null);
      setLoading(false);
      window.location.reload();
    }
  };

  const checkAuth = async () => {
    const storedToken = getAuthToken();
    const storedUser = getStoredUser();

    if (storedToken && storedUser) {
      try {
        // Try to verify token with backend (optional)
        const baseUrl =
          import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";
        const response = await axios.get(`${baseUrl}/user`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });
        setUser(response.data);
        setToken(storedToken);
        localStorage.setItem("authToken", storedToken);
        localStorage.setItem("user", JSON.stringify(response.data));
      } catch (error) {
        // Token is invalid, endpoint doesn't exist, or server error - use stored user data
        if (
          error.response?.status === 404 ||
          error.response?.status === 500 ||
          error.code === "ERR_NETWORK"
        ) {
          // API endpoint doesn't exist, server error, or network error - use stored user data
          try {
            const parsed =
              typeof storedUser === "string"
                ? JSON.parse(storedUser)
                : storedUser;
            if (parsed && (parsed.email || parsed.name)) {
              setUser(parsed);
              setToken(storedToken);
            } else {
              clearAuthData();
            }
          } catch {
            clearAuthData();
          }
        } else if (error.response?.status === 401) {
          // Token is invalid (401), clear it
          clearAuthData();
          setUser(null);
          setToken(null);
        } else {
          // For other errors, use stored user data
          try {
            const parsed =
              typeof storedUser === "string"
                ? JSON.parse(storedUser)
                : storedUser;
            if (parsed && (parsed.email || parsed.name)) {
              setUser(parsed);
              setToken(storedToken);
            } else {
              clearAuthData();
            }
          } catch {
            clearAuthData();
          }
        }
      }
    } else {
      // No token or user, ensure state is cleared
      setUser(null);
      setToken(null);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        message,
        loading,
        error,
        login,
        logout,
        checkAuth,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be use within an AuthProvider");
  }
  return context;
}
