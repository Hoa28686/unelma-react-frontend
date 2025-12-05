import {
  Typography,
  useMediaQuery,
  useTheme as useMuiTheme,
} from "@mui/material";
import React, { useMemo } from "react";
import { Box, Card, CardContent, CardHeader, CardMedia } from "@mui/material";

import { getImageUrl, timeConversion } from "../helpers/helpers";
import { useNavigate } from "react-router";
import FavoriteButtonAndCount from "./FavoriteButtonAndCount";

function SuggestedBlog({ currentBlog, allBlogs }) {
  const navigate = useNavigate();
  const theme = useMuiTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const isMedium = useMediaQuery(theme.breakpoints.between("sm", "md"));

  let suggestedBlogs = useMemo(() => {
    return allBlogs
      .filter((blog) => blog.id !== currentBlog.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
  }, [allBlogs, currentBlog.id]);

  if (isSmall) {
    suggestedBlogs = suggestedBlogs.slice(0, 1);
  }
  if (isMedium) {
    suggestedBlogs = suggestedBlogs.slice(0, 2);
  }

  const handleBlogClick = (blogId) => {
    navigate(`/blogs/${blogId}`);
  };

  if (suggestedBlogs.length === 0) {
    return null;
  }

  return (
    <>
      <Typography
        variant="h3"
        sx={{
          textAlign: "center",
          marginBlock: 4,
          fontWeight: 500,
          color: (theme) => theme.palette.text.primary,
        }}
      >
        You might also like:
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          py: 1,
          width: { xs: "90%", sm: "85%", md: "80%" },
          margin: "0 auto",
        }}
      >
        {suggestedBlogs.map((blog) => (
          <Card
            key={blog.id}
            sx={{
              borderRadius: 2,
              width: "20rem",
              height: "37rem",
              p: 0,
              flexShrink: 0,
              backgroundColor: (theme) => theme.palette.background.paper,
              border: (theme) => `1px solid ${theme.palette.text.secondary}20`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
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
              src={getImageUrl(
                blog.featured_image_local_url ||
                  blog.featured_image_url ||
                  blog.featured_image ||
                  blog.image_local_url ||
                  blog.image_url
              )}
              alt={blog.title}
              sx={{
                width: "100%",
                height: "13rem",
                objectFit: "cover",
                display: "block",
                padding: 0,
                cursor: "pointer",
                backgroundColor: (theme) => theme.palette.background.paper,
              }}
            />
            <Box sx={{ p: 2 }}>
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
                    color: (theme) => theme.palette.text.primary,
                  }}
                >
                  {blog.content.length > 150 ? (
                    <>
                      {blog.content.substring(0, 150)}
                      <Box
                        component="span"
                        onClick={() => handleBlogClick(blog.id)}
                        sx={{
                          textDecoration: "none",
                          color: (theme) => theme.palette.primary.main,
                          cursor: "pointer",
                        }}
                      >
                        ...continue reading
                      </Box>
                    </>
                  ) : (
                    blog.content
                  )}
                </Typography>
              </CardContent>
            </Box>
          </Card>
        ))}
      </Box>
    </>
  );
}

export default SuggestedBlog;
