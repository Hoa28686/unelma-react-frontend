import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  clearSelectedProduct,
  fetchProducts,
  setSelectedProduct,
} from "../../store/slices/products/productsSlice";
import { Box, Divider, Typography } from "@mui/material";
import HandleBackButton from "../../components/HandleBackButton";
import PriceDisplay from "../../components/PriceDisplay";
import RatingDisplay from "../../components/RatingDisplay";
import AddToCart from "../../components/AddToCart";
import { getImageUrl } from "../../helpers/helpers";

function ProductDetail() {
  const { productId } = useParams();
  const dispatch = useDispatch();

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
        <HandleBackButton content="Products" link="/products" />
      </Box>
    );
  }

  if (!product) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography>Product not found</Typography>
        <HandleBackButton content="Products" link="/products" />
      </Box>
    );
  }
  // main component render
  return (
    <>
      <HandleBackButton content="Products" link="/products" />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",

          width: { xs: "90%", md: "80%" },
          py: 5,
          margin: "auto",
          gap: 3,
        }}
      >
        <Box
          sx={{
            display: { md: "flex" },
            justifyContent: "center",
            alignItems: "center",
            gap: 5,
            mb: 5,
            width: "100%",
          }}
        >
          <Box
            component="img"
            sx={{ width: { xs: "100%", md: "50%" }, mb: { xs: 3, md: 0 } }}
            src={getImageUrl(product?.image_url)}
            alt={product.name}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            <Typography variant="h4" mb={2}>
              {product.name}
            </Typography>
            <RatingDisplay rating={product.rating} />

            <PriceDisplay price={product.price} />
            <Box
              sx={{
                position: { xs: "fixed", md: "static" },
                bottom: { xs: 5 },
                width: { xs: "95%", md: 200 },
                left: { xs: "50%", md: "auto" },
                transform: { xs: "translateX(-50%)", md: "none" },
              }}
            >
              <AddToCart product={product} />
            </Box>
          </Box>
        </Box>
        <Box sx={{ width: "100%", textAlign: "left", alignSelf: "flex-start" }}>
          <Typography variant="h5" mb={1}>
            Product details
          </Typography>
          <Divider />
          <Typography variant="body2" sx={{ color: "text.secondary", mt: 2 }}>
            Category: {product.category}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            SKU: {product.sku}
          </Typography>
          <Typography variant="h6" mt={3} mb={2}>
            Highlights
          </Typography>
          <Box>
            {product.highlights.includes("\n") ? (
              product.highlights.split("\n").map((paragraph, index) => (
                <Typography variant="body1" key={index} mb={3}>
                  {paragraph.trim()}
                </Typography>
              ))
            ) : (
              <Typography variant="body1">{product.highlights}</Typography>
            )}
          </Box>
          <Typography variant="h6" mt={3} mb={2}>
            Additional details
          </Typography>
          <Box>
            {product.description.includes("\n") ? (
              product.description.split("\n").map((paragraph, index) => (
                <Typography variant="body1" key={index} mb={3}>
                  {paragraph.trim()}
                </Typography>
              ))
            ) : (
              <Typography variant="body1">{product.description}</Typography>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default ProductDetail;
