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
        marginLeft: { xs: "48px", sm: "48px" },
        mr: { xs: 1, sm: 2 },
        flexShrink: 0,
        textDecoration: "none",
      }}
    >
      <Box
        sx={{
          height: { xs: "56px", sm: "64px" },
          width: { xs: "56px", sm: "64px" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src="/unelma_logo.webp"
          alt="unelma-logo"
          style={{
            height: "100%",
            width: "auto",
            maxWidth: "100%",
            objectFit: "contain",
            objectPosition: "center center",
          }}
        />
      </Box>
      <Typography
        variant="h6"
        component="div"
        sx={{
          display: "flex",
          flexDirection: "column",
          lineHeight: 1.2,
          color: (theme) => theme.palette.text.primary,
          fontSize: { xs: "0.875rem", sm: "1rem", md: "1.125rem" },
        }}
      >
        <Box
          component="span"
          sx={{
            fontWeight: 700,
            letterSpacing: "0.1em",
          }}
        >
          UNELMA
        </Box>
        <Box
          component="span"
          sx={{
            fontWeight: 300,
            letterSpacing: "0.1em",
          }}
        >
          PLATFORMS
        </Box>
      </Typography>
    </Box>
  );
}

export default Logo;
