import { Box, Typography } from "@mui/material";
import React from "react";

function PriceDisplay({ price }) {
  const numericPrice = parseFloat(price);
  const validPrice = isNaN(numericPrice) ? 0 : numericPrice;
  const [euro, cent] = validPrice.toFixed(2).split(".");
  return (
    <Typography 
      variant="h6" 
      component="div"
      sx={{ color: (theme) => theme.palette.text.primary }}
    >
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
