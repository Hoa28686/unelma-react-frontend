import React from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function HeroSection({ isLoaded, onRequestQuote, onOpenModal }) {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
      }}
    >
      {/* Hero Content */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          minHeight: { xs: "400px", sm: "500px", md: "600px" },
          paddingBottom: { xs: "3rem", sm: "4rem", md: "5rem" },
          paddingTop: { xs: "2rem", sm: "3rem", md: "4rem" },
          opacity: isLoaded ? 1 : 0,
          transform: isLoaded ? "translate3d(0, 0, 0)" : "translate3d(0, 20px, 0)",
          transition: "opacity 0.8s ease 0.4s, transform 0.8s ease 0.4s",
          willChange: isLoaded ? "auto" : "opacity, transform",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 3, md: 4 },
          alignItems: { xs: "flex-end", md: "center" },
          contain: "layout style paint",
          // Prevent layout recalculation
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: { xs: "100%", sm: "95%", md: "100%" },
            padding: { xs: "2rem 1rem", sm: "3rem 2rem", md: "4rem 3rem" },
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 3, md: 4 },
            alignItems: { xs: "flex-end", md: "center" },
            boxSizing: "border-box",
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
              onClick={onRequestQuote}
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
                backgroundColor: "transparent",
                color: (theme) => theme.palette.text.primary,
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: (theme) => theme.palette.primary.main,
                  color: "#FFFFFF",
                  borderColor: (theme) => theme.palette.primary.main,
                  transform: "translate3d(0, -4px, 0)",
                },
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
                "&:active": {
                  outline: (theme) => `2px solid ${theme.palette.primary.main}`,
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
              "& p": {
                fontSize: { xs: "1rem", sm: "1.125rem", md: "1.25rem" },
                fontWeight: 400,
                color: (theme) =>
                  theme.palette.mode === "dark"
                    ? "rgba(255, 255, 255, 0.9)"
                    : theme.palette.text.primary,
                lineHeight: 1.8,
                textAlign: "left",
                maxWidth: { xs: "100%", sm: "900px" },
                marginBottom: { xs: "1rem", sm: "1.5rem" },
                width: "100%",
                boxSizing: "border-box",
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
              }}
            >
              <Typography
                variant="h1"
                component="h1"
                sx={{
                  fontSize: { xs: "2rem", sm: "2.5rem", md: "3.5rem", lg: "4rem" },
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
                onClick={onOpenModal}
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
                    transform: "translate3d(4px, 0, 0)",
                  },
                  transition: "all 0.3s ease",
                  padding: { xs: "0.75rem", sm: "1rem" },
                }}
                aria-label="Read more about us"
              >
                <ArrowForwardIcon sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }} />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default HeroSection;
