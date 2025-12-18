import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
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
  Grid,
  Select,
  MenuItem,
  Rating,
  Stack,
  CircularProgress,
  Chip,
  Button,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import CategoryIcon from "@mui/icons-material/Category";
import InventoryIcon from "@mui/icons-material/Inventory";
import HandleBackButton from "../../components/HandleBackButton";
import AddToCart from "../../components/product/AddToCart";
import {
  getImageUrl,
  placeholderLogo,
  selectItem,
} from "../../helpers/helpers";
import { fetchReviews } from "../../store/slices/products/reviewsSlice";
import ReviewForm from "../../components/productReview/ReviewForm";
import ReviewCard from "../../components/productReview/ReviewCard";
import FavoriteButtonAndCount from "../../components/favorite/FavoriteButtonAndCount";
import SuggestedProducts from "../../components/product/SuggestedProducts";
import { useContactForm } from "../../hooks/useContactForm";
import StyledTextField from "../../components/StyledTextField";
import RatingDisplay from "../../components/productReview/RatingDisplay";
import PriceDisplay from "../../components/product/PriceDisplay";

function ProductDetail() {
  const { id, slug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState("newest");
  const [starFilter, setStarFilter] = useState("all");
  const { reviews, averageRating, ratingCount } = useSelector(
    (state) => state.reviews
  );

  // Contact form hook for query sidebar
  const {
    formData,
    loading: queryLoading,
    submitStatus,
    fieldErrors,
    handleChange: handleQueryChange,
    handleSubmit: handleQuerySubmit,
  } = useContactForm({ name: "", email: "", message: "" });

  const {
    products,
    selectedProduct: product,
    loading,
    error,
  } = useSelector((state) => state.products);

  //fetch products if not already loaded
  useEffect(() => {
    if (!products || products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [products, dispatch]);

  // set selected product
  useEffect(() => {
    selectItem(
      products,
      id,
      slug,
      (product) => dispatch(setSelectedProduct(product)),
      () => dispatch(clearSelectedProduct),
      navigate,
      "products"
    );
  }, [id, slug, products, dispatch, navigate]);

  //fetch reviews for review section
  useEffect(() => {
    if (product) {
      dispatch(fetchReviews(product.id));
    }
  }, [product, dispatch]);

  // filter and sort reviews
  const filteredAndSortedReviews = useMemo(() => {
    if (!reviews) return [];
    let result = [...reviews];

    // Filter reviews based on starFilter
    if (starFilter !== "all") {
      result = result.filter((review) => review.rating === starFilter);
    }

    // Sort reviews based on sortOrder, which is created_at
    result.sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });
    return result;
  }, [reviews, sortOrder, starFilter]);

  // calculate rating count for each star level
  const ratingCountPerStar = useMemo(() => {
    if (!reviews) return [];
    return [5, 4, 3, 2, 1].map((star) => ({
      star,
      count: reviews.filter((r) => Number(r.rating) === star).length,
    }));
  }, [reviews]);

  // loading state
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
        <Typography
          variant="h5"
          sx={{ color: (theme) => theme.palette.text.secondary }}
        >
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
        <Typography
          variant="h5"
          sx={{ color: (theme) => theme.palette.text.secondary }}
        >
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
      {/* Hero Image Section */}
      {(product?.image_local_url || product?.image_url || product?.image) && (
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: { xs: "300px", sm: "400px", md: "500px" },
            overflow: "hidden",
            backgroundColor: (theme) => theme.palette.background.default,
          }}
        >
          <Box
            component="img"
            src={getImageUrl(
              product?.image_local_url || product?.image_url || product?.image
            )}
            alt={product.name}
            onError={(e) => {
              e.target.src = placeholderLogo;
            }}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          {/* Overlay gradient for better text readability */}
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "50%",
              background:
                "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
            }}
          />
        </Box>
      )}

      {/* Content */}
      <Box
        sx={{
          position: "relative",
          minHeight: "100vh",
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

          {/* Product Header */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              marginBottom: { xs: "2rem", sm: "3rem" },
              flexWrap: "wrap",
            }}
          >
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                fontWeight: 700,
                color: (theme) => theme.palette.text.primary,
              }}
            >
              {product.name}
            </Typography>
            <Chip
              label={
                product.payment_type === "subscription" ||
                product.paymentType === "subscription"
                  ? "Subscription"
                  : "One-time"
              }
              color={
                product.payment_type === "subscription" ||
                product.paymentType === "subscription"
                  ? undefined
                  : "primary"
              }
              sx={{
                fontSize: "0.875rem",
                height: 28,
                ...(product.payment_type === "subscription" ||
                product.paymentType === "subscription"
                  ? {
                      backgroundColor: "#E57A44",
                      color: "#FFFFFF",
                    }
                  : {}),
              }}
            />
            <FavoriteButtonAndCount type="product" item={product} />
          </Box>

          {/* Main Content and Sidebar Layout */}
          <Grid container spacing={4} sx={{ alignItems: "flex-start", mb: 4 }}>
            {/* Left Side - Main Content */}
            <Grid size={{ xs: 12, md: 8 }}>
              {/* Rating and Price */}
              <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
                <Box
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: (theme) =>
                      theme.palette.mode === "light"
                        ? "rgba(0, 0, 0, 0.03)"
                        : "transparent",
                    border: (theme) =>
                      theme.palette.mode === "dark"
                        ? "1px solid rgba(255, 255, 255, 0.1)"
                        : "1px solid rgba(0, 0, 0, 0.1)",
                    boxShadow: (theme) =>
                      theme.palette.mode === "light"
                        ? "0 2px 8px rgba(0, 0, 0, 0.05)"
                        : "none",
                  }}
                >
                  <Stack
                    direction="row"
                    alignItems="flex-end"
                    spacing={1}
                    flexShrink={0}
                  >
                    <RatingDisplay rating={averageRating} />{" "}
                    {ratingCount > 0 && (
                      <Typography variant="body2" color="textSecondary">
                        ({ratingCount})
                      </Typography>
                    )}
                  </Stack>
                </Box>
                <Box
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: (theme) =>
                      theme.palette.mode === "light"
                        ? "rgba(0, 0, 0, 0.03)"
                        : "transparent",
                    border: (theme) =>
                      theme.palette.mode === "dark"
                        ? "1px solid rgba(255, 255, 255, 0.1)"
                        : "1px solid rgba(0, 0, 0, 0.1)",
                    boxShadow: (theme) =>
                      theme.palette.mode === "light"
                        ? "0 2px 8px rgba(0, 0, 0, 0.05)"
                        : "none",
                  }}
                >
                  <PriceDisplay price={product.price} />
                </Box>
              </Box>

              {/* Add to Cart */}
              <Box sx={{ mb: 4 }}>
                <AddToCart product={product} />
              </Box>

              {/* Product Details Section */}
              <Grid
                container
                spacing={{ xs: 2, sm: 2.5, md: 3 }}
                sx={{ mb: 4 }}
              >
                {/* Product Information Card */}
                <Grid size={{ xs: 12, md: 4 }}>
                  <Card
                    elevation={0}
                    sx={{
                      height: "100%",
                      borderRadius: 3,
                      border: (theme) =>
                        theme.palette.mode === "dark"
                          ? "1px solid rgba(255, 255, 255, 0.1)"
                          : "1px solid rgba(0, 0, 0, 0.1)",
                      backgroundColor: (theme) =>
                        theme.palette.mode === "light"
                          ? "rgba(0, 0, 0, 0.03)"
                          : "transparent",
                      boxShadow: (theme) =>
                        theme.palette.mode === "light"
                          ? "0 2px 8px rgba(0, 0, 0, 0.05)"
                          : "none",
                    }}
                  >
                    <CardContent sx={{ p: { xs: 2, sm: 2.5, md: 3 } }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          mb: 2,
                          fontSize: { xs: "1.1rem", md: "1.25rem" },
                          color: (theme) => theme.palette.text.primary,
                        }}
                      >
                        Product Information
                      </Typography>
                      <Divider sx={{ mb: 2 }} />
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 2,
                        }}
                      >
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
                            <Typography
                              variant="body1"
                              sx={{ fontWeight: 500 }}
                            >
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
                            <Typography
                              variant="body1"
                              sx={{ fontWeight: 500 }}
                            >
                              {product.sku}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Highlights Card */}
                <Grid size={{ xs: 12, md: 8 }}>
                  <Card
                    elevation={0}
                    sx={{
                      height: "100%",
                      borderRadius: 3,
                      border: (theme) =>
                        theme.palette.mode === "dark"
                          ? "1px solid rgba(255, 255, 255, 0.1)"
                          : "1px solid rgba(0, 0, 0, 0.1)",
                      backgroundColor: (theme) =>
                        theme.palette.mode === "light"
                          ? "rgba(0, 0, 0, 0.03)"
                          : "transparent",
                      boxShadow: (theme) =>
                        theme.palette.mode === "light"
                          ? "0 2px 8px rgba(0, 0, 0, 0.05)"
                          : "none",
                    }}
                  >
                    <CardContent sx={{ p: { xs: 2, sm: 2.5, md: 3 } }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          mb: 2,
                          fontSize: { xs: "1.1rem", md: "1.25rem" },
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
                        {product?.highlights &&
                        product?.highlights?.includes("\n") ? (
                          product.highlights
                            .split("\n")
                            .map((paragraph, index) => (
                              <Typography key={index} component="p">
                                {paragraph.trim()}
                              </Typography>
                            ))
                        ) : (
                          <Typography component="p">
                            {product?.highlights || "No highlights available."}
                          </Typography>
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Description Card */}
                <Grid size={{ xs: 12 }}>
                  <Card
                    elevation={0}
                    sx={{
                      borderRadius: 3,
                      border: (theme) =>
                        theme.palette.mode === "dark"
                          ? "1px solid rgba(255, 255, 255, 0.1)"
                          : "1px solid rgba(0, 0, 0, 0.1)",
                      backgroundColor: (theme) =>
                        theme.palette.mode === "light"
                          ? "rgba(0, 0, 0, 0.03)"
                          : "transparent",
                      boxShadow: (theme) =>
                        theme.palette.mode === "light"
                          ? "0 2px 8px rgba(0, 0, 0, 0.05)"
                          : "none",
                    }}
                  >
                    <CardContent sx={{ p: { xs: 2, sm: 2.5, md: 3 } }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          mb: 2,
                          fontSize: { xs: "1.1rem", md: "1.25rem" },
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
                        {product?.description &&
                        product?.description.includes("\n") ? (
                          product.description
                            .split("\n")
                            .map((paragraph, index) => (
                              <Typography key={index} variant="body1">
                                {paragraph.trim()}
                              </Typography>
                            ))
                        ) : (
                          <Typography variant="body1">
                            {product.description ||
                              "No additional details available."}
                          </Typography>
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Review section */}
                <Grid size={{ xs: 12 }}>
                  <Card
                    elevation={0}
                    sx={{
                      borderRadius: 3,
                      border: (theme) =>
                        theme.palette.mode === "dark"
                          ? "1px solid rgba(255, 255, 255, 0.1)"
                          : "1px solid rgba(0, 0, 0, 0.1)",
                      backgroundColor: (theme) =>
                        theme.palette.mode === "light"
                          ? "rgba(0, 0, 0, 0.03)"
                          : "transparent",
                      boxShadow: (theme) =>
                        theme.palette.mode === "light"
                          ? "0 2px 8px rgba(0, 0, 0, 0.05)"
                          : "none",
                    }}
                  >
                    <CardContent
                      sx={{
                        width: "100%",
                        textAlign: "left",
                        alignSelf: "flex-start",
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          mb: 2,
                          fontSize: { xs: "1.1rem", md: "1.25rem" },
                          color: (theme) => theme.palette.text.primary,
                        }}
                      >
                        Reviews
                      </Typography>
                      <Divider sx={{ mb: 3 }} />
                      <Typography
                        variant="subtitle1"
                        color="textSecondary"
                        mb={2}
                      >
                        Note: The user must be logged in and have purchased this
                        product to write a review.
                      </Typography>
                      {/* Review form for new review, UI when user haven't logged in */}
                      <ReviewForm product={product} reviews={reviews} />
                      {reviews.length > 0 && (
                        <Box sx={{ mt: 4 }}>
                          <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            mb={2}
                          >
                            <Stack
                              direction="row"
                              alignItems="flex-end"
                              spacing={1}
                              flexShrink={0}
                            >
                              <RatingDisplay rating={averageRating} />
                              <Typography variant="body2" color="textSecondary">
                                {ratingCount} ratings
                              </Typography>
                            </Stack>
                            <Stack direction="row">
                              <Select
                                value={sortOrder}
                                onChange={(e) => setSortOrder(e.target.value)}
                                sx={{
                                  "& .MuiOutlinedInput-notchedOutline": {
                                    border: "none",
                                  },
                                }}
                              >
                                <MenuItem value="newest">Newest</MenuItem>
                                <MenuItem value="oldest">Oldest</MenuItem>
                              </Select>
                              <Select
                                value={starFilter}
                                onChange={(e) => setStarFilter(e.target.value)}
                                sx={{
                                  "& .MuiOutlinedInput-notchedOutline": {
                                    border: "none",
                                  },
                                }}
                              >
                                <MenuItem value="all">All stars</MenuItem>
                                {ratingCountPerStar.map(({ star, count }) => (
                                  <MenuItem value={star} key={star}>
                                    <Stack
                                      direction="row"
                                      alignItems="center"
                                      spacing={1}
                                    >
                                      <Typography variant="body2">
                                        {star}
                                      </Typography>
                                      <Typography
                                        variant="body2"
                                        sx={{ color: "#f9af04" }}
                                      >
                                        ★
                                      </Typography>
                                      <Typography
                                        variant="body2"
                                        color="textSecondary"
                                        component="span"
                                      >
                                        {" "}
                                        ({count})
                                      </Typography>
                                    </Stack>
                                  </MenuItem>
                                ))}
                              </Select>
                            </Stack>
                          </Stack>
                          {filteredAndSortedReviews.map((r) => (
                            <ReviewCard key={r.id} review={r} />
                          ))}
                          {filteredAndSortedReviews.length === 0 && (
                            <Typography
                              variant="body1"
                              sx={{
                                color: (theme) => theme.palette.text.primary,
                              }}
                            >
                              No reviews found matching the selected star
                            </Typography>
                          )}
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>

            {/* Right Side - Contact Form Sidebar */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Box
                sx={{
                  position: { md: "sticky" },
                  top: { md: "2rem" },
                }}
              >
                <Card
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === "light"
                        ? "rgba(0, 0, 0, 0.03)"
                        : "transparent",
                    border: (theme) =>
                      theme.palette.mode === "dark"
                        ? "1px solid rgba(255, 255, 255, 0.1)"
                        : "1px solid rgba(0, 0, 0, 0.1)",
                    borderRadius: 2,
                    padding: { xs: "2rem", sm: "2.5rem" },
                    boxShadow: (theme) =>
                      theme.palette.mode === "light"
                        ? "0 2px 8px rgba(0, 0, 0, 0.05)"
                        : "none",
                  }}
                >
                  <Typography
                    variant="h3"
                    component="h2"
                    sx={{
                      fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
                      fontWeight: 600,
                      color: (theme) => theme.palette.text.primary,
                      marginBottom: { xs: "1.5rem", sm: "2rem" },
                    }}
                  >
                    Have Query?
                  </Typography>
                  <Box component="form" onSubmit={handleQuerySubmit}>
                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                    >
                      <StyledTextField
                        name="name"
                        label="Your Name"
                        fullWidth
                        required
                        value={formData.name}
                        onChange={handleQueryChange}
                        error={!!fieldErrors.name}
                        helperText={fieldErrors.name}
                      />
                      <StyledTextField
                        name="email"
                        label="Your Email"
                        type="email"
                        fullWidth
                        required
                        value={formData.email}
                        onChange={handleQueryChange}
                        error={!!fieldErrors.email}
                        helperText={fieldErrors.email}
                      />
                      <StyledTextField
                        name="message"
                        label="Your Message"
                        fullWidth
                        required
                        multiline
                        rows={4}
                        value={formData.message}
                        onChange={handleQueryChange}
                        error={!!fieldErrors.message}
                        helperText={fieldErrors.message}
                      />
                      {submitStatus.success !== null && (
                        <Alert
                          severity={submitStatus.success ? "success" : "error"}
                          sx={{
                            mt: 1,
                            "& .MuiAlert-message": {
                              color: (theme) =>
                                submitStatus.success
                                  ? theme.palette.success.main
                                  : theme.palette.error.main,
                            },
                          }}
                        >
                          {submitStatus.message}
                        </Alert>
                      )}
                      <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        disabled={queryLoading}
                        sx={{
                          padding: { xs: "0.75rem", sm: "1rem" },
                          "&:disabled": {
                            opacity: 0.6,
                          },
                        }}
                      >
                        {queryLoading ? (
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <CircularProgress size={20} color="inherit" />
                            Sending...
                          </Box>
                        ) : (
                          "Submit Request"
                        )}
                      </Button>
                    </Box>
                  </Box>
                </Card>
              </Box>
            </Grid>
          </Grid>

          {/* Suggested Products */}
          <SuggestedProducts currentProduct={product} allProducts={products} />
        </Box>
      </Box>
    </Box>
  );
}

export default ProductDetail;
