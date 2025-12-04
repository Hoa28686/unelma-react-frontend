import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/slices/products/productsSlice";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Pagination,
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useNavigate } from "react-router";
import PriceDisplay from "../../components/PriceDisplay";
import RatingDisplay from "../../components/RatingDisplay";
import AddToCart from "../../components/AddToCart";
import HandleBackButton from "../../components/HandleBackButton";
import { getImageUrl, placeholderLogo } from "../../helpers/helpers";
import FavoriteButtonAndCount from "../../components/FavoriteButtonAndCount";

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

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
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
  if (loading || products.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4">Loading products ...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4">Error loading blog: {error}</Typography>
        <HandleBackButton content="Home" link="/" />
      </Box>
    );
  }
  // main component render

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        padding: { xs: "2rem 1rem", sm: "3rem 2rem", md: "4rem 3rem" },
      }}
    >
      {/* Search Bar */}
      <Box
        sx={{
          maxWidth: "1200px",
          margin: "0 auto 3rem",
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
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? "#FFFFFF"
                  : theme.palette.background.paper,
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

      {/* Products Grid */}
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
                height: 480,
                m: 2,
                position: "relative",
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
                  onClick={() => handleProductClick(p.id)}
                  src={getImageUrl(p.image_local_url || p.image_url || p.image)}
                  alt={p.name}
                  onError={(e) => {
                    e.target.src = placeholderLogo;
                  }}
                  sx={{
                    width: "100%",
                    height: { xs: 220, md: 250 },
                    objectFit: "cover",
                    cursor: "point",
                    objectPosition: "center",
                    backgroundColor: (theme) => theme.palette.background.paper,
                  }}
                />
                <CardHeader
                  onClick={() => handleProductClick(p.id)}
                  title={
                    p.name.length > 50 ? (
                      <Typography variant="h6">{`${p.name.substring(
                        0,
                        50
                      )}...`}</Typography>
                    ) : (
                      <Typography variant="h6">{p.name}</Typography>
                    )
                  }
                  subheader={p.category}
                  sx={{ cursor: "pointer" }}
                />
                <FavoriteButtonAndCount type="product" item={p} />
                <CardContent>
                  <RatingDisplay rating={p.rating} />
                  <PriceDisplay price={p.price} />
                </CardContent>
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 15,
                    right: 15,
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <AddToCart product={p} />
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
                      backgroundColor: (theme) => theme.palette.primary.main,
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
    </Box>
  );
}

export default Products;
