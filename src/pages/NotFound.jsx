import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router";

function NotFound() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100vw",
      }}
    >
      <Typography variant="h2">404</Typography>
      <Typography variant="h6">Page not found</Typography>
      <Button component={Link} to="/" color="primary" sx={{ mt: 2 }}>
        Back to the home page
      </Button>
    </Box>
  );
}

export default NotFound;
