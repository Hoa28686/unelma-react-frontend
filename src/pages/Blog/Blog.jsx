import React, { useEffect, useState } from "react";
import { fetchBlogs } from "../../store/slices/blogs/blogsSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Card,
  CardActionArea,
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
import { timeConversion } from "../../helpers/helpers";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import heroImageDesktop from "../../assets/earthy_frontend.png";
import heroImageMobile from "../../assets/earthy_frontend_mobile.png";

function Blog() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { blogs, loading, error } = useSelector((state) => state.blogs);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (blogs.length === 0) {
      dispatch(fetchBlogs());
    }
  }, [dispatch, blogs]);

  const handleBlogClick = (blogId) => {
    navigate(`/blog/${blogId}`);
  };

  // Filter blogs based on search query
  const filteredBlogs = blogs.filter((blog) => {
    if (!searchQuery.trim()) return true;

    const query = searchQuery.toLowerCase().trim();
    const searchTerms = query.split(" ").filter((term) => term.length > 0);

    const searchableText = [
      blog.title,
      blog.content,
      blog.author,
      blog.category,
      typeof blog.author === "object" ? blog.author?.name : blog.author,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return searchTerms.some((term) => searchableText.includes(term));
  });

  const handleBack = () => {
    navigate("/");
  };

  if (loading || blogs.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "50vh",
          color: (theme) => theme.palette.text.primary,
        }}
      >
        <Typography>Loading blogs ...</Typography>
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
          color: (theme) => theme.palette.text.primary,
        }}
      >
        <Typography>Error loading blog: {error}</Typography>
        <Button
          variant="contained"
          onClick={handleBack}
          startIcon={<ArrowBackIosIcon />}
          sx={{
            backgroundColor: (theme) => theme.palette.primary.main,
            color: "#FFFFFF",
            border: "1px solid transparent",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: (theme) => theme.palette.primary.dark || "#2563EB",
            },
          }}
        >
          Back to Home Page
        </Button>
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
        overflow: "hidden",
      }}
    >
      {/* Hero Images - responsive, static, no animation */}
      <Box
        component="img"
        src={heroImageDesktop}
        alt="Hero background"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          objectFit: "cover",
          objectPosition: "center",
          zIndex: 0,
          display: { xs: "none", md: "block" },
        }}
      />
      <Box
        component="img"
        src={heroImageMobile}
        alt="Hero background"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          objectFit: "cover",
          objectPosition: "center",
          zIndex: 0,
          display: { xs: "block", md: "none" },
        }}
      />

      {/* Content overlay */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: { xs: "2rem 1rem", sm: "3rem 2rem", md: "4rem 3rem" },
        }}
      >
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
          Our Blog
        </Typography>

      {/* Search Bar */}
      <Box
        sx={{
          width: "100%",
          maxWidth: { xs: "100%", sm: "90%", md: "1200px" },
          marginBottom: { xs: "2rem", sm: "3rem" },
        }}
      >
        <TextField
          fullWidth
          placeholder="Search blogs by title, content, author, or category..."
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
            {filteredBlogs.length === 0
              ? "No blogs found"
              : `Found ${filteredBlogs.length} blog${filteredBlogs.length !== 1 ? "s" : ""}`}
          </Typography>
        )}
      </Box>

      <Box
        sx={{
          width: "100%",
          maxWidth: { xs: "100%", sm: "90%", md: "1200px" },
          display: "flex",
          flexDirection: "column",
          gap: { xs: 2, sm: 3 },
        }}
      >
        {blogs.map((blog) => (
          <CardActionArea
            key={blog.id}
            sx={{
              borderRadius: 2,
              width: "100%",
              minHeight: { xs: "auto", md: 300 },
              padding: 0,
              position: "relative",
              backgroundColor: (theme) => theme.palette.background.paper,
              border: (theme) => `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              transition: "all 0.3s ease",
              "&:hover": {
                borderColor: (theme) => theme.palette.primary.main,
                transform: "translateY(-4px)",
              },
            }}
            onClick={() => handleBlogClick(blog.id)}
          >
            <CardMedia
              component="img"
              sx={{
                width: { xs: "100%", md: "30%" },
                height: { xs: "250px", md: "100%" },
                objectFit: "cover",
                display: "block",
                padding: 0,
              }}
              image={blog.image_url}
              alt={blog.title}
            />
            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                padding: { xs: 2, sm: 3 },
              }}
            >
              <CardHeader
                title={
                  <Typography
                    variant="h5"
                    component="h2"
                    sx={{
                      fontSize: { xs: "1.25rem", sm: "1.5rem" },
                      fontWeight: 600,
                      color: (theme) => theme.palette.text.primary,
                      mb: 1,
                    }}
                  >
                    {blog.title}
                  </Typography>
                }
                subheader={
                  <Typography
                    variant="body2"
                    sx={{
                      color: (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
                      fontSize: "0.875rem",
                    }}
                  >
                    {`${timeConversion(blog.created_at)} • ${blog.author}`}
                  </Typography>
                }
                sx={{ pb: 1, px: 0 }}
              />
              <CardContent sx={{ mb: 0, px: 0, pt: 1 }}>
                <Typography
                  variant="body1"
                  sx={{
                    color: (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.87)',
                    lineHeight: 1.8,
                    fontSize: { xs: "0.9375rem", sm: "1rem" },
                  }}
                >
                  {blog.content.length > 150 ? (
                    <>
                      {blog.content.substring(0, 150)}
                      <Box
                        component="span"
                        sx={{
                          color: (theme) => theme.palette.primary.main,
                          fontWeight: 500,
                          ml: 0.5,
                        }}
                      >
                        . . . continue reading
                      </Box>
                    </>
                  ) : (
                    blog.content
                  )}
                </Typography>
              </CardContent>
            </Box>
          </CardActionArea>
        ))}
      </Box>
      </Box>
    </Box>
  );
}

export default Blog;
