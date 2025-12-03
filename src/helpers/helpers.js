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
 * @param {string} imageUrl - The image URL from the API (can be relative or absolute)
 * @returns {string} - Absolute URL to the image
 */
export const getImageUrl = (imageUrl) => {
  if (!imageUrl) {
    return null;
  }
  
  // Normalize escaped slashes (from JSON encoding)
  let normalizedUrl = imageUrl.replace(/\\\//g, '/');
  
  // If already an absolute URL (starts with http:// or https://), return as is
  if (normalizedUrl.startsWith('http://') || normalizedUrl.startsWith('https://')) {
    return normalizedUrl;
  }

  // Get Laravel base URL from environment or use default
  // Remove /api from the end if present, as images are served from the root
  const apiBaseUrl =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";
  const laravelBaseUrl = apiBaseUrl.replace(/\/api$/, "");

  // Handle relative paths (starting with /)
  if (normalizedUrl.startsWith('/')) {
    return `${laravelBaseUrl}${normalizedUrl}`;
  }

  // Handle paths without leading slash (e.g., "storage/products/image.jpg")
  return `${laravelBaseUrl}/${normalizedUrl}`;
};
