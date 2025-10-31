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
import { Link } from "react-router";
import Logo from "./Logo.jsx";
import ThemeSwitch from "./ThemeSwitch";

function NavBar() {
  const mobileMenuWidth = 240;
  const navItems = [
    { label: "Products", path: "/products" },
    { label: "Blog", path: "/blog" },
    { label: "About", path: "/about" },
    { label: "Contact us", path: "/contact" },
  ];
  const [mobile, setMobile] = useState(false);

  const handleNavToggle = () => setMobile((prev) => !prev);

  const mobileMenu = (
    <Box sx={{ textAlign: "center" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          my: 1,
        }}
      >
        <Button
          color="inherit"
          component={Link}
          to="/user"
          sx={{ textTransform: "none", fontSize: "1rem" }}
        >
          Login/Register
        </Button>
        <IconButton color="inherit" onClick={handleNavToggle}>
          <ClearOutlinedIcon />
        </IconButton>
      </Box>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              sx={{ textAlign: "center" }}
              component={Link}
              to={item.path}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      {/* App Bar */}
      <AppBar component="nav" position="fixed">
        <Toolbar>
          {/* logo */}
          <Logo />
          {/* Desktop Nav Items */}
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            {navItems.map((item) => (
              <Button
                key={item.label}
                sx={{
                  color: (theme) => theme.palette.text.primary,
                  textTransform: "none",
                }}
                component={Link}
                to={item.path}
              >
                {item.label}
              </Button>
            ))}
          </Box>
          {/* Buttons on the right side of the NavBar */}
          <Box component="div" sx={{ marginLeft: "auto", display: "flex" }}>
            {/* Search */}
            <IconButton color="inherit">
              <SearchOutlinedIcon />
              {/* search logic */}
            </IconButton>
            {/*Product cart button */}
            <IconButton color="inherit" component={Link} to="/cart">
              <ShoppingCartOutlinedIcon />
            </IconButton>
            {/* Login/Register button */}
            <IconButton color="inherit" component={Link} to="/user">
              <AccountCircleOutlinedIcon />
            </IconButton>
            <ThemeSwitch />

            {/* Mobile Menu Button */}
            <IconButton
              color="inherit"
              aria-label="open MobileMenu"
              edge="end"
              onClick={handleNavToggle}
              sx={{ display: { xs: "flex", md: "none" } }}
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
