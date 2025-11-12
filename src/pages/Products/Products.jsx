import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { useNavigate } from "react-router";
import PriceDisplay from "../../components/PriceDisplay";
import RatingDisplay from "../../components/RatingDisplay";
import AddToCart from "../../components/AddToCart";
import HandleBackButton from "../../components/HandleBackButton";

function Products() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, loading, error } = useSelector((state) => state.products);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [products, dispatch]);

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  // Filter products based on search query
  const filteredProducts = products.filter((product) => {
    if (!searchQuery.trim()) return true;

    const query = searchQuery.toLowerCase().trim();
    const searchTerms = query.split(" ").filter((term) => term.length > 0);

    const searchableText = [
      product.name,
      product.category,
      product.description,
      product.hightlights || product.highlights,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return searchTerms.some((term) => searchableText.includes(term));
  });
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
                borderColor: "#E57A44",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#E57A44",
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
          {filteredProducts.map((p) => (
        <Card
          key={p.id}
          sx={{
            width: 350,
            height: 480,
            m: 2,
            position: "relative",
          }}
        >
          <CardActions
            sx={{
              flexDirection: "column",

              alignItems: "flex-start",
              p: 0,
            }}
            onClick={() => handleProductClick(p.id)}
          >
            <CardMedia
              component="img"
              src={p.image_url}
              alt={p.name}
              sx={{
                width: "100%",
                height: { xs: 220, md: 250 },
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
            <CardHeader
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
            />
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
          </CardActions>
        </Card>
          ))}
        </Box>
      )}
    </Box>
  );
}

export default Products;
