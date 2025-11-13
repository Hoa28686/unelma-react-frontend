import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
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
import HeroImage from "../../components/HeroImage";
import commonBackground from "../../assets/earthy_common_background.png";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SecurityIcon from "@mui/icons-material/Security";
import StorageIcon from "@mui/icons-material/Storage";
import ScienceIcon from "@mui/icons-material/Science";
import CloudIcon from "@mui/icons-material/Cloud";
import PsychologyIcon from "@mui/icons-material/Psychology";
import { commonButtonStyles } from "../../constants/styles";
import { useAuth } from "../../context/AuthContext";
import { createCheckoutSession } from "../../lib/api/paymentService";

// Service data with details
const serviceDetails = {
  "cyber-security": {
    id: 1,
    name: "Cyber Security",
    icon: SecurityIcon,
    description: "Cyber security is fundamental in today's day and age. We provide you with cyber security tools and services with a wide range of Open Web Application Security Project® toolbox that can help you and your company in security-related tasks efficiently and conveniently. Our comprehensive security solutions protect your digital assets from threats, vulnerabilities, and attacks while ensuring compliance with industry standards.",
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
    description: "We at Unelma Platforms can help you with different types of data management products and services. Our solutions enable organizations to collect, store, organize, and analyze data efficiently. From database design to data warehousing, we provide end-to-end data management services that transform raw data into actionable insights. Our expertise includes data migration, data quality assurance, and implementing robust data governance frameworks.",
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
    description: "Previously, we have developed AI-powered email applications which have scaled to millions of users and subscribers. Feel free to contact us if you would need help with data science-related services. Our team of expert data scientists helps you extract meaningful insights from complex datasets using advanced statistical methods, machine learning algorithms, and predictive analytics. We transform your data into strategic business intelligence.",
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
    description: "We are masters of cloud services as we have developed one of the platforms called \"Unelma Cloud\". Our cloud solutions provide scalable, secure, and cost-effective infrastructure for businesses of all sizes. From cloud migration to multi-cloud strategies, we help you leverage the power of cloud computing to enhance agility, reduce costs, and accelerate innovation. Experience seamless scalability and enterprise-grade security.",
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
    description: "We deliver AI-driven solutions to our clients by providing world-class AI expertise and tooling for computer vision, natural language processing and machine learning. Our AI services help businesses automate processes, enhance decision-making, and create intelligent applications. From chatbots to recommendation systems, we build custom AI solutions that learn, adapt, and evolve with your business needs.",
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
};

function ServiceDetail() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
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
  const { user: reduxUser, isAuthenticated: reduxIsAuthenticated, token: reduxToken } = useSelector((state) => state.auth);
  
  // Check for token in localStorage (both systems)
  const hasToken = authContextToken || reduxToken || localStorage.getItem("token") || localStorage.getItem("authToken");
  
  // Get user from either system
  const user = reduxUser || authContextUser || (localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null);
  
  // User is authenticated if they have a token or user data
  const isUserAuthenticated = reduxIsAuthenticated || hasToken || (user && (user.email || user.name || Object.keys(user).length > 0));
  
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentError, setPaymentError] = useState(null);

  const service = serviceDetails[serviceId];

  // Handle order now - Stripe integration
  const handleOrderNow = async (plan) => {
    // Check if user is authenticated
    if (!isUserAuthenticated) {
      setLoginDialogOpen(true);
      return;
    }

    setPaymentLoading(true);
    setPaymentError(null);

    try {
      // Check if Stripe Price ID is available (required)
      if (!plan.stripePriceId) {
        setPaymentError("This plan is not yet available for purchase. Please contact support.");
        setPaymentLoading(false);
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
        setPaymentLoading(false);
      }
    } catch (error) {
      console.error("Payment error:", error);
      setPaymentError("An unexpected error occurred. Please try again.");
      setPaymentLoading(false);
    }
  };

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

  const IconComponent = service.icon;

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      {/* Hero Images */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          zIndex: 0,
        }}
      >
        <HeroImage imageSource={commonBackground} animate={false} />
      </Box>

      {/* Content overlay */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
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
                borderColor: "#E57A44",
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
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: { xs: "64px", sm: "80px" },
                height: { xs: "64px", sm: "80px" },
                borderRadius: "50%",
                backgroundColor: "rgba(229, 122, 68, 0.1)",
                color: "#E57A44",
              }}
            >
              <IconComponent
                sx={{
                  fontSize: { xs: "2rem", sm: "2.5rem" },
                }}
              />
            </Box>
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
                              ? "#B0D0B5"
                              : theme.palette.background.paper,
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                          borderRadius: 2,
                          padding: { xs: "2rem", sm: "2.5rem" },
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            borderColor: "#E57A44",
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
                              color: "#E57A44",
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
                                  backgroundColor: "#E57A44",
                                  marginRight: 2,
                                }}
                              />
                              <Typography
                                variant="body1"
                                sx={{
                                  fontSize: { xs: "0.875rem", sm: "1rem" },
                                  color: (theme) => theme.palette.text.secondary,
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
                          disabled={paymentLoading}
                          sx={{
                            backgroundColor: (theme) => theme.palette.primary.main,
                            color: "#FFFFFF",
                            fontWeight: 100,
                            borderRadius: 2,
                            boxShadow: "none",
                            textTransform: "none",
                            border: "1px solid transparent",
                            transition: "all 0.3s ease",
                            "&:hover": {
                              borderColor: "#E57A44",
                              transform: "translateY(-4px)",
                            },
                          }}
                        >
                          {paymentLoading ? (
                            <>
                              <CircularProgress size={20} sx={{ mr: 1, color: "#FFFFFF" }} />
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
                    backgroundColor: (theme) =>
                      theme.palette.mode === "light"
                        ? "#B0D0B5"
                        : theme.palette.background.paper,
                    border: "1px solid rgba(255, 255, 255, 0.1)",
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
                  <Box
                    component="form"
                    onSubmit={handleSubmit}
                  >
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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
            You need to be logged in to proceed with the order. Please log in or create an account to continue.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button
            onClick={() => setLoginDialogOpen(false)}
            sx={{
              textTransform: "none",
              color: (theme) => theme.palette.text.primary,
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

