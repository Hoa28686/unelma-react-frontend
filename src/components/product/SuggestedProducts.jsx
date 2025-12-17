import {
  Typography,
  useMediaQuery,
  useTheme as useMuiTheme,
} from "@mui/material";
import React, { useMemo } from "react";
import { Box, Card, CardContent, CardHeader, CardMedia } from "@mui/material";

import {
  getImageUrl,
  handleItemClick,
  placeholderLogo,
} from "../../helpers/helpers";
import { useNavigate } from "react-router";
import FavoriteButtonAndCount from "../favorite/FavoriteButtonAndCount";
import RatingDisplay from "../RatingDisplay";
import PriceDisplay from "../PriceDisplay";
import Chip from "@mui/material/Chip";

function SuggestedProducts({ currentProduct, allProducts }) {
  const navigate = useNavigate();
  const theme = useMuiTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const isMedium = useMediaQuery(theme.breakpoints.between("sm", "md"));

  let suggestedProducts = useMemo(() => {
    return allProducts
      .filter((product) => product.id !== currentProduct.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
  }, [allProducts, currentProduct.id]);

  if (isSmall) {
    suggestedProducts = suggestedProducts.slice(0, 1);
  }
  if (isMedium) {
    suggestedProducts = suggestedProducts.slice(0, 2);
  }

  const handleProductClick = (product) => {
    handleItemClick(navigate, product, "products");
  };

  if (suggestedProducts.length === 0) {
    return null;
  }

  return (
    <>
      <Typography
        variant="h3"
        sx={{ textAlign: "center", marginBlock: 4, fontWeight: 500 }}
      >
        You might also like:
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          py: 1,
          width: { xs: "90%", sm: "85%", md: "80%" },
          margin: "0 auto",
          flexWrap: "wrap",
        }}
      >
        {suggestedProducts.map((product) => (
          <Card
            key={product.id}
            sx={{
              borderRadius: 2,
              width: { xs: "100%", sm: "20rem" },
              maxWidth: "20rem",
              height: "37rem",
              p: 0,
              flexShrink: 0,
              backgroundColor: (theme) => theme.palette.background.paper,
              border: (theme) => `1px solid ${theme.palette.text.secondary}20`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              transition: "all 0.3s ease",
              "&:hover": {
                borderColor: (theme) => theme.palette.primary.main,
                transform: "translateY(-4px)",
              },
            }}
          >
            <CardMedia
              component="img"
              onClick={() => handleProductClick(product)}
              src={getImageUrl(
                product.image_local_url || product.image_url || product.image
              )}
              alt={product.name}
              onError={(e) => {
                e.target.src = placeholderLogo;
              }}
              sx={{
                width: "100%",
                height: "13rem",
                objectFit: "cover",
                display: "block",
                p: 0,
                cursor: "pointer",
                backgroundColor: (theme) => theme.palette.background.paper,
              }}
            />
            <Box sx={{ p: 2, width: "100%", flex: 1, display: "flex", flexDirection: "column" }}>
              {product.category && (
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: (theme) => theme.palette.text.secondary,
                    textTransform: "uppercase",
                    mb: 1,
                  }}
                >
                  {product.category}
                </Typography>
              )}
              <CardHeader
                onClick={() => handleProductClick(product)}
                title={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap", mb: 0.5 }}>
                    <Typography
                      variant="h6"
                      component="h2"
                      sx={{
                        fontWeight: 600,
                        color: (theme) => theme.palette.text.primary,
                        ":hover": { textDecoration: "underline" },
                        flex: 1,
                      }}
                    >
                      {product.name}
                    </Typography>
                    {(product.payment_type === "subscription" || product.paymentType === "subscription") && (
                      <Chip
                        label="Subscription"
                        size="small"
                        sx={{
                          height: 20,
                          fontSize: "0.7rem",
                          backgroundColor: "#E57A44",
                          color: "#FFFFFF"
                        }}
                      />
                    )}
                  </Box>
                }
                sx={{ pb: 1, px: 0, cursor: "pointer" }}
              />
              <Box sx={{ mb: 1 }}>
                <FavoriteButtonAndCount type="product" item={product} />
              </Box>
              <CardContent
                sx={{ mb: 0, px: 0, pt: 1, cursor: "pointer", flex: 1 }}
                onClick={() => handleProductClick(product)}
              >
                <Box sx={{ mb: 1 }}>
                  <RatingDisplay rating={product.rating} />
                </Box>
                <PriceDisplay price={product.price} />
                {product.highlights && (
                  <Typography
                    variant="body2"
                    sx={{
                      color: (theme) => theme.palette.text.secondary,
                      mt: 1,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {product.highlights}
                  </Typography>
                )}
              </CardContent>
            </Box>
          </Card>
        ))}
      </Box>
    </>
  );
}

export default SuggestedProducts;

