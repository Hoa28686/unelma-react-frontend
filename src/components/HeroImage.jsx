import React from "react";
import { Box } from "@mui/material";
import heroImage from "../assets/hero.webp";
import heroTilesImage from "../assets/hero-tiles.webp";

/**
 * Reusable HeroImage component for consistent hero image display across pages
 * @param {boolean} animate - Whether to animate the image on mount
 * @param {string} imageSource - Custom image source (defaults to hero images)
 * @param {Object} sx - Additional sx styles
 */
function HeroImage({ animate = false, imageSource = null, sx = {} }) {
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    if (animate) {
      setIsLoaded(true);
    }
  }, [animate]);

  // Use custom image if provided, otherwise use default hero images from main branch
  // Note: Main branch uses layered approach (heroTilesImage + heroImage)
  // For custom images, use imageSource prop

  const baseStyles = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    zIndex: 0,
    ...(animate && {
      transform: isLoaded ? "translateY(0)" : "translateY(-100vh)",
      transition: "transform 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
      willChange: "transform",
    }),
    ...sx,
  };

  // If using a custom image, show it on all screen sizes
  if (imageSource) {
    return (
      <Box
        sx={{
          ...baseStyles,
          backgroundImage: `url(${imageSource})`,
          backgroundSize: "100% auto",
          backgroundPosition: "center top",
          minHeight: "100vh",
        }}
      />
    );
  }

  // Default: Use main branch's layered hero images (heroTilesImage + heroImage)
  return (
    <>
      {/* First image (tiles) - back layer */}
      <Box
        sx={{
          ...baseStyles,
          backgroundImage: `url(${heroTilesImage})`,
          backgroundRepeat: "repeat-y",
          backgroundSize: { xs: "100% auto", md: "100% auto" },
          backgroundPosition: "top center",
        }}
      />
      {/* Second image (black background) - front layer with delay */}
      <Box
        sx={{
          ...baseStyles,
          backgroundImage: `url(${heroImage})`,
          backgroundRepeat: "repeat-y",
          backgroundSize: { xs: "100% auto", md: "100% auto" },
          backgroundPosition: "top center",
          zIndex: 1,
          transition: animate 
            ? "transform 1.2s cubic-bezier(0.4, 0, 0.2, 1) 0.3s"
            : "none",
        }}
      />
    </>
  );
}

export default HeroImage;

