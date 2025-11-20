import apiClient from "./config";

/**
 * Submit contact form to backend
 * @param {Object} formData - Contact form data
 * @param {string} formData.name - User's name
 * @param {string} formData.email - User's email
 * @param {string} formData.message - User's message
 * @returns {Promise} API response
 */
export const submitContactForm = async (formData) => {
  try {
    const response = await apiClient.post("/contact/submit", formData);
    return {
      success: true,
      data: response.data,
      message: response.data?.message || "Message sent successfully!",
    };
  } catch (error) {
    // Handle different error scenarios
    if (error.response) {
      // Server responded with error status
      return {
        success: false,
        error: error.response.data,
        message:
          error.response.data?.message ||
          error.response.data?.error ||
          "Failed to send message. Please try again.",
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
        message: "An unexpected error occurred. Please try again.",
      };
    }
  }
};

