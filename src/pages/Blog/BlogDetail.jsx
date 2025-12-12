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
  Divider,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AccountCircle from "@mui/icons-material/AccountCircle";
import {
  timeConversion,
  getImageUrl,
  selectItem,
  handleCategoryClick,
  textFieldStyles,
} from "../../helpers/helpers";
import HandleBackButton from "../../components/HandleBackButton";
import axios from "axios";
import { API } from "../../api";
import { useAuth } from "../../context/AuthContext";

import FavoriteButtonAndCount from "../../components/favorite/FavoriteButtonAndCount";
import SuggestedBlog from "../../components/blog/SuggestedBlog";
import useScrollToTop from "../../hooks/useScrollToTop";
import ParagraphText from "../../components/blog/ParagraphText";

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
  // scroll to top when id changes
  useScrollToTop([id]);

  // fetch blog data (for list page, not detail)
  useEffect(() => {
    if (blogs.length === 0) {
      dispatch(fetchBlogs());
    }
  }, [dispatch, blogs.length]);

  // Fetch individual blog when detail page loads
  useEffect(() => {
    const fetchBlogAndComments = async () => {
      if (id) {
        try {
          // Fetch the blog
          const blogRes = await axios.get(`${API.blogs}/${id}`, {
            headers: token ? {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            } : {
              Accept: "application/json",
            },
          });
          const blogData = blogRes.data?.data || blogRes.data;
          
          if (blogData) {
            // Initialize comments array if not present
            if (!blogData.comments) {
              blogData.comments = [];
            }
            
            // Fetch comments separately
            try {
              const commentsRes = await axios.get(`${API.blogs}/${id}/comments`, {
                headers: token ? {
                  Authorization: `Bearer ${token}`,
                  Accept: "application/json",
                } : {
                  Accept: "application/json",
                },
              });
              
              // Extract comments from response
              const commentsData = commentsRes.data?.data || 
                                  commentsRes.data?.comments || 
                                  commentsRes.data;
              
              if (Array.isArray(commentsData)) {
                blogData.comments = commentsData;
              } else if (commentsData && typeof commentsData === 'object') {
                // If it's a single comment object, wrap it in an array
                blogData.comments = [commentsData];
              }
            } catch (commentsError) {
              // If comments endpoint fails, continue without comments
              // Keep empty comments array
            }
            
            dispatch(setSelectedBlog(blogData));
            return;
          }
        } catch (error) {
          console.error("Error fetching blog:", error);
        }
        
        // Fallback: try to get blog from list if individual fetch fails
        if (blogs.length > 0) {
          selectItem(
            blogs,
            id,
            slug,
            async (blog) => {
              // Initialize comments array if not present
              if (!blog.comments) {
                blog.comments = [];
              }
              
              // Try to fetch comments for blog from list
              try {
                const commentsRes = await axios.get(`${API.blogs}/${id}/comments`, {
                  headers: token ? {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                  } : {
                    Accept: "application/json",
                  },
                });
                
                const commentsData = commentsRes.data?.data || 
                                    commentsRes.data?.comments || 
                                    commentsRes.data;
                
                if (Array.isArray(commentsData)) {
                  blog.comments = commentsData;
                } else if (commentsData && typeof commentsData === 'object') {
                  blog.comments = [commentsData];
                }
              } catch (commentsError) {
                // If comments endpoint fails, continue without comments
              }
              
              dispatch(setSelectedBlog(blog));
            },
            () => dispatch(clearSelectedBlog()),
            navigate,
            "blogs"
          );
        }
      }
    };

    // Fetch blog and comments when id changes
    fetchBlogAndComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, token]);

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
    } else {
      setSortedComment([]);
    }
  }, [sortOrder, selectedBlog]);

  const handleTagClick = (tag) => {
    navigate(`/blogs/tags/${encodeURIComponent(tag)}`);
  };
  const handlePostComment = async () => {
    const postCommentUrl = `${API.blogs}/${id}/comments`;
    try {
      const postResponse = await axios.post(
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

      // Extract comments from the POST response
      // The backend POST response includes ALL comments (not just the new one)
      const responseData = postResponse.data?.data || postResponse.data;
      const responseComments = responseData?.comments || responseData;

      if (selectedBlog && responseComments) {
        let updatedComments;

        // The POST response contains all comments, use them directly
        if (Array.isArray(responseComments)) {
          // Response is an array of all comments
          updatedComments = responseComments;
        } else if (typeof responseComments === 'object' && responseComments.id) {
          // Response is a single comment object (unlikely but handle it)
          // Append to existing comments
          updatedComments = [...(selectedBlog.comments || []), responseComments];
        } else {
          // Unexpected structure
          updatedComments = selectedBlog.comments || [];
        }

        // Create updated blog object with all comments from the response
        const updatedBlog = {
          ...selectedBlog,
          comments: updatedComments
        };
        
        // Update Redux state with all comments
        dispatch(setSelectedBlog(updatedBlog));
        setNewComment("");
      } else {
        // Fallback: refetch the blog if selectedBlog is missing
        const res = await axios.get(`${API.blogs}/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });
        const blogData = res.data?.data || res.data;
        if (blogData) {
          // Initialize comments array
          if (!blogData.comments) {
            blogData.comments = [];
          }
          dispatch(setSelectedBlog(blogData));
          setNewComment("");
        }
      }
    } catch (e) {
      console.error("Error posting comment:", e);
    }
  };

  if (loading || blogs.length === 0) {
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
                cursor: "pointer",
              }}
              onClick={() =>
                handleCategoryClick(selectedBlog.category, navigate)
              }
            >
              {selectedBlog.category}
            </Typography>
          )}
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
              color: (theme) => theme.palette.text.secondary,
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
            sx={{ width: "100%", textAlign: "left", alignSelf: "flex-start" }}
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
            {(selectedBlog?.comments?.length > 0 || sortedComment.length > 0) && (
              <Box sx={{ mt: 4 }}>
                <Select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  sx={{ borderRadius: 3, p: 0 }}
                >
                  <MenuItem value="newest">Newest</MenuItem>
                  <MenuItem value="oldest">Oldest</MenuItem>
                </Select>
                {(sortedComment.length > 0 ? sortedComment : selectedBlog?.comments || []).map((c) => (
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
        </Box>
        {/* Suggested Blogs */}
        <SuggestedBlog currentBlog={selectedBlog} allBlogs={blogs} />
      </Box>
    </>
  );
}

export default BlogDetail;
