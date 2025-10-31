"use client";
import { createTheme, CssBaseline } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { ThemeProvider } from "@mui/material/styles";

export const ThemeContext = createContext(null);
//Light theme gonna be here
const lightTheme = createTheme({
  palette: {
    primary: {
      main: "#6366F1", // Soft Indigo / Violet (modern & vibrant)
    },
    secondary: {
      main: "#EC4899", // Pink accent — adds warmth and contrast
    },
    error: {
      main: "#EF4444", // Modern red (not too harsh)
    },
    warning: {
      main: "#F59E0B", // Smooth amber tone
    },
    success: {
      main: "#10B981", // Fresh emerald green
    },
    info: {
      main: "#3B82F6", // Clean, crisp blue
    },
    background: {
      default: "#ffffff",
      paper: "#f5f5f5",
    },
    text: {
      primary: "#110f0fff",
      secondary: "#6B7280",
    },
  },
  typography: {
    fontFamily: [
      "Roboto",
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
});

// Dark Theme here
const darkTheme = createTheme({
  palette: {
    mode: "dark",

    primary: {
      main: "#818CF8", // Softer indigo (more visible on dark bg)
    },
    secondary: {
      main: "#F472B6", // Brightened pink for contrast
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
      main: "#60A5FA", // Lively sky blue
    },

    background: {
      default: "#0F172A", // Deep slate navy (modern dark bg)
      paper: "#1E293B", // Slightly lighter card surface
    },

    text: {
      primary: "#F3F4F6", // Light grayish white
      secondary: "#9CA3AF", // Muted gray for secondary text
    },
  },
  typography: {
    fontFamily: [
      "Roboto",
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
});

export const CustomThemeProvider = ({ children }) => {
  const [CurrentTheme, setCurrentTheme] = useState("dark");
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) setCurrentTheme(saved);
  }, []);

  function toogleTheme() {
    setCurrentTheme((prev) => (prev == "dark" ? "light" : "dark"));
  }
  useEffect(() => {
    const saved = localStorage.setItem("theme", CurrentTheme);
  }, [CurrentTheme]);
  return (
    <ThemeContext.Provider value={{ CurrentTheme, toogleTheme }}>
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
