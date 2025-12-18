import { Box, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router";

function Logo() {
  return (
    <Box
      component={Link}
      to="/"
      sx={{
        display: "flex",
        alignItems: "center",
        gap: { xs: 1, sm: 1.5 },
        flexShrink: 0,
        textDecoration: "none",
      }}
    >
      <Box
        sx={{
          width: "3.2rem",
          display: "flex",
          pl: 0,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src="/unelma_logo.webp"
          alt="unelma-logo"
          style={{
            height: "auto",
            width: "100%",
            maxWidth: "100%",
            objectFit: "contain",
            objectPosition: "center center",
          }}
        />
      </Box>
      <Box
        component="div"
        sx={{
          display: { xs: "none", lg: "flex" },
          flexDirection: "column",
          lineHeight: 1.2,
          color: (theme) => theme.palette.text.primary,
          fontSize: { xs: "0.875rem", sm: "1rem", md: "1.125rem" },
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            letterSpacing: "0.1em",
          }}
        >
          UNELMA
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 300,
            letterSpacing: "0.1em",
          }}
        >
          PLATFORMS
        </Typography>
      </Box>
    </Box>
  );
}

export default Logo;
