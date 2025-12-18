import React, { useEffect } from "react";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import { Outlet } from "react-router";
import { Box } from "@mui/material";
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
        gridTemplateRows: { xs: "80px 1fr auto", sm: "88px 1fr auto" },
        minHeight: "100vh",
        background: (theme) =>
          theme.palette.mode === "dark"
            ? // Dark mode: Deep blue to purple gradient with vibrant accents
              "radial-gradient(ellipse 100% 60% at top left, rgba(59, 130, 246, 0.4) 0%, rgba(59, 130, 246, 0.2) 40%, transparent 70%), radial-gradient(ellipse 100% 60% at bottom right, rgba(147, 51, 234, 0.35) 0%, rgba(147, 51, 234, 0.15) 40%, transparent 70%), radial-gradient(ellipse 80% 50% at center, rgba(37, 99, 235, 0.3) 0%, rgba(37, 99, 235, 0.1) 50%, transparent 80%), linear-gradient(135deg, #0A0F1C 0%, #1a1f3a 20%, #0f1629 40%, #1e1b3a 60%, #1a1f3a 80%, #0A0F1C 100%)"
            : // Light mode: Soft blue to cyan gradient with warm accents
              "radial-gradient(ellipse 100% 60% at top left, rgba(59, 130, 246, 0.25) 0%, rgba(59, 130, 246, 0.12) 40%, transparent 70%), radial-gradient(ellipse 100% 60% at bottom right, rgba(34, 211, 238, 0.2) 0%, rgba(34, 211, 238, 0.1) 40%, transparent 70%), radial-gradient(ellipse 80% 50% at center, rgba(147, 197, 253, 0.2) 0%, rgba(147, 197, 253, 0.08) 50%, transparent 80%), linear-gradient(135deg, #E0F2FE 0%, #DBEAFE 20%, #E0F7FA 40%, #F0F9FF 60%, #DBEAFE 80%, #E0F2FE 100%)",
        backgroundAttachment: "fixed",
        backgroundSize: "100% 100%, 100% 100%, 100% 100%, 100% 100%",
        backgroundPosition: "top left, bottom right, center, center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <NavBar />
      <Box
        sx={{
          minHeight: "100vh",
          width: "100%",
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
