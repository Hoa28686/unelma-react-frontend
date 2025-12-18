/**
 * Common style constants and utilities
 * Uses theme variables for maintainability
 */

// Button hover effect (used throughout the app)
// Use this function to get theme-aware styles
export const getButtonHoverStyles = (theme) => ({
  border: "1px solid transparent",
  transition: "all 0.3s ease",
  "&:hover": {
    borderColor: theme.palette.primary.main,
    transform: "translateY(-4px)",
  },
  "&:focus": {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: "2px",
    boxShadow: "none",
  },
  "&:focus-visible": {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: "2px",
    boxShadow: "none",
  },
});

// Legacy export for backward compatibility (deprecated - use getButtonHoverStyles)
export const buttonHoverStyles = {
  border: "1px solid transparent",
  transition: "all 0.3s ease",
  "&:hover": {
    borderColor: (theme) => theme.palette.primary.main,
    transform: "translateY(-4px)",
  },
  "&:focus": {
    outline: (theme) => `2px solid ${theme.palette.primary.main}`,
    outlineOffset: "2px",
    boxShadow: "none",
  },
  "&:focus-visible": {
    outline: (theme) => `2px solid ${theme.palette.primary.main}`,
    outlineOffset: "2px",
    boxShadow: "none",
  },
};

// Card background color - use theme instead
// Deprecated: Use theme.palette.background.paper or theme.palette.background.default
export const cardBackgroundLight = (theme) =>
  theme.palette.mode === "light"
    ? theme.palette.background.paper
    : theme.palette.background.default;

// Primary accent color - use theme instead
// Deprecated: Use theme.palette.primary.main
export const getPrimaryColor = (theme) => theme.palette.primary.main;

// Common button styles
export const getCommonButtonStyles = (theme) => ({
  backgroundColor: theme.palette.primary.main,
  color: "#FFFFFF",
  fontWeight: 400,
  borderRadius: 2,
  boxShadow: "none",
  textTransform: "none",
  ...getButtonHoverStyles(theme),
});

// Legacy export for backward compatibility
export const commonButtonStyles = {
  backgroundColor: (theme) => theme.palette.primary.main,
  color: "#FFFFFF",
  fontWeight: 400,
  borderRadius: 2,
  boxShadow: "none",
  textTransform: "none",
  ...buttonHoverStyles,
};
