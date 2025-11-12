import React from "react";
import { useNavigate, useParams } from "react-router";
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
} from "@mui/material";
import { useContactForm } from "../../hooks/useContactForm";
import StyledTextField from "../../components/StyledTextField";
import HeroImage from "../../components/HeroImage";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SecurityIcon from "@mui/icons-material/Security";
import { commonButtonStyles } from "../../constants/styles";

// Service data with details
const serviceDetails = {
  "cyber-security": {
    id: 1,
    name: "Cyber Security",
    icon: SecurityIcon,
    description: "Cyber security is fundamental in today's day and age. We provide you with cyber security tools and services with a wide range of Open Web Application Security Project®toolbox that can help you and your company in security-related tasks efficiently and conveniently.",
    plans: [
      {
        name: "Business",
        price: 99,
        period: "/Yr",
        features: [
          "Unlimited Pages",
          "All Team Members",
          "Unlimited Leads",
          "Unlimited Page Views",
          "Export in HTML/CSS",
        ],
      },
      {
        name: "Professional",
        price: 199,
        period: "/Mo",
        features: [
          "Unlimited Pages",
          "All Team Members",
          "Unlimited Leads",
          "Unlimited Page Views",
          "Export in HTML/CSS",
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

  const service = serviceDetails[serviceId];

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
        <HeroImage />
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
            <Grid item xs={12} md={8}>
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
                    <Grid item xs={12} sm={6} key={index}>
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
                          Order Now
                        </Button>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>

            {/* Right Side - Contact Form Sidebar */}
            <Grid item xs={12} md={4}>
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
    </Box>
  );
}

export default ServiceDetail;

