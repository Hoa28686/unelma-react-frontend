import { Box } from "@mui/material";
import React from "react";
import { Link } from "react-router";

function Logo() {
  return (
    <Box
      component={Link}
      to="/"
      sx={{
        height: "3rem",
        width: "auto",
        py: ".25rem",
        mr: 2,
        display: "flex",
        alignItems: "center",
        flexShrink: 0,
      }}
    >
      <img
        src="/logo.webp"
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
  );
}

export default Logo;
