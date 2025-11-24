export const timeConversion = (time) => {
  return new Date(time).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
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
  
  // If already an absolute URL (starts with http:// or https://), return as is
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }
  
  // Get Laravel base URL from environment or use default
  // Remove /api from the end if present, as images are served from the root
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";
  const laravelBaseUrl = apiBaseUrl.replace(/\/api$/, '');
  
  // Handle relative paths (starting with /)
  if (imageUrl.startsWith('/')) {
    return `${laravelBaseUrl}${imageUrl}`;
  }
  
  // Handle paths without leading slash (e.g., "storage/products/image.jpg")
  return `${laravelBaseUrl}/${imageUrl}`;
};
