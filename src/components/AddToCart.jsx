import { Button } from "@mui/material";
import React from "react";

function AddToCart() {
  return (
    <Button
      variant="contained"
      sx={{ color: "secondary.main", width: "100%", height: 50 }}
    >
      Add to cart
    </Button>
  );
}

export default AddToCart;
