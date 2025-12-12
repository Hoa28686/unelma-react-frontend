import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import FavoriteButton from "../components/favorite/FavoriteButton";
import {
  Box,
  darken,
  Link as MuiLink,
  Paper,
  Stack,
  Typography,
  CircularProgress,
} from "@mui/material";
import { fetchBlogs } from "../store/slices/blogs/blogsSlice";
import { fetchProducts } from "../store/slices/products/productsSlice";

import CenteredMessage from "../components/CenteredMessage";
import { fetchServices } from "../lib/features/services/servicesSlice";
import HandleBackButton from "../components/HandleBackButton";
import { Link, useNavigate } from "react-router";
import { handleItemClick } from "../helpers/helpers";

function Favorites() {
  const { user, token } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { favorites, loading, error } = useSelector((state) => state.favorites);
  const blogs = useSelector((state) => state.blogs.blogs);
  const products = useSelector((state) => state.products.products);
  const services = useSelector((state) => state.services.services);

  useEffect(() => {
    if (token) {
      //favorites are fetched in layout.jsx
      if (!blogs.length) dispatch(fetchBlogs());
      if (!products.length) dispatch(fetchProducts());
      if (!services.length) dispatch(fetchServices());
    }
  }, [dispatch, token, blogs.length, services.length, products.length]);

  const renderFavoriteByType = (type, items) => {
    const filterFavorites = favorites.filter(
      (fav) => fav.favorite_type === type
    );

    if (filterFavorites.length === 0) return null;

    return (
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" sx={{ textTransform: "capitalize" }}>
          {type}
        </Typography>

        <Stack spacing={1} sx={{ mt: 2 }}>
          {filterFavorites.map((fav) => {
            const item = items.find((i) => i.id == fav.item_id);
            if (!item) return null;
            return (
              <Box key={fav.id}>
                <FavoriteButton type={type} itemId={item.id} />
                {type === "service" ? (
                  <MuiLink
                    component={Link}
                    to={`/${type}s/${item.id}`}
                    sx={{
                      textDecoration: "none",

                      color: (theme) =>
                        darken(theme.palette.secondary.main, 0.1),
                    }}
                  >
                    {item.title || item.name}
                  </MuiLink>
                ) : (
                  <MuiLink
                    component={Link}
                    onClick={(e) => {
                      e.preventDefault();
                      handleItemClick(navigate, item, type + "s");
                    }}
                    sx={{
                      textDecoration: "none",
                      color: (theme) =>
                        darken(theme.palette.secondary.main, 0.1),

                      // remove outline
                      outline: "none",
                      "&:focus": { outline: "none" },
                      "&:focus-visible": { outline: "none" },
                    }}
                  >
                    {item.title || item.name}
                  </MuiLink>
                )}
              </Box>
            );
          })}
        </Stack>
      </Paper>
    );
  };

  if (loading) {
    return (
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
    );
  }

  if (error) {
    return (
      <CenteredMessage>
        <Typography variant="h4">Error loading blog: {error}</Typography>
        <HandleBackButton content="Home" link="/" />
      </CenteredMessage>
    );
  }

  if (!user) {
    return (
      <CenteredMessage>
        <Typography
          variant="h4"
          sx={{ color: (theme) => theme.palette.text.primary }}
        >
          Log in to see list of favorites
        </Typography>
      </CenteredMessage>
    );
  }

  if (favorites.length === 0)
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "50vh",
          gap: 2,
          textAlign: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{ color: (theme) => theme.palette.text.primary }}
        >
          No favorites added yet
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: (theme) => theme.palette.text.primary }}
        >
          Start adding favorites from{" "}
          <MuiLink component={Link} to="/blogs">
            Blog
          </MuiLink>
          ,{" "}
          <MuiLink component={Link} to="/products">
            Product
          </MuiLink>
          , or{" "}
          <MuiLink component={Link} to="/services">
            Service
          </MuiLink>
        </Typography>
      </Box>
    );

  //main content
  return (
    <Box
      sx={{
        mt: 5,
        width: { xs: "95%", sm: "90%", md: "80%", lg: "60%" },
        margin: "auto",
        py: 5,
        display: "flex",
        flexDirection: "column",
        gap: 3,
        color: (theme) => theme.palette.text.primary,
      }}
    >
      <Typography variant="h5" sx={{ textAlign: "center" }}>
        List of Favorites
      </Typography>

      {renderFavoriteByType("blog", blogs)}
      {renderFavoriteByType("product", products)}
      {renderFavoriteByType("service", services)}
    </Box>
  );
}

export default Favorites;
