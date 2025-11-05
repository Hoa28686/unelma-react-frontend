import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  clearSelectedBlog,
  fetchBlogs,
  setSelectedBlog,
} from "../lib/features/blogs/blogsSlice";
import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import { timeConversion } from "../helpers/helpers";
import HandleBackButton from "./handleBackButton";

function BlogDetail() {
  const { blogId } = useParams();
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
      const foundBlog = blogs.find((b) => b.id === blogId);
      if (foundBlog) {
        dispatch(setSelectedBlog(foundBlog));
      } else {
        dispatch(clearSelectedBlog());
      }
    }
  }, [blogId, blogs, dispatch]);

  const handlePostComment = () => {
    //
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
        <Typography>Loading blog ...</Typography>
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
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: { xs: "95%", sm: "90%", md: "80%", lg: "60%" },
          py: 5,
          margin: "auto",
          gap: 3,
        }}
      >
        <Box
          component="img"
          sx={{ width: "100%" }}
          src={selectedBlog?.image}
          alt={selectedBlog.title}
        />
        <Typography variant="h4">{selectedBlog.title}</Typography>
        <Typography variant="subtitle1" sx={{ color: "text.secondary", mb: 2 }}>
          {selectedBlog.author} • {timeConversion(selectedBlog.created_at)}
        </Typography>
        <Box>
          {selectedBlog.content.includes("\n") ? (
            selectedBlog.content.split("\n").map((paragraph, index) => (
              <Typography variant="body1" key={index} mb={3}>
                {paragraph.trim()}
              </Typography>
            ))
          ) : (
            <Typography variant="body1">{selectedBlog.content}</Typography>
          )}
        </Box>
        <Box sx={{ width: "100%", textAlign: "left", alignSelf: "flex-start" }}>
          <Typography variant="h6" mb={1}>
            Comments
          </Typography>
          <Divider sx={{ borderColor: "text.secondary" }} />
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Leave a comment
            </Typography>
            <TextField
              multiline
              minRows={3}
              fullWidth
              InputProps={{
                sx: { color: "#000" },
              }}
              placeholder="Write your comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              variant="contained"
              sx={{ mt: 1 }}
              onClick={handlePostComment}
            >
              Post Comment
            </Button>
          </Box>
          {selectedBlog.comments.length > 0 &&
            selectedBlog.comments.map((c, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  gap: 2,
                  my: 2,
                }}
              >
                <Box
                  component="img"
                  src={c.avatar}
                  alt={c.user}
                  sx={{
                    borderRadius: "50%",
                    width: 24,
                    height: 24,
                    objectFit: "cover",
                  }}
                />
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {c.user}
                    <Box
                      component="span"
                      sx={{
                        fontSize: "0.9rem",
                        color: "text.secondary",
                        ml: 1,
                      }}
                    >
                      {" "}
                      {timeConversion(c.created_at)}
                    </Box>
                  </Typography>
                  <Box>
                    {c.text.includes("\n") ? (
                      c.text.split("\n").map((paragraph, index) => (
                        <Typography variant="body2" key={index}>
                          {paragraph.trim()}
                        </Typography>
                      ))
                    ) : (
                      <Typography>{c.text}</Typography>
                    )}
                  </Box>
                </Box>
              </Box>
            ))}
        </Box>
      </Box>
    </>
  );
}

export default BlogDetail;
