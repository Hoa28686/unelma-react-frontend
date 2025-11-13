/**
 * Authentication utility functions
 * Centralizes common authentication patterns used across the app
 */

/**
 * Get authentication token from localStorage (checks both Redux and AuthContext keys)
 * @returns {string|null} The token or null if not found
 */
export const getAuthToken = () => {
  return localStorage.getItem("token") || localStorage.getItem("authToken");
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
  localStorage.removeItem("token");
  localStorage.removeItem("authToken");
  localStorage.removeItem("user");
};

/**
 * Get user from multiple sources (Redux, AuthContext, localStorage)
 * @param {object} reduxUser - User from Redux store
 * @param {object} authContextUser - User from AuthContext
 * @returns {object|null} The user object or null
 */
export const getUserFromSources = (reduxUser, authContextUser) => {
  return reduxUser || authContextUser || getStoredUser();
};

/**
 * Check if user is authenticated based on multiple sources
 * @param {boolean} reduxIsAuthenticated - Authentication status from Redux
 * @param {string|null} reduxToken - Token from Redux
 * @param {string|null} authContextToken - Token from AuthContext
 * @param {object|null} user - User object from any source
 * @returns {boolean} True if user is authenticated
 */
export const isUserAuthenticated = (
  reduxIsAuthenticated,
  reduxToken,
  authContextToken,
  user
) => {
  const hasToken = reduxToken || authContextToken || getAuthToken();
  const hasUser = user && (user.email || user.name || Object.keys(user).length > 0);
  return reduxIsAuthenticated || !!hasToken || !!hasUser;
};

