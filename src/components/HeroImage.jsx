import React from "react";
import { Box } from "@mui/material";
import heroImageDesktop from "../assets/earthy_frontend.png";
import heroImageMobile from "../assets/earthy_frontend_mobile.png";
import commonBackground from "../assets/earthy_common_background.png";

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

  // Use custom image if provided, otherwise use default hero images
  const desktopImage = imageSource || heroImageDesktop;
  const mobileImage = imageSource || heroImageMobile;

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

  // If using a single custom image, show it on all screen sizes
  // Use auto sizing to maintain aspect ratio and prevent stretching
  if (imageSource) {
    return (
      <Box
        sx={{
          ...baseStyles,
          backgroundImage: `url(${imageSource})`,
          backgroundSize: "100% auto", // Scale width to 100%, maintain aspect ratio
          backgroundPosition: "center top", // Position at top center
          minHeight: "100vh", // Ensure it covers at least the viewport height
        }}
      />
    );
  }

  return (
    <>
      {/* Desktop hero image */}
      <Box
        sx={{
          ...baseStyles,
          backgroundImage: `url(${desktopImage})`,
          display: { xs: "none", md: "block" },
        }}
      />
      {/* Mobile hero image */}
      <Box
        sx={{
          ...baseStyles,
          backgroundImage: `url(${mobileImage})`,
          display: { xs: "block", md: "none" },
        }}
      />
    </>
  );
}

export default HeroImage;

