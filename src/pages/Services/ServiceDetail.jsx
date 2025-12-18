import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchServices,
  setSelectedService,
  clearSelectedService,
} from "../../store/slices/services/servicesSlice";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Divider,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
} from "@mui/material";
import { useContactForm } from "../../hooks/useContactForm";
import StyledTextField from "../../components/StyledTextField";
import { getImageUrl, placeholderLogo } from "../../helpers/helpers";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SecurityIcon from "@mui/icons-material/Security";
import StorageIcon from "@mui/icons-material/Storage";
import ScienceIcon from "@mui/icons-material/Science";
import CloudIcon from "@mui/icons-material/Cloud";
import PsychologyIcon from "@mui/icons-material/Psychology";
import ComputerIcon from "@mui/icons-material/Computer";
import { commonButtonStyles } from "../../constants/styles";
import { useAuth } from "../../context/AuthContext";
import { createCheckoutSession } from "../../lib/api/paymentService";
import FavoriteButtonAndCount from "../../components/favorite/FavoriteButtonAndCount";
import SuggestedServices from "../../components/service/SuggestedServices";

// Helper function to map service name to icon
const getServiceIcon = (serviceName) => {
  const name = serviceName?.toLowerCase() || "";
  if (name.includes("cyber") || name.includes("security")) return SecurityIcon;
  if (name.includes("data management") || name.includes("storage"))
    return StorageIcon;
  if (name.includes("data science") || name.includes("science"))
    return ScienceIcon;
  if (name.includes("cloud")) return CloudIcon;
  if (
    name.includes("ai") ||
    name.includes("machine learning") ||
    name.includes("psychology")
  )
    return PsychologyIcon;
  if (
    name.includes("web") ||
    name.includes("mobile") ||
    name.includes("development")
  )
    return ComputerIcon;
  return ComputerIcon; // Default icon
};

// Helper function to convert service name to URL slug
const getServiceSlug = (serviceName) => {
  const name = serviceName?.toLowerCase() || "";
  if (name.includes("cyber") || name.includes("security"))
    return "cyber-security";
  if (name.includes("data management")) return "data-management";
  if (name.includes("data science")) return "data-science";
  if (name.includes("cloud")) return "cloud-service";
  if (name.includes("ai") || name.includes("machine learning"))
    return "ai-machine-learning";
  if (name.includes("web") || name.includes("mobile"))
    return "web-mobile-development";
  return serviceName?.toLowerCase().replace(/\s+/g, "-") || "";
};

function ServiceDetail() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    services,
    selectedService,
    loading: servicesLoading,
  } = useSelector((state) => state.services);
  const {
    formData,
    loading,
    submitStatus,
    fieldErrors,
    handleChange,
    handleSubmit,
  } = useContactForm({ name: "", email: "", message: "" });

  // Check authentication from AuthContext
  const { user } = useAuth();

  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(null); // Track which plan is loading (plan name)
  const [paymentError, setPaymentError] = useState(null);

  // Fetch services if not loaded
  useEffect(() => {
    if (services.length === 0) {
      dispatch(fetchServices());
    }
  }, [dispatch, services.length]);

  // Find service from backend by matching slug
  useEffect(() => {
    if (serviceId && services.length > 0) {
      let foundService = null;

      // find the service by slug first
      foundService = services.find((s) => getServiceSlug(s.name) === serviceId);

      // if no slug match, try match by ID
      if (!foundService && !isNaN(serviceId)) {
        foundService = services.find((s) => String(s.id) === String(serviceId));
      }

      if (foundService) {
        dispatch(setSelectedService(foundService));
        const serviceSlug = getServiceSlug(foundService.name);
        if (serviceId !== serviceSlug) {
          // navigate(`/services/${serviceSlug}`, { replace: true });
          navigate(`/services/${serviceId}/${serviceSlug}`, { replace: true });
        }
      } else {
        dispatch(clearSelectedService());
      }
    }
  }, [serviceId, services, dispatch, navigate]);

  // Use selectedService from Redux (backend data only)
  const service = selectedService;

  // Handle order now - Stripe integration
  const handleOrderNow = async (plan) => {
    // Check if user is authenticated
    if (!user) {
      setLoginDialogOpen(true);
      return;
    }

    setPaymentLoading(plan.name); // Track which plan is loading
    setPaymentError(null);

    try {
      // Check if Stripe Price ID is available (required)
      if (!plan.stripe_price_id) {
        setPaymentError(
          "This plan is not yet available for purchase. Please contact support."
        );
        setPaymentLoading(null);
        return;
      }

      // Prepare comprehensive payment data with all metadata for order tracking
      const paymentData = {
        stripePriceId: plan.stripe_price_id,
        serviceId: serviceId,
        serviceName: service.name,
        planName: plan.name,
        quantity: 1,
        subscriptionName: `${service.name} - ${plan.name}`,
      };

      // Create checkout session
      const result = await createCheckoutSession(paymentData);

      if (result.success && result.url) {
        // Redirect to Stripe Checkout
        window.location.href = result.url;
      } else {
        setPaymentError(
          result.message || "Failed to initiate payment. Please try again."
        );
        setPaymentLoading(null);
      }
    } catch (error) {
      setPaymentError("An unexpected error occurred. Please try again.");
      setPaymentLoading(null);
    }
  };

  // Show loading state
  if (servicesLoading || services.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!service) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Typography variant="h4">Service not found</Typography>
        <Button
          onClick={() => navigate("/services")}
          startIcon={<ArrowBackIosIcon />}
          sx={{ mt: 2 }}
        >
          Back to Services
        </Button>
      </Box>
    );
  }

  const IconComponent = getServiceIcon(service.name);
  // const IconComponent = service.icon || getServiceIcon(service.name);
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        backgroundColor: (theme) => theme.palette.background.default,
      }}
    >
      {/* Hero Image Section */}
      {(service.image_local_url || service.image_url || service.image) && (
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: { xs: "300px", sm: "400px", md: "500px" },
            overflow: "hidden",
            backgroundColor: (theme) => theme.palette.background.default,
          }}
        >
          <Box
            component="img"
            src={getImageUrl(
              service.image_local_url || service.image_url || service.image
            )}
            alt={service.name}
            onError={(e) => {
              e.target.src = placeholderLogo;
            }}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          {/* Overlay gradient for better text readability */}
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "50%",
              background:
                "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
            }}
          />
        </Box>
      )}

      {/* Content */}
      <Box
        sx={{
          position: "relative",
          minHeight: "100vh",
          width: "100%",
          padding: { xs: "2rem 1rem", sm: "3rem 2rem", md: "4rem 3rem" },
        }}
      >
        <Box
          sx={{
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {/* Back Button */}
          <Button
            onClick={() => navigate("/services")}
            startIcon={<ArrowBackIosIcon />}
            sx={{
              color: (theme) => theme.palette.text.primary,
              textTransform: "none",
              marginBottom: { xs: "2rem", sm: "3rem" },
              border: "1px solid transparent",
              transition: "all 0.3s ease",
              "&:hover": {
                borderColor: (theme) => theme.palette.primary.main,
                transform: "translateY(-4px)",
              },
            }}
          >
            Back to Services
          </Button>

          {/* Service Header */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              marginBottom: { xs: "2rem", sm: "3rem" },
            }}
          >
            {IconComponent && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: { xs: "64px", sm: "80px" },
                  height: { xs: "64px", sm: "80px" },
                  minWidth: { xs: "64px", sm: "80px" },
                  minHeight: { xs: "64px", sm: "80px" },
                  maxWidth: { xs: "64px", sm: "80px" },
                  maxHeight: { xs: "64px", sm: "80px" },
                  borderRadius: "50%",
                  overflow: "hidden",
                  flexShrink: 0,
                  backgroundColor: (theme) =>
                    theme.palette.mode === "light"
                      ? `${theme.palette.primary.main}15`
                      : `${theme.palette.primary.main}25`,
                  color: (theme) => theme.palette.primary.main,
                }}
              >
                <IconComponent
                  sx={{
                    fontSize: { xs: "2rem", sm: "2.5rem" },
                  }}
                />
              </Box>
            )}
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                fontWeight: 700,
                color: (theme) => theme.palette.text.primary,
              }}
            >
              {service.name}
            </Typography>
            <FavoriteButtonAndCount type="service" item={selectedService} />
          </Box>

          {/* Main Content and Sidebar Layout */}
          <Grid container spacing={4} sx={{ alignItems: "flex-start" }}>
            {/* Left Side - Main Content */}
            <Grid size={{ xs: 12, md: 8 }}>
              {/* Description */}
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: "1rem", sm: "1.125rem" },
                  color: (theme) => theme.palette.text.secondary,
                  lineHeight: 1.8,
                  marginBottom: { xs: "3rem", sm: "4rem" },
                }}
              >
                {service.description}
              </Typography>

              {/* Pricing Plans */}
              {service.plans && service.plans.length > 0 && (
                <Box>
                  <Typography
                    variant="h3"
                    component="h2"
                    sx={{
                      fontSize: { xs: "1.75rem", sm: "2rem", md: "2.5rem" },
                      fontWeight: 600,
                      color: (theme) => theme.palette.text.primary,
                      marginBottom: { xs: "2rem", sm: "3rem" },
                    }}
                  >
                    Pricing Plans
                  </Typography>
                  <Grid container spacing={3}>
                    {service.plans.map((plan, index) => (
                      <Grid size={{ xs: 12, sm: 6 }} key={index}>
                        <Card
                          sx={{
                            backgroundColor: (theme) =>
                              theme.palette.mode === "light"
                                ? "rgba(0, 0, 0, 0.03)"
                                : "transparent",
                            border: (theme) =>
                              theme.palette.mode === "dark"
                                ? "1px solid rgba(255, 255, 255, 0.1)"
                                : "1px solid rgba(0, 0, 0, 0.1)",
                            borderRadius: 2,
                            padding: { xs: "2rem", sm: "2.5rem" },
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            transition: "all 0.3s ease",
                            boxShadow: (theme) =>
                              theme.palette.mode === "light"
                                ? "0 2px 8px rgba(0, 0, 0, 0.05)"
                                : "none",
                            "&:hover": {
                              borderColor: (theme) =>
                                theme.palette.primary.main,
                              transform: "translateY(-4px)",
                              boxShadow: (theme) =>
                                theme.palette.mode === "light"
                                  ? "0 4px 12px rgba(0, 0, 0, 0.1)"
                                  : "0 8px 32px rgba(0, 0, 0, 0.3)",
                            },
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              flexWrap: "wrap",
                              mb: 1,
                            }}
                          >
                            <Typography
                              variant="h4"
                              component="h3"
                              sx={{
                                fontSize: { xs: "1.5rem", sm: "1.75rem" },
                                fontWeight: 600,
                                color: (theme) => theme.palette.text.primary,
                              }}
                            >
                              {plan.name}
                            </Typography>
                            <Chip
                              label={
                                plan.payment_type === "subscription"
                                  ? "Subscription"
                                  : "One-time"
                              }
                              size="small"
                              color={
                                plan.payment_type === "subscription"
                                  ? undefined
                                  : "primary"
                              }
                              sx={{
                                height: 24,
                                fontSize: "0.75rem",
                                ...(plan.payment_type === "subscription"
                                  ? {
                                      backgroundColor: "#E57A44",
                                      color: "#FFFFFF",
                                    }
                                  : {}),
                              }}
                            />
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "baseline",
                              marginBottom: "2rem",
                            }}
                          >
                            <Typography
                              variant="h3"
                              sx={{
                                fontSize: { xs: "2rem", sm: "2.5rem" },
                                fontWeight: 700,
                                color: (theme) => theme.palette.primary.main,
                              }}
                            >
                              ${plan.price}
                            </Typography>
                            <Typography
                              variant="body1"
                              sx={{
                                fontSize: { xs: "1rem", sm: "1.125rem" },
                                color: (theme) => theme.palette.text.secondary,
                                marginLeft: 1,
                              }}
                            >
                              {plan.period}
                            </Typography>
                          </Box>
                          <Box sx={{ flexGrow: 1, marginBottom: "2rem" }}>
                            {plan.features.map((feature, featureIndex) => (
                              <Box
                                key={featureIndex}
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  marginBottom: "1rem",
                                }}
                              >
                                <Box
                                  sx={{
                                    width: "8px",
                                    height: "8px",
                                    borderRadius: "50%",
                                    backgroundColor: (theme) =>
                                      theme.palette.primary.main,
                                    marginRight: 2,
                                  }}
                                />
                                <Typography
                                  variant="body1"
                                  sx={{
                                    fontSize: { xs: "0.875rem", sm: "1rem" },
                                    color: (theme) =>
                                      theme.palette.text.secondary,
                                  }}
                                >
                                  {feature}
                                </Typography>
                              </Box>
                            ))}
                          </Box>
                          <Button
                            variant="contained"
                            fullWidth
                            onClick={() => handleOrderNow(plan)}
                            disabled={paymentLoading === plan.name}
                            sx={{
                              backgroundColor: (theme) =>
                                theme.palette.primary.main,
                              color: "#FFFFFF",
                              fontWeight: 400,
                              borderRadius: 2,
                              boxShadow: "none",
                              textTransform: "none",
                              border: "1px solid transparent",
                              transition: "all 0.3s ease",
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
                                borderColor: (theme) =>
                                  theme.palette.primary.main,
                                transform: "translateY(-4px)",
                              },
                            }}
                          >
                            {paymentLoading === plan.name ? (
                              <>
                                <CircularProgress
                                  size={20}
                                  sx={{ mr: 1, color: "#FFFFFF" }}
                                />
                                Processing...
                              </>
                            ) : (
                              "Order Now"
                            )}
                          </Button>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}
            </Grid>

            {/* Right Side - Contact Form Sidebar */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Box
                sx={{
                  position: { md: "sticky" },
                  top: { md: "2rem" },
                }}
              >
                <Card
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === "light"
                        ? "rgba(0, 0, 0, 0.03)"
                        : "transparent",
                    border: (theme) =>
                      theme.palette.mode === "dark"
                        ? "1px solid rgba(255, 255, 255, 0.1)"
                        : "1px solid rgba(0, 0, 0, 0.1)",
                    borderRadius: 2,
                    padding: { xs: "2rem", sm: "2.5rem" },
                    boxShadow: (theme) =>
                      theme.palette.mode === "light"
                        ? "0 2px 8px rgba(0, 0, 0, 0.05)"
                        : "none",
                  }}
                >
                  <Typography
                    variant="h3"
                    component="h2"
                    sx={{
                      fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
                      fontWeight: 600,
                      color: (theme) => theme.palette.text.primary,
                      marginBottom: { xs: "1.5rem", sm: "2rem" },
                    }}
                  >
                    Have Query?
                  </Typography>
                  <Box component="form" onSubmit={handleSubmit}>
                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                    >
                      <StyledTextField
                        name="name"
                        label="Your Name"
                        fullWidth
                        required
                        value={formData.name}
                        onChange={handleChange}
                        error={!!fieldErrors.name}
                        helperText={fieldErrors.name}
                      />
                      <StyledTextField
                        name="email"
                        label="Your Email"
                        type="email"
                        fullWidth
                        required
                        value={formData.email}
                        onChange={handleChange}
                        error={!!fieldErrors.email}
                        helperText={fieldErrors.email}
                      />
                      <StyledTextField
                        name="message"
                        label="Your Message"
                        fullWidth
                        required
                        multiline
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        error={!!fieldErrors.message}
                        helperText={fieldErrors.message}
                      />
                      {submitStatus.success !== null && (
                        <Alert
                          severity={submitStatus.success ? "success" : "error"}
                          sx={{
                            mt: 1,
                            "& .MuiAlert-message": {
                              color: (theme) =>
                                submitStatus.success
                                  ? theme.palette.success.main
                                  : theme.palette.error.main,
                            },
                          }}
                        >
                          {submitStatus.message}
                        </Alert>
                      )}
                      <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        disabled={loading}
                        sx={{
                          ...commonButtonStyles,
                          padding: { xs: "0.75rem", sm: "1rem" },
                          "&:disabled": {
                            opacity: 0.6,
                          },
                        }}
                      >
                        {loading ? (
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <CircularProgress size={20} color="inherit" />
                            Sending...
                          </Box>
                        ) : (
                          "Submit Request"
                        )}
                      </Button>
                    </Box>
                  </Box>
                </Card>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* Suggested Services */}
      <SuggestedServices
        currentService={selectedService}
        allServices={services}
      />

      {/* Payment Error Alert */}
      {paymentError && (
        <Alert
          severity="error"
          onClose={() => setPaymentError(null)}
          sx={{
            position: "fixed",
            top: 20,
            right: 20,
            zIndex: 9999,
            maxWidth: 400,
          }}
        >
          {paymentError}
        </Alert>
      )}

      {/* Login Required Dialog */}
      <Dialog open={loginDialogOpen} onClose={() => setLoginDialogOpen(false)}>
        <DialogTitle>Login Required</DialogTitle>
        <DialogContent>
          <Typography>
            You need to be logged in to proceed with the order. Please log in or
            create an account to continue.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button
            onClick={() => setLoginDialogOpen(false)}
            sx={{
              textTransform: "none",
              color: (theme) => theme.palette.text.primary,
              "&:focus": {
                outline: (theme) => `2px solid ${theme.palette.primary.main}`,
                outlineOffset: "2px",
                boxShadow: "none",
              },
              "&:focus-visible": {
                outline: (theme) => `2px solid ${theme.palette.primary.main}`,
                outlineOffset: "2px",
                boxShadow: "none",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              setLoginDialogOpen(false);
              navigate("/login");
            }}
            variant="contained"
            sx={{
              backgroundColor: (theme) => theme.palette.primary.main,
              color: "#FFFFFF",
              fontWeight: 400,
              borderRadius: 2,
              textTransform: "none",
              "&:focus": {
                outline: (theme) => `2px solid ${theme.palette.primary.main}`,
                outlineOffset: "2px",
                boxShadow: "none",
              },
              "&:focus-visible": {
                outline: (theme) => `2px solid ${theme.palette.primary.main}`,
                outlineOffset: "2px",
                boxShadow: "none",
              },
              "&:hover": {
                backgroundColor: (theme) => theme.palette.primary.dark,
              },
            }}
          >
            Go to Login
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default ServiceDetail;
