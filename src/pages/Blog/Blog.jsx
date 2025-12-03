import React, { useEffect, useState, useMemo } from "react";
import { fetchBlogs } from "../../store/slices/blogs/blogsSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  Link as MuiLink,
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
  Pagination,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Stack,
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link, useNavigate } from "react-router";
import { timeConversion, getImageUrl } from "../../helpers/helpers";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import FavoriteButtonAndCount from "../../components/FavoriteButtonAndCount";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useAuth } from "../../context/AuthContext";

const ITEMS_PER_PAGE = 6; // Show 6 blogs per page

function Blog() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { blogs, loading, error } = useSelector((state) => state.blogs);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const favorites = useSelector((state) => state.favorites.favorites);
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const { user } = useAuth();
  const [sortOrder, setSortOrder] = useState("newest");

  useEffect(() => {
    if (blogs.length === 0) {
      dispatch(fetchBlogs());
    }
  }, [dispatch, blogs]);

  const handleBlogClick = (blogId) => {
    navigate(`/blogs/${blogId}`);
  };

  // Filter blogs based on search query and category
  const filteredAndSortedBlogs = useMemo(() => {
    let result = [...blogs];

    // category filter
    if (selectedCategory !== "all") {
      result = result.filter((blog) =>
        selectedCategory === "others"
          ? !blog.category
          : blog.category === selectedCategory
      );
    }

    //favorite filter
    if (onlyFavorites && user) {
      result = result.filter((blog) =>
        favorites.some(
          (fav) =>
            fav.user_id == user.id &&
            fav.favorite_type === "blog" &&
            fav.item_id == blog.id
        )
      );
    }

    // search  filter
    if (searchQuery.trim()) {
      const searchTerms = searchQuery.toLowerCase().trim().split(/\s+/);
      result = result.filter((blog) => {
        const searchableText = [
          blog.title,
          blog.content,
          blog.author,
          blog.category,
          blog.author?.name,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return searchTerms.some((term) => searchableText.includes(term));
      });
    }
    //sort blogs
    if (sortOrder === "newest") {
      result = result.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
    }
    if (sortOrder === "oldest") {
      result = result.sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      );
    }
    if (sortOrder === "mostFav") {
      result = result.sort(
        (a, b) => (b.favorite_count || 0) - (a.favorite_count || 0)
      );
    }

    return result;
  }, [
    blogs,
    searchQuery,
    selectedCategory,
    onlyFavorites,
    favorites,
    user,
    sortOrder,
  ]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredAndSortedBlogs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedBlogs = filteredAndSortedBlogs.slice(startIndex, endIndex);

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

  const handleBack = () => {
    navigate("/");
  };

  const categories = [
    ...new Set(blogs.map((b) => (b.category === null ? "others" : b.category))),
  ];

  const handleFavoriteFilter = (e) => {
    if (!user) {
      alert("Log in to filter favorites");
      return;
    }

    setOnlyFavorites(e.target.checked);
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
              backgroundColor: (theme) =>
                theme.palette.primary.dark || "#2563EB",
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
        backgroundColor: (theme) => theme.palette.background.default,
      }}
    >
      {/* Content */}
      <Box
        sx={{
          position: "relative",
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
              {filteredAndSortedBlogs.length === 0
                ? "No blogs found"
                : `Found ${filteredAndSortedBlogs.length} blog${filteredAndSortedBlogs.length !== 1 ? "s" : ""}`}
            </Typography>
          )}
        </Box>

        {/* Sort and filter */}
        <Stack
          spacing={2}
          direction={{ xs: "column", sm: "row" }}
          sx={{ mb: 5 }}
        >
          {/* Category Filter */}
          <Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            sx={{
              minWidth: 180,
              borderRadius: 3,
              p: 0,
              mb: 2,
            }}
          >
            <MenuItem value="all">All categories</MenuItem>
            {categories
              .filter((cat) => cat !== "others")
              .map((cat, index) => (
                <MenuItem
                  key={index}
                  value={cat}
                  sx={{ textTransform: "capitalize" }}
                >
                  {cat}
                </MenuItem>
              ))}
            <MenuItem value="others">Others</MenuItem>
          </Select>

          {/* Sort by created time, most favorites */}
          <Select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            sx={{ borderRadius: 3, p: 0 }}
          >
            <Typography component="span" sx={{ pl: 1 }}>
              Sort by:{" "}
            </Typography>
            <MenuItem value="newest">Newest</MenuItem>
            <MenuItem value="oldest">Oldest</MenuItem>
            <MenuItem value="mostFav">Most Favorited</MenuItem>
          </Select>
          {/* Favorite Filter */}
          <FormControlLabel
            control={
              <Checkbox
                checked={onlyFavorites}
                onChange={handleFavoriteFilter}
                icon={<FavoriteBorderIcon sx={{ color: "#ED310C" }} />}
                checkedIcon={<FavoriteIcon sx={{ color: "#ED310C" }} />}
              />
            }
            label="Only show my favorites"
            sx={{
              mb: 5,
              color: (theme) => theme.palette.text.primary,
            }}
          />
        </Stack>
        <Box
          sx={{
            width: "100%",
            maxWidth: { xs: "100%", sm: "90%", md: "1200px" },
            display: "flex",
            flexDirection: "column",
            gap: { xs: 3, sm: 4 },
          }}
        >
          {paginatedBlogs.map((blog) => (
            <Card
              key={blog.id}
              sx={{
                borderRadius: 2,
                width: "100%",
                height: { xs: "auto", md: 300 },
                padding: 0,
                position: "relative",
                backgroundColor: (theme) => theme.palette.background.paper,
                border: (theme) =>
                  `1px solid ${theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}`,
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                transition: "all 0.3s ease",
                "&:hover": {
                  borderColor: (theme) => theme.palette.primary.main,
                  transform: "translateY(-4px)",
                },
              }}
            >
              <CardMedia
                component="img"
                onClick={() => handleBlogClick(blog.id)}
                src={
                  getImageUrl(blog.featured_image_url || blog.featured_image) ||
                  blog.image_url
                }
                alt={blog.title}
                sx={{
                  width: { xs: "100%", md: "30%" },
                  height: { xs: "30%", md: "100%" },
                  objectFit: "cover",
                  display: "block",
                  padding: 0,
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
                    }}
                  >
                    {blog.category}
                  </Typography>
                )}

                <CardHeader
                  onClick={() => handleBlogClick(blog.id)}
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
                      {blog.title}
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
                <CardContent sx={{ mb: 0, px: 0, pt: 1 }}>
                  <Typography
                    variant="body1"
                    sx={{
                      color: (theme) =>
                        theme.palette.mode === "dark"
                          ? "rgba(255, 255, 255, 0.9)"
                          : "rgba(0, 0, 0, 0.87)",
                      lineHeight: 1.8,
                      fontSize: { xs: "0.9375rem", sm: "1rem" },
                    }}
                  >
                    {blog.content.length > 150 ? (
                      <>
                        {blog.content.substring(0, 150)}
                        <MuiLink
                          component={Link}
                          to={`/blogs/${blog.id}`}
                          sx={{ textDecoration: "none" }}
                        >
                          ...continue reading
                        </MuiLink>
                      </>
                    ) : (
                      blog.content
                    )}
                  </Typography>
                </CardContent>
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
      </Box>
    </Box>
  );
}

export default Blog;
