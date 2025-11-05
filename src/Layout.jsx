import React from "react";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { Outlet } from "react-router";
import { Box, CssBaseline } from "@mui/material";

function Layout() {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateRows: "5rem 1fr auto",
        minHeight: "100vh",
      }}
    >
      <NavBar />
      <Box
        sx={{
          minHeight: "100vh",
          width: "100vw",
        }}
      >
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}

export default Layout;
