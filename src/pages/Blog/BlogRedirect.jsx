import React, { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import { handleItemClick } from "../../helpers/helpers";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../../store/slices/blogs/blogsSlice";

function BlogRedirect() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs.blogs);

  // Fetch blogs if not loaded
  useEffect(() => {
    if (blogs.length === 0) {
      dispatch(fetchBlogs());
    }
  }, [dispatch, blogs.length]);

  // Memoize blog lookup if id is unchanged
  const blog = useMemo(() => {
    return blogs.find((b) => b.id === Number(id));
  }, [blogs, id]);

  // Redirect to the blog’s full URL
  useEffect(() => {
    if (!blog) return;
    handleItemClick(navigate, blog, "blogs");
  }, [blog, navigate]);

  return null; //only redirect, no UI
}

export default BlogRedirect;
