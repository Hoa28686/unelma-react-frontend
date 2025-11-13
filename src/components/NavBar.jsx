import React, { useState } from "react";
import {
  AppBar,
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
import { Link, useLocation } from "react-router";
import Logo from "./Logo.jsx";
import ThemeSwitch from "./ThemeSwitch";
import { useAuth } from "../context/AuthContext.jsx";

function NavBar() {
  const { user, logout } = useAuth();
  const mobileMenuWidth = 240;
  const location = useLocation();
  const navItems = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Products", path: "/products" },
    { label: "Blogs", path: "/blog" },
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
    <Box sx={{ textAlign: "center" }}>
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
              height: "4px",
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
          {user?.email ? (
            <Button
              onClick={logout}
              color="inherit"
              sx={{ textTransform: "none", fontSize: "1rem" }}
            >
              Logout
            </Button>
          ) : (
            <Button
              component={Link}
              to="/login"
              sx={{
                textTransform: "none",
                fontSize: "1rem",
                color: (theme) => theme.palette.text.primary,
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
          onClick={handleNavToggle}
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
              onClick={handleNavToggle}
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
                    height: "4px",
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
    <Box sx={{ display: "flex" }}>
      {/* App Bar */}
      <AppBar
        component="nav"
        position="static"
        elevation={0}
        sx={{
          backgroundColor: "transparent !important",
          boxShadow: "none",
          borderBottom: "none",
          backgroundImage: "none",
        }}
      >
        <Toolbar
          sx={{
            minHeight: { xs: "56px", sm: "64px" },
            padding: { xs: "0 0.5rem", sm: "0 1rem" },
            backgroundColor: "transparent",
          }}
        >
          {/* logo */}
          <Logo />
          {/* Desktop Nav Items */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: { md: "0.5rem", lg: "1rem" },
              alignItems: "center",
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
                  padding: "0.75rem 1rem",
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
                      height: "4px",
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
            sx={{ marginLeft: "auto", display: "flex", alignItems: "center" }}
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
                  height: "4px",
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
                onClick={() => setSearchActive(!searchActive)}
                disableRipple
              >
                <SearchOutlinedIcon />
                {/* search logic */}
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
                  height: "4px",
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
                sx={{
                  color: (theme) => theme.palette.text.primary,
                  "&:hover": {
                    color: (theme) => theme.palette.text.primary,
                    backgroundColor: "transparent",
                  },
                }}
                component={Link}
                to="/cart"
              >
                <ShoppingCartOutlinedIcon />
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
                  height: "4px",
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
              <IconButton
                sx={{
                  color: (theme) => theme.palette.text.primary,
                  "&:hover": {
                    color: (theme) => theme.palette.text.primary,
                    backgroundColor: "transparent",
                  },
                }}
                component={Link}
                to="/login"
              >
                <AccountCircleOutlinedIcon />
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
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { md: "block", lg: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: mobileMenuWidth,
              backgroundColor: (theme) => theme.palette.background.default,
              color: (theme) => theme.palette.text.primary,
            },
          }}
        >
          {mobileMenu}
        </Drawer>
      </Box>
    </Box>
  );
}

export default NavBar;
