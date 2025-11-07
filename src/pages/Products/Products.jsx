import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../lib/features/products/productsSlice";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router";
import PriceDisplay from "../../components/PriceDisplay";
import RatingDisplay from "../../components/RatingDisplay";
import AddToCart from "../../components/AddToCart";
import HandleBackButton from "../../components/HandleBackButton";

function Products() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [products, dispatch]);

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
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
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {products.map((p) => (
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
            >
              <AddToCart />
            </Box>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
}

export default Products;
