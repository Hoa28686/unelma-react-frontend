import React from "react";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import { Outlet } from "react-router";
import { Box, CssBaseline } from "@mui/material";

function Layout() {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateRows: { xs: "56px 1fr auto", sm: "64px 1fr auto" },
        minHeight: "100vh",
        backgroundColor: (theme) => theme.palette.background.default,
      }}
    >
      <NavBar />
      <Box
        sx={{
          minHeight: "100vh",
          width: "100%",
          backgroundColor: (theme) => theme.palette.background.default,
        }}
      >
        <Outlet />
      </Box>
      <Footer />
      <BackToTop />
    </Box>
  );
}

export default Layout;
