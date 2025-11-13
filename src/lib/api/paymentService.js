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
    const frontendUrl = import.meta.env.VITE_FRONTEND_URL || window.location.origin;

    // Build comprehensive request data with all metadata for order tracking
    const requestData = {
      price_id: paymentData.stripePriceId,
      product_id: paymentData.serviceId || null,
      quantity: paymentData.quantity || 1,
      success_url: `${frontendUrl}/payment/success`,
      cancel_url: `${frontendUrl}/payment/cancel`,
      subscription_name: paymentData.subscriptionName || 
                        (paymentData.serviceName && paymentData.planName 
                          ? `${paymentData.serviceName} - ${paymentData.planName}` 
                          : paymentData.planName || 'default'),
      // Additional metadata for better order tracking (if backend supports it)
      service_name: paymentData.serviceName || null,
      plan_name: paymentData.planName || null,
    };

    // Log the request for debugging (remove in production or use proper logging)
    console.log('Creating checkout session with data:', {
      price_id: requestData.price_id,
      product_id: requestData.product_id,
      subscription_name: requestData.subscription_name,
    });

    const response = await apiClient.post("/stripe/checkout/session", requestData);

    return {
      success: true,
      sessionId: response.data.sessionId || response.data.session_id, // Handle both formats
      url: response.data.url,
      message: response.data.message || "Checkout session created successfully",
    };
  } catch (error) {
    console.error("Payment service error:", error);
    
    // Handle specific error cases
    let errorMessage = "Failed to create checkout session. Please try again.";
    
    if (error.response?.status === 404) {
      errorMessage = "Payment endpoint not found. Please contact support or try again later.";
    } else if (error.response?.status === 500) {
      const backendMessage = error.response?.data?.message || error.response?.data?.error;
      if (backendMessage?.includes("route") && backendMessage?.includes("could not be found")) {
        errorMessage = "Payment system is not yet configured. Please contact the administrator.";
      } else {
        errorMessage = backendMessage || "Server error. Please try again later.";
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

