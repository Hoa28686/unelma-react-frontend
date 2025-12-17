import React, { useState, useEffect } from "react";
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
import apiClient from "../../lib/api/config";
import { getAuthToken } from "../../utils/authUtils";
import { clearCart } from "../../store/slices/cart/cartSlice";

function PaymentSuccess() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [needsLogin, setNeedsLogin] = useState(false);

  useEffect(() => {
    const processCheckoutSuccess = async () => {
      const token = getAuthToken();

      if (!token) {
        setNeedsLogin(true);
        dispatch(clearCart());
        setLoading(false);
        return;
      }

      if (!sessionId) {
        setError("No session ID found in URL.");
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
          dispatch(clearCart());
        } else {
          setError(response.data.message || "Payment verification failed.");
        }
      } catch (error) {
        setError(
          error.response?.data?.message ||
            "Failed to verify payment. Please contact support if you were charged."
        );
      } finally {
        setLoading(false);
      }
    };

    // Small delay to ensure page is fully loaded
    setTimeout(processCheckoutSuccess, 100);
  }, [sessionId, dispatch]);

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
            {loading ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <CircularProgress />
                <Typography variant="body1" sx={{ color: "text.secondary" }}>
                  Verifying payment...
                </Typography>
              </Box>
            ) : needsLogin ? (
              <>
                <Alert severity="warning" sx={{ mb: 2 }}>
                  Please log in to verify your payment.
                </Alert>
                <Button
                  variant="contained"
                  onClick={() => navigate("/login")}
                  sx={{
                    backgroundColor: (theme) => theme.palette.primary.main,
                    color: "#FFFFFF",
                  }}
                >
                  Go to Login
                </Button>
              </>
            ) : error ? (
              <>
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    justifyContent: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={() => navigate("/cart")}
                    sx={{
                      backgroundColor: (theme) => theme.palette.primary.main,
                      color: "#FFFFFF",
                    }}
                  >
                    Back to Cart
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => navigate("/")}
                    sx={{
                      borderColor: (theme) => theme.palette.primary.main,
                      color: (theme) => theme.palette.primary.main,
                    }}
                  >
                    Go to Home
                  </Button>
                </Box>
              </>
            ) : success ? (
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
                <Typography
                  variant="body1"
                  sx={{ mb: 3, color: "text.secondary" }}
                >
                  Thank you for your purchase. Your payment has been processed
                  successfully.
                </Typography>
                {sessionId && (
                  <Typography
                    variant="body2"
                    sx={{ mb: 2, color: "text.secondary", fontStyle: "italic" }}
                  >
                    Session ID: {sessionId.substring(0, 20)}...
                  </Typography>
                )}
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    justifyContent: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={() => navigate("/services")}
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
                    Browse More Services
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
              </>
            ) : null}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

export default PaymentSuccess;
