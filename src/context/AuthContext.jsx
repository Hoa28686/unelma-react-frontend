import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user") || "{}")
  );
  const [token, setToken] = useState(localStorage.getItem("authToken") || null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loginAPI = import.meta.env.VITE_LOGIN_API_URL;
  const logoutAPI = import.meta.env.VITE_LOGOUT_API_URL;

  useEffect(() => {
    if (token) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, [token]);

  const login = async ({ email, password, remember = false }) => {
    setLoading(true);
    setError(null);
    try {
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
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    setError(null);
    try {
      await axios.post(
        logoutAPI,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (e) {
      setError(e.response?.data?.message || "Logout failed");
    } finally {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      setMessage("Logged out successfully");
      setUser({});
      setToken(null);
      setLoading(false);
    }
    setUser(null);
    localStorage.removeItem("user");
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
