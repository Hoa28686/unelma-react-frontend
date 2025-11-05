import React, { useEffect } from "react";
import { fetchBlogs } from "../lib/features/blogs/blogsSlice";
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
} from "@mui/material";
import { useNavigate } from "react-router";
import { timeConversion } from "../helpers/helpers";

function Blog() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { blogs, loading, error } = useSelector((state) => state.blogs);

  useEffect(() => {
    if (blogs.length === 0) {
      dispatch(fetchBlogs());
    }
  }, [dispatch, blogs]);
  console.log(blogs);

  const handleBlogClick = (blogId) => {
    navigate(`/blog/${blogId}`);
  };

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
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography>Error loading blog: {error}</Typography>
        <Button
          variant="underlined"
          onClick={handleBack}
          startIcon={<ArrowBackIosIcon />}
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
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          minHeight: "100vh",
          backgroundImage: "url('/blog-background.jpg')",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></Box>

      {blogs.map((blog) => (
        <CardActionArea
          key={blog.id}
          sx={{
            borderRadius: 2,
            width: { xs: "95%", sm: "90%", md: "80%" },
            height: { xs: "auto", md: 300 },
            my: 2,
            padding: 0,
            position: "relative",
            background: "white",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
          }}
          onClick={() => handleBlogClick(blog.id)}
        >
          <CardMedia
            component="img"
            sx={{
              width: { sm: "100%", md: "30%" },
              height: { sm: "30%", md: "100%" },
              objectFit: "cover",
              display: "block",
              padding: 0,
            }}
            image={blog.image_url}
            alt={blog.title}
          />
          <Box>
            <CardHeader
              title={blog.title}
              subheader={`${timeConversion(blog.created_at)} • ${
                blog.author.name
              }`}
              sx={{ pb: 1 }}
            />
            <CardContent sx={{ mb: 3 }}>
              <Typography variant="body2" sx={{ color: "text.primary" }}>
                {blog.content.length > 100 ? (
                  <>
                    {blog.content.substring(0, 100)}
                    <Box component="span" sx={{ color: "text.secondary" }}>
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
  );
}

export default Blog;
