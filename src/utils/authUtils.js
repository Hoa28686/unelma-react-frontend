/**
 * Authentication utility functions
 * Centralizes common authentication patterns used across the app
 */

/**
 * Get authentication token from localStorage (checks authToken key used by AuthContext)
 * @returns {string|null} The token or null if not found
 */
export const getAuthToken = () => {
  return localStorage.getItem("authToken") || localStorage.getItem("token");
};

/**
 * Get user data from localStorage
 * @returns {object|null} The user object or null if not found
 */
export const getStoredUser = () => {
  const userStr = localStorage.getItem("user");
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
};

/**
 * Clear all authentication data from localStorage
 */
export const clearAuthData = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
