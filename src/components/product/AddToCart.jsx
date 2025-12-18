import { Button } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/slices/cart/cartSlice";

function AddToCart({ product }) {
  const dispatch = useDispatch();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e) => {
    e?.stopPropagation(); // Prevent event bubbling
    if (product) {
      dispatch(addToCart(product));
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    }
  };

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={handleAddToCart}
      disabled={!product}
      sx={{
        width: "100%",
        height: 50,
        fontWeight: 400,
        borderRadius: 2,
        boxShadow: "none",
        textTransform: "none",
        whiteSpace: "nowrap",
        border: "1px solid transparent",
        color: "#FFFFFF",
        transition: "all 0.3s ease",
        "&:hover": {
          borderColor: (theme) => theme.palette.primary.main,
          transform: "translateY(-4px)",
        },
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
        "&:active": {
          outline: (theme) => `2px solid ${theme.palette.primary.main}`,
          outlineOffset: "2px",
          boxShadow: "none",
        },
        "&:disabled": {
          opacity: 0.6,
        },
      }}
      disableRipple
    >
      {isAdded ? "Added to Cart!" : "Add to cart"}
    </Button>
  );
}

export default AddToCart;
