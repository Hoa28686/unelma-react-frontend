import { Box } from "@mui/material";
import React from "react";
import { Link } from "react-router";

function Logo() {
  return (
    <Box
      component={Link}
      to="/"
      sx={{
        height: { xs: "56px", sm: "64px" },
        width: { xs: "56px", sm: "64px" },
        backgroundColor: "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: { xs: "48px", sm: "48px" },
        mr: { xs: 1, sm: 2 },
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
