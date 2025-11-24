import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  clearSelectedBlog,
  fetchBlogs,
  setSelectedBlog,
} from "../../store/slices/blogs/blogsSlice";
import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import { timeConversion, getImageUrl } from "../../helpers/helpers";
import HandleBackButton from "../../components/HandleBackButton";
import axios from "axios";
import { API } from "../../api";
import { useAuth } from "../../context/AuthContext";

function BlogDetail() {
  const { blogId } = useParams();
  const { token } = useAuth();
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const { selectedBlog, loading, error, blogs } = useSelector(
    (state) => state.blogs
  );
  useEffect(() => {
    if (blogs.length === 0) {
      dispatch(fetchBlogs());
    }
  }, [blogs, dispatch]);
  useEffect(() => {
    if (blogId && blogs.length > 0) {
      const foundBlog = blogs.find((b) => b.id == blogId);
      if (foundBlog) {
        dispatch(setSelectedBlog(foundBlog));
      } else {
        dispatch(clearSelectedBlog());
      }
    }
  }, [blogId, blogs, dispatch]);

  const handlePostComment = async () => {
    const postCommentUrl = `${API.blogs}/${blogId}/comments`;
    try {
      await axios.post(
        postCommentUrl,
        {
          content: comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      // Refetch blog with comments to get proper user objects
      const res = await axios.get(`${API.blogs}/${blogId}`);
      dispatch(setSelectedBlog(res.data.data));
      setComment("");
    } catch (e) {
      console.error(e);
    }
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
        <Typography>Loading blog ...</Typography>
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
        <HandleBackButton content="Blog List" link="/blog" />
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
        <HandleBackButton content="Blog List" link="/blog" />
      </Box>
    );
  }
  // main component render
  return (
    <>
      <HandleBackButton content="Blog List" link="/blog" />
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
            py: { xs: 3, sm: 4, md: 5 },
            gap: 3,
          }}
        >
          <Box
            sx={{
              width: { xs: "95%", sm: "90%", md: "80%", lg: "60%" },
              margin: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            <Box
              component="img"
              src={getImageUrl(selectedBlog?.featured_image_url || selectedBlog?.featured_image)}
              alt={selectedBlog.title}
              sx={{
                width: "100%",
                borderRadius: 2,
                objectFit: "cover",
                maxHeight: "500px",
                backgroundColor: (theme) => theme.palette.background.paper,
              }}
            />
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontSize: { xs: "1.75rem", sm: "2rem", md: "2.5rem" },
                fontWeight: 700,
                color: (theme) => theme.palette.text.primary,
                textAlign: "left",
                width: "100%",
              }}
            >
              {selectedBlog.title}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                color: (theme) =>
                  theme.palette.mode === "dark"
                    ? "rgba(255, 255, 255, 0.7)"
                    : "rgba(0, 0, 0, 0.6)",
                mb: 2,
                textAlign: "left",
                width: "100%",
                fontSize: { xs: "0.875rem", sm: "1rem" },
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
                  color: (theme) =>
                    theme.palette.mode === "dark"
                      ? "rgba(255, 255, 255, 0.95)"
                      : "rgba(0, 0, 0, 0.87)",
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
              {selectedBlog.content.includes("\n") ? (
                selectedBlog.content
                  .split("\n")
                  .map((paragraph, index) => (
                    <p key={index}>{paragraph.trim()}</p>
                  ))
              ) : (
                <p>{selectedBlog.content}</p>
              )}
            </Box>
            <Box
              sx={{ width: "100%", textAlign: "left", alignSelf: "flex-start" }}
            >
              <Typography
                variant="h6"
                component="h2"
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
                  borderColor: (theme) =>
                    theme.palette.mode === "dark"
                      ? "rgba(255, 255, 255, 0.2)"
                      : "rgba(0, 0, 0, 0.12)",
                  mb: 3,
                }}
              />
              <Box sx={{ mt: 2 }}>
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{
                    fontWeight: 600,
                    color: (theme) => theme.palette.text.primary,
                    mb: 2,
                    fontSize: { xs: "1.125rem", sm: "1.25rem" },
                  }}
                >
                  Leave a comment
                </Typography>
                <TextField
                  multiline
                  minRows={3}
                  fullWidth
                  InputProps={{
                    sx: {
                      color: (theme) => theme.palette.text.primary,
                      backgroundColor: (theme) =>
                        theme.palette.background.paper,
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
                  InputLabelProps={{
                    sx: {
                      color: (theme) =>
                        theme.palette.mode === "dark"
                          ? "rgba(255, 255, 255, 0.7)"
                          : "rgba(0, 0, 0, 0.6)",
                    },
                  }}
                  placeholder="Write your comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <Button
                  variant="contained"
                  sx={{
                    mt: 2,
                    backgroundColor: (theme) => theme.palette.primary.main,
                    color: "#FFFFFF",
                    fontWeight: 600,
                    textTransform: "none",
                    px: 3,
                    py: 1,
                    "&:focus": {
                      outline: (theme) =>
                        `2px solid ${theme.palette.primary.main}`,
                      outlineOffset: "2px",
                      boxShadow: "none",
                    },
                    "&:focus-visible": {
                      outline: (theme) =>
                        `2px solid ${theme.palette.primary.main}`,
                      outlineOffset: "2px",
                      boxShadow: "none",
                    },
                    "&:hover": {
                      backgroundColor: (theme) =>
                        theme.palette.primary.dark || "#2563EB",
                    },
                  }}
                  onClick={handlePostComment}
                >
                  Post Comment
                </Button>
              </Box>
              {selectedBlog.comments.length > 0 && (
                <Box sx={{ mt: 4 }}>
                  {selectedBlog.comments.map((c, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        gap: 2,
                        my: 3,
                        padding: 2,
                        backgroundColor: (theme) =>
                          theme.palette.background.paper,
                        borderRadius: 2,
                        border: (theme) =>
                          `1px solid ${theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}`,
                      }}
                    >
                      <Box
                        component="img"
                        src={c.user.profile_picture || "/logo.webp"}
                        alt="user avatar"
                        sx={{
                          borderRadius: "50%",
                          width: { xs: 32, sm: 40 },
                          height: { xs: 32, sm: 40 },
                          objectFit: "cover",
                          flexShrink: 0,
                        }}
                      />
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 1,
                          flex: 1,
                        }}
                      >
                        <Typography
                          variant="body1"
                          sx={{
                            fontWeight: 600,
                            color: (theme) => theme.palette.text.primary,
                          }}
                        >
                          {c.user.name}
                          <Box
                            component="span"
                            sx={{
                              fontSize: "0.875rem",
                              color: (theme) =>
                                theme.palette.mode === "dark"
                                  ? "rgba(255, 255, 255, 0.7)"
                                  : "rgba(0, 0, 0, 0.6)",
                              ml: 1,
                              fontWeight: 400,
                            }}
                          >
                            {timeConversion(c.created_at)}
                          </Box>
                        </Typography>
                        <Box
                          sx={{
                            "& p": {
                              fontSize: "0.9375rem",
                              color: (theme) =>
                                theme.palette.mode === "dark"
                                  ? "rgba(255, 255, 255, 0.9)"
                                  : "rgba(0, 0, 0, 0.87)",
                              lineHeight: 1.8,
                              margin: 0,
                            },
                          }}
                        >
                          {c.content.includes("\n") ? (
                            c.content
                              .split("\n")
                              .map((paragraph, index) => (
                                <p key={index}>{paragraph.trim()}</p>
                              ))
                          ) : (
                            <p>{c.content}</p>
                          )}
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default BlogDetail;
