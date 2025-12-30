import React, { useEffect, useMemo } from "react";
import { Box, Typography, Card, CardContent, Button, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchServices } from "../../store/slices/services/servicesSlice";
import SecurityIcon from "@mui/icons-material/Security";
import StorageIcon from "@mui/icons-material/Storage";
import ScienceIcon from "@mui/icons-material/Science";
import CloudIcon from "@mui/icons-material/Cloud";
import PsychologyIcon from "@mui/icons-material/Psychology";
import ComputerIcon from "@mui/icons-material/Computer";

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

// Fallback hardcoded services for display when backend services don't match
const fallbackServices = [
  {
    name: "Cyber Security",
    description: "Protect your digital assets with our comprehensive security solutions.",
    slug: "cyber-security",
  },
  {
    name: "Data Management",
    description: "Efficiently organize and manage your data with our advanced systems.",
    slug: "data-management",
  },
  {
    name: "Data Science",
    description: "Unlock insights from your data with our analytics and science expertise.",
    slug: "data-science",
  },
  {
    name: "Cloud Service",
    description: "Scale your infrastructure with our reliable cloud solutions.",
    slug: "cloud-service",
  },
  {
    name: "AI and Machine Learning",
    description: "Leverage artificial intelligence to transform your business processes.",
    slug: "ai-machine-learning",
  },
  {
    name: "Web and Mobile Development",
    description: "Expertly crafted web and mobile solutions tailored to your business needs.",
    slug: "web-mobile-development",
  },
];

function ServicesSection() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { services, loading } = useSelector((state) => state.services);

  // Fetch services if not loaded
  useEffect(() => {
    if (services.length === 0) {
      dispatch(fetchServices());
    }
  }, [dispatch, services.length]);

  // Map backend services to display format, matching by slug
  const displayServices = useMemo(() => {
    // If we have backend services, use them and match with fallback for display
    if (services.length > 0) {
      return fallbackServices.map((fallback) => {
        // Try to find matching backend service by slug
        const backendService = services.find(
          (service) => getServiceSlug(service.name) === fallback.slug
        );

        if (backendService) {
          // Use backend service data
          return {
            ...backendService,
            slug: fallback.slug,
            displayName: backendService.name,
            displayDescription: backendService.description || fallback.description,
          };
        } else {
          // Use fallback if no backend match found
          return {
            ...fallback,
            id: null,
            displayName: fallback.name,
            displayDescription: fallback.description,
          };
        }
      });
    }

    // If no backend services yet, use fallbacks
    return fallbackServices.map((service) => ({
      ...service,
      id: null,
      displayName: service.name,
      displayDescription: service.description,
    }));
  }, [services]);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "100%",
        backgroundColor: (theme) => theme.palette.background.default,
        padding: { xs: "4rem 1rem", sm: "5rem 2rem", md: "6rem 3rem" },
        position: "relative",
        zIndex: 1,
        boxSizing: "border-box",
      }}
    >
      {/* Section Title */}
      <Typography
        variant="h2"
        component="h2"
        sx={{
          fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
          fontWeight: 700,
          color: (theme) => theme.palette.text.primary,
          textAlign: "center",
          marginBottom: { xs: "3rem", sm: "4rem" },
        }}
      >
        What We Offer
      </Typography>

      {/* Loading State */}
      {loading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "300px",
          }}
        >
          <CircularProgress />
        </Box>
      )}

      {/* Services Flex Cards */}
      {!loading && (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: { xs: 2, sm: 3, md: 3 },
            justifyContent: { xs: "center", sm: "flex-start" },
            width: "100%",
            maxWidth: "100%",
          }}
        >
          {displayServices.map((service, index) => {
            const IconComponent = getServiceIcon(service.displayName || service.name);
            const slug = service.slug || getServiceSlug(service.displayName || service.name);
            
            // Navigate using the same format as Services.jsx: /services/{id}/{slug}
            const handleClick = () => {
              if (service.id) {
                navigate(`/services/${service.id}/${slug}`);
              } else {
                // Fallback: navigate to slug only if no backend ID
                navigate(`/services/${slug}`);
              }
            };

            return (
              <Card
                key={service.id || `fallback-${index}`}
                onClick={handleClick}
                sx={{
                flex: {
                  xs: "1 1 100%",
                  sm: "1 1 calc(50% - 12px)",
                  md: "1 1 calc(33.333% - 16px)",
                  lg: "1 1 calc(33.333% - 16px)",
                },
                minWidth: { xs: 0, sm: "280px", md: "300px" },
                maxWidth: { xs: "100%", sm: "none", md: "400px" },
                width: { xs: "100%", sm: "auto" },
                backgroundColor: (theme) =>
                  theme.palette.mode === "light"
                    ? "rgba(0, 0, 0, 0.03)"
                    : "transparent",
                border: (theme) =>
                  theme.palette.mode === "dark"
                    ? "1px solid rgba(255, 255, 255, 0.1)"
                    : "1px solid rgba(0, 0, 0, 0.1)",
                borderRadius: 2,
                transition: "all 0.3s ease",
                cursor: "pointer",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                boxShadow: (theme) =>
                  theme.palette.mode === "light"
                    ? "0 2px 8px rgba(0, 0, 0, 0.05)"
                    : "none",
                "&:hover": {
                  borderColor: (theme) => theme.palette.primary.main,
                  transform: "translateY(-4px)",
                  boxShadow: (theme) =>
                    theme.palette.mode === "light"
                      ? "0 4px 12px rgba(0, 0, 0, 0.1)"
                      : "0 8px 32px rgba(0, 0, 0, 0.3)",
                },
              }}
            >
              <CardContent sx={{ padding: { xs: "1.5rem", sm: "2rem" } }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    marginBottom: "1rem",
                  }}
                >
                  {IconComponent && (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: { xs: "48px", sm: "56px" },
                        height: { xs: "48px", sm: "56px" },
                        minWidth: { xs: "48px", sm: "56px" },
                        minHeight: { xs: "48px", sm: "56px" },
                        maxWidth: { xs: "48px", sm: "56px" },
                        maxHeight: { xs: "48px", sm: "56px" },
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
                          fontSize: { xs: "1.5rem", sm: "1.75rem" },
                        }}
                      />
                    </Box>
                  )}
                  <Typography
                    variant="h5"
                    component="h3"
                    sx={{
                      fontSize: { xs: "1.25rem", sm: "1.5rem" },
                      fontWeight: 600,
                      color: (theme) => theme.palette.text.primary,
                    }}
                  >
                    {service.displayName || service.name}
                  </Typography>
                </Box>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: { xs: "0.875rem", sm: "1rem" },
                    color: (theme) => theme.palette.text.secondary,
                    marginBottom: "1.5rem",
                    lineHeight: 1.6,
                  }}
                >
                  {service.displayDescription || service.description}
                </Typography>
                <Button
                  variant="text"
                  sx={{
                    color: (theme) => theme.palette.primary.main,
                    textTransform: "none",
                    fontWeight: 500,
                    padding: 0,
                    minWidth: "auto",
                    position: "relative",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: "-4px",
                      left: 0,
                      width: "0",
                      height: "2px",
                      backgroundColor: (theme) => theme.palette.primary.main,
                      transition: "width 0.3s ease",
                    },
                    "&:hover": {
                      backgroundColor: "transparent",
                      "&::after": {
                        width: "100%",
                      },
                    },
                    "&:focus": {
                      outline: "none",
                    },
                    "&:focus-visible": {
                      outline: "none",
                    },
                  }}
                >
                  Read More
                </Button>
              </CardContent>
            </Card>
          );
        })}
        </Box>
      )}
    </Box>
  );
}

export default ServicesSection;
