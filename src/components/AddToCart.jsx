import { Button } from "@mui/material";
import React from "react";

function AddToCart() {
  return (
    <Button
      variant="contained"
      color="primary"
      sx={{
        width: "100%",
        height: 50,
        fontWeight: 100,
        borderRadius: 2,
        boxShadow: "none",
        textTransform: "none",
        whiteSpace: "nowrap",
        border: "none",
        position: "relative",
        color: "#FFFFFF",
        transition: "all 0.3s ease",
        '&::after': {
          content: '""',
          position: "absolute",
          top: "8px",
          left: "8px",
          width: "100%",
          height: "100%",
          borderRight: "4px solid transparent",
          borderBottom: "4px solid transparent",
          borderRadius: 2,
          transition: "border-color 0.3s ease",
          pointerEvents: "none",
          zIndex: -1,
        },
        '&:hover': {
          boxShadow: "none",
          backgroundColor: (theme) => theme.palette.primary.main,
          transform: "translateY(-2px)",
          '&::after': {
            borderRightColor: "#3B82F6",
            borderBottomColor: "#3B82F6",
          },
        },
        '&:focus': {
          outline: "none",
          boxShadow: "none",
        },
        '&:focus-visible': {
          outline: "none",
          boxShadow: "none",
        },
        '&:active': {
          outline: "none",
          boxShadow: "none",
          border: "none",
        },
      }}
      disableRipple
    >
      Add to cart
    </Button>
  );
}

export default AddToCart;
