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
      <Button 
        component={Link} 
        to="/" 
        color="primary" 
        variant="contained"
        sx={{ 
          mt: 2,
          border: "1px solid transparent",
          transition: "all 0.3s ease",
          "&:hover": {
            borderColor: "#E57A44",
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
