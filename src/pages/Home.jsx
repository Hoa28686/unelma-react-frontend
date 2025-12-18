import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";
import { darken } from "@mui/material/styles";
import { useNavigate } from "react-router";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CloseIcon from "@mui/icons-material/Close";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SendIcon from "@mui/icons-material/Send";
import DescriptionIcon from "@mui/icons-material/Description";
import PaymentIcon from "@mui/icons-material/Payment";
import ComputerIcon from "@mui/icons-material/Computer";
import SecurityIcon from "@mui/icons-material/Security";
import StorageIcon from "@mui/icons-material/Storage";
import ScienceIcon from "@mui/icons-material/Science";
import CloudIcon from "@mui/icons-material/Cloud";
import PsychologyIcon from "@mui/icons-material/Psychology";
import Portfolio from "../components/home/Portfolio";
import Testimonials from "../components/home/Testimonials";
import Stats from "../components/home/Stats";

// Hardcoded services for Home page
const hardcodedServices = [
  {
    id: 1,
    name: "Cyber Security",
    description:
      "Protect your digital assets with our comprehensive security solutions.",
    icon: SecurityIcon,
    serviceId: "cyber-security",
  },
  {
    id: 2,
    name: "Data Management",
    description:
      "Efficiently organize and manage your data with our advanced systems.",
    icon: StorageIcon,
    serviceId: "data-management",
  },
  {
    id: 3,
    name: "Data Science",
    description:
      "Unlock insights from your data with our analytics and science expertise.",
    icon: ScienceIcon,
    serviceId: "data-science",
  },
  {
    id: 4,
    name: "Cloud Service",
    description: "Scale your infrastructure with our reliable cloud solutions.",
    icon: CloudIcon,
    serviceId: "cloud-service",
  },
  {
    id: 5,
    name: "AI and Machine Learning",
    description:
      "Leverage artificial intelligence to transform your business processes.",
    icon: PsychologyIcon,
    serviceId: "ai-machine-learning",
  },
  {
    id: 6,
    name: "Web and Mobile Development",
    description: "Request a quote; you will not be disappointed.",
    icon: ComputerIcon,
    serviceId: "web-mobile-development",
  },
];

function Home() {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    // Trigger animation on mount
    setIsLoaded(true);
  }, []);

  const handleRequestQuote = () => {
    navigate("/contact");
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
      }}
    >
      {/* Hero Section Container */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          backgroundImage: "url(/unelma_hero.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {" "}
        {/* Content overlay */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: { xs: "center", md: "flex-end" },
            minHeight: { xs: "auto", md: "auto" },
            paddingBottom: { xs: "2rem", sm: "3rem", md: "4rem" },
          }}
        >
          {/* Hero Content */}
          <Box
            sx={{
              width: "100%",
              maxWidth: { xs: "100%", sm: "95%", md: "100%" },
              padding: { xs: "2rem 1rem", sm: "3rem 2rem", md: "4rem 3rem" },
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.8s ease 0.4s, transform 0.8s ease 0.4s",
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: { xs: 3, md: 4 },
              alignItems: { xs: "flex-end", md: "center" },
            }}
          >
            {/* Button - Left half */}
            <Box
              sx={{
                width: { xs: "100%", md: "50%" },
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: { xs: "flex-end", md: "center" },
                order: { xs: 2, md: 1 },
              }}
            >
              <Button
                variant="text"
                color="primary"
                size="large"
                onClick={handleRequestQuote}
                sx={{
                  px: { xs: 3, sm: 4, md: 5 },
                  py: { xs: 1.25, sm: 1.5, md: 2 },
                  fontSize: { xs: "1rem", sm: "1.125rem", md: "1.25rem" },
                  fontWeight: 400,
                  borderRadius: 2,
                  boxShadow: "none",
                  textTransform: "none",
                  whiteSpace: "nowrap",
                  width: { xs: "auto", md: "fit-content" },
                  border: (theme) => `1px solid ${theme.palette.primary.main}`,
                  backgroundColor: (theme) => theme.palette.primary.main,
                  color: "#FFFFFF",
                  boxShadow: (theme) =>
                    theme.palette.mode === "light"
                      ? "0 2px 8px rgba(0, 0, 0, 0.05)"
                      : "0 4px 12px rgba(0, 0, 0, 0.3)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: (theme) => darken(theme.palette.primary.main, 0.2),
                    color: "#FFFFFF",
                    borderColor: (theme) => darken(theme.palette.primary.main, 0.2),
                    transform: "translate3d(0, -4px, 0)",
                    boxShadow: (theme) =>
                      theme.palette.mode === "light"
                        ? "0 4px 12px rgba(0, 0, 0, 0.1)"
                        : "0 8px 32px rgba(0, 0, 0, 0.3)",
                  },
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
                  "&:active": {
                    outline: (theme) =>
                      `2px solid ${theme.palette.primary.main}`,
                    outlineOffset: "2px",
                    boxShadow: "none",
                  },
                }}
                disableRipple
              >
                Request a quote
              </Button>
            </Box>

            {/* Text Content - Right half */}
            <Box
              sx={{
                width: { xs: "100%", md: "50%" },
                order: { xs: 1, md: 2 },
                padding: { xs: 2, sm: 3, md: 4 },
                paddingLeft: { xs: 2, sm: 3, md: 12 },
                "& p": {
                  fontSize: { xs: "1rem", sm: "1.125rem", md: "1.25rem" },
                  fontWeight: 400,
                  color: (theme) =>
                    theme.palette.mode === "dark"
                      ? "rgba(255, 255, 255, 0.9)"
                      : theme.palette.text.primary,
                  lineHeight: 1.8,
                  textAlign: "left",
                  maxWidth: "900px",
                  marginBottom: { xs: "1rem", sm: "1.5rem" },
                  marginTop: 0,
                  "&:last-child": {
                    marginBottom: 0,
                  },
                },
              }}
            >
              {/* Title */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  flexWrap: "wrap",
                  backgroundColor: (theme) =>
                    theme.palette.mode === "light"
                      ? "rgba(0, 0, 0, 0.15)"
                      : "rgba(0, 0, 0, 0.3)",
                  border: (theme) =>
                    theme.palette.mode === "dark"
                      ? "1px solid rgba(255, 255, 255, 0.1)"
                      : "1px solid rgba(0, 0, 0, 0.1)",
                  borderRadius: 2,
                  padding: { xs: 2, sm: 2.5, md: 3 },
                  boxShadow: (theme) =>
                    theme.palette.mode === "light"
                      ? "0 2px 8px rgba(0, 0, 0, 0.05)"
                      : "none",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                }}
              >
                <Typography
                  variant="h1"
                  component="h1"
                  sx={{
                    fontSize: {
                      xs: "2rem",
                      sm: "2.5rem",
                      md: "3.5rem",
                      lg: "4rem",
                    },
                    fontWeight: 700,
                    color: (theme) =>
                      theme.palette.mode === "dark"
                        ? "#FFFFFF"
                        : theme.palette.text.primary,
                    marginBottom: 0,
                    lineHeight: 1.2,
                    textAlign: "left",
                    flex: 1,
                    minWidth: { xs: "100%", sm: "auto" },
                  }}
                >
                  Empowering Growth with{" "}
                  <Box
                    component="span"
                    sx={{
                      color: (theme) => theme.palette.primary.main,
                    }}
                  >
                    Innovative Software Platforms
                  </Box>
                </Typography>

                {/* Arrow Icon Button */}
                <IconButton
                  onClick={handleOpenModal}
                  sx={{
                    color: (theme) => theme.palette.primary.main,
                    backgroundColor: (theme) =>
                      theme.palette.mode === "dark"
                        ? "rgba(255, 255, 255, 0.1)"
                        : "rgba(0, 0, 0, 0.05)",
                    "&:hover": {
                      backgroundColor: (theme) =>
                        theme.palette.mode === "dark"
                          ? "rgba(255, 255, 255, 0.2)"
                          : "rgba(0, 0, 0, 0.1)",
                      transform: "translateX(4px)",
                    },
                    transition: "all 0.3s ease",
                    padding: { xs: "0.75rem", sm: "1rem" },
                  }}
                  aria-label="Read more about us"
                >
                  <ArrowForwardIcon
                    sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }}
                  />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Modal for Detailed Description */}
      <Dialog
        open={modalOpen}
        onClose={handleCloseModal}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: { xs: 3, sm: 4 },
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? "rgba(0, 0, 0, 0.03)"
                : "transparent",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: (theme) =>
              theme.palette.mode === "dark"
                ? "1px solid rgba(255, 255, 255, 0.1)"
                : "1px solid rgba(0, 0, 0, 0.1)",
            boxShadow: (theme) =>
              theme.palette.mode === "light"
                ? "0 2px 8px rgba(0, 0, 0, 0.05)"
                : "none",
            overflow: "hidden",
            willChange: "transform, opacity",
            transform: "translateZ(0)",
            contain: "layout style paint",
            // Prevent layout thrashing
            position: "relative",
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: { xs: "1.5rem", sm: "2rem" },
            borderBottom: (theme) =>
              `1px solid ${
                theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.1)"
                  : "rgba(0, 0, 0, 0.1)"
              }`,
          }}
        >
          <Typography
            variant="h4"
            component="div"
            sx={{
              fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
              fontWeight: 700,
              color: (theme) =>
                theme.palette.mode === "light" ? "#FFFFFF" : theme.palette.text.primary,
              flex: 1,
            }}
          >
            Empowering Growth with{" "}
            <Box
              component="span"
              sx={{
                color: (theme) =>
                  theme.palette.mode === "light" ? "#000000" : theme.palette.primary.main,
              }}
            >
              Innovative Software Platforms
            </Box>
          </Typography>
          <IconButton
            onClick={handleCloseModal}
            sx={{
              color: (theme) =>
                theme.palette.mode === "light" ? "#FFFFFF" : theme.palette.text.secondary,
              "&:hover": {
                backgroundColor: (theme) =>
                  theme.palette.mode === "dark"
                    ? "rgba(255, 255, 255, 0.1)"
                    : "rgba(255, 255, 255, 0.1)",
              },
            }}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent
          sx={{
            padding: { xs: "1.5rem", sm: "2rem" },
            "& p": {
              fontSize: { xs: "1rem", sm: "1.125rem" },
              fontWeight: 400,
              color: (theme) =>
                theme.palette.mode === "light" ? "#FFFFFF" : theme.palette.text.primary,
              lineHeight: 1.8,
              marginBottom: "1.5rem",
              "&:last-child": {
                marginBottom: 0,
              },
            },
          }}
        >
          <Typography component="p">
            Unelma Platforms is a private limited company in multiple
            jurisdictions (Asia, EU and North America). We are a software
            platform development agency specialising in state-of-the-art
            software intended to develop business-specific software and offer IT
            consulting services.
          </Typography>

          <Typography component="p">
            In other words, we are the operator of a software platform
            development company intended to develop business-specific software
            and offer IT consulting services. The company's platform develops
            custom business applications and web-based platforms. We also
            provide API for various sites and other IT services, enabling higher
            education, healthcare, and business markets to design cloud
            applications for improving customer engagement.
          </Typography>
        </DialogContent>
      </Dialog>

      {/* What We Offer Section */}
      <Box
        sx={{
          width: "100%",
          backgroundColor: (theme) => theme.palette.background.default,
          padding: { xs: "4rem 1rem", sm: "5rem 2rem", md: "6rem 3rem" },
        }}
      >
        <Box sx={{ maxWidth: "1200px", margin: "0 auto" }}>
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

          {/* Services Flex Cards */}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: { xs: 2, sm: 3, md: 3 },
              justifyContent: { xs: "center", sm: "flex-start" },
            }}
          >
            {hardcodedServices.map((service) => {
              const IconComponent = service.icon;
              return (
                <Card
                  key={service.id}
                  onClick={() => navigate(`/services/${service.serviceId}`)}
                  sx={{
                    flex: {
                      xs: "1 1 100%",
                      sm: "1 1 calc(50% - 12px)",
                      md: "1 1 calc(33.333% - 16px)",
                      lg: "1 1 calc(33.333% - 16px)",
                    },
                    minWidth: { xs: "100%", sm: "280px", md: "300px" },
                    maxWidth: { xs: "100%", sm: "none", md: "400px" },
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
                        {service.name}
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
                      {service.description}
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
                          backgroundColor: (theme) =>
                            theme.palette.primary.main,
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
        </Box>
      </Box>

      {/* Work Process Section */}
      <Box
        sx={{
          width: "100%",
          backgroundColor: (theme) => theme.palette.background.default,
          padding: { xs: "4rem 1rem", sm: "5rem 2rem", md: "6rem 3rem" },
        }}
      >
        <Box sx={{ maxWidth: "1200px", margin: "0 auto" }}>
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
            Work Process
          </Typography>

          {/* Process Steps */}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: { xs: 3, sm: 4, md: 4 },
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            {[
              {
                number: "1",
                title: "Register/ Login",
                icon: (
                  <PersonAddIcon
                    sx={{ fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" } }}
                  />
                ),
              },
              {
                number: "2",
                title: "Select Product or Service",
                icon: (
                  <ShoppingCartIcon
                    sx={{ fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" } }}
                  />
                ),
              },
              {
                number: "3",
                title: "Submit Your Order",
                icon: (
                  <SendIcon
                    sx={{ fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" } }}
                  />
                ),
              },
              {
                number: "4",
                title: "Provide Contents",
                icon: (
                  <DescriptionIcon
                    sx={{ fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" } }}
                  />
                ),
              },
              {
                number: "5",
                title: "Payment & Delivery",
                icon: (
                  <PaymentIcon
                    sx={{ fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" } }}
                  />
                ),
              },
            ].map((step, index) => (
              <Box
                key={index}
                sx={{
                  flex: {
                    xs: "1 1 100%",
                    sm: "1 1 calc(50% - 16px)",
                    md: "1 1 calc(20% - 16px)",
                  },
                  minWidth: { xs: "100%", sm: "200px", md: "180px" },
                  maxWidth: { xs: "100%", sm: "none", md: "220px" },
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  position: "relative",
                }}
              >
                {/* Step Number */}
                <Box
                  sx={{
                    width: { xs: "50px", sm: "60px", md: "70px" },
                    height: { xs: "50px", sm: "60px", md: "70px" },
                    borderRadius: "50%",
                    backgroundColor: (theme) => theme.palette.primary.main,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1.5rem",
                    fontWeight: 700,
                    fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" },
                    color: "#FFFFFF",
                  }}
                >
                  {step.number}
                </Box>

                {/* Icon */}
                <Box
                  sx={{
                    color: (theme) => theme.palette.primary.main,
                    marginBottom: "1rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {step.icon}
                </Box>

                {/* Step Title */}
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{
                    fontSize: { xs: "1rem", sm: "1.125rem", md: "1.25rem" },
                    fontWeight: 600,
                    color: (theme) => theme.palette.text.primary,
                  }}
                >
                  {step.title}
                </Typography>

                {/* Connector Line (except for last item) */}
                {index < 4 && (
                  <Box
                    sx={{
                      display: { xs: "none", md: "block" },
                      position: "absolute",
                      top: { xs: "35px", md: "35px" },
                      left: "calc(100% + 8px)",
                      width: "calc(20% - 16px)",
                      height: "2px",
                      backgroundColor: (theme) => theme.palette.primary.main,
                      opacity: 0.3,
                    }}
                  />
                )}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Portfolio Section */}
      <Portfolio />

      {/* Stats Section */}
      <Stats />

      {/* Testimonials Section */}
      <Testimonials />
    </Box>
  );
}

export default Home;
