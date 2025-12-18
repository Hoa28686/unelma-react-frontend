import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../../store/slices/blogs/blogsSlice";
import { useParams } from "react-router";
import HandleBackButton from "../../components/HandleBackButton";
import { Box, Stack, Typography, CircularProgress } from "@mui/material";
import BlogCard from "../../components/blog/BlogCard";
import useScrollToTop from "../../hooks/useScrollToTop";
function BlogByTag() {
  const { tag } = useParams();
  const dispatch = useDispatch();
  const { blogs, loading, error } = useSelector((state) => state.blogs);
  const [foundBlogs, setFoundBlogs] = useState([]);

  useScrollToTop();
  // Fetch blogs data
  useEffect(() => {
    if (blogs.length === 0) {
      dispatch(fetchBlogs());
    }
  }, [dispatch, blogs]);

  // find blogs based on selected tag
  useEffect(() => {
    if (tag && blogs.length > 0) {
      const filteredBlogs = blogs.filter(
        (blog) => blog.tags && blog.tags.find((t) => t.toLowerCase() === tag)
      );
      setFoundBlogs(filteredBlogs);
    }
  }, [tag, blogs]);

  //cases when cannot render blogs
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
        <HandleBackButton content="Blogs" link="/blogs" />
      </Box>
    );
  }
  if (!foundBlogs || foundBlogs.length === 0) {
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
        <Typography>No blogs found with "{tag}" tag</Typography>
        <HandleBackButton content="Blogs" link="/blogs" />
      </Box>
    );
  }

  //main content
  return (
    <Box
      sx={{
        width: "100%",
        px: { xs: 2, md: 10, lg: 15 },
        minHeight: "100vh",
        backgroundColor: (theme) => theme.palette.background.default,
        mt: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h4"
        sx={{ mb: 5, textTransform: "capitalize", textAlign: "center" }}
      >
        {tag}
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Found {foundBlogs.length} {foundBlogs.length > 1 ? "blogs" : "blog"}{" "}
        with this tag
      </Typography>
      <Stack spacing={4} sx={{ m: 4, display: "flex" }}>
        {foundBlogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </Stack>
    </Box>
  );
}

export default BlogByTag;
