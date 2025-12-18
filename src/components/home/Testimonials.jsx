import React from "react";
import { Box, Typography, Card, CardContent, Avatar, Rating } from "@mui/material";
import { placeholderLogo } from "../../helpers/helpers";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "CTO, TechFlow Solutions",
    testimonial: "Unelma Platforms transformed our entire workflow. Their custom software solution increased our productivity by 40% and streamlined our operations like never before.",
    rating: 5,
    image: placeholderLogo,
  },
  {
    name: "Marcus Johnson",
    role: "CEO, Digital Dynamics",
    testimonial: "The team at Unelma Platforms delivered beyond our expectations. Their innovative approach and attention to detail made our project a huge success.",
    rating: 5,
    image: placeholderLogo,
  },
  {
    name: "Elena Rodriguez",
    role: "Operations Director, CloudFirst Inc.",
    testimonial: "Working with Unelma Platforms was a game-changer. Their platform development expertise helped us scale our business efficiently and effectively.",
    rating: 5,
    image: placeholderLogo,
  },
  {
    name: "David Kim",
    role: "Founder, StartupHub",
    testimonial: "From concept to deployment, Unelma Platforms guided us every step of the way. Their solutions are robust, scalable, and exactly what we needed.",
    rating: 5,
    image: placeholderLogo,
  },
  {
    name: "Amanda Foster",
    role: "VP Engineering, DataSphere",
    testimonial: "The cybersecurity solutions provided by Unelma Platforms gave us peace of mind. Our data is now protected with enterprise-grade security.",
    rating: 5,
    image: placeholderLogo,
  },
  {
    name: "James Mitchell",
    role: "Product Manager, InnovateTech",
    testimonial: "Unelma Platforms' mobile development team created an app that our users love. The user experience is exceptional and the performance is outstanding.",
    rating: 5,
    image: placeholderLogo,
  },
];

function Testimonials() {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "100%",
        backgroundColor: (theme) => theme.palette.background.default,
        padding: { xs: "4rem 1rem", sm: "5rem 2rem", md: "6rem 3rem" },
        boxSizing: "border-box",
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
          marginBottom: { xs: "1rem", sm: "1.5rem" },
        }}
      >
        What Our Clients Say
      </Typography>

      <Typography
        variant="body1"
        sx={{
          fontSize: { xs: "1rem", sm: "1.125rem" },
          color: (theme) => theme.palette.text.secondary,
          textAlign: "center",
          marginBottom: { xs: "3rem", sm: "4rem" },
          maxWidth: { xs: "100%", sm: "600px" },
          margin: "0 auto",
          mb: { xs: 4, sm: 5 },
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        Hear from businesses that have transformed their operations with our innovative software solutions
      </Typography>

      {/* Testimonials Grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
          gap: { xs: 2.5, sm: 3, md: 3 },
          width: "100%",
          maxWidth: "100%",
        }}
      >
        {testimonials.map((testimonial, index) => (
          <Card
            key={index}
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? "rgba(0, 0, 0, 0.03)"
                  : "transparent",
              border: (theme) =>
                theme.palette.mode === "dark"
                  ? "1px solid rgba(255, 255, 255, 0.1)"
                  : "1px solid rgba(0, 0, 0, 0.1)",
              borderRadius: 3,
              padding: { xs: "2rem", sm: "2.5rem" },
              display: "flex",
              flexDirection: "column",
              transition: "all 0.3s ease",
              boxShadow: (theme) =>
                theme.palette.mode === "light"
                  ? "0 2px 8px rgba(0, 0, 0, 0.05)"
                  : "none",
              "&:hover": {
                transform: "translateY(-4px)",
                borderColor: (theme) => theme.palette.primary.main,
                boxShadow: (theme) =>
                  theme.palette.mode === "light"
                    ? "0 4px 12px rgba(0, 0, 0, 0.1)"
                    : "0 8px 32px rgba(0, 0, 0, 0.3)",
              },
            }}
          >
            <CardContent sx={{ p: 0, flex: 1, display: "flex", flexDirection: "column" }}>
              {/* Rating */}
              <Box sx={{ mb: 2 }}>
                <Rating value={testimonial.rating} readOnly size="small" />
              </Box>

              {/* Testimonial Text */}
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: "0.9375rem", sm: "1rem" },
                  color: (theme) => theme.palette.text.secondary,
                  lineHeight: 1.7,
                  fontStyle: "italic",
                  mb: 3,
                  flex: 1,
                }}
              >
                "{testimonial.testimonial}"
              </Typography>

              {/* Client Info */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  pt: 2,
                  borderTop: (theme) => `1px solid ${theme.palette.divider}`,
                }}
              >
                <Avatar
                  src={testimonial.image}
                  alt={testimonial.name}
                  sx={{
                    width: { xs: 48, sm: 56 },
                    height: { xs: 48, sm: 56 },
                    border: (theme) =>
                      theme.palette.mode === "light"
                        ? `2px solid ${theme.palette.primary.main}30`
                        : `2px solid ${theme.palette.primary.light}30`,
                    boxShadow: (theme) =>
                      theme.palette.mode === "light"
                        ? `0 2px 8px ${theme.palette.primary.main}20`
                        : `0 2px 8px ${theme.palette.primary.light}20`,
                  }}
                >
                  {testimonial.name.charAt(0)}
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: { xs: "0.9375rem", sm: "1rem" },
                      fontWeight: 600,
                      color: (theme) => theme.palette.text.primary,
                      mb: 0.5,
                    }}
                  >
                    {testimonial.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: { xs: "0.75rem", sm: "0.875rem" },
                      color: (theme) => theme.palette.text.secondary,
                    }}
                  >
                    {testimonial.role}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
        </Box>
    </Box>
  );
}

export default Testimonials;
