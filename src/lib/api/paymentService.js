import apiClient from "./config";

/**
 * Create a Stripe checkout session
 * @param {Object} paymentData - Payment information
 * @param {string} paymentData.stripePriceId - Stripe Price ID (required)
 * @param {string} paymentData.serviceId - Service identifier (used as product_id)
 * @param {string} paymentData.serviceName - Service name for better tracking
 * @param {string} paymentData.planName - Plan name for better tracking
 * @param {number} paymentData.quantity - Quantity (default: 1)
 * @param {string} paymentData.subscriptionName - Subscription name (optional)
 * @returns {Promise<Object>} Checkout session data
 */
export const createCheckoutSession = async (paymentData) => {
  try {
    // Get frontend URL from environment or use current origin
    const frontendUrl =
      import.meta.env.VITE_FRONTEND_URL || window.location.origin;

    // Build comprehensive request data with all metadata for order tracking
    const requestData = {
      price_id: paymentData.stripePriceId,
      product_id: paymentData.serviceId || null,
      quantity: paymentData.quantity || 1,
      success_url: `${frontendUrl}/payment/success`,
      cancel_url: `${frontendUrl}/payment/cancel`,
      subscription_name:
        paymentData.subscriptionName ||
        (paymentData.serviceName && paymentData.planName
          ? `${paymentData.serviceName} - ${paymentData.planName}`
          : paymentData.planName || "default"),
      // Additional metadata for better order tracking (if backend supports it)
      service_name: paymentData.serviceName || null,
      plan_name: paymentData.planName || null,
    };

    const response = await apiClient.post(
      "/stripe/checkout/session",
      requestData
    );

    return {
      success: true,
      sessionId: response.data.sessionId || response.data.session_id, // Handle both formats
      url: response.data.url,
      message: response.data.message || "Checkout session created successfully",
    };
  } catch (error) {

    // Handle specific error cases
    let errorMessage = "Failed to create checkout session. Please try again.";

    if (error.response?.status === 404) {
      errorMessage =
        "Payment endpoint not found. Please contact support or try again later.";
    } else if (error.response?.status === 500) {
      const backendMessage =
        error.response?.data?.message || error.response?.data?.error;
      if (
        backendMessage?.includes("route") &&
        backendMessage?.includes("could not be found")
      ) {
        errorMessage =
          "Payment system is not yet configured. Please contact the administrator.";
      } else {
        errorMessage =
          backendMessage || "Server error. Please try again later.";
      }
    } else if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
    } else if (error.message) {
      errorMessage = error.message;
    }

    return {
      success: false,
      error: error.response?.data,
      message: errorMessage,
    };
  }
};

/**
 * Create a Stripe checkout session for cart items
 * Requires at least one item with stripe_price_id
 * @param {Array} cartItems - Array of cart items
 * @param {number} cartItems[].id - Product ID
 * @param {string} cartItems[].name - Product name
 * @param {string} cartItems[].stripe_price_id - Stripe Price ID (required)
 * @param {number} cartItems[].quantity - Quantity
 * @returns {Promise<Object>} Checkout session data
 */
export const createCartCheckoutSession = async (cartItems) => {
  try {
    const frontendUrl =
      import.meta.env.VITE_FRONTEND_URL || window.location.origin;

    // Find item with stripe_price_id
    const itemWithPriceId = cartItems.find((item) => item.stripe_price_id);

    if (!itemWithPriceId) {
      return {
        success: false,
        message:
          "No products with valid Stripe price ID found. Please contact support.",
      };
    }

    // Calculate total quantity
    const totalQuantity = cartItems.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    const requestData = {
      price_id: itemWithPriceId.stripe_price_id,
      product_id: String(itemWithPriceId.id),
      quantity: totalQuantity,
      success_url: `${frontendUrl}/payment/success`,
      cancel_url: `${frontendUrl}/payment/cancel`,
      subscription_name: itemWithPriceId.name || "Product Purchase",
    };


    const response = await apiClient.post(
      "/stripe/checkout/session",
      requestData
    );

    return {
      success: true,
      sessionId: response.data.sessionId || response.data.session_id,
      url: response.data.url,
      message: response.data.message || "Checkout session created successfully",
    };
  } catch (error) {

    let errorMessage = "Failed to create checkout session. Please try again.";

    if (error.response?.status === 404) {
      errorMessage =
        "Checkout endpoint not found. Please contact support.";
    } else if (error.response?.status === 500) {
      const backendMessage =
        error.response?.data?.message || error.response?.data?.error;
      errorMessage = backendMessage || "Server error. Please try again later.";
    } else if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
    } else if (error.message) {
      errorMessage = error.message;
    }

    return {
      success: false,
      error: error.response?.data,
      message: errorMessage,
    };
  }
};

/**
 * Verify payment status
 * @param {string} sessionId - Stripe session ID
 * @returns {Promise<Object>} Payment status
 * @note This endpoint may not exist in all backends. Failures are handled gracefully.
 */
export const verifyPaymentStatus = async (sessionId) => {
  try {
    const response = await apiClient.get(`/payments/verify/${sessionId}`);

    return {
      success: true,
      data: response.data,
      message: response.data.message || "Payment verified",
    };
  } catch (error) {
    // If route doesn't exist (404/500), return failure gracefully
    // The UI will handle this by not showing payment details
    return {
      success: false,
      error: error.response?.data,
      message:
        error.response?.data?.message || "Payment verification not available",
    };
  }
};
