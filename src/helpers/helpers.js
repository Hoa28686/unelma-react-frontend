// Use the glossy logo from public folder as placeholder
const placeholderLogo = "/unelma_glossy_logo.webp";

export const timeConversion = (time) => {
  return new Date(time).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const updateFavoriteCount = (items = [], itemId, isAddition) => {
  const item = items.find((i) => i.id == itemId);
  if (item) {
    item.favorite_count = isAddition
      ? item.favorite_count + 1
      : Math.max(item.favorite_count - 1, 0);
  }
};

/**
 * Converts a relative image URL from Laravel to an absolute URL
 * Returns placeholder image if no imageUrl is provided
 * @param {string} imageUrl - The image URL from the API (can be relative or absolute)
 * @returns {string} - Absolute URL to the image or placeholder
 */
export const getImageUrl = (imageUrl) => {
  if (!imageUrl) {
    return placeholderLogo;
  }

  // Normalize escaped slashes (from JSON encoding)
  let normalizedUrl = imageUrl.replace(/\\\//g, "/");

  // If already an absolute URL (starts with http:// or https://), return as is
  if (
    normalizedUrl.startsWith("http://") ||
    normalizedUrl.startsWith("https://")
  ) {
    return normalizedUrl;
  }

  // Get Laravel base URL from environment or use default
  // Remove /api from the end if present, as images are served from the root
  const apiBaseUrl =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";
  const laravelBaseUrl = apiBaseUrl.replace(/\/api$/, "");

  // Handle relative paths (starting with /)
  if (normalizedUrl.startsWith("/")) {
    return `${laravelBaseUrl}${normalizedUrl}`;
  }

  // Handle paths without leading slash (e.g., "storage/products/image.jpg")
  return `${laravelBaseUrl}/${normalizedUrl}`;
};

/**
 * Export placeholder logo for use in onError handlers
 */
export { placeholderLogo };

export const slugify = (string) => {
  return string
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-") // only keep alphanumeric charater
    .substring(0, 50) // Limit length to 50
    .replace(/^-+|-+$/g, ""); // Remove extra hyphens
};

//handle item click for product, service, blog
export const handleItemClick = (navigate, item, resourceName) => {
  const slug = item?.slug || slugify(item.title || item.name);
  navigate(`/${resourceName}/${item.id}/${slug}`);
};

//select item based on id from url params, useful for detail pages
export const selectItem = (
  items,
  id,
  slug,
  setSelectedItem,
  clearSelectedItem,
  navigate,
  resourceName
) => {
  if (!items || items.length === 0) return;

  const foundItem = items.find((i) => i.id === Number(id));

  if (foundItem) {
    setSelectedItem(foundItem);

    const correctSlug =
      foundItem?.slug || slugify(foundItem.title || foundItem.name);
    if (slug !== correctSlug) {
      navigate(`/${resourceName}/${id}/${correctSlug}`, {
        replace: true,
      });
    }
  } else {
    clearSelectedItem();
  }
};

//handle category click for blogs
export const handleCategoryClick = (category, navigate) => {
  navigate(`/blogs/categories/${category}`);
};

// custom style for TextField
export const textFieldStyles = {
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

export const getShortContent = (content, limit) => {
  if (!content) return "";
  return content.length > limit ? `${content.substring(0, limit)}...` : content;
};
