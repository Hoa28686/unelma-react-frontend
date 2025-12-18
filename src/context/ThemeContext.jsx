"use client";
import { createTheme } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { ThemeProvider } from "@mui/material/styles";

export const ThemeContext = createContext(null);
//Light theme gonna be here
const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#2563EB", // Blue accent color matching logo
    },
    secondary: {
      main: "#3B82F6", // Blue accent for consistency
    },
    error: {
      main: "#F87171", // Soft coral red (less harsh)
    },
    warning: {
      main: "#FBBF24", // Warm amber
    },
    success: {
      main: "#34D399", // Fresh mint green
    },
    info: {
      main: "#3B82F6", // Blue accent
    },
    background: {
      default: "transparent", // Gradient applied in Layout
      paper: "rgba(255, 255, 255, 0.9)", // Semi-transparent white for cards/surfaces
      overlay: "#4b4b4b",
    },
    text: {
      primary: "#000000", // Pure black text
      secondary: "#676e7c", // Muted gray for secondary text
    },
    divider: "#c4c4c4",
  },
  typography: {
    fontFamily: [
      "Poppins",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
    h1: {
      fontWeight: 300,
      fontSize: "2.5rem",
    },
    h2: {
      fontWeight: 400,
      fontSize: "2rem",
    },
    h3: {
      fontWeight: 400,
      fontSize: "1.75rem",
    },
    h4: {
      fontWeight: 500,
      fontSize: "1.5rem",
    },
    h5: {
      fontWeight: 500,
      fontSize: "1.25rem",
    },
    h6: {
      fontWeight: 500,
      fontSize: "1rem",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          "&:focus": {
            outline: "none",
            boxShadow: "none",
          },
          "&:focus-visible": {
            outline: "none",
            boxShadow: "none",
          },
          "&:active": {
            outline: "none",
            boxShadow: "none",
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          "&:focus": {
            outline: "none",
            boxShadow: "none",
          },
          "&:focus-visible": {
            outline: "none",
            boxShadow: "none",
          },
          "&:active": {
            outline: "none",
            boxShadow: "none",
          },
        },
      },
    },
  },
});

// Dark Theme here
const darkTheme = createTheme({
  palette: {
    mode: "dark",

    primary: {
      main: "#2563EB", // Blue accent color matching logo
    },
    secondary: {
      main: "#3B82F6", // Blue accent for consistency
    },
    error: {
      main: "#F87171", // Soft coral red (less harsh)
    },
    warning: {
      main: "#FBBF24", // Warm amber
    },
    success: {
      main: "#34D399", // Fresh mint green
    },
    info: {
      main: "#3B82F6", // Blue accent
    },

    background: {
      default: "transparent", // Gradient applied in Layout
      paper: "rgba(21, 27, 46, 0.8)", // Semi-transparent dark blue for cards/surfaces
      overlay: "#020202",
    },

    text: {
      primary: "#FFFFFF", // Pure white text
      secondary: "#9CA3AF", // Muted gray for secondary text
    },
    divider: "#c4c4c4",
  },
  typography: {
    fontFamily: [
      "Poppins",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
    h1: {
      fontWeight: 300,
      fontSize: "2.5rem",
    },
    h2: {
      fontWeight: 400,
      fontSize: "2rem",
    },
    h3: {
      fontWeight: 400,
      fontSize: "1.75rem",
    },
    h4: {
      fontWeight: 500,
      fontSize: "1.5rem",
    },
    h5: {
      fontWeight: 500,
      fontSize: "1.25rem",
    },
    h6: {
      fontWeight: 500,
      fontSize: "1rem",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          "&:focus": {
            outline: "none",
            boxShadow: "none",
          },
          "&:focus-visible": {
            outline: "none",
            boxShadow: "none",
          },
          "&:active": {
            outline: "none",
            boxShadow: "none",
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          "&:focus": {
            outline: "none",
            boxShadow: "none",
          },
          "&:focus-visible": {
            outline: "none",
            boxShadow: "none",
          },
          "&:active": {
            outline: "none",
            boxShadow: "none",
          },
        },
      },
    },
  },
});

export const CustomThemeProvider = ({ children }) => {
  const [CurrentTheme, setCurrentTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved : "dark";
  });

  function toggleTheme() {
    setCurrentTheme((prev) => (prev == "dark" ? "light" : "dark"));
  }
  useEffect(() => {
    localStorage.setItem("theme", CurrentTheme);
  }, [CurrentTheme]);
  return (
    <ThemeContext.Provider value={{ CurrentTheme, toggleTheme }}>
      <ThemeProvider theme={CurrentTheme == "dark" ? darkTheme : lightTheme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export function useTheme() {
  let theme = useContext(ThemeContext);
  if (theme) {
    return theme;
  } else {
    throw new Error("The theme is not availabel");
  }
  return theme;
}
