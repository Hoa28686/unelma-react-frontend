import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  clearSelectedProduct,
  fetchProducts,
  setSelectedProduct,
} from "../../store/slices/products/productsSlice";
import {
  Box,
  Divider,
  Typography,
  Alert,
  Card,
  CardContent,
  Chip,
  Paper,
  Grid,
} from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import InventoryIcon from "@mui/icons-material/Inventory";
import HandleBackButton from "../../components/HandleBackButton";
import PriceDisplay from "../../components/PriceDisplay";
import RatingDisplay from "../../components/RatingDisplay";
import AddToCart from "../../components/AddToCart";
import { getImageUrl } from "../../helpers/helpers";
import { useAuth } from "../../context/AuthContext";
import { submitProductRating } from "../../lib/api/ratingService";

function ProductDetail() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { user } = useAuth();

  const {
    products,
    selectedProduct: product,
    loading,
    error,
  } = useSelector((state) => state.products);

  useEffect(() => {
    if (!products || products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [products, dispatch]);

  useEffect(() => {
    if (productId && products.length > 0) {
      const foundProduct = products.find((p) => p.id == productId);
      if (foundProduct) {
        dispatch(setSelectedProduct(foundProduct));
      } else {
        dispatch(clearSelectedProduct());
      }
    }
  }, [productId, products, dispatch]);

  const handleRatingChange = async (productId, newRating) => {
    try {
      const result = await submitProductRating({
        productId,
        rating: newRating,
      });
      
      if (result.success) {
        // Refresh products to get updated rating
        dispatch(fetchProducts());
        // If the API returns updated product data, update the selected product
        if (result.data?.product) {
          dispatch(setSelectedProduct(result.data.product));
        }
      }
    } catch (error) {
      console.error("Failed to submit rating:", error);
      throw error;
    }
  };

  if (loading || products.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "50vh",
          backgroundColor: (theme) => theme.palette.background.default,
        }}
      >
        <Typography variant="h5" sx={{ color: (theme) => theme.palette.text.secondary }}>
          Loading product...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "50vh",
          gap: 2,
          backgroundColor: (theme) => theme.palette.background.default,
        }}
      >
        <Alert severity="error" sx={{ mb: 2 }}>
          Error loading product: {error}
        </Alert>
        <HandleBackButton content="Products" link="/products" />
      </Box>
    );
  }

  if (!product) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "50vh",
          gap: 2,
          backgroundColor: (theme) => theme.palette.background.default,
        }}
      >
        <Typography variant="h5" sx={{ color: (theme) => theme.palette.text.secondary }}>
          Product not found
        </Typography>
        <HandleBackButton content="Products" link="/products" />
      </Box>
    );
  }
  // main component render
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        backgroundColor: (theme) => theme.palette.background.default,
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          padding: { xs: "2rem 1rem", sm: "3rem 2rem", md: "4rem 3rem" },
        }}
      >
        <Box
          sx={{
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {/* Back Button */}
          <Box sx={{ mb: { xs: 2, sm: 3 } }}>
            <HandleBackButton content="Products" link="/products" />
          </Box>

          {/* Main Product Section */}
          <Grid container spacing={4} sx={{ mb: 4 }}>
            {/* Product Image */}
            <Grid item xs={12} md={6}>
              <Card
                elevation={0}
                sx={{
                  borderRadius: 3,
                  overflow: "hidden",
                  border: (theme) =>
                    theme.palette.mode === "dark"
                      ? "1px solid rgba(255, 255, 255, 0.1)"
                      : "1px solid rgba(0, 0, 0, 0.1)",
                  backgroundColor: (theme) => theme.palette.background.paper,
                }}
              >
                <Box
                  component="img"
                  sx={{
                    width: "100%",
                    height: { xs: "auto", md: "500px" },
                    objectFit: "cover",
                    display: "block",
                  }}
                  src={getImageUrl(product?.image_url)}
                  alt={product.name}
                />
              </Card>
            </Grid>

            {/* Product Info */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                  height: "100%",
                }}
              >
                {/* Product Name */}
                <Typography
                  variant="h3"
                  component="h1"
                  sx={{
                    fontSize: { xs: "1.75rem", sm: "2.25rem", md: "2.5rem" },
                    fontWeight: 700,
                    color: (theme) => theme.palette.text.primary,
                    lineHeight: 1.2,
                  }}
                >
                  {product.name}
                </Typography>

                {/* Category Badge */}
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                  <Chip
                    icon={<CategoryIcon />}
                    label={product.category}
                    sx={{
                      backgroundColor: (theme) =>
                        theme.palette.mode === "dark"
                          ? `${theme.palette.primary.main}20`
                          : `${theme.palette.primary.main}15`,
                      color: (theme) => theme.palette.primary.main,
                      fontWeight: 500,
                    }}
                  />
                </Box>

                {/* Rating */}
                <Box
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: (theme) =>
                      theme.palette.mode === "dark"
                        ? "rgba(255, 255, 255, 0.05)"
                        : "rgba(0, 0, 0, 0.02)",
                  }}
                >
                  <RatingDisplay
                    rating={product.rating}
                    onRatingChange={
                      user && user.email ? handleRatingChange : undefined
                    }
                    productId={product.id}
                  />
                </Box>

                {/* Price */}
                <Box
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: (theme) =>
                      theme.palette.mode === "dark"
                        ? "rgba(255, 255, 255, 0.05)"
                        : "rgba(0, 0, 0, 0.02)",
                  }}
                >
                  <PriceDisplay price={product.price} />
                </Box>

                {/* Add to Cart */}
                <Box
                  sx={{
                    mt: "auto",
                    position: { xs: "fixed", md: "static" },
                    bottom: { xs: 20 },
                    left: { xs: "50%" },
                    transform: { xs: "translateX(-50%)", md: "none" },
                    width: { xs: "calc(100% - 2rem)", md: "100%" },
                    zIndex: { xs: 1000, md: "auto" },
                  }}
                >
                  <AddToCart product={product} />
                </Box>
              </Box>
            </Grid>
          </Grid>

          {/* Product Details Section */}
          <Grid container spacing={3}>
            {/* Product Information Card */}
            <Grid item xs={12} md={4}>
              <Card
                elevation={0}
                sx={{
                  height: "100%",
                  borderRadius: 3,
                  border: (theme) =>
                    theme.palette.mode === "dark"
                      ? "1px solid rgba(255, 255, 255, 0.1)"
                      : "1px solid rgba(0, 0, 0, 0.1)",
                  backgroundColor: (theme) => theme.palette.background.paper,
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      mb: 2,
                      color: (theme) => theme.palette.text.primary,
                    }}
                  >
                    Product Information
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <CategoryIcon
                        sx={{
                          color: (theme) => theme.palette.primary.main,
                          fontSize: "1.2rem",
                        }}
                      />
                      <Box>
                        <Typography
                          variant="caption"
                          sx={{ color: "text.secondary", display: "block" }}
                        >
                          Category
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {product.category}
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <InventoryIcon
                        sx={{
                          color: (theme) => theme.palette.primary.main,
                          fontSize: "1.2rem",
                        }}
                      />
                      <Box>
                        <Typography
                          variant="caption"
                          sx={{ color: "text.secondary", display: "block" }}
                        >
                          SKU
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {product.sku}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Highlights Card */}
            <Grid item xs={12} md={8}>
              <Card
                elevation={0}
                sx={{
                  height: "100%",
                  borderRadius: 3,
                  border: (theme) =>
                    theme.palette.mode === "dark"
                      ? "1px solid rgba(255, 255, 255, 0.1)"
                      : "1px solid rgba(0, 0, 0, 0.1)",
                  backgroundColor: (theme) => theme.palette.background.paper,
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      mb: 2,
                      color: (theme) => theme.palette.text.primary,
                    }}
                  >
                    Highlights
                  </Typography>
                  <Divider sx={{ mb: 3 }} />
                  <Box
                    sx={{
                      "& p": {
                        fontSize: "1rem",
                        lineHeight: 1.8,
                        color: (theme) => theme.palette.text.primary,
                        mb: 2,
                        "&:last-child": { mb: 0 },
                      },
                    }}
                  >
                    {product.highlights && product.highlights.includes("\n") ? (
                      product.highlights
                        .split("\n")
                        .map((paragraph, index) => (
                          <Typography key={index} component="p">
                            {paragraph.trim()}
                          </Typography>
                        ))
                    ) : (
                      <Typography component="p">
                        {product.highlights || "No highlights available."}
                      </Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Description Card */}
            <Grid item xs={12}>
              <Card
                elevation={0}
                sx={{
                  borderRadius: 3,
                  border: (theme) =>
                    theme.palette.mode === "dark"
                      ? "1px solid rgba(255, 255, 255, 0.1)"
                      : "1px solid rgba(0, 0, 0, 0.1)",
                  backgroundColor: (theme) => theme.palette.background.paper,
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      mb: 2,
                      color: (theme) => theme.palette.text.primary,
                    }}
                  >
                    Additional Details
                  </Typography>
                  <Divider sx={{ mb: 3 }} />
                  <Box
                    sx={{
                      "& p": {
                        fontSize: "1rem",
                        lineHeight: 1.8,
                        color: (theme) => theme.palette.text.primary,
                        mb: 2,
                        "&:last-child": { mb: 0 },
                      },
                    }}
                  >
                    {product.description && product.description.includes("\n") ? (
                      product.description
                        .split("\n")
                        .map((paragraph, index) => (
                          <Typography key={index} component="p">
                            {paragraph.trim()}
                          </Typography>
                        ))
                    ) : (
                      <Typography component="p">
                        {product.description || "No additional details available."}
                      </Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

export default ProductDetail;
