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
        p: ".5rem 0.25rem",
        mr: 2,
      }}
    >
      <img
        src="https://www.unelmaplatforms.com/assets/uploads/media-uploader/unelma-platforms-11670581545.jpg"
        alt="unelma-logo"
        style={{ height: "100%", width: "auto" }}
      />
    </Box>
  );
}

export default Logo;
