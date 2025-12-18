import React, { useState, useEffect } from "react";
import { Box, IconButton, Fade } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const toggleVisibility = () => {
      // Use requestAnimationFrame to batch scroll events and avoid forced reflows
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.pageYOffset > 300) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Fade in={isVisible}>
      <Box
        sx={{
          position: "fixed",
          bottom: { xs: "2rem", sm: "3rem" },
          right: { xs: "1.5rem", sm: "2rem" },
          zIndex: 1000,
        }}
      >
        <IconButton
          onClick={scrollToTop}
          sx={{
            backgroundColor: (theme) => theme.palette.primary.main,
            color: "#FFFFFF",
            width: { xs: "48px", sm: "56px" },
            height: { xs: "48px", sm: "56px" },
            borderRadius: "50%",
            border: "1px solid transparent",
            transition: "all 0.3s ease",
            "&:hover": {
              borderColor: (theme) => theme.palette.primary.main,
              transform: "translateY(-4px)",
            },
            "&:focus": {
              outline: "none",
              boxShadow: "none",
            },
            "&:focus-visible": {
              outline: "none",
              boxShadow: "none",
            },
          }}
        >
          <KeyboardArrowUpIcon sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }} />
        </IconButton>
      </Box>
    </Fade>
  );
}

export default BackToTop;

