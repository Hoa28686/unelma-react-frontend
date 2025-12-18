import React from "react";
import {
  getImageUrl,
  getShortContent,
  handleCategoryClick,
  handleItemClick,
  timeConversion,
} from "../../helpers/helpers";
import { Link, useNavigate } from "react-router";
import {
  Link as MuiLink,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import FavoriteButtonAndCount from "../favorite/FavoriteButtonAndCount";

function BlogCard({ blog }) {
  const navigate = useNavigate();

  const handleBlogClick = (blog) => {
    handleItemClick(navigate, blog, "blogs");
  };

  return (
      <Card
        sx={{
          borderRadius: 2,
          width: { xs: "24rem", md: "100%" },
          height: { xs: "44rem", md: "320px" },
          flexDirection: { xs: "column", md: "row" },
          p: 0,
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? "rgba(0, 0, 0, 0.03)"
              : "transparent",
          display: "flex",
          alignItems: "center",
          flexShrink: 0,
          transition: "all 0.3s ease",
          border: (theme) =>
            theme.palette.mode === "dark"
              ? "1px solid rgba(255, 255, 255, 0.1)"
              : "1px solid rgba(0, 0, 0, 0.1)",
          boxShadow: (theme) =>
            theme.palette.mode === "light"
              ? "0 2px 8px rgba(0, 0, 0, 0.05)"
              : "none",
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
      <CardMedia
        component="img"
        onClick={() => handleBlogClick(blog)}
        src={getImageUrl(
          blog.featured_image_local_url ||
            blog.featured_image_url ||
            blog.featured_image ||
            blog.image_local_url ||
            blog.image_url
        )}
        alt={blog.title}
        sx={{
          width: { xs: "100%", md: "30%" },
          height: { xs: "18rem", md: "100%" },
          objectFit: "cover",
          display: "block",
          p: 0,
          cursor: "pointer",
          backgroundColor: (theme) => theme.palette.background.paper,
        }}
      />
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          padding: { xs: 2, sm: 3 },
        }}
      >
        {blog.category && (
          <Typography
            variant="subtitle1"
            sx={{
              color: (theme) => theme.palette.text.secondary,
              textTransform: "uppercase",
              cursor: "pointer",
            }}
            onClick={() => handleCategoryClick(blog.category, navigate)}
          >
            {blog.category}
          </Typography>
        )}

        <CardHeader
          onClick={() => handleBlogClick(blog)}
          title={
            <Typography
              variant="h5"
              component="h2"
              sx={{
                fontSize: { xs: "1.25rem", sm: "1.5rem" },
                fontWeight: 600,
                color: (theme) => theme.palette.text.primary,
                mb: 1,
                ":hover": { textDecoration: "underline" },
              }}
            >
              {getShortContent(blog.title, 50)}
            </Typography>
          }
          subheader={
            <Typography
              variant="body2"
              sx={{
                color: (theme) => theme.palette.text.secondary,
                fontSize: "0.875rem",
              }}
            >
              {`${timeConversion(blog.created_at)} • ${blog.author?.name}`}
            </Typography>
          }
          sx={{ pb: 1, px: 0, cursor: "pointer" }}
        />

        <FavoriteButtonAndCount type="blog" item={blog} />
        <CardContent
          sx={{ mb: 0, px: 0, pt: 1, cursor: "pointer" }}
          onClick={() => handleBlogClick(blog)}
        >
          <Typography
            variant="body1"
            sx={{
              color: (theme) =>
                theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.9)"
                  : "rgba(0, 0, 0, 0.87)",
              lineHeight: 1.8,
            }}
          >
            {getShortContent(blog.content, 150)}
            {blog.content.length > 150 && (
              <MuiLink component={Link} sx={{ textDecoration: "none" }}>
                continue reading
              </MuiLink>
            )}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}

export default BlogCard;
