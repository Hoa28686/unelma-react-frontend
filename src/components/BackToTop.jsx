import React, { useState, useEffect } from "react";
import { Box, IconButton, Fade } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

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
          "&::after": {
            content: '""',
            position: "absolute",
            top: "-8px",
            left: "-8px",
            right: "-8px",
            bottom: "-8px",
            border: "4px solid transparent",
            borderRadius: "50%",
            transition: "border-color 0.3s ease",
            pointerEvents: "none",
            zIndex: -1,
          },
          "&:hover::after": {
            borderColor: "#3B82F6",
          },
        }}
      >
        <IconButton
          onClick={scrollToTop}
          sx={{
            backgroundColor: "#3B82F6",
            color: "#FFFFFF",
            width: { xs: "48px", sm: "56px" },
            height: { xs: "48px", sm: "56px" },
            transition: "all 0.3s ease",
            "&:focus": {
              outline: "none",
            },
            "&:focus-visible": {
              outline: "none",
            },
          }}
          disableRipple
        >
          <KeyboardArrowUpIcon sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }} />
        </IconButton>
      </Box>
    </Fade>
  );
}

export default BackToTop;

