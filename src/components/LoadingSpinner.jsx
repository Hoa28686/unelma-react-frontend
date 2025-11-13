import { Box, CircularProgress } from "@mui/material";
import React from "react";

function LoadingSpinner() {
  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <CircularProgress size={64} color="secondary" />
    </Box>
  );
}

export default LoadingSpinner;
