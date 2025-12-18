import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import {
  clearSelectedBlog,
  fetchBlogs,
  setSelectedBlog,
} from "../../store/slices/blogs/blogsSlice";
import {
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  Grid,
  Card,
  Alert,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AccountCircle from "@mui/icons-material/AccountCircle";
import {
  timeConversion,
  getImageUrl,
  selectItem,
  handleCategoryClick,
  textFieldStyles,
  placeholderLogo,
} from "../../helpers/helpers";
import HandleBackButton from "../../components/HandleBackButton";
import axios from "axios";
import { API } from "../../api";
import { useAuth } from "../../context/AuthContext";

import FavoriteButtonAndCount from "../../components/favorite/FavoriteButtonAndCount";
import SuggestedBlog from "../../components/blog/SuggestedBlog";
import useScrollToTop from "../../hooks/useScrollToTop";
import ParagraphText from "../../components/blog/ParagraphText";
import { useContactForm } from "../../hooks/useContactForm";
import StyledTextField from "../../components/StyledTextField";

function BlogDetail() {
  const { id, slug } = useParams();
  const { user, token } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [newComment, setNewComment] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [sortedComment, setSortedComment] = useState([]);
  const { selectedBlog, loading, error, blogs } = useSelector(
    (state) => state.blogs
  );

  // Contact form hook for query sidebar
  const {
    formData,
    loading: queryLoading,
    submitStatus,
    fieldErrors,
    handleChange: handleQueryChange,
    handleSubmit: handleQuerySubmit,
  } = useContactForm({ name: "", email: "", message: "" });

  // scroll to top when id changes
  useScrollToTop([id]);

  // fetch blog data
  useEffect(() => {
    if (blogs.length === 0) {
      dispatch(fetchBlogs());
    }
  }, [dispatch, blogs.length]);

  // get selected blog
  useEffect(() => {
    selectItem(
      blogs,
      id,
      slug,
      (blog) => dispatch(setSelectedBlog(blog)),
      () => dispatch(clearSelectedBlog()),
      navigate,
      "blogs"
    );
  }, [id, slug, blogs, dispatch, navigate]);

  // sort comments based on sortOrder
  useEffect(() => {
    if (!selectedBlog?.comments?.length) {
      setSortedComment([]);
      return;
    }

    const sorted = [...selectedBlog.comments];

    sortOrder === "newest"
      ? sorted.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      : sorted.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

    setSortedComment(sorted);
  }, [sortOrder, selectedBlog]);

  const handleTagClick = (tag) => {
    navigate(`/blogs/tags/${encodeURIComponent(tag)}`);
  };
  const handlePostComment = async () => {
    const postCommentUrl = `${API.blogs}/${id}/comments`;
    try {
      await axios.post(
        postCommentUrl,
        {
          content: newComment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      // Refetch blog with comments to get proper user objects
      const res = await axios.get(`${API.blogs}/${id}`);
      dispatch(setSelectedBlog(res.data.data));
      setNewComment("");
    } catch (e) {
      console.error(e);
    }
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
          minHeight: "50vh",
          gap: 2,
          color: (theme) => theme.palette.text.primary,
        }}
      >
        <Typography>Error loading blog: {error}</Typography>
        <HandleBackButton content="Blog List" link="/blogs" />
      </Box>
    );
  }

  if (!selectedBlog) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          minHeight: "50vh",
          gap: 2,
          color: (theme) => theme.palette.text.primary,
        }}
      >
        <Typography>Blog not found</Typography>
        <HandleBackButton content="Blog List" link="/blogs" />
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
      {/* Hero Image Section */}
      {(selectedBlog?.featured_image_local_url ||
        selectedBlog?.featured_image_url ||
        selectedBlog?.featured_image ||
        selectedBlog?.image_local_url ||
        selectedBlog?.image_url) && (
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: { xs: "300px", sm: "400px", md: "500px" },
            overflow: "hidden",
            backgroundColor: (theme) => theme.palette.background.default,
          }}
        >
          <Box
            component="img"
            src={getImageUrl(
              selectedBlog?.featured_image_local_url ||
                selectedBlog?.featured_image_url ||
                selectedBlog?.featured_image ||
                selectedBlog?.image_local_url ||
                selectedBlog?.image_url
            )}
            alt={selectedBlog.title}
            onError={(e) => {
              e.target.src = placeholderLogo;
            }}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          {/* Overlay gradient for better text readability */}
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "50%",
              background:
                "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
            }}
          />
        </Box>
      )}

      {/* Content */}
      <Box
        sx={{
          position: "relative",
          minHeight: "100vh",
          width: "100%",
          padding: { xs: "2rem 1rem", sm: "3rem 2rem", md: "4rem 3rem" },
        }}
      >
        <Box
          sx={{
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {/* Back Button */}
          <Box sx={{ mb: { xs: 2, sm: 3 } }}>
            <HandleBackButton content="Blog List" link="/blogs" />
          </Box>

          {selectedBlog.category && (
            <Typography
              variant="subtitle1"
              sx={{
                color: (theme) => theme.palette.text.secondary,
                textTransform: "uppercase",
                cursor: "pointer",
                mb: 2,
                textAlign: { xs: "center", lg: "left" },
                mx: "auto",
              }}
              onClick={() =>
                handleCategoryClick(selectedBlog.category, navigate)
              }
            >
              {selectedBlog.category}
            </Typography>
          )}
          {/* Blog Header */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", lg: "row" },
              justifyContent: { xs: "flex-start", lg: "space-between" },
              alignItems: "center",
              textAlign: "center",
              gap: 2,
              marginBottom: { xs: "1rem", lg: "3rem" },
              flexWrap: "wrap",
            }}
          >
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                fontWeight: 700,
                color: (theme) => theme.palette.text.primary,
              }}
            >
              {selectedBlog.title}
            </Typography>
            <FavoriteButtonAndCount type="blog" item={selectedBlog} />
          </Box>

          {/* Main Content and Sidebar Layout */}
          <Grid
            container
            spacing={4}
            sx={{ alignItems: "flex-start", mb: 4, width: "100%" }}
          >
            {/* Left Side - Main Content */}
            <Grid size={{ lg: 8 }}>
              {/* Author and Date */}
              <Typography
                variant="subtitle1"
                sx={{
                  color: (theme) => theme.palette.text.secondary,
                  fontSize: { xs: "0.875rem", sm: "1rem" },
                  mb: 2,
                  textAlign: { xs: "center", lg: "left" },
                  mx: "auto",
                }}
              >
                {selectedBlog.author_name} •{" "}
                {timeConversion(selectedBlog.created_at)}
              </Typography>
              <Box
                sx={{
                  width: "100%",
                  "& p": {
                    fontSize: { xs: "1rem", sm: "1.125rem" },
                    fontWeight: 400,
                    color: (theme) => theme.palette.text.primary,
                    lineHeight: 1.8,
                    textAlign: "left",
                    marginBottom: "1.5rem",
                    marginTop: 0,
                    "&:last-child": {
                      marginBottom: 0,
                    },
                  },
                }}
              >
                <ParagraphText text={selectedBlog?.content} />
              </Box>

              {selectedBlog?.tags?.length > 0 && (
                <>
                  <Stack
                    sx={{
                      my: 8,
                      flexDirection: "row",
                      gap: 1,
                      flexWrap: "wrap",
                      color: (theme) => theme.palette.text.primary,
                    }}
                  >
                    <Typography variant="subtitle1" fontWeight={500}>
                      Tags:{" "}
                    </Typography>
                    {selectedBlog.tags.map((tag, index) => (
                      <Chip
                        key={index}
                        label={tag}
                        variant="outlined"
                        onClick={() => handleTagClick(tag)}
                      />
                    ))}
                  </Stack>
                </>
              )}
              {/* Comment section */}
              <Box
                sx={{
                  width: "100%",
                  textAlign: "left",
                  alignSelf: "flex-start",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: (theme) => theme.palette.text.primary,
                    mb: 2,
                    fontSize: { xs: "1.25rem", sm: "1.5rem" },
                  }}
                >
                  Comments
                </Typography>
                <Divider
                  sx={{
                    borderColor: (theme) => theme.palette.text.secondary + "40",
                    mb: 3,
                  }}
                />
                {user ? (
                  <Box sx={{ mt: 2 }}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        color: (theme) => theme.palette.text.primary,
                        mb: 2,
                        fontSize: { xs: "1.125rem", sm: "1.25rem" },
                      }}
                    >
                      Leave a comment
                    </Typography>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar
                        alt={user.name}
                        src={user.profile_picture || "/logo.webp"}
                        sx={{
                          width: { xs: 32, sm: 40 },
                          height: { xs: 32, sm: 40 },
                        }}
                      />

                      <TextField
                        multiline
                        minRows={1}
                        fullWidth
                        sx={textFieldStyles}
                        placeholder="💭 Add a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                      />
                      <Button
                        type="button"
                        onClick={handlePostComment}
                        aria-label="Post comment"
                        disabled={newComment.trim() === ""}
                      >
                        <SendIcon />
                      </Button>
                    </Stack>
                  </Box>
                ) : (
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: (theme) => theme.palette.text.primary,
                      my: 2,
                      fontSize: { xs: "1.125rem", sm: "1.25rem" },
                    }}
                  >
                    Log in to leave a comment.
                  </Typography>
                )}
                {selectedBlog?.comments?.length > 0 && (
                  <Box sx={{ mt: 4 }}>
                    <Select
                      value={sortOrder}
                      onChange={(e) => setSortOrder(e.target.value)}
                      sx={{ borderRadius: 3, p: 0 }}
                    >
                      <MenuItem value="newest">Newest</MenuItem>
                      <MenuItem value="oldest">Oldest</MenuItem>
                    </Select>
                    {sortedComment.map((c) => (
                      <Box
                        key={c.id}
                        sx={{
                          display: "flex",
                          gap: 2,
                          my: 3,
                          padding: 2,
                        }}
                      >
                        <Avatar
                          src={
                            c.user.profile_picture
                              ? getImageUrl(c.user.profile_picture)
                              : `/logo.webp`
                          }
                          alt="user avatar"
                          sx={{
                            width: { xs: 32, sm: 40 },
                            height: { xs: 32, sm: 40 },
                            flexShrink: 0,
                            border: (theme) =>
                              `1px solid ${theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}`,
                          }}
                        >
                          {!c.user.profile_picture && (
                            <AccountCircle
                              sx={{ fontSize: { xs: 32, sm: 40 } }}
                            />
                          )}
                        </Avatar>

                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 1,
                            flex: 1,
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 2,
                            }}
                          >
                            <Typography
                              variant="body1"
                              sx={{
                                fontWeight: 600,
                                color: (theme) => theme.palette.text.primary,
                              }}
                            >
                              {c.user.name}{" "}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                color: (theme) => theme.palette.text.secondary,
                              }}
                            >
                              {timeConversion(c.created_at)}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              "& p": {
                                fontSize: "0.9375rem",
                                color: (theme) => theme.palette.text.primary,
                                lineHeight: 1.8,
                                margin: 0,
                              },
                            }}
                          >
                            {c.content.includes("\n") ? (
                              c.content.split("\n").map((paragraph, index) => (
                                <Typography
                                  key={index}
                                  variant="body2"
                                  sx={{ mb: 1 }}
                                >
                                  {paragraph.trim()}
                                </Typography>
                              ))
                            ) : (
                              <Typography variant="body2" sx={{ mb: 1 }}>
                                {c.content}
                              </Typography>
                            )}
                          </Box>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>
            </Grid>

            {/* Right Side - Contact Form Sidebar */}
            <Grid size={{ xs: 10, lg: 4 }} sx={{ mx: { xs: "auto" } }}>
              <Box
                sx={{
                  position: { md: "sticky" },
                  top: { md: "2rem" },
                }}
              >
                <Card
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === "light"
                        ? "rgba(0, 0, 0, 0.03)"
                        : "transparent",
                    border: (theme) =>
                      theme.palette.mode === "dark"
                        ? "1px solid rgba(255, 255, 255, 0.1)"
                        : "1px solid rgba(0, 0, 0, 0.1)",
                    borderRadius: 2,
                    padding: { xs: "2rem", sm: "2.5rem" },
                    boxShadow: (theme) =>
                      theme.palette.mode === "light"
                        ? "0 2px 8px rgba(0, 0, 0, 0.05)"
                        : "none",
                  }}
                >
                  <Typography
                    variant="h3"
                    component="h2"
                    sx={{
                      fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
                      fontWeight: 600,
                      color: (theme) => theme.palette.text.primary,
                      marginBottom: { xs: "1.5rem", sm: "2rem" },
                    }}
                  >
                    Have Query?
                  </Typography>
                  <Box component="form" onSubmit={handleQuerySubmit}>
                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                    >
                      <StyledTextField
                        name="name"
                        label="Your Name"
                        fullWidth
                        required
                        value={formData.name}
                        onChange={handleQueryChange}
                        error={!!fieldErrors.name}
                        helperText={fieldErrors.name}
                      />
                      <StyledTextField
                        name="email"
                        label="Your Email"
                        type="email"
                        fullWidth
                        required
                        value={formData.email}
                        onChange={handleQueryChange}
                        error={!!fieldErrors.email}
                        helperText={fieldErrors.email}
                      />
                      <StyledTextField
                        name="message"
                        label="Your Message"
                        fullWidth
                        required
                        multiline
                        rows={4}
                        value={formData.message}
                        onChange={handleQueryChange}
                        error={!!fieldErrors.message}
                        helperText={fieldErrors.message}
                      />
                      {submitStatus.success !== null && (
                        <Alert
                          severity={submitStatus.success ? "success" : "error"}
                          sx={{
                            mt: 1,
                            "& .MuiAlert-message": {
                              color: (theme) =>
                                submitStatus.success
                                  ? theme.palette.success.main
                                  : theme.palette.error.main,
                            },
                          }}
                        >
                          {submitStatus.message}
                        </Alert>
                      )}
                      <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        disabled={queryLoading}
                        sx={{
                          padding: { xs: "0.75rem", sm: "1rem" },
                          "&:disabled": {
                            opacity: 0.6,
                          },
                        }}
                      >
                        {queryLoading ? (
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <CircularProgress size={20} color="inherit" />
                            Sending...
                          </Box>
                        ) : (
                          "Submit Request"
                        )}
                      </Button>
                    </Box>
                  </Box>
                </Card>
              </Box>
            </Grid>
          </Grid>

          {/* Suggested Blogs */}
          <SuggestedBlog currentBlog={selectedBlog} allBlogs={blogs} />
        </Box>
      </Box>
    </Box>
  );
}

export default BlogDetail;
