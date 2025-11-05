import { Box } from "@mui/material";
import React from "react";
import { Link } from "react-router";
import unelmaLogo from "../assets/unelma-logo.png";

function Logo() {
  return (
    <Box
      component={Link}
      to="/"
      sx={{
        height: "3rem",
        p: ".5rem 0.25rem",
        mr: 2,
      }}
    >
      <img
        src={unelmaLogo}
        alt="unelma-logo"
        style={{ height: "100%", width: "auto" }}
      />
    </Box>
  );
}

export default Logo;
