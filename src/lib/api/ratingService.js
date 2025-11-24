import apiClient from "./config";

/**
 * Submit a product rating
 * @param {Object} ratingData - Rating data
 * @param {number} ratingData.productId - Product ID
 * @param {number} ratingData.rating - Rating value (1-5)
 * @param {string} ratingData.comment - Optional comment/review
 * @returns {Promise} API response
 */
export const submitProductRating = async (ratingData) => {
  try {
    const response = await apiClient.post("/products/rate", ratingData);
    return {
      success: true,
      data: response.data,
      message: response.data?.message || "Rating submitted successfully!",
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
          "Failed to submit rating. Please try again.",
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

