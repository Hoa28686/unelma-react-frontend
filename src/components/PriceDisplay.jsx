import { Box, Typography } from "@mui/material";
import React from "react";

function PriceDisplay({ price }) {
  const [euro, cent] = parseFloat(price).toFixed(2).split(".");
  return (
    <Typography variant="h6" component="div">
      <Box component="span" sx={{ fontSize: "1rem", mr: 0.3 }}>
        €
      </Box>
      <Box component="span" fontSize="2rem" fontWeight="bold">
        {euro}.
      </Box>
      <Box
        component="span"
        fontSize="0.8rem"
        sx={{ verticalAlign: "text-top" }}
      >
        {cent}
      </Box>
    </Typography>
  );
}

export default PriceDisplay;
