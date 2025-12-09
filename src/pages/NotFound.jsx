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
        mt: 8,
      }}
    >
      <Typography variant="h2">404</Typography>
      <Typography variant="h6">Page not found</Typography>
      <Button
        component={Link}
        to="/"
        color="primary"
        variant="contained"
        sx={{
          mt: 2,
          border: "1px solid transparent",
          transition: "all 0.3s ease",
          "&:focus": {
            outline: (theme) => `2px solid ${theme.palette.primary.main}`,
            outlineOffset: "2px",
            boxShadow: "none",
          },
          "&:focus-visible": {
            outline: (theme) => `2px solid ${theme.palette.primary.main}`,
            outlineOffset: "2px",
            boxShadow: "none",
          },
          "&:hover": {
            borderColor: (theme) => theme.palette.primary.main,
            transform: "translateY(-4px)",
          },
        }}
      >
        Back to the home page
      </Button>
    </Box>
  );
}

export default NotFound;
