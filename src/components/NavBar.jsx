import React, { useState } from "react";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link, useLocation, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import Logo from "./Logo.jsx";
import ThemeSwitch from "./ThemeSwitch";
import { lazy, Suspense } from "react";
import { useAuth } from "../context/AuthContext.jsx";

// Lazy load SearchBar to reduce initial bundle size
const SearchBar = lazy(() => import("./SearchBar"));
import FavoriteIcon from "@mui/icons-material/Favorite";
import { getImageUrl, placeholderLogo } from "../helpers/helpers";

function NavBar() {
  const { user, logout } = useAuth();

  const mobileMenuWidth = 240;
  const location = useLocation();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const navItems = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Products", path: "/products" },
    { label: "Services", path: "/services" },
    { label: "Blogs", path: "/blogs" },
    { label: "Contact us", path: "/contact" },
  ];
  const [mobile, setMobile] = useState(false);
  const [searchActive, setSearchActive] = useState(false);

  const handleNavToggle = () => setMobile((prev) => !prev);

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  const isIconActive = (path) => {
    if (path) {
      return location.pathname === path;
    }
    return false;
  };

  const mobileMenu = (
    <Box sx={{ textAlign: "center" }} onClick={handleNavToggle}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          my: 1,
        }}
      >
        <Box
          sx={{
            position: "relative",
            display: "inline-flex",
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: "-4px",
              left: 0,
              right: 0,
              height: "2px",
              backgroundColor: isIconActive("/user")
                ? (theme) => theme.palette.primary.main
                : "transparent",
              transition: "background-color 0.3s ease",
            },
            "&:hover::after": {
              backgroundColor: (theme) => theme.palette.primary.main,
            },
          }}
        >
          {user ? (
            <Button
              onClick={logout}
              color="inherit"
              sx={{
                textTransform: "none",
                fontSize: "1rem",
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
              }}
            >
              Logout
            </Button>
          ) : (
            <Button
              aria-label="Login/register"
              component={Link}
              to="/login"
              sx={{
                textTransform: "none",
                fontSize: "1rem",
                color: (theme) => theme.palette.text.primary,
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
                "&:hover": {
                  color: (theme) => theme.palette.text.primary,
                  backgroundColor: "transparent",
                },
              }}
            >
              Login/Register
            </Button>
          )}
        </Box>
        <IconButton
          aria-label="Close"
          sx={{
            color: (theme) => theme.palette.text.primary,
            "&:hover": {
              color: (theme) => theme.palette.text.primary,
              backgroundColor: "transparent",
            },
            "&:focus": {
              outline: "none",
            },
            "&:focus-visible": {
              outline: "none",
            },
          }}
          disableRipple
        >
          <ClearOutlinedIcon />
        </IconButton>
      </Box>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              sx={{
                textAlign: "center",
                position: "relative",
                color: (theme) => theme.palette.text.primary,
                "&:hover": {
                  backgroundColor: "transparent",
                  color: (theme) => theme.palette.text.primary,
                  "& span::after": {
                    backgroundColor: (theme) => theme.palette.primary.main,
                  },
                },
              }}
              component={Link}
              to={item.path}
            >
              <Box
                component="span"
                sx={(theme) => ({
                  position: "relative",
                  display: "inline-block",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: "-0.5rem",
                    left: 0,
                    right: 0,
                    height: "2px",
                    backgroundColor: isActive(item.path)
                      ? theme.palette.primary.main
                      : "transparent",
                    transition: "background-color 0.3s ease",
                  },
                })}
              >
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    color: "inherit",
                    component: "span",
                    sx: { display: "block" },
                  }}
                />
              </Box>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      {/* App Bar */}
      <AppBar
        component="nav"
        position="static"
        elevation={0}
        sx={{
          backgroundColor: "transparent",
          boxShadow: "none",
          borderBottom: "none",
          backgroundImage: "none",
          zIndex: 1300, // High z-index to ensure navbar is on top
          position: "relative",
          "&::before": {
            display: "none",
          },
        }}
      >
        <Toolbar
          sx={{
            minHeight: { xs: "80px", sm: "88px" },
            height: { xs: "80px", sm: "88px" },
            px: { xs: 1, sm: 2, md: 3, lg: 6 },
            backgroundColor: "transparent",
            display: "flex",
            justifyContent: "space-between",
            zIndex: 1301, // Even higher z-index for toolbar contents
          }}
        >
          {/* logo */}
          <Logo />
          {/* Desktop Nav Items - Centered */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 1,
              alignItems: "center",
              flexShrink: 0,
              margin: "auto",
            }}
          >
            {navItems.map((item) => (
              <Button
                key={item.label}
                sx={{
                  color: (theme) => theme.palette.text.primary,
                  textTransform: "none",
                  fontSize: "1rem",
                  fontWeight: 400,
                  position: "relative",
                  borderRadius: 0,
                  "&:hover": {
                    backgroundColor: "transparent",
                    color: (theme) => theme.palette.text.primary,
                    "& span::after": {
                      backgroundColor: (theme) => theme.palette.primary.main,
                    },
                  },
                }}
                component={Link}
                to={item.path}
              >
                <Box
                  component="span"
                  sx={(theme) => ({
                    position: "relative",
                    display: "inline-block",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: "-0.5rem",
                      left: 0,
                      right: 0,
                      height: "2px",
                      backgroundColor: isActive(item.path)
                        ? theme.palette.primary.main
                        : "transparent",
                      transition: "background-color 0.3s ease",
                    },
                  })}
                >
                  {item.label}
                </Box>
              </Button>
            ))}
          </Box>
          {/* Buttons on the right side of the NavBar */}
          <Box
            component="div"
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            {/* Search */}
            <Box
              sx={{
                position: "relative",
                display: "inline-flex",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: "-4px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "60%",
                  height: "2px",
                  backgroundColor: searchActive
                    ? (theme) => theme.palette.primary.main
                    : "transparent",
                  transition: "background-color 0.3s ease",
                },
                "&:hover::after": {
                  backgroundColor: (theme) => theme.palette.primary.main,
                },
              }}
            >
              <IconButton
                aria-label="Search"
                sx={{
                  color: (theme) => theme.palette.text.primary,
                  "&:hover": {
                    color: (theme) => theme.palette.text.primary,
                    backgroundColor: "transparent",
                  },
                  "&:focus": {
                    outline: "none",
                  },
                  "&:focus-visible": {
                    outline: "none",
                  },
                }}
                onClick={() => setSearchActive(true)}
                disableRipple
              >
                <SearchOutlinedIcon />
              </IconButton>
            </Box>

            {/*Favorite list button */}
            <Box
              sx={{
                position: "relative",
                display: "inline-flex",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: "-4px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "60%",
                  height: "2px",
                  backgroundColor: isIconActive("/favorites")
                    ? (theme) => theme.palette.primary.main
                    : "transparent",
                  transition: "background-color 0.3s ease",
                },
                "&:hover::after": {
                  backgroundColor: (theme) => theme.palette.primary.main,
                },
              }}
            >
              <IconButton
                aria-label="Favorite"
                sx={{
                  color: (theme) => theme.palette.text.primary,
                  position: "relative",
                  "&:hover": {
                    color: (theme) => theme.palette.text.primary,
                    backgroundColor: "transparent",
                  },
                }}
                component={Link}
                to="/favorites"
              >
                <FavoriteIcon />
              </IconButton>
            </Box>

            {/*Product cart button */}
            <Box
              sx={{
                position: "relative",
                display: "inline-flex",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: "-4px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "60%",
                  height: "2px",
                  backgroundColor: isIconActive("/cart")
                    ? (theme) => theme.palette.primary.main
                    : "transparent",
                  transition: "background-color 0.3s ease",
                },
                "&:hover::after": {
                  backgroundColor: (theme) => theme.palette.primary.main,
                },
              }}
            >
              <IconButton
                aria-label="Cart"
                sx={{
                  color: (theme) => theme.palette.text.primary,
                  position: "relative",
                  "&:hover": {
                    color: (theme) => theme.palette.text.primary,
                    backgroundColor: "transparent",
                  },
                }}
                component={Link}
                to="/cart"
              >
                <Badge
                  badgeContent={cartItemCount}
                  color="primary"
                  sx={{
                    "& .MuiBadge-badge": {
                      backgroundColor: (theme) => theme.palette.primary.main,
                      color: "#FFFFFF",
                      fontWeight: 600,
                    },
                  }}
                >
                  <ShoppingCartOutlinedIcon />
                </Badge>
              </IconButton>
            </Box>
            {/* Login/Register button */}
            <Box
              sx={{
                position: "relative",
                display: "inline-flex",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: "-4px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "60%",
                  height: "2px",
                  backgroundColor:
                    isIconActive("/user") || isIconActive("/login")
                      ? (theme) => theme.palette.primary.main
                      : "transparent",
                  transition: "background-color 0.3s ease",
                },
                "&:hover::after": {
                  backgroundColor: (theme) => theme.palette.primary.main,
                },
              }}
            >
              <IconButton
                aria-label="Auth"
                sx={{
                  color: (theme) => theme.palette.text.primary,
                  "&:hover": {
                    color: (theme) => theme.palette.text.primary,
                    backgroundColor: "transparent",
                  },
                }}
                onClick={() => {
                  if (user) {
                    navigate("/user");
                  } else {
                    navigate("/login");
                  }
                }}
              >
                {user ? (
                  user?.profile_picture ? (
                    <Avatar
                      src={getImageUrl(user.profile_picture)}
                      alt="User avatar"
                      onError={(e) => {
                        e.target.src = placeholderLogo;
                      }}
                      sx={{
                        width: 32,
                        height: 32,
                        border: (theme) => `1px solid ${theme.palette.divider}`,
                      }}
                    >
                      {/* Fallback icon if image fails to load */}
                      <AccountCircleOutlinedIcon sx={{ fontSize: 20 }} />
                    </Avatar>
                  ) : (
                    <AccountCircleOutlinedIcon />
                  )
                ) : (
                  <AccountCircleOutlinedIcon />
                )}
              </IconButton>
            </Box>
            <ThemeSwitch />

            {/* Mobile Menu Button */}
            <IconButton
              sx={{
                color: (theme) => theme.palette.text.primary,
                display: { xs: "flex", md: "none" },
                "&:hover": {
                  color: (theme) => theme.palette.text.primary,
                  backgroundColor: "transparent",
                },
                "&:focus": {
                  outline: "none",
                },
                "&:focus-visible": {
                  outline: "none",
                },
              }}
              aria-label="open MobileMenu"
              edge="end"
              onClick={handleNavToggle}
              disableRipple
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* MobileMenu */}
      <Box component="nav">
        <Drawer
          anchor="right"
          variant="temporary"
          open={mobile}
          onClose={handleNavToggle}
          ModalProps={{
            keepMounted: true,

            //important: don't put zIndex here
          }}
          sx={{
            zIndex: 1400,
            display: { md: "block", lg: "none" },
            "& .MuiBackdrop-root": {
              backgroundColor: (theme) =>
                theme.palette.mode === "dark"
                  ? "rgba(0, 0, 0, 0.75)"
                  : "rgba(0, 0, 0, 0.5)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              willChange: "backdrop-filter",
              transition: "backdrop-filter 0.3s ease",
            },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: mobileMenuWidth,
              backgroundColor: (theme) =>
                theme.palette.mode === "dark"
                  ? "rgba(21, 27, 46, 0.7)"
                  : "rgba(255, 255, 255, 0.85)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(8px)",
              border: (theme) =>
                theme.palette.mode === "dark"
                  ? "1px solid rgba(255, 255, 255, 0.1)"
                  : "1px solid rgba(255, 255, 255, 0.8)",
              boxShadow: (theme) =>
                theme.palette.mode === "dark"
                  ? "0 20px 60px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05)"
                  : "0 20px 60px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.05)",
              color: (theme) => theme.palette.text.primary,
              willChange: "transform, opacity",
              transform: "translateZ(0)",
            },
          }}
        >
          {mobileMenu}
        </Drawer>
      </Box>

      {/* Search Bar Modal */}
      <Suspense fallback={null}>
        <SearchBar open={searchActive} onClose={() => setSearchActive(false)} />
      </Suspense>
    </Box>
  );
}

export default NavBar;
