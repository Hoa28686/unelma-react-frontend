/**
 * Common style constants and utilities
 */

// Button hover effect (used throughout the app)
export const buttonHoverStyles = {
  border: "1px solid transparent",
  transition: "all 0.3s ease",
  "&:hover": {
    borderColor: "#E57A44",
    transform: "translateY(-4px)",
  },
  "&:focus": {
    outline: "none",
    boxShadow: "none",
  },
  "&:focus-visible": {
    outline: "none",
    boxShadow: "none",
  },
};

// Card background color for light mode
export const cardBackgroundLight = "#B0D0B5";

// Primary accent color
export const primaryColor = "#E57A44";

// Common button styles
export const commonButtonStyles = {
  backgroundColor: (theme) => theme.palette.primary.main,
  color: "#FFFFFF",
  fontWeight: 100,
  borderRadius: 2,
  boxShadow: "none",
  textTransform: "none",
  ...buttonHoverStyles,
};

