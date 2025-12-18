import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/slices/products/productsSlice";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Pagination,
  CircularProgress,
  Chip,
  Stack,
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useNavigate } from "react-router";
import AddToCart from "../../components/product/AddToCart";
import HandleBackButton from "../../components/HandleBackButton";
import {
  getImageUrl,
  handleItemClick,
  placeholderLogo,
} from "../../helpers/helpers";
import FavoriteButtonAndCount from "../../components/favorite/FavoriteButtonAndCount";
import RatingDisplay from "../../components/productReview/RatingDisplay";
import PriceDisplay from "../../components/product/PriceDisplay";

const ITEMS_PER_PAGE = 9; // Show 9 products per page

function Products() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, loading, error } = useSelector((state) => state.products);

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [products, dispatch]);

  const handleProductClick = (product) => {
    handleItemClick(navigate, product, "products");
  };

  // Filter products based on search query
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return products;

    const query = searchQuery.toLowerCase().trim();
    const searchTerms = query.split(" ").filter((term) => term.length > 0);

    return products.filter((product) => {
      const searchableText = [
        product.name,
        product.category,
        product.description,
        product.highlights,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchTerms.some((term) => searchableText.includes(term));
    });
  }, [products, searchQuery]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // main component render
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        padding: { xs: "2rem 1rem", sm: "3rem 2rem", md: "4rem 3rem" },
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
          variant="h2"
          component="h1"
          sx={{
            fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
            fontWeight: 700,
            color: (theme) => theme.palette.text.primary,
            marginBottom: { xs: "2rem", sm: "3rem" },
            textAlign: "center",
          }}
        >
          Our Products
        </Typography>

        {/* Search Bar */}
        <Box
          sx={{
            marginBottom: { xs: "2rem", sm: "3rem" },
          }}
        >
          <TextField
            fullWidth
            placeholder="Search products by name, category, or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchOutlinedIcon
                    sx={{
                      color: (theme) => theme.palette.text.secondary,
                    }}
                  />
                </InputAdornment>
              ),
              endAdornment: searchQuery && (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={() => setSearchQuery("")}
                    sx={{
                      color: (theme) => theme.palette.text.secondary,
                    }}
                  >
                    <ClearOutlinedIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
              sx: {
                backgroundColor: "transparent",
                "& input:-webkit-autofill": {
                  WebkitBoxShadow: "0 0 0 1000px transparent inset",
                },
                "& input:-webkit-autofill:hover": {
                  WebkitBoxShadow: "0 0 0 1000px transparent inset",
                },
                "& input:-webkit-autofill:focus": {
                  WebkitBoxShadow: "0 0 0 1000px transparent inset",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: (theme) =>
                    theme.palette.mode === "dark"
                      ? "rgba(255, 255, 255, 0.2)"
                      : "rgba(0, 0, 0, 0.23)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: (theme) => theme.palette.primary.main,
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: (theme) => theme.palette.primary.main,
                  borderWidth: "2px",
                },
              },
            }}
          />
          {searchQuery && (
            <Typography
              variant="body2"
              sx={{
                mt: 1,
                color: (theme) => theme.palette.text.secondary,
              }}
            >
              {filteredProducts.length === 0
                ? "No products found"
                : `Found ${filteredProducts.length} product${filteredProducts.length !== 1 ? "s" : ""}`}
            </Typography>
          )}
        </Box>

        {/* Loading State */}
        {loading && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "400px",
            }}
          >
            <CircularProgress />
          </Box>
        )}

        {/* Error State */}
        {error && !loading && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "400px",
            }}
          >
            <Typography variant="h4">
              Error loading products: {error}
            </Typography>
            <HandleBackButton content="Home" link="/" />
          </Box>
        )}

        {/* Products Grid */}
        {!loading && !error && (
          <>
            {filteredProducts.length === 0 && searchQuery ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  minHeight: "400px",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: (theme) => theme.palette.text.secondary,
                    textAlign: "center",
                  }}
                >
                  No products match your search "{searchQuery}"
                </Typography>
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "center",
                  maxWidth: "1200px",
                  margin: "0 auto",
                }}
              >
                {paginatedProducts.map((p) => (
                  <Card
                    key={p.id}
                    sx={{
                      width: 350,
                      height: 500,
                      m: 2,
                      position: "relative",
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
                      transition: "all 0.3s ease",
                      "&:hover": {
                        borderColor: (theme) => theme.palette.primary.main,
                        transform: "translateY(-4px)",
                        boxShadow: (theme) =>
                          theme.palette.mode === "light"
                            ? "0 4px 12px rgba(0, 0, 0, 0.1)"
                            : "0 8px 32px rgba(0, 0, 0, 0.3)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        flexDirection: "column",
                        alignItems: "flex-start",
                        p: 0,
                      }}
                    >
                      <CardMedia
                        component="img"
                        loading="eager"
                        fetchPriority="high"
                        onClick={() => handleProductClick(p)}
                        src={getImageUrl(
                          p.image_local_url || p.image_url || p.image
                        )}
                        alt={p.name}
                        onError={(e) => {
                          e.target.src = placeholderLogo;
                        }}
                        sx={{
                          width: "100%",
                          height: { xs: 220, md: 250 },
                          objectFit: "cover",
                          cursor: "pointer",
                          objectPosition: "center",
                          backgroundColor: (theme) =>
                            theme.palette.background.paper,
                        }}
                      />
                      <CardHeader
                        onClick={() => handleProductClick(p)}
                        title={
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              flexWrap: "wrap",
                            }}
                          >
                            <Typography variant="h6" sx={{ flex: 1 }}>
                              {p.name.length > 50
                                ? `${p.name.substring(0, 50)}...`
                                : p.name}
                            </Typography>
                            <Chip
                              label={
                                p.payment_type === "subscription" ||
                                p.paymentType === "subscription"
                                  ? "Subscription"
                                  : "One-time"
                              }
                              size="small"
                              color={
                                p.payment_type === "subscription" ||
                                p.paymentType === "subscription"
                                  ? undefined
                                  : "primary"
                              }
                              sx={{
                                height: 22,
                                fontSize: "0.7rem",
                                ...(p.payment_type === "subscription" ||
                                p.paymentType === "subscription"
                                  ? {
                                      backgroundColor: "#E57A44",
                                      color: "#FFFFFF",
                                    }
                                  : {}),
                              }}
                            />
                          </Box>
                        }
                        subheader={p.category}
                        sx={{ cursor: "pointer" }}
                      />
                      <CardContent
                        sx={{
                          pt: 0,
                        }}
                      >
                        <Stack direction="column" spacing={2}>
                          <Stack
                            direction="row"
                            alignItems="flex-end"
                            spacing={1}
                            flexShrink={0}
                          >
                            <RatingDisplay rating={p.rating} />
                            {p.rating_count > 0 && (
                              <Typography variant="body2" color="textSecondary">
                                ({p.rating_count})
                              </Typography>
                            )}
                          </Stack>

                          <PriceDisplay price={p.price} />
                        </Stack>
                      </CardContent>
                      <Box
                        sx={{
                          position: "absolute",
                          bottom: 20,
                          right: 15,
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Stack direction="row" spacing={2}>
                          <FavoriteButtonAndCount type="product" item={p} />
                          <AddToCart product={p} />
                        </Stack>
                      </Box>
                    </Box>
                  </Card>
                ))}

                {/* Pagination */}
                {totalPages > 1 && (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 2,
                      marginTop: { xs: "2rem", sm: "3rem" },
                      flexWrap: "wrap",
                      width: "100%",
                    }}
                  >
                    {/* Previous Arrow */}
                    <IconButton
                      onClick={handlePreviousPage}
                      disabled={currentPage === 1}
                      sx={{
                        color: (theme) => theme.palette.text.primary,
                        border: "1px solid transparent",
                        transition: "all 0.3s ease",
                        "&:focus": {
                          outline: (theme) =>
                            `2px solid ${theme.palette.primary.main}`,
                          outlineOffset: "2px",
                        },
                        "&:focus-visible": {
                          outline: (theme) =>
                            `2px solid ${theme.palette.primary.main}`,
                          outlineOffset: "2px",
                        },
                        "&:hover": {
                          borderColor: (theme) => theme.palette.primary.main,
                          transform: "translateY(-4px)",
                          backgroundColor: "transparent",
                        },
                        "&:disabled": {
                          opacity: 0.5,
                        },
                      }}
                    >
                      <NavigateBeforeIcon />
                    </IconButton>

                    {/* Page Numbers */}
                    <Pagination
                      count={totalPages}
                      page={currentPage}
                      onChange={handlePageChange}
                      sx={{
                        "& .MuiPaginationItem-root": {
                          color: (theme) => theme.palette.text.primary,
                          border: "1px solid transparent",
                          boxShadow: "none !important",
                          "&.Mui-selected": {
                            backgroundColor: (theme) =>
                              theme.palette.primary.main,
                            color: "#FFFFFF",
                            border: (theme) =>
                              `1px solid ${theme.palette.primary.main}`,
                            boxShadow: "none !important",
                            "&:hover": {
                              backgroundColor: "#C85A2E",
                            },
                            "&:focus": {
                              outline: (theme) =>
                                `2px solid ${theme.palette.primary.main} !important`,
                              outlineOffset: "2px",
                              boxShadow: "none !important",
                            },
                            "&:focus-visible": {
                              outline: (theme) =>
                                `2px solid ${theme.palette.primary.main} !important`,
                              outlineOffset: "2px",
                              boxShadow: "none !important",
                            },
                          },
                          "&:focus": {
                            outline: (theme) =>
                              `2px solid ${theme.palette.primary.main} !important`,
                            outlineOffset: "2px",
                            boxShadow: "none !important",
                            border: "1px solid transparent",
                          },
                          "&:focus-visible": {
                            outline: (theme) =>
                              `2px solid ${theme.palette.primary.main} !important`,
                            outlineOffset: "2px",
                            boxShadow: "none !important",
                            border: "1px solid transparent",
                          },
                          "&:hover": {
                            backgroundColor: (theme) =>
                              theme.palette.mode === "light"
                                ? "rgba(229, 122, 68, 0.1)"
                                : "rgba(229, 122, 68, 0.2)",
                            border: "1px solid transparent",
                            boxShadow: "none !important",
                          },
                        },
                      }}
                    />

                    {/* Next Arrow */}
                    <IconButton
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                      sx={{
                        color: (theme) => theme.palette.text.primary,
                        border: "1px solid transparent",
                        transition: "all 0.3s ease",
                        "&:focus": {
                          outline: (theme) =>
                            `2px solid ${theme.palette.primary.main}`,
                          outlineOffset: "2px",
                        },
                        "&:focus-visible": {
                          outline: (theme) =>
                            `2px solid ${theme.palette.primary.main}`,
                          outlineOffset: "2px",
                        },
                        "&:hover": {
                          borderColor: (theme) => theme.palette.primary.main,
                          transform: "translateY(-4px)",
                          backgroundColor: "transparent",
                        },
                        "&:disabled": {
                          opacity: 0.5,
                        },
                      }}
                    >
                      <NavigateNextIcon />
                    </IconButton>
                  </Box>
                )}
              </Box>
            )}
          </>
        )}
      </Box>
    </Box>
  );
}

export default Products;
