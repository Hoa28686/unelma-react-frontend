import { Box } from "@mui/material";
import React from "react";
import { Link } from "react-router";
import logo from "../assets/logo.webp";

function Logo() {
  return (
    <Box
      component={Link}
      to="/"
      sx={{
        height: { xs: "2.5rem", sm: "3rem" },
        width: "auto",
        p: { xs: ".25rem 0.25rem", sm: ".5rem 0.25rem" },
        mr: { xs: 1, sm: 2 },
        display: "flex",
        alignItems: "center",
        flexShrink: 0,
      }}
    >
      <img
        src={logo}
        alt="unelma-logo"
        style={{ 
          height: "100%", 
          width: "auto", 
          objectFit: "contain",
          objectPosition: "left center"
        }}
      />
    </Box>
  );
}

export default Logo;
