import apiClient from "./config";
import axios from "axios";

/**
 * Subscribe to Unelma Mail newsletter
 * @param {Object} subscriptionData - Subscription data
 * @param {string} subscriptionData.email - User's email address
 * @returns {Promise} API response
 */
export const subscribeToNewsletter = async (subscriptionData) => {
  try {
    // Use UnelmaMail API URL from environment variable
    // The base URL already includes /api/v1, so we just append /subscribers
    const UNELMAMAIL_BASE_URL = import.meta.env.VITE_UNELMA_MAIL_BASE_URL || import.meta.env.UNELMA_MAIL_BASE_URL;
    const UNELMAMAIL_API_KEY = import.meta.env.VITE_UNELMA_MAIL_API_KEY || import.meta.env.UNELMA_MAIL_API_KEY;
    const UNELMAMAIL_LIST_UID = import.meta.env.VITE_UNELMA_MAIL_LIST_UID || import.meta.env.UNELMA_MAIL_LIST_UID;
    
    if (!UNELMAMAIL_BASE_URL) {
      throw new Error("UnelmaMail API URL is not configured. Please set VITE_UNELMA_MAIL_BASE_URL in your .env file.");
    }
    
    if (!UNELMAMAIL_API_KEY) {
      throw new Error("UnelmaMail API key is not configured. Please set VITE_UNELMA_MAIL_API_KEY in your .env file.");
    }
    
    if (!UNELMAMAIL_LIST_UID) {
      throw new Error("UnelmaMail list UID is not configured. Please set VITE_UNELMA_MAIL_LIST_UID in your .env file.");
    }
    
    // Prepare request data - list_uid is required for POST /api/v1/subscribers
    // Note: UnelmaMail API expects EMAIL (uppercase) field name
    const requestData = {
      EMAIL: subscriptionData.email,
      list_uid: UNELMAMAIL_LIST_UID,
    };
    
    // Prepare headers - UnelmaMail API authentication
    // Try different common authentication methods
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      // Try Authorization header (Bearer token format)
      "Authorization": `Bearer ${UNELMAMAIL_API_KEY}`,
      // Also try as API-Key header (some APIs use this)
      "API-Key": UNELMAMAIL_API_KEY,
      // And X-API-Key as another common format
      "X-API-Key": UNELMAMAIL_API_KEY,
    };
    
    const response = await axios.post(`${UNELMAMAIL_BASE_URL}/subscribers`, requestData, {
      headers,
    });
    return {
      success: true,
      data: response.data,
      message: response.data?.message || "Successfully subscribed to newsletter!",
    };
  } catch (error) {
    // Handle different error scenarios
    console.error("Subscription error:", error);
    
    if (error.message && error.message.includes("not configured")) {
      // Configuration error
      return {
        success: false,
        error: null,
        message: error.message,
      };
    }
    
    if (error.response) {
      // Server responded with error status
      const errorData = error.response.data;
      console.error("API Error Response:", errorData); // Log full error for debugging
      
      // Extract validation error messages
      let errorMessage = null;
      if (errorData?.EMAIL && Array.isArray(errorData.EMAIL) && errorData.EMAIL.length > 0) {
        errorMessage = errorData.EMAIL[0];
      } else if (errorData?.email && Array.isArray(errorData.email) && errorData.email.length > 0) {
        errorMessage = errorData.email[0];
      } else if (errorData?.errors?.EMAIL && Array.isArray(errorData.errors.EMAIL) && errorData.errors.EMAIL.length > 0) {
        errorMessage = errorData.errors.EMAIL[0];
      } else if (errorData?.errors?.email && Array.isArray(errorData.errors.email) && errorData.errors.email.length > 0) {
        errorMessage = errorData.errors.email[0];
      } else if (errorData?.message) {
        errorMessage = errorData.message; // Keep original message for bug detection
      }
      
      // Check if this is a "duplicate email" error (already subscribed)
      const isDuplicateEmail = errorMessage && (
        errorMessage.toLowerCase().includes('already been taken') ||
        errorMessage.toLowerCase().includes('already exists') ||
        errorMessage.toLowerCase().includes('already subscribed')
      );
      
      // Check if this is the known UnelmaMail server bug (subscriber is created but server returns 500)
      // The error message contains "Undefined variable $errors" which happens after successful subscription
      const isUnelmaMailServerBug = errorMessage && (
        errorMessage.includes('Undefined variable $errors') ||
        errorMessage.includes('_subscribe_form.blade.php')
      );
      
      // If it's a duplicate email, treat it as a success case (user-friendly)
      if (isDuplicateEmail && error.response.status === 403) {
        return {
          success: true, // Treat as success since they're already subscribed
          error: null,
          message: "You're already subscribed to our newsletter!",
        };
      }
      
      // If it's the known server bug, treat as success (subscriber was created despite the error)
      if (isUnelmaMailServerBug && error.response.status === 500) {
        return {
          success: true, // Subscriber was created successfully
          error: null,
          message: "Successfully subscribed! Please check your email to confirm your subscription.",
        };
      }
      
      // For other 500 errors, show a user-friendly message instead of technical server errors
      if (!errorMessage && error.response.status === 500) {
        errorMessage = "We're experiencing technical difficulties. Please try again later or contact support.";
      }
      
      return {
        success: false,
        error: errorData,
        message:
          errorMessage ||
          errorData?.error ||
          `Failed to subscribe. ${error.response.status === 400 ? 'Invalid email address or missing required fields.' : error.response.status === 401 ? 'Authentication failed. Please check your API key configuration.' : error.response.status === 403 ? 'Access forbidden or validation error. Please check your email and configuration.' : error.response.status === 500 ? 'Server error. Please try again later or contact support.' : error.response.status === 409 ? 'Email already subscribed.' : 'Please try again.'}`,
      };
    } else if (error.request) {
      // Request was made but no response received
      return {
        success: false,
        error: null,
        message: "Network error. Please check your connection and try again.",
      };
    } else {
      // Something else happened
      return {
        success: false,
        error: null,
        message: error.message || "An unexpected error occurred. Please try again.",
      };
    }
  }
};

