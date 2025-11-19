import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Button,
  Divider,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { removeFromCart, updateQuantity, clearCart } from "../lib/features/cart/cartSlice";
import PriceDisplay from "../components/PriceDisplay";
import { getImageUrl } from "../helpers/helpers";

function Cart() {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);

  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      dispatch(removeFromCart(productId));
    } else {
      dispatch(updateQuantity({ productId, quantity: newQuantity }));
    }
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        backgroundColor: (theme) => theme.palette.background.default,
      }}
    >
      {/* Content */}
      <Box
        sx={{
          position: "relative",
          minHeight: "100vh",
          width: "100%",
          padding: { xs: "3rem 1rem", sm: "4rem 2rem", md: "5rem 3rem" },
        }}
      >
        <Box
          sx={{
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {/* Page Title */}
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3.5rem", lg: "4rem" },
              fontWeight: 700,
              color: (theme) => theme.palette.text.primary,
              marginBottom: { xs: "2rem", sm: "3rem" },
              textAlign: "center",
            }}
          >
            Shopping Cart
          </Typography>

          {items.length === 0 ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "50vh",
                gap: 2,
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  color: (theme) => theme.palette.text.secondary,
                }}
              >
                Your cart is empty
              </Typography>
              <Button
                variant="contained"
                color="primary"
                href="/products"
                sx={{
                  backgroundColor: (theme) => theme.palette.primary.main,
                  color: "#FFFFFF",
                  fontWeight: 100,
                  borderRadius: 2,
                  boxShadow: "none",
                  textTransform: "none",
                  border: "1px solid transparent",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    borderColor: (theme) => theme.palette.primary.main,
                    transform: "translateY(-4px)",
                  },
                }}
              >
                Continue Shopping
              </Button>
            </Box>
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {/* Cart Items */}
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {items.map((item) => (
                  <Card
                    key={item.id}
                    sx={{
                      backgroundColor: (theme) => theme.palette.background.paper,
                      border: (theme) => 
                        theme.palette.mode === 'dark' 
                          ? "1px solid rgba(255, 255, 255, 0.1)" 
                          : "1px solid rgba(0, 0, 0, 0.1)",
                      borderRadius: 2,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        borderColor: (theme) => theme.palette.primary.main,
                        transform: "translateY(-4px)",
                      },
                    }}
                  >
                    <CardContent>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: { xs: "column", md: "row" },
                          gap: 2,
                          alignItems: { xs: "flex-start", md: "center" },
                        }}
                      >
                        {/* Product Image */}
                        <CardMedia
                          component="img"
                          image={getImageUrl(item.image_url)}
                          alt={item.name}
                          sx={{
                            width: { xs: "100%", md: "150px" },
                            height: { xs: "200px", md: "150px" },
                            objectFit: "cover",
                            borderRadius: 2,
                          }}
                        />

                        {/* Product Details */}
                        <Box
                          sx={{
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                            gap: 1,
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 600,
                              color: (theme) => theme.palette.text.primary,
                            }}
                          >
                            {item.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: (theme) => theme.palette.text.secondary,
                            }}
                          >
                            {item.category}
                          </Typography>
                          <PriceDisplay price={item.price} />
                        </Box>

                        {/* Quantity Controls */}
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            flexDirection: { xs: "row", md: "column" },
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <IconButton
                              size="small"
                              onClick={() =>
                                handleQuantityChange(item.id, item.quantity - 1)
                              }
                              sx={{
                                color: (theme) => theme.palette.text.primary,
                                border: "1px solid rgba(255, 255, 255, 0.2)",
                              }}
                            >
                              <RemoveIcon />
                            </IconButton>
                            <TextField
                              type="number"
                              value={item.quantity}
                              onChange={(e) =>
                                handleQuantityChange(
                                  item.id,
                                  parseInt(e.target.value) || 0
                                )
                              }
                              inputProps={{
                                min: 1,
                                style: { textAlign: "center", width: "60px" },
                              }}
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  backgroundColor: (theme) =>
                                    theme.palette.mode === "light"
                                      ? "#FFFFFF"
                                      : theme.palette.background.default,
                                },
                              }}
                            />
                            <IconButton
                              size="small"
                              onClick={() =>
                                handleQuantityChange(item.id, item.quantity + 1)
                              }
                              sx={{
                                color: (theme) => theme.palette.text.primary,
                                border: "1px solid rgba(255, 255, 255, 0.2)",
                              }}
                            >
                              <AddIcon />
                            </IconButton>
                          </Box>
                          <Typography
                            variant="h6"
                            sx={{
                              color: (theme) => theme.palette.text.primary,
                              fontWeight: 600,
                            }}
                          >
                            ${(item.price * item.quantity).toFixed(2)}
                          </Typography>
                        </Box>

                        {/* Remove Button */}
                        <IconButton
                          onClick={() => handleRemoveItem(item.id)}
                          sx={{
                            color: (theme) => theme.palette.primary.main,
                            "&:hover": {
                              backgroundColor: "rgba(229, 122, 68, 0.1)",
                            },
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>

              <Divider />

              {/* Cart Summary */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  alignItems: "flex-end",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    minWidth: { xs: "100%", md: "300px" },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        color: (theme) => theme.palette.text.primary,
                      }}
                    >
                      Total Items:
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        color: (theme) => theme.palette.text.primary,
                        fontWeight: 600,
                      }}
                    >
                      {totalItems}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        color: (theme) => theme.palette.text.primary,
                        fontWeight: 700,
                      }}
                    >
                      Total:
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{
                        color: (theme) => theme.palette.primary.main,
                        fontWeight: 700,
                      }}
                    >
                      ${totalPrice.toFixed(2)}
                    </Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    width: { xs: "100%", md: "auto" },
                    flexDirection: { xs: "column", md: "row" },
                  }}
                >
                  <Button
                    variant="outlined"
                    onClick={handleClearCart}
                    sx={{
                      borderColor: (theme) => theme.palette.primary.main,
                      color: (theme) => theme.palette.primary.main,
                      textTransform: "none",
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
                        backgroundColor: "rgba(229, 122, 68, 0.1)",
                      },
                    }}
                  >
                    Clear Cart
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      backgroundColor: (theme) => theme.palette.primary.main,
                      color: "#FFFFFF",
                      fontWeight: 100,
                      borderRadius: 2,
                      boxShadow: "none",
                      textTransform: "none",
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
                    Checkout
                  </Button>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default Cart;
