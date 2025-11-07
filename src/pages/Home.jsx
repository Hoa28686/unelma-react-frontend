import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Card, CardContent } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SendIcon from "@mui/icons-material/Send";
import DescriptionIcon from "@mui/icons-material/Description";
import PaymentIcon from "@mui/icons-material/Payment";
import heroImage from "../assets/hero.webp";
import heroTilesImage from "../assets/hero-tiles.webp";

function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger animation on mount
    setIsLoaded(true);
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      {/* Hero Images - layered, animates from top, behind header, to below header */}
      {/* First image (tiles) - back layer */}
      <Box
        sx={(theme) => ({
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          backgroundImage: `url(${heroTilesImage})`,
          backgroundRepeat: { xs: "no-repeat", md: "repeat-x" },
          backgroundSize: { xs: "contain", md: "auto 100vh" },
          backgroundPosition: "center",
          zIndex: 0,
          transform: isLoaded 
            ? "translateY(0)" 
            : "translateY(-100vh)",
          transition: "transform 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
          willChange: "transform",
        })}
      />
      {/* Second image (black background) - front layer with delay */}
      <Box
        sx={(theme) => ({
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          backgroundImage: `url(${heroImage})`,
          backgroundRepeat: { xs: "no-repeat", md: "repeat-x" },
          backgroundSize: { xs: "contain", md: "auto 100vh" },
          backgroundPosition: "center",
          zIndex: 1,
          transform: isLoaded 
            ? "translateY(0)" 
            : "translateY(-100vh)",
          transition: "transform 1.2s cubic-bezier(0.4, 0, 0.2, 1) 0.3s",
          willChange: "transform",
        })}
      />
      
      {/* Content overlay - ensures content is above the image */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        {/* Hero Content */}
        <Box
          sx={{
            width: "100%",
            maxWidth: { xs: "90%", sm: "95%", md: "100%" },
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
          <Box sx={{ 
            width: { xs: "100%", md: "50%" },
            display: "flex", 
            flexDirection: "column",
            justifyContent: "center",
            alignItems: { xs: "flex-end", md: "center" },
            order: { xs: 2, md: 1 },
          }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{
                px: { xs: 3, sm: 4, md: 5 },
                py: { xs: 1.25, sm: 1.5, md: 2 },
                fontSize: { xs: "1rem", sm: "1.125rem", md: "1.25rem" },
                fontWeight: 100,
                borderRadius: 2,
                boxShadow: "none",
                textTransform: "none",
                whiteSpace: "nowrap",
                width: { xs: "auto", md: "fit-content" },
                border: "none",
                position: "relative",
                '&::after': {
                  content: '""',
                  position: "absolute",
                  top: "8px",
                  left: "8px",
                  width: "100%",
                  height: "100%",
                  borderRight: "4px solid transparent",
                  borderBottom: "4px solid transparent",
                  borderRadius: 2,
                  transition: "border-color 0.3s ease",
                  pointerEvents: "none",
                  zIndex: -1,
                },
                '&:hover': {
                  boxShadow: "none",
                  backgroundColor: (theme) => theme.palette.primary.main,
                  '&::after': {
                    borderRightColor: "#3B82F6",
                    borderBottomColor: "#3B82F6",
                  },
                },
                '&:focus': {
                  outline: "none",
                  boxShadow: "none",
                },
                '&:focus-visible': {
                  outline: "none",
                  boxShadow: "none",
                },
                '&:active': {
                  outline: "none",
                  boxShadow: "none",
                  border: "none",
                },
              }}
              disableRipple
            >
              Request a quote
            </Button>
          </Box>

          {/* Text Content - Right half */}
          <Box sx={{ 
            width: { xs: "100%", md: "50%" },
            order: { xs: 1, md: 2 },
            "& p": {
              fontSize: { xs: "1rem", sm: "1.125rem", md: "1.25rem" },
              fontWeight: 400,
              color: "rgba(255, 255, 255, 0.9)",
              lineHeight: 1.8,
              textAlign: "left",
              maxWidth: "900px",
              marginBottom: { xs: "1rem", sm: "1.5rem" },
              marginTop: 0,
              "&:last-child": {
                marginBottom: 0,
              },
            },
          }}>
            <Box
              sx={{
                padding: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              }}
            >
              {/* Title */}
              <Typography
                variant="h1"
                component="h1"
                sx={{
                  fontSize: { xs: "2rem", sm: "2.5rem", md: "3.5rem", lg: "4rem" },
                  fontWeight: 700,
                  color: "#FFFFFF",
                  marginBottom: { xs: "1.5rem", sm: "2rem" },
                  lineHeight: 1.2,
                  textAlign: "left",
                }}
              >
                We are Software Platform Development Company
              </Typography>
              
              {/* Body Text */}
              <Box
                sx={{
                  "& p": {
                    color: "rgba(255, 255, 255, 0.95)",
                  },
                }}
              >
                <p>
                  Unelma Platforms is a private limited company in multiple jurisdictions (Asia, EU and North America). We are a software platform development agency specialising in state-of-the-art software intended to develop business-specific software and offer IT consulting services.
                </p>
                
                <p>
                  In other words, we are the operator of a software platform development company intended to develop business-specific software and offer IT consulting services. The company's platform develops custom business applications and web-based platforms. We also provide API for various sites and other IT services, enabling higher education, healthcare, and business markets to design cloud applications for improving customer engagement.
                </p>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

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
            {[
              {
                title: "Cyber Security",
                description: "We help with cyber security tools and services",
              },
              {
                title: "Data Management",
                description: "We at Unelma Platforms can help you with different types of data management products and services.",
              },
              {
                title: "Data Science",
                description: "Previously, we have developed AI-powered email applications which have scaled to millions of users and subscribers. Feel free to contact us if you would need help with data science-related services.",
              },
              {
                title: "Cloud Service",
                description: "We are masters of cloud services as we have developed one of the platforms called \"Unelma Cloud\".",
              },
              {
                title: "AI and machine learning",
                description: "We deliver AI-driven solutions to our clients by providing world-class AI expertise and tooling for computer vision, natural language processing and machine learning.",
              },
              {
                title: "Web and mobile development",
                description: "We know this shit! Request a quote; you will not be disappointed.",
              },
            ].map((service, index) => (
              <Card
                key={index}
                sx={{
                  flex: { 
                    xs: "1 1 100%", 
                    sm: "1 1 calc(50% - 12px)", 
                    md: "1 1 calc(33.333% - 16px)",
                    lg: "1 1 calc(33.333% - 16px)",
                  },
                  minWidth: { xs: "100%", sm: "280px", md: "300px" },
                  maxWidth: { xs: "100%", sm: "none", md: "400px" },
                  backgroundColor: (theme) => theme.palette.background.paper,
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: 2,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    borderColor: "#3B82F6",
                    transform: "translateY(-4px)",
                  },
                }}
              >
                <CardContent sx={{ padding: { xs: "1.5rem", sm: "2rem" } }}>
                  <Typography
                    variant="h5"
                    component="h3"
                    sx={{
                      fontSize: { xs: "1.25rem", sm: "1.5rem" },
                      fontWeight: 600,
                      color: (theme) => theme.palette.text.primary,
                      marginBottom: "1rem",
                    }}
                  >
                    {service.title}
                  </Typography>
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
                      color: "#3B82F6",
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
                        backgroundColor: "#3B82F6",
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
            ))}
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
                icon: <PersonAddIcon sx={{ fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" } }} />,
              },
              {
                number: "2",
                title: "Select Product or Service",
                icon: <ShoppingCartIcon sx={{ fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" } }} />,
              },
              {
                number: "3",
                title: "Submit Your Order",
                icon: <SendIcon sx={{ fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" } }} />,
              },
              {
                number: "4",
                title: "Provide Contents",
                icon: <DescriptionIcon sx={{ fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" } }} />,
              },
              {
                number: "5",
                title: "Payment & Delivery",
                icon: <PaymentIcon sx={{ fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" } }} />,
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
                    backgroundColor: "#3B82F6",
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
                    color: "#3B82F6",
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
                      backgroundColor: "#3B82F6",
                      opacity: 0.3,
                    }}
                  />
                )}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
