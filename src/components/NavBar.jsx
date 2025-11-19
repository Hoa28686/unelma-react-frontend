import React, { useState } from "react";
import {
  AppBar,
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
import SearchBar from "./SearchBar";
import { useAuth } from "../context/AuthContext.jsx";
import { getUserFromSources, isUserAuthenticated as checkIsUserAuthenticated } from "../utils/authUtils";

function NavBar() {
  const { user: authContextUser, logout, token: authContextToken } = useAuth();
  const { user: reduxUser, isAuthenticated: reduxIsAuthenticated, token: reduxToken } = useSelector((state) => state.auth);
  
  // Get user from either system using utility
  const user = getUserFromSources(reduxUser, authContextUser);
  
  // Check authentication from both systems using utility
  const isAuthenticated = checkIsUserAuthenticated(reduxIsAuthenticated, reduxToken, authContextToken, user);
  
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
          {isAuthenticated ? (
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
          "&::before": {
            display: "none",
          },
        }}
      >
        <Toolbar
          sx={{
            minHeight: { xs: "56px", sm: "64px" },
            padding: { xs: "0 0.5rem", sm: "0 1rem" },
            backgroundColor: "transparent !important",
            "&::before": {
              display: "none",
            },
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
                  backgroundColor: isIconActive("/user") || isIconActive("/login")
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
                onClick={() => {
                  if (isAuthenticated) {
                    navigate("/user");
                  } else {
                    navigate("/login");
                  }
                }}
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

      {/* Search Bar Modal */}
      <SearchBar open={searchActive} onClose={() => setSearchActive(false)} />
    </Box>
  );
}

export default NavBar;
