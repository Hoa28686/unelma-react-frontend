import React from "react";
import { TextField } from "@mui/material";

/**
 * Reusable styled TextField component with consistent styling
 * Prevents browser autofill blue background and applies theme-aware styles
 */
const StyledTextField = React.forwardRef(({ multiline = false, ...props }, ref) => {
  return (
    <TextField
      {...props}
      ref={ref}
      variant="outlined"
      sx={{
        "& .MuiOutlinedInput-root": {
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? "#FFFFFF"
              : theme.palette.background.default,
          "& fieldset": {
            borderColor: (theme) =>
              theme.palette.mode === "dark"
                ? "rgba(255, 255, 255, 0.2)"
                : "rgba(0, 0, 0, 0.23)",
          },
          "&:hover fieldset": {
            borderColor: (theme) => theme.palette.primary.main,
          },
          "&.Mui-focused fieldset": {
            borderColor: (theme) => theme.palette.primary.main,
            borderWidth: "2px",
          },
          "&.Mui-error fieldset": {
            borderColor: (theme) => theme.palette.error.main,
          },
          // Prevent browser autofill blue background
          ...(multiline
            ? {
                "& textarea:-webkit-autofill": {
                  WebkitBoxShadow: (theme) =>
                    theme.palette.mode === "light"
                      ? "0 0 0 1000px #FFFFFF inset"
                      : `0 0 0 1000px ${theme.palette.background.default} inset`,
                  WebkitTextFillColor: (theme) => theme.palette.text.primary,
                },
              }
            : {
                "& input:-webkit-autofill": {
                  WebkitBoxShadow: (theme) =>
                    theme.palette.mode === "light"
                      ? "0 0 0 1000px #FFFFFF inset"
                      : `0 0 0 1000px ${theme.palette.background.default} inset`,
                  WebkitTextFillColor: (theme) => theme.palette.text.primary,
                },
                "& input:-webkit-autofill:hover": {
                  WebkitBoxShadow: (theme) =>
                    theme.palette.mode === "light"
                      ? "0 0 0 1000px #FFFFFF inset"
                      : `0 0 0 1000px ${theme.palette.background.default} inset`,
                },
                "& input:-webkit-autofill:focus": {
                  WebkitBoxShadow: (theme) =>
                    theme.palette.mode === "light"
                      ? "0 0 0 1000px #FFFFFF inset"
                      : `0 0 0 1000px ${theme.palette.background.default} inset`,
                },
              }),
        },
        ...props.sx,
      }}
    />
  );
});

StyledTextField.displayName = "StyledTextField";

export default StyledTextField;

