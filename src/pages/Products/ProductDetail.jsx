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
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import CategoryIcon from "@mui/icons-material/Category";
import InventoryIcon from "@mui/icons-material/Inventory";
import HandleBackButton from "../../components/HandleBackButton";
import PriceDisplay from "../../components/PriceDisplay";
import RatingDisplay from "../../components/RatingDisplay";
import AddToCart from "../../components/AddToCart";
import { getImageUrl, selectItem } from "../../helpers/helpers";
import { fetchReviews } from "../../store/slices/products/reviewsSlice";
import ReviewForm from "../../components/productReview/ReviewForm";
import ReviewCard from "../../components/productReview/ReviewCard";
import FavoriteButtonAndCount from "../../components/favorite/FavoriteButtonAndCount";

function ProductDetail() {
  const { id, slug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState("newest");
  const [starFilter, setStarFilter] = useState("all");
  const { reviews, averageRating, ratingCount } = useSelector(
    (state) => state.reviews
  );

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
      <Box
        sx={{
          position: "relative",
          width: "100%",
          padding: { xs: "1rem 1rem", sm: "2rem 2rem", md: "4rem 3rem" },
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
          <Grid
            container
            spacing={{ xs: 2, sm: 3, md: 4 }}
            sx={{ mb: { xs: 3, md: 4 } }}
          >
            {/* Product Image */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Card
                elevation={0}
                sx={{
                  borderRadius: 3,
                  overflow: "hidden",
                  border: (theme) =>
                    `1px solid ${theme.palette.text.primary}20`,
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
                    backgroundColor: (theme) => theme.palette.background.paper,
                  }}
                  src={getImageUrl(
                    product?.image_local_url ||
                      product?.image_url ||
                      product?.image
                  )}
                  alt={product.name}
                />
              </Card>
            </Grid>

            {/* Product Info */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: { xs: 2, sm: 2.5, md: 3 },
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

                {/* Rating */}
                <Box
                  sx={{
                    p: { xs: 1.5, md: 2 },
                    borderRadius: 2,
                    backgroundColor: (theme) => `${theme.palette.divider}20`,
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

                {/* Price */}
                <Box
                  sx={{
                    p: { xs: 1.5, md: 2 },
                    borderRadius: 2,
                    backgroundColor: (theme) => `${theme.palette.divider}20`,
                  }}
                >
                  <PriceDisplay price={product.price} />
                </Box>

                {/* Favorite button */}
                <Box
                  sx={{
                    p: { xs: 1.5, md: 2 },

                    borderRadius: 2,
                    backgroundColor: (theme) => `${theme.palette.divider}20`,
                  }}
                >
                  <Stack direction="row" alignItems="center" spacing={2} mb={1}>
                    <FavoriteButtonAndCount type="product" item={product} />
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ textDecoration: "underline" }}
                    >
                      Save product to your favorite list
                    </Typography>
                  </Stack>
                </Box>

                {/* Add to Cart */}
                <Box
                  sx={{
                    mt: "auto",
                    position: { xs: "sticky", md: "static" },
                    bottom: { xs: 0 },
                    width: { xs: "100%", md: "100%" },
                    zIndex: { xs: 100, md: "auto" },
                    backgroundColor: {
                      xs: (theme) => theme.palette.background.default,
                      md: "transparent",
                    },
                    pt: { xs: 2, md: 0 },
                    pb: { xs: 2, md: 0 },
                  }}
                >
                  <AddToCart product={product} />
                </Box>
              </Box>
            </Grid>
          </Grid>

          {/* Product Details Section */}
          <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }}>
            {/* Product Information Card */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Card
                elevation={0}
                sx={{
                  height: "100%",
                  borderRadius: 3,
                  border: (theme) =>
                    `1px solid ${theme.palette.text.primary}20`,
                  backgroundColor: (theme) => theme.palette.background.paper,
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
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
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
            <Grid size={{ xs: 12, md: 8 }}>
              <Card
                elevation={0}
                sx={{
                  height: "100%",
                  borderRadius: 3,
                  border: (theme) =>
                    `1px solid ${theme.palette.text.primary}20`,
                  backgroundColor: (theme) => theme.palette.background.paper,
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
                    {product.highlights && product.highlights.includes("\n") ? (
                      product.highlights.split("\n").map((paragraph, index) => (
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
            <Grid size={{ xs: 12 }}>
              <Card
                elevation={0}
                sx={{
                  borderRadius: 3,
                  border: (theme) =>
                    `1px solid ${theme.palette.text.primary}20`,
                  backgroundColor: (theme) => theme.palette.background.paper,
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
                    {product.description &&
                    product.description.includes("\n") ? (
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
                    `1px solid ${theme.palette.text.primary}20`,
                  backgroundColor: (theme) => theme.palette.background.paper,
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
                  <Typography variant="subtitle1" color="textSecondary" mb={2}>
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
                          sx={{ color: (theme) => theme.palette.text.primary }}
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
        </Box>
      </Box>
    </Box>
  );
}

export default ProductDetail;
