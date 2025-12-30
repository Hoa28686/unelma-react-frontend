import React, { useEffect, useState, useMemo } from "react";
import { fetchBlogs } from "../../store/slices/blogs/blogsSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
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
  CircularProgress,
  darken,
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useNavigate } from "react-router";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useAuth } from "../../context/AuthContext";
import BlogCard from "../../components/blog/BlogCard";

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

  // Fetch blogs data
  useEffect(() => {
    if (blogs.length === 0 && !loading) {
      dispatch(fetchBlogs());
    }
  }, [dispatch, blogs, loading]);

  // Filter blogs based on search query and category
  const filteredAndSortedBlogs = useMemo(() => {
    if (blogs.length === 0) return [];
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

  // Reset to page 1 when search or favorite filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, onlyFavorites, selectedCategory]);

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

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "400px",
          color: (theme) => theme.palette.text.primary,
        }}
      >
        <CircularProgress />
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
          minHeight: "400px",
          gap: 3,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: (theme) => theme.palette.error.main,
            fontWeight: 600,
            textAlign: "center",
          }}
        >
          Unable to Load Blogs
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: (theme) => theme.palette.text.secondary,
            textAlign: "center",
            maxWidth: "500px",
          }}
        >
          {error.includes("500") || error.includes("Internal Server Error")
            ? "The server is currently experiencing issues. Please try again later or contact support if the problem persists."
            : `Error: ${error}`}
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            onClick={() => dispatch(fetchBlogs())}
            sx={{
              backgroundColor: (theme) => theme.palette.primary.main,
              color: "#FFFFFF",
              border: "1px solid transparent",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: (theme) =>
                  darken(theme.palette.primary.main, 0.2),
              },
            }}
          >
            Retry
          </Button>

          <Button
            variant="outlined"
            onClick={handleBack}
            startIcon={<ArrowBackIosIcon />}
            sx={{
              borderColor: (theme) => theme.palette.primary.main,
              color: (theme) => theme.palette.primary.main,
              "&:hover": {
                borderColor: (theme) => darken(theme.palette.primary.main, 0.2),
                backgroundColor: "rgba(229, 122, 68, 0.1)",
              },
            }}
          >
            Back to Home
          </Button>
        </Box>
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
        {/* Content Wrapper - matches Footer width */}
        <Box
          sx={{
            maxWidth: { xs: "90%", sm: "85%", md: "80%" },
            margin: "0 auto",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
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
            sx={{ mb: 5, width: "100%", justifyContent: "center", alignItems: "center" }}
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
                textTransform: "capitalize",
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
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: { xs: 3, sm: 4 },
            }}
          >
            {paginatedBlogs.length === 0 && onlyFavorites && user && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "300px",
                  gap: 2,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ color: (theme) => theme.palette.text.secondary }}
                >
                  No favorite blogs found
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: (theme) => theme.palette.text.secondary }}
                >
                  Start favoriting blogs to see them here!
                </Typography>
              </Box>
            )}
            {paginatedBlogs.length === 0 && !onlyFavorites && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "300px",
                  gap: 2,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ color: (theme) => theme.palette.text.secondary }}
                >
                  No blogs found
                </Typography>
              </Box>
            )}
            {paginatedBlogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
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
                  aria-label="Previous"
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
                  aria-label="Next"
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
    </Box>
  );
}

export default Blog;
