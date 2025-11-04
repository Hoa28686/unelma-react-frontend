import React from "react";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { Outlet } from "react-router";
import { Box, CssBaseline } from "@mui/material";

function Layout() {
  const MAX_CONTENT_WIDTH = '1280px'; 

  return (
    <Box
      sx={{
        margin: 0, 
        padding: 0,
        boxSizing: 'border-box', 
        width: '100vw',
        minHeight: "100vh",
        display: "flex", 
        flexDirection: "column",
      }}
    >
      <CssBaseline />
      
      {/* 1. Full-Width Navigation (NavBar background spans 100vw) */}
      <NavBar /> 
      
      {/* 2. Main Content Area (Outlet) - Content is centered */}
      <Box 
        component="main" 
        sx={{
          flexGrow: 1, 
          width: '100%',
          maxWidth: MAX_CONTENT_WIDTH, 
          margin: '0 auto', 
          padding: '24px 16px', 
        }}
      >
        <Outlet />
      </Box>
      
      <Footer />
    </Box>
  );
}

export default Layout;