import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchServices, setSelectedService, clearSelectedService } from "../../lib/features/services/servicesSlice";
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
} from "@mui/material";
import { useContactForm } from "../../hooks/useContactForm";
import StyledTextField from "../../components/StyledTextField";
import { getImageUrl } from "../../helpers/helpers";
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
import {
  getUserFromSources,
  isUserAuthenticated as checkIsUserAuthenticated,
} from "../../utils/authUtils";
import FavoriteButtonAndCount from "../../components/FavoriteButtonAndCount";

// Helper function to map service name to icon
const getServiceIcon = (serviceName) => {
  const name = serviceName?.toLowerCase() || "";
  if (name.includes("cyber") || name.includes("security")) return SecurityIcon;
  if (name.includes("data management") || name.includes("storage")) return StorageIcon;
  if (name.includes("data science") || name.includes("science")) return ScienceIcon;
  if (name.includes("cloud")) return CloudIcon;
  if (name.includes("ai") || name.includes("machine learning") || name.includes("psychology")) return PsychologyIcon;
  if (name.includes("web") || name.includes("mobile") || name.includes("development")) return ComputerIcon;
  return ComputerIcon; // Default icon
};

// Helper function to convert service name to URL slug
const getServiceSlug = (serviceName) => {
  const name = serviceName?.toLowerCase() || "";
  if (name.includes("cyber") || name.includes("security")) return "cyber-security";
  if (name.includes("data management")) return "data-management";
  if (name.includes("data science")) return "data-science";
  if (name.includes("cloud")) return "cloud-service";
  if (name.includes("ai") || name.includes("machine learning")) return "ai-machine-learning";
  if (name.includes("web") || name.includes("mobile")) return "web-mobile-development";
  return serviceName?.toLowerCase().replace(/\s+/g, "-") || "";
};

// Hardcoded plans data (to be replaced when backend provides this)
// This is kept as fallback for pricing/plans that may not be in backend yet
const serviceDetails = {
  "cyber-security": {
    id: 1,
    name: "Cyber Security",
    icon: SecurityIcon,
    description:
      "Cyber security is fundamental in today's day and age. We provide you with cyber security tools and services with a wide range of Open Web Application Security Project® toolbox that can help you and your company in security-related tasks efficiently and conveniently. Our comprehensive security solutions protect your digital assets from threats, vulnerabilities, and attacks while ensuring compliance with industry standards.",
    plans: [
      {
        name: "Essential",
        price: 99,
        period: "/Yr",
        stripePriceId: "price_1SSwI9RtwC76q4jZxYnbUsqp", // Cyber Security Essential
        features: [
          "Basic Threat Detection",
          "Security Audit Reports",
          "Email Support",
          "OWASP Top 10 Protection",
          "Monthly Security Updates",
        ],
      },
      {
        name: "Professional",
        price: 199,
        period: "/Mo",
        stripePriceId: null, // Add your Stripe Price ID here when available
        features: [
          "Advanced Threat Protection",
          "24/7 Security Monitoring",
          "Priority Support",
          "Custom Security Policies",
          "Penetration Testing",
          "Incident Response Team",
        ],
      },
    ],
  },
  "data-management": {
    id: 2,
    name: "Data Management",
    icon: StorageIcon,
    description:
      "We at Unelma Platforms can help you with different types of data management products and services. Our solutions enable organizations to collect, store, organize, and analyze data efficiently. From database design to data warehousing, we provide end-to-end data management services that transform raw data into actionable insights. Our expertise includes data migration, data quality assurance, and implementing robust data governance frameworks.",
    plans: [
      {
        name: "Starter",
        price: 149,
        period: "/Mo",
        features: [
          "Up to 100GB Storage",
          "Basic Database Setup",
          "Data Backup & Recovery",
          "Email Support",
          "Monthly Reports",
        ],
      },
      {
        name: "Enterprise",
        price: 499,
        period: "/Mo",
        features: [
          "Unlimited Storage",
          "Advanced Analytics",
          "Real-time Data Sync",
          "24/7 Support",
          "Custom Data Models",
          "Data Governance Tools",
          "API Integration",
        ],
      },
    ],
  },
  "data-science": {
    id: 3,
    name: "Data Science",
    icon: ScienceIcon,
    description:
      "Previously, we have developed AI-powered email applications which have scaled to millions of users and subscribers. Feel free to contact us if you would need help with data science-related services. Our team of expert data scientists helps you extract meaningful insights from complex datasets using advanced statistical methods, machine learning algorithms, and predictive analytics. We transform your data into strategic business intelligence.",
    plans: [
      {
        name: "Analytics",
        price: 299,
        period: "/Mo",
        features: [
          "Data Analysis & Visualization",
          "Statistical Modeling",
          "Custom Dashboards",
          "Monthly Consultations",
          "Report Generation",
        ],
      },
      {
        name: "Advanced",
        price: 799,
        period: "/Mo",
        features: [
          "Machine Learning Models",
          "Predictive Analytics",
          "Real-time Insights",
          "Dedicated Data Scientist",
          "Custom Algorithm Development",
          "A/B Testing Framework",
          "Priority Support",
        ],
      },
    ],
  },
  "cloud-service": {
    id: 4,
    name: "Cloud Service",
    icon: CloudIcon,
    description:
      'We are masters of cloud services as we have developed one of the platforms called "Unelma Cloud". Our cloud solutions provide scalable, secure, and cost-effective infrastructure for businesses of all sizes. From cloud migration to multi-cloud strategies, we help you leverage the power of cloud computing to enhance agility, reduce costs, and accelerate innovation. Experience seamless scalability and enterprise-grade security.',
    plans: [
      {
        name: "Basic",
        price: 79,
        period: "/Mo",
        features: [
          "50GB Cloud Storage",
          "Basic Compute Resources",
          "Automated Backups",
          "Email Support",
          "99.9% Uptime SLA",
        ],
      },
      {
        name: "Premium",
        price: 299,
        period: "/Mo",
        features: [
          "Unlimited Storage",
          "High-Performance Computing",
          "Auto-scaling",
          "24/7 Support",
          "99.99% Uptime SLA",
          "Multi-region Deployment",
          "Advanced Security Features",
        ],
      },
    ],
  },
  "ai-machine-learning": {
    id: 5,
    name: "AI and Machine Learning",
    icon: PsychologyIcon,
    description:
      "We deliver AI-driven solutions to our clients by providing world-class AI expertise and tooling for computer vision, natural language processing and machine learning. Our AI services help businesses automate processes, enhance decision-making, and create intelligent applications. From chatbots to recommendation systems, we build custom AI solutions that learn, adapt, and evolve with your business needs.",
    plans: [
      {
        name: "AI Starter",
        price: 399,
        period: "/Mo",
        features: [
          "Pre-built AI Models",
          "Basic NLP & Computer Vision",
          "API Access",
          "Documentation & Training",
          "Email Support",
        ],
      },
      {
        name: "AI Enterprise",
        price: 1299,
        period: "/Mo",
        features: [
          "Custom AI Development",
          "Advanced ML Models",
          "Real-time Processing",
          "Dedicated AI Team",
          "Model Training & Optimization",
          "Integration Services",
          "Priority Support & SLA",
        ],
      },
    ],
  },
  "web-mobile-development": {
    id: 6,
    name: "Web and Mobile Development",
    icon: ComputerIcon,
    description: "We know this shit! Request a quote; you will not be disappointed. Our expert team specializes in building cutting-edge web and mobile applications that deliver exceptional user experiences. From responsive web applications to native and cross-platform mobile apps, we create scalable, performant, and user-friendly solutions. We leverage modern frameworks and technologies to build applications that are fast, secure, and maintainable. Whether you need a simple website, a complex web application, or a mobile app for iOS and Android, we've got you covered.",
    plans: [
      {
        name: "Starter",
        price: 199,
        period: "/Mo",
        features: [
          "Responsive Web Design",
          "Basic Mobile App (1 Platform)",
          "Up to 5 Pages/Screens",
          "Email Support",
          "3 Months Maintenance",
        ],
      },
      {
        name: "Professional",
        price: 599,
        period: "/Mo",
        features: [
          "Full-Stack Web Application",
          "Cross-Platform Mobile App",
          "Unlimited Pages/Screens",
          "Custom Features & Integrations",
          "Priority Support",
          "6 Months Maintenance",
          "Performance Optimization",
          "Security Implementation",
        ],
      },
    ],
  },
};

function ServiceDetail() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { services, selectedService, loading: servicesLoading } = useSelector((state) => state.services);
  const {
    formData,
    loading,
    submitStatus,
    fieldErrors,
    handleChange,
    handleSubmit,
  } = useContactForm({ name: "", email: "", message: "" });

  // Check authentication from both AuthContext and Redux
  const { user: authContextUser, token: authContextToken } = useAuth();
  const {
    user: reduxUser,
    isAuthenticated: reduxIsAuthenticated,
    token: reduxToken,
  } = useSelector((state) => state.auth);

  // Get user from either system using utility
  const user = getUserFromSources(reduxUser, authContextUser);

  // User is authenticated if they have a token or user data
  const isUserAuthenticated = checkIsUserAuthenticated(
    reduxIsAuthenticated,
    reduxToken,
    authContextToken,
    user
  );

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
      const backendService = services.find((s) => {
        const slug = getServiceSlug(s.name);
        return slug === serviceId;
      });
      
      if (backendService) {
        // Merge backend service with hardcoded plans (if available)
        const hardcodedDetails = serviceDetails[serviceId];
        const mergedService = {
          ...backendService,
          // Use hardcoded plans if available, otherwise use empty array
          plans: hardcodedDetails?.plans || [],
        };
        // Don't store icon component in Redux - derive it during render instead
        dispatch(setSelectedService(mergedService));
      } else {
        dispatch(clearSelectedService());
      }
    }
  }, [serviceId, services, dispatch]);

  // Use selectedService from Redux, or fallback to hardcoded if backend service not found
  const backendService = selectedService;
  const hardcodedService = serviceDetails[serviceId];
  const service = backendService || (hardcodedService ? { ...hardcodedService, ...hardcodedService } : null);

  // Handle order now - Stripe integration
  const handleOrderNow = async (plan) => {
    // Check if user is authenticated
    if (!isUserAuthenticated) {
      setLoginDialogOpen(true);
      return;
    }

    setPaymentLoading(plan.name); // Track which plan is loading
    setPaymentError(null);

    try {
      // Check if Stripe Price ID is available (required)
      if (!plan.stripePriceId) {
        setPaymentError(
          "This plan is not yet available for purchase. Please contact support."
        );
        setPaymentLoading(null);
        return;
      }

      // Prepare comprehensive payment data with all metadata for order tracking
      const paymentData = {
        stripePriceId: plan.stripePriceId,
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
      console.error("Payment error:", error);
      setPaymentError("An unexpected error occurred. Please try again.");
      setPaymentLoading(null);
    }
  };

  // Show loading state
  if (servicesLoading || (services.length === 0 && !hardcodedService)) {
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

  const IconComponent = service.icon || getServiceIcon(service.name);

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
      {(service.image_url || service.image_local_url || service.image) && (
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
            src={getImageUrl(service.image_url || service.image_local_url || service.image)}
            alt={service.name}
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
              background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
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
                    theme.palette.mode === 'light' 
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
            <FavoriteButtonAndCount type="service" item={service} />
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
                              ? theme.palette.background.paper
                              : theme.palette.background.paper,
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
                          "&:hover": {
                            borderColor: (theme) => theme.palette.primary.main,
                            transform: "translateY(-4px)",
                          },
                        }}
                      >
                        <Typography
                          variant="h4"
                          component="h3"
                          sx={{
                            fontSize: { xs: "1.5rem", sm: "1.75rem" },
                            fontWeight: 600,
                            color: (theme) => theme.palette.text.primary,
                            marginBottom: "1rem",
                          }}
                        >
                          {plan.name}
                        </Typography>
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
                            fontWeight: 100,
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
                    backgroundColor: (theme) => theme.palette.background.paper,
                    border: (theme) =>
                      theme.palette.mode === "dark"
                        ? "1px solid rgba(255, 255, 255, 0.1)"
                        : "1px solid rgba(0, 0, 0, 0.1)",
                    borderRadius: 2,
                    padding: { xs: "2rem", sm: "2.5rem" },
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
              fontWeight: 100,
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
