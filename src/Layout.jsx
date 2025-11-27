import React, { useEffect } from "react";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import { Outlet } from "react-router";
import { Box, CssBaseline } from "@mui/material";
import { useAuth } from "./context/AuthContext";
import { useDispatch } from "react-redux";
import { fetchFavorites } from "./store/slices/favorites/favoritesSlice";

function Layout() {
  const { token } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) dispatch(fetchFavorites({ token }));
  }, [token, dispatch]);

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
