import React from "react";
import { Box } from "@mui/material";
import heroImageDesktop from "../assets/earthy_frontend.png";
import heroImageMobile from "../assets/earthy_frontend_mobile.png";

/**
 * Reusable HeroImage component for consistent hero image display across pages
 * @param {boolean} animate - Whether to animate the image on mount
 * @param {Object} sx - Additional sx styles
 */
function HeroImage({ animate = false, sx = {} }) {
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    if (animate) {
      setIsLoaded(true);
    }
  }, [animate]);

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

  return (
    <>
      {/* Desktop hero image */}
      <Box
        sx={{
          ...baseStyles,
          backgroundImage: `url(${heroImageDesktop})`,
          display: { xs: "none", md: "block" },
        }}
      />
      {/* Mobile hero image */}
      <Box
        sx={{
          ...baseStyles,
          backgroundImage: `url(${heroImageMobile})`,
          display: { xs: "block", md: "none" },
        }}
      />
    </>
  );
}

export default HeroImage;

