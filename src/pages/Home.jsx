import React, { useState, useEffect } from "react";
import { Box, Dialog, DialogTitle, DialogContent, IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import CloseIcon from "@mui/icons-material/Close";
import HeroSection from "../components/home/HeroSection";
import ServicesSection from "../components/home/ServicesSection";
import WorkProcess from "../components/home/WorkProcess";
import Portfolio from "../components/home/Portfolio";
import Stats from "../components/home/Stats";
import Testimonials from "../components/home/Testimonials";
import { useBfcacheOptimization } from "../hooks/useBfcacheOptimization";

function Home() {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // Optimize for back/forward cache
  useBfcacheOptimization();

  useEffect(() => {
    // Trigger animation on mount using requestAnimationFrame to avoid forced reflows
    const rafId = requestAnimationFrame(() => {
      setIsLoaded(true);
    });
    return () => cancelAnimationFrame(rafId);
  }, []);

  // Close modal when page is hidden (entering bfcache) to allow caching
  useEffect(() => {
    const handlePageHide = (event) => {
      if (event.persisted && modalOpen) {
        // Close modal before page enters bfcache
        setModalOpen(false);
      }
    };

    window.addEventListener("pagehide", handlePageHide);
    return () => window.removeEventListener("pagehide", handlePageHide);
  }, [modalOpen]);

  const handleRequestQuote = () => {
    navigate("/contact");
  };

  const handleOpenModal = () => {
    // Defer modal opening to next frame to batch with any pending layout operations
    requestAnimationFrame(() => {
      setModalOpen(true);
    });
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        maxWidth: "100%",
        overflowX: "hidden",
      }}
      >
      {/* Hero Section */}
      <HeroSection
        isLoaded={isLoaded}
        onRequestQuote={handleRequestQuote}
        onOpenModal={handleOpenModal}
      />

      {/* Modal for Detailed Description */}
      <Dialog
        open={modalOpen}
        onClose={handleCloseModal}
        maxWidth="md"
        fullWidth
        sx={{
          "& .MuiBackdrop-root": {
            backgroundColor: (theme) =>
              theme.palette.mode === "dark"
                ? "rgba(0, 0, 0, 0.75)"
                : "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            willChange: "backdrop-filter",
            transition: "backdrop-filter 0.3s ease",
          },
        }}
        PaperProps={{
          sx: {
            borderRadius: { xs: 3, sm: 4 },
            backgroundColor: (theme) =>
              theme.palette.mode === "dark"
                ? "rgba(21, 27, 46, 0.95)"
                : "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: (theme) =>
              theme.palette.mode === "dark"
                ? "1px solid rgba(255, 255, 255, 0.1)"
                : "1px solid rgba(255, 255, 255, 0.8)",
            boxShadow: (theme) =>
              theme.palette.mode === "dark"
                ? "0 20px 60px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05)"
                : "0 20px 60px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.05)",
            overflow: "hidden",
            willChange: "transform, opacity",
            transform: "translateZ(0)",
            contain: "layout style paint",
            // Prevent layout thrashing
            position: "relative",
          },
        }}
        TransitionProps={{
          onEnter: (node) => {
            // Use requestAnimationFrame to batch layout operations
            requestAnimationFrame(() => {
              node.style.transform = "translateZ(0)";
            });
          },
        }}
        // Use faster transitions to reduce layout calculation time
        transitionDuration={{ enter: 300, exit: 200 }}
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
              color: (theme) => theme.palette.text.primary,
              flex: 1,
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
          <IconButton
            onClick={handleCloseModal}
            sx={{
              color: (theme) => theme.palette.text.secondary,
              "&:hover": {
                backgroundColor: (theme) =>
                  theme.palette.mode === "dark"
                    ? "rgba(255, 255, 255, 0.1)"
                    : "rgba(0, 0, 0, 0.05)",
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
              color: (theme) => theme.palette.text.primary,
              lineHeight: 1.8,
              marginBottom: "1.5rem",
              "&:last-child": {
                marginBottom: 0,
              },
            },
          }}
        >
          <Typography component="p">
            Unelma Platforms is a global software development company with operations across Asia, Europe, and North America. We specialize in creating innovative software platforms that empower businesses to transform their operations and achieve sustainable growth.
          </Typography>

          <Typography component="p">
            Our team develops custom business applications, web-based platforms, and comprehensive API solutions. We serve diverse markets including higher education, healthcare, and enterprise businesses, helping them design and deploy cloud applications that enhance customer engagement and drive operational efficiency.
          </Typography>

          <Typography component="p">
            With 15 years of experience, we combine cutting-edge technology with deep industry expertise to deliver solutions that not only meet today's challenges but scale for tomorrow's opportunities.
          </Typography>
        </DialogContent>
      </Dialog>

      {/* Content Wrapper - matches Footer width */}
      <Box
        sx={{
          maxWidth: { xs: "90%", sm: "85%", md: "1280px" },
          margin: "0 auto",
          width: "100%",
        }}
      >
        <ServicesSection />
        <WorkProcess />
        <Portfolio />
        <Stats />
        <Testimonials />
      </Box>
    </Box>
  );
}

export default Home;
