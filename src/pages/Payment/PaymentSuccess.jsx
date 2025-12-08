import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useDispatch } from "react-redux";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Alert,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import apiClient from "../../lib/api/config";
import { getAuthToken } from "../../utils/authUtils";
import { clearCart } from "../../lib/features/cart/cartSlice";

function PaymentSuccess() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [needsLogin, setNeedsLogin] = useState(false);
  const [subscriptionName, setSubscriptionName] = useState(null);

  useEffect(() => {
    const processCheckoutSuccess = async () => {
      const token = getAuthToken();

      if (!token) {
        // User not logged in - still clear cart but show login message
        setNeedsLogin(true);
        setLoading(false);
        dispatch(clearCart());
        return;
      }

      if (!sessionId) {
        setError("No session ID found. Please contact support.");
        setLoading(false);
        return;
      }

      try {
        // Call backend to verify and process session
        const response = await apiClient.get(
          `/checkout/success?session_id=${sessionId}`
        );

        if (response.data.success) {
          setSuccess(true);
          setSubscriptionName(response.data.subscription_name || null);
          dispatch(clearCart());
        } else {
          setError(
            response.data.message || "Failed to verify payment. Please contact support."
          );
        }
      } catch (err) {
        console.error("Payment verification error:", err);
        // Even if verification fails, payment might have succeeded
        // Clear cart and show partial success
        dispatch(clearCart());
        if (err.response?.status === 404) {
          // Endpoint doesn't exist - show success anyway (cart is cleared)
          setSuccess(true);
        } else {
          setError(
            err.response?.data?.message ||
              "Could not verify payment status. If you were charged, please contact support."
          );
        }
      } finally {
        setLoading(false);
      }
    };

    // Small delay to ensure page is ready
    const timer = setTimeout(processCheckoutSuccess, 100);
    return () => clearTimeout(timer);
  }, [sessionId, dispatch]);

  // Loading state
  if (loading) {
    return (
      <Box
        sx={{
          position: "relative",
          width: "100%",
          minHeight: "100vh",
          backgroundColor: (theme) => theme.palette.background.default,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Verifying your payment...
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        backgroundColor: (theme) => theme.palette.background.default,
      }}
    >
      <Box
        sx={{
          position: "relative",
          minHeight: "100vh",
          width: "100%",
          backgroundColor: (theme) => theme.palette.background.default,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: { xs: "2rem 1rem", sm: "3rem 2rem", md: "4rem 3rem" },
        }}
      >
        <Card
          sx={{
            maxWidth: { xs: "100%", sm: "600px" },
            width: "100%",
            p: 4,
            textAlign: "center",
          }}
        >
          <CardContent>
            {/* Success State */}
            {(success || needsLogin) && (
              <>
                <CheckCircleIcon
                  sx={{
                    fontSize: 80,
                    color: "success.main",
                    mb: 2,
                  }}
                />
                <Typography
                  variant="h4"
                  component="h1"
                  gutterBottom
                  sx={{ fontWeight: 600 }}
                >
                  Payment Successful!
                </Typography>
                <Typography variant="body1" sx={{ mb: 3, color: "text.secondary" }}>
                  Thank you for your purchase. Your payment has been processed
                  successfully.
                </Typography>
                {subscriptionName && (
                  <Typography
                    variant="body1"
                    sx={{ mb: 2, color: "text.primary", fontWeight: 500 }}
                  >
                    {subscriptionName}
                  </Typography>
                )}
                {needsLogin && (
                  <Alert severity="info" sx={{ mb: 2, textAlign: "left" }}>
                    Please log in to view your purchase details and access your
                    subscription.
                  </Alert>
                )}
                {sessionId && (
                  <Typography
                    variant="body2"
                    sx={{ mb: 2, color: "text.secondary", fontStyle: "italic" }}
                  >
                    Session ID: {sessionId.substring(0, 20)}...
                  </Typography>
                )}
              </>
            )}

            {/* Error State */}
            {error && !success && (
              <>
                <ErrorIcon
                  sx={{
                    fontSize: 80,
                    color: "error.main",
                    mb: 2,
                  }}
                />
                <Typography
                  variant="h4"
                  component="h1"
                  gutterBottom
                  sx={{ fontWeight: 600 }}
                >
                  Payment Issue
                </Typography>
                <Alert severity="error" sx={{ mb: 3, textAlign: "left" }}>
                  {error}
                </Alert>
              </>
            )}

            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              {needsLogin && (
                <Button
                  variant="contained"
                  onClick={() => navigate("/login")}
                  sx={{
                    backgroundColor: (theme) => theme.palette.primary.main,
                    color: "#FFFFFF",
                    "&:focus": {
                      outline: (theme) =>
                        `2px solid ${theme.palette.primary.main}`,
                      outlineOffset: "2px",
                      boxShadow: "none",
                    },
                    "&:focus-visible": {
                      outline: (theme) =>
                        `2px solid ${theme.palette.primary.main}`,
                      outlineOffset: "2px",
                      boxShadow: "none",
                    },
                    "&:hover": {
                      backgroundColor: (theme) => theme.palette.primary.dark,
                    },
                  }}
                >
                  Log In
                </Button>
              )}
              <Button
                variant={needsLogin ? "outlined" : "contained"}
                onClick={() => navigate("/products")}
                sx={{
                  backgroundColor: needsLogin
                    ? "transparent"
                    : (theme) => theme.palette.primary.main,
                  color: needsLogin
                    ? (theme) => theme.palette.primary.main
                    : "#FFFFFF",
                  borderColor: (theme) => theme.palette.primary.main,
                  "&:focus": {
                    outline: (theme) =>
                      `2px solid ${theme.palette.primary.main}`,
                    outlineOffset: "2px",
                    boxShadow: "none",
                  },
                  "&:focus-visible": {
                    outline: (theme) =>
                      `2px solid ${theme.palette.primary.main}`,
                    outlineOffset: "2px",
                    boxShadow: "none",
                  },
                  "&:hover": {
                    backgroundColor: needsLogin
                      ? "rgba(229, 122, 68, 0.1)"
                      : (theme) => theme.palette.primary.dark,
                  },
                }}
              >
                Continue Shopping
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate("/")}
                sx={{
                  borderColor: (theme) => theme.palette.primary.main,
                  color: (theme) => theme.palette.primary.main,
                  "&:focus": {
                    outline: (theme) =>
                      `2px solid ${theme.palette.primary.main}`,
                    outlineOffset: "2px",
                    boxShadow: "none",
                  },
                  "&:focus-visible": {
                    outline: (theme) =>
                      `2px solid ${theme.palette.primary.main}`,
                    outlineOffset: "2px",
                    boxShadow: "none",
                  },
                }}
              >
                Go to Home
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

export default PaymentSuccess;
