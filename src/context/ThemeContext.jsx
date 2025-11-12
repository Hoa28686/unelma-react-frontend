"use client";
import { createTheme, CssBaseline } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { ThemeProvider } from "@mui/material/styles";

export const ThemeContext = createContext(null);
//Light theme gonna be here
const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#E57A44", // Orange/coral accent color
    },
    secondary: {
      main: "#422040", // Dark purple for secondary elements
    },
    error: {
      main: "#E57A44", // Orange/coral for errors
    },
    warning: {
      main: "#E3D985", // Light yellow/green for warnings
    },
    success: {
      main: "#BCD8C1", // Mint green for success
    },
    info: {
      main: "#D6DBB2", // Light green for info
    },
    background: {
      default: "#BCD8C1", // Mint green background (lightest)
      paper: "#BCD8C1", // Mint green for cards/surfaces (lightest)
    },
    text: {
      primary: "#422040", // Dark purple text
      secondary: "#422040", // Dark purple for secondary text (with opacity)
    },
    divider: "#D6DBB2",
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
});

// Dark Theme here
const darkTheme = createTheme({
  palette: {
    mode: "dark",

    primary: {
      main: "#E57A44", // Orange/coral accent color
    },
    secondary: {
      main: "#E3D985", // Light yellow/green for secondary elements
    },
    error: {
      main: "#E57A44", // Orange/coral for errors
    },
    warning: {
      main: "#E3D985", // Light yellow/green for warnings
    },
    success: {
      main: "#BCD8C1", // Mint green for success
    },
    info: {
      main: "#D6DBB2", // Light green for info
    },

    background: {
      default: "#422040", // Dark purple background
      paper: "#2A1630", // Darker purple for cards/surfaces
    },

    text: {
      primary: "#E3D985", // Light yellow/green text
      secondary: "#D6DBB2", // Light green for secondary text
    },
    divider: "#D6DBB2",
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
