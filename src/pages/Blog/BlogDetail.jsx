import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  clearSelectedBlog,
  fetchBlogs,
  setSelectedBlog,
} from "../../store/slices/blogs/blogsSlice";
import {
  Avatar,
  Box,
  Button,
  Divider,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { timeConversion, getImageUrl } from "../../helpers/helpers";
import HandleBackButton from "../../components/HandleBackButton";
import axios from "axios";
import { API } from "../../api";
import { useAuth } from "../../context/AuthContext";
import FavoriteButton from "../../components/FavoriteButton";
import FavoriteButtonAndCount from "../../components/FavoriteButtonAndCount";
import SuggestedBlog from "../../components/SuggestedBlog";

function BlogDetail() {
  const { blogId } = useParams();
  const { user, token } = useAuth();
  const dispatch = useDispatch();
  const [newComment, setNewComment] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [sortedComment, setSortedComment] = useState([]);
  const { selectedBlog, loading, error, blogs } = useSelector(
    (state) => state.blogs
  );

  // fetch blog data
  useEffect(() => {
    if (blogs.length === 0) {
      dispatch(fetchBlogs());
    }
  }, [blogs, dispatch]);

  // get selected blog
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

  // scroll to top when blogId changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // sort comments based on sortOrder
  useEffect(() => {
    if (selectedBlog?.comments?.length > 0) {
      const sorted = [...selectedBlog.comments];

      sortOrder === "newest"
        ? sorted.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        : sorted.sort(
            (a, b) => new Date(a.created_at) - new Date(b.created_at)
          );

      setSortedComment(sorted);
    }
  }, [sortOrder, selectedBlog]);

  const handlePostComment = async () => {
    const postCommentUrl = `${API.blogs}/${blogId}/comments`;
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
      const res = await axios.get(`${API.blogs}/${blogId}`);
      dispatch(setSelectedBlog(res.data.data));
      setNewComment("");
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    console.log(user);
  }, []);

  // custom style for TextField
  const textFieldStyles = {
    color: (theme) => theme.palette.text.primary,
    backgroundColor: (theme) => theme.palette.background.paper,
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: (theme) => `${theme.palette.text.secondary}40`,
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: (theme) => theme.palette.primary.main,
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: (theme) => theme.palette.primary.main,
      borderWidth: "2px",
    },
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
    <>
      <HandleBackButton content="Blog List" link="/blogs" />
      <Box
        sx={{
          position: "relative",
          width: "100%",
          minHeight: "100vh",
          py: { xs: 3, sm: 4, md: 5 },
          gap: 3,
          backgroundColor: (theme) => theme.palette.background.default,
        }}
      >
        {/* Content */}

        <Box
          sx={{
            width: { xs: "95%", sm: "90%", md: "80%", lg: "60%" },
            margin: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          {selectedBlog.category && (
            <Typography
              variant="subtitle1"
              sx={{
                color: (theme) => theme.palette.text.secondary,
                textTransform: "uppercase",
              }}
            >
              {selectedBlog.category}
            </Typography>
          )}
          <Box
            component="img"
            src={
              selectedBlog.image_url ||
              getImageUrl(
                selectedBlog?.featured_image_url || selectedBlog?.featured_image
              )
            }
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
              textAlign: "center",
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
              textAlign: "center",
              width: "100%",
              fontSize: { xs: "0.875rem", sm: "1rem" },
            }}
          >
            {selectedBlog.author_name} •{" "}
            {timeConversion(selectedBlog.created_at)}
          </Typography>
          <Box sx={{ alignSelf: "center" }}>
            <FavoriteButtonAndCount type="blog" item={selectedBlog} />
          </Box>
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

          {/* Comment section */}
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
                borderColor: (theme) => theme.palette.text.secondary + "40",
                mb: 3,
              }}
            />
            {user ? (
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
                variant="subheading1"
                component="h3"
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
                          : undefined
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
                        <AccountCircle sx={{ fontSize: { xs: 32, sm: 40 } }} />
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
        {/* Suggested Blogs */}
        <SuggestedBlog currentBlog={selectedBlog} allBlogs={blogs} />
      </Box>
    </>
  );
}

export default BlogDetail;
