import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  TextField,
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Typography,
  Divider,
  InputAdornment,
  IconButton,
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

function SearchBar({ open, onClose }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState({
    products: [],
    blogs: [],
    services: [],
  });
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const navigate = useNavigate();
  const searchInputRef = useRef(null);
  const resultsRef = useRef(null);

  const products = useSelector((state) => state.products.products);
  const blogs = useSelector((state) => state.blogs.blogs);
  const services = useSelector((state) => state.services.services);

  // Focus input when search opens
  useEffect(() => {
    if (open && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [open]);

  // Search logic
  useEffect(() => {
    if (!searchQuery.trim()) {
      setResults({ products: [], blogs: [], services: [] });
      setSelectedIndex(-1);
      return;
    }

    const query = searchQuery.toLowerCase().trim();
    const searchTerms = query.split(" ").filter((term) => term.length > 0);

    // Search products (with safety check)
    const productResults = (products || []).filter((product) => {
      if (!product) return false;
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

    // Search blogs (with safety check)
    const blogResults = (blogs || []).filter((blog) => {
      if (!blog) return false;
      const searchableText = [
        blog.title,
        blog.content,
        blog.author,
        blog.category,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchTerms.some((term) => searchableText.includes(term));
    });

    // Search services (with safety check)
    const serviceResults = (services || []).filter((service) => {
      if (!service) return false;
      const searchableText = [service.name, service.description]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchTerms.some((term) => searchableText.includes(term));
    });

    setResults({
      products: productResults.slice(0, 5), // Limit to 5 results per type
      blogs: blogResults.slice(0, 5),
      services: serviceResults.slice(0, 5),
    });
    setSelectedIndex(-1);
  }, [searchQuery, products, blogs, services]);

  // Highlight matching text
  const highlightText = (text, query) => {
    if (!query.trim() || !text) return text;

    const searchTerms = query
      .toLowerCase()
      .split(" ")
      .filter((term) => term.length > 0);

    let parts = [];
    let remainingText = text;
    let remainingLower = text.toLowerCase();

    searchTerms.forEach((term) => {
      const index = remainingLower.indexOf(term);
      if (index !== -1) {
        // Add text before match
        if (index > 0) {
          parts.push(remainingText.substring(0, index));
        }
        // Add highlighted match
        parts.push(
          <Box
            key={`highlight-${parts.length}`}
            component="span"
            sx={{
              fontWeight: 700,
              color: (theme) => theme.palette.primary.main,
            }}
          >
            {remainingText.substring(index, index + term.length)}
          </Box>
        );
        // Update remaining text
        remainingText = remainingText.substring(index + term.length);
        remainingLower = remainingLower.substring(index + term.length);
      }
    });

    // Add any remaining text
    if (remainingText) {
      parts.push(remainingText);
    }

    return parts.length > 0 ? <>{parts}</> : text;
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    const totalResults = results.products.length + results.blogs.length;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < totalResults - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault();
      handleResultClick(selectedIndex);
    } else if (e.key === "Escape") {
      handleClose();
    }
  };

  // Handle result click
  const handleResultClick = (index) => {
    let resultIndex = index;
    let item;

    if (resultIndex < results.products.length) {
      item = results.products[resultIndex];
      navigate(`/products/${item.id}`);
    } else if (resultIndex < results.products.length + results.blogs.length) {
      item = results.blogs[resultIndex - results.products.length];
      navigate(`/blogs/${item.id}`);
    } else {
      item =
        results.services[
          resultIndex - results.products.length - results.blogs.length
        ];
      navigate(`/services`);
    }

    handleClose();
  };

  const handleClose = () => {
    setSearchQuery("");
    setResults({ products: [], blogs: [], services: [] });
    setSelectedIndex(-1);
    onClose();
  };

  const handleClear = () => {
    setSearchQuery("");
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const totalResults =
    results.products.length + results.blogs.length + results.services.length;
  const hasResults = totalResults > 0;
  const showNoResults = searchQuery.trim() && !hasResults;

  if (!open) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        zIndex: 1300,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingTop: { xs: "4rem", md: "6rem" },
      }}
      onClick={handleClose}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: { xs: "90%", sm: "600px", md: "700px" },
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Paper
          elevation={0}
          sx={{
            borderRadius: 2,
            overflow: "hidden",
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? "rgba(0, 0, 0, 0.03)"
                : "transparent",
            border: (theme) =>
              theme.palette.mode === "dark"
                ? "1px solid rgba(255, 255, 255, 0.1)"
                : "1px solid rgba(0, 0, 0, 0.1)",
            boxShadow: (theme) =>
              theme.palette.mode === "light"
                ? "0 2px 8px rgba(0, 0, 0, 0.05)"
                : "none",
          }}
        >
          {/* Search Input */}
          <Box sx={{ p: 2 }}>
            <TextField
              inputRef={searchInputRef}
              fullWidth
              placeholder="Search products, services, and blogs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              variant="outlined"
              autoFocus
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchOutlinedIcon
                      sx={{
                        color: (theme) =>
                          theme.palette.mode === "light" ? "#FFFFFF" : theme.palette.text.secondary,
                      }}
                    />
                  </InputAdornment>
                ),
                endAdornment: searchQuery && (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      onClick={handleClear}
                      sx={{
                        color: (theme) =>
                          theme.palette.mode === "light" ? "#FFFFFF" : theme.palette.text.secondary,
                      }}
                    >
                      <ClearOutlinedIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ),
                sx: {
                  backgroundColor: "transparent",
                  color: (theme) =>
                    theme.palette.mode === "light" ? "#FFFFFF" : theme.palette.text.primary,
                  "& input": {
                    color: (theme) =>
                      theme.palette.mode === "light" ? "#FFFFFF" : theme.palette.text.primary,
                  },
                  "& input::placeholder": {
                    color: (theme) =>
                      theme.palette.mode === "light" ? "rgba(255, 255, 255, 0.7)" : undefined,
                    opacity: 1,
                  },
                  "& input:-webkit-autofill": {
                    WebkitBoxShadow: "0 0 0 1000px transparent inset",
                    WebkitTextFillColor: (theme) =>
                      theme.palette.mode === "light" ? "#FFFFFF" : theme.palette.text.primary,
                  },
                  "& input:-webkit-autofill:hover": {
                    WebkitBoxShadow: "0 0 0 1000px transparent inset",
                    WebkitTextFillColor: (theme) =>
                      theme.palette.mode === "light" ? "#FFFFFF" : theme.palette.text.primary,
                  },
                  "& input:-webkit-autofill:focus": {
                    WebkitBoxShadow: "0 0 0 1000px transparent inset",
                    WebkitTextFillColor: (theme) =>
                      theme.palette.mode === "light" ? "#FFFFFF" : theme.palette.text.primary,
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: (theme) =>
                      theme.palette.mode === "dark"
                        ? "rgba(255, 255, 255, 0.2)"
                        : "rgba(255, 255, 255, 0.3)",
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
          </Box>

          {/* Results */}
          {(hasResults || showNoResults) && (
            <Box
              sx={{
                maxHeight: "400px",
                overflowY: "auto",
                borderTop: (theme) =>
                  `1px solid ${
                    theme.palette.mode === "dark"
                      ? "rgba(255, 255, 255, 0.1)"
                      : "rgba(255, 255, 255, 0.2)"
                  }`,
              }}
              ref={resultsRef}
            >
              {showNoResults && (
                <Box sx={{ p: 3, textAlign: "center" }}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontStyle: "italic",
                      color: (theme) =>
                        theme.palette.mode === "light" ? "#FFFFFF" : theme.palette.text.secondary,
                    }}
                  >
                    No results found for "{searchQuery}"
                  </Typography>
                </Box>
              )}

              {results.products.length > 0 && (
                <>
                  <Box sx={{ px: 2, py: 1 }}>
                    <Typography
                      variant="caption"
                      sx={{
                        fontWeight: 600,
                        color: (theme) =>
                          theme.palette.mode === "light" ? "#FFFFFF" : theme.palette.text.secondary,
                        textTransform: "uppercase",
                        letterSpacing: 1,
                      }}
                    >
                      Products ({results.products.length})
                    </Typography>
                  </Box>
                  <List sx={{ py: 0 }}>
                    {results.products.map((product, index) => (
                      <ListItem
                        key={product.id}
                        disablePadding
                        sx={{
                          backgroundColor:
                            selectedIndex === index
                              ? (theme) =>
                                  theme.palette.mode === "light"
                                    ? "rgba(229, 122, 68, 0.1)"
                                    : "rgba(229, 122, 68, 0.2)"
                              : "transparent",
                        }}
                      >
                        <ListItemButton
                          onClick={() => handleResultClick(index)}
                          onMouseEnter={() => setSelectedIndex(index)}
                        >
                          <ListItemIcon>
                            <ShoppingBagOutlinedIcon
                              sx={{
                                color: (theme) => theme.palette.primary.main,
                              }}
                            />
                          </ListItemIcon>
                          <ListItemText
                            primary={highlightText(product.name, searchQuery)}
                            secondary={
                              <Typography
                                variant="caption"
                                sx={{
                                  color: (theme) =>
                                    theme.palette.mode === "light"
                                      ? "rgba(255, 255, 255, 0.7)"
                                      : theme.palette.text.secondary,
                                  fontSize: "0.75rem",
                                }}
                              >
                                {product.category}
                              </Typography>
                            }
                            sx={{
                              "& .MuiListItemText-primary": {
                                color: (theme) =>
                                  theme.palette.mode === "light"
                                    ? "#FFFFFF"
                                    : theme.palette.text.primary,
                              },
                            }}
                          />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </>
              )}

              {results.products.length > 0 &&
                (results.blogs.length > 0 || results.services.length > 0) && (
                  <Divider
                    sx={{
                      borderColor: (theme) =>
                        theme.palette.mode === "dark"
                          ? "rgba(255, 255, 255, 0.1)"
                          : "rgba(255, 255, 255, 0.2)",
                    }}
                  />
                )}

              {results.blogs.length > 0 && (
                <>
                  <Box sx={{ px: 2, py: 1 }}>
                    <Typography
                      variant="caption"
                      sx={{
                        fontWeight: 600,
                        color: (theme) =>
                          theme.palette.mode === "light" ? "#FFFFFF" : theme.palette.text.secondary,
                        textTransform: "uppercase",
                        letterSpacing: 1,
                      }}
                    >
                      Blogs ({results.blogs.length})
                    </Typography>
                  </Box>
                  <List sx={{ py: 0 }}>
                    {results.blogs.map((blog, index) => {
                      const actualIndex = results.products.length + index;
                      return (
                        <ListItem
                          key={blog.id}
                          disablePadding
                          sx={{
                            backgroundColor:
                              selectedIndex === actualIndex
                                ? (theme) =>
                                    theme.palette.mode === "light"
                                      ? "rgba(229, 122, 68, 0.1)"
                                      : "rgba(229, 122, 68, 0.2)"
                                : "transparent",
                          }}
                        >
                          <ListItemButton
                            onClick={() => handleResultClick(actualIndex)}
                            onMouseEnter={() => setSelectedIndex(actualIndex)}
                          >
                            <ListItemIcon>
                              <ArticleOutlinedIcon
                                sx={{
                                  color: (theme) => theme.palette.primary.main,
                                }}
                              />
                            </ListItemIcon>
                            <ListItemText
                              primary={highlightText(blog.title, searchQuery)}
                              secondary={
                                <Typography
                                  variant="caption"
                                  sx={{
                                    color: (theme) =>
                                      theme.palette.mode === "light"
                                        ? "rgba(255, 255, 255, 0.7)"
                                        : theme.palette.text.secondary,
                                    fontSize: "0.75rem",
                                    display: "-webkit-box",
                                    WebkitLineClamp: 1,
                                    WebkitBoxOrient: "vertical",
                                    overflow: "hidden",
                                  }}
                                >
                                  {blog.content?.substring(0, 60)}...
                                </Typography>
                              }
                              sx={{
                                "& .MuiListItemText-primary": {
                                  color: (theme) =>
                                    theme.palette.mode === "light"
                                      ? "#FFFFFF"
                                      : theme.palette.text.primary,
                                },
                              }}
                            />
                          </ListItemButton>
                        </ListItem>
                      );
                    })}
                  </List>
                </>
              )}

              {(results.blogs.length > 0 || results.products.length > 0) &&
                results.services.length > 0 && <Divider />}

              {results.services.length > 0 && (
                <>
                  <Box sx={{ px: 2, py: 1 }}>
                    <Typography
                      variant="caption"
                      sx={{
                        fontWeight: 600,
                        color: (theme) =>
                          theme.palette.mode === "light" ? "#FFFFFF" : theme.palette.text.secondary,
                        textTransform: "uppercase",
                        letterSpacing: 1,
                      }}
                    >
                      Services ({results.services.length})
                    </Typography>
                  </Box>
                  <List sx={{ py: 0 }}>
                    {results.services.map((service, index) => {
                      const actualIndex =
                        results.products.length + results.blogs.length + index;
                      return (
                        <ListItem
                          key={service.id}
                          disablePadding
                          sx={{
                            backgroundColor:
                              selectedIndex === actualIndex
                                ? (theme) =>
                                    theme.palette.mode === "light"
                                      ? "rgba(229, 122, 68, 0.1)"
                                      : "rgba(229, 122, 68, 0.2)"
                                : "transparent",
                          }}
                        >
                          <ListItemButton
                            onClick={() => handleResultClick(actualIndex)}
                            onMouseEnter={() => setSelectedIndex(actualIndex)}
                          >
                            <ListItemIcon>
                              <BusinessCenterOutlinedIcon
                                sx={{
                                  color: (theme) => theme.palette.primary.main,
                                }}
                              />
                            </ListItemIcon>
                            <ListItemText
                              primary={highlightText(service.name, searchQuery)}
                              secondary={
                                <Typography
                                  variant="caption"
                                  sx={{
                                    color: (theme) =>
                                      theme.palette.mode === "light"
                                        ? "rgba(255, 255, 255, 0.7)"
                                        : theme.palette.text.secondary,
                                    fontSize: "0.75rem",
                                    display: "-webkit-box",
                                    WebkitLineClamp: 1,
                                    WebkitBoxOrient: "vertical",
                                    overflow: "hidden",
                                  }}
                                >
                                  {service.description?.substring(0, 60)}...
                                </Typography>
                              }
                              sx={{
                                "& .MuiListItemText-primary": {
                                  color: (theme) =>
                                    theme.palette.mode === "light"
                                      ? "#FFFFFF"
                                      : theme.palette.text.primary,
                                },
                              }}
                            />
                          </ListItemButton>
                        </ListItem>
                      );
                    })}
                  </List>
                </>
              )}

              {/* Keyboard hint */}
              {hasResults && (
                <Box
                  sx={{
                    px: 2,
                    py: 1,
                    borderTop: (theme) =>
                      `1px solid ${
                        theme.palette.mode === "dark"
                          ? "rgba(255, 255, 255, 0.1)"
                          : "rgba(0, 0, 0, 0.1)"
                      }`,
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      color: (theme) =>
                        theme.palette.mode === "light" ? "#FFFFFF" : theme.palette.text.secondary,
                      fontSize: "0.7rem",
                    }}
                  >
                    Use ↑↓ to navigate, Enter to select, Esc to close
                  </Typography>
                </Box>
              )}
            </Box>
          )}
        </Paper>
      </Box>
    </Box>
  );
}

export default SearchBar;
