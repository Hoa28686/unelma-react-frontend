import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  Tabs,
  Tab,
  CircularProgress,
  InputAdornment,
  IconButton,
  Drawer,
  useTheme,
  useMediaQuery,
  Divider,
} from "@mui/material";
import { Visibility, VisibilityOff, Menu as MenuIcon } from "@mui/icons-material";
import { login, register, clearError } from "../lib/features/auth/authSlice";
import { useContactForm } from "../hooks/useContactForm";

function User() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const [activeTab, setActiveTab] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [errors, setErrors] = useState({});

  // Query form hook
  const {
    formData: queryFormData,
    loading: queryLoading,
    submitStatus: querySubmitStatus,
    fieldErrors: queryFieldErrors,
    handleChange: handleQueryChange,
    handleSubmit: handleQuerySubmit,
  } = useContactForm({ name: "", email: "", message: "" });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  // Clear errors when switching tabs
  useEffect(() => {
    dispatch(clearError());
    setErrors({});
    setFormData({
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    });
  }, [activeTab, dispatch]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear field error when user types
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: null,
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (activeTab === 1) {
      // Registration validation
      if (!formData.name.trim()) {
        newErrors.name = "Name is required";
      }
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Email is invalid";
      }
      if (!formData.password) {
        newErrors.password = "Password is required";
      } else if (formData.password.length < 8) {
        newErrors.password = "Password must be at least 8 characters";
      }
      if (formData.password !== formData.password_confirmation) {
        newErrors.password_confirmation = "Passwords do not match";
      }
    } else {
      // Login validation
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Email is invalid";
      }
      if (!formData.password) {
        newErrors.password = "Password is required";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (activeTab === 0) {
      // Login
      dispatch(login({ email: formData.email, password: formData.password }));
    } else {
      // Register
      dispatch(
        register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          password_confirmation: formData.password_confirmation,
        })
      );
    }
  };

  // Sidebar content with query form
  const sidebarContent = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "transparent",
        backgroundImage: "none",
      }}
    >
      <Box
        sx={{
          p: 3,
        }}
      >
        <Typography
          variant="h5"
          component="h2"
          sx={{
            fontWeight: 600,
            color: (theme) => theme.palette.text.primary,
            textAlign: "center",
          }}
        >
          Send a Query
        </Typography>
      </Box>

      <Box
        component="form"
        onSubmit={handleQuerySubmit}
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          p: 3,
          gap: 2,
          overflowY: "auto",
        }}
      >
        <TextField
          name="name"
          label="Name"
          variant="outlined"
          fullWidth
          required
          value={queryFormData.name}
          onChange={handleQueryChange}
          error={!!queryFieldErrors.name}
          helperText={queryFieldErrors.name}
        />

        <TextField
          name="email"
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          required
          value={queryFormData.email}
          onChange={handleQueryChange}
          error={!!queryFieldErrors.email}
          helperText={queryFieldErrors.email}
        />

        <TextField
          name="message"
          label="Message"
          variant="outlined"
          fullWidth
          required
          multiline
          rows={6}
          value={queryFormData.message}
          onChange={handleQueryChange}
          error={!!queryFieldErrors.message}
          helperText={queryFieldErrors.message}
        />

        {querySubmitStatus.success !== null && (
          <Alert
            severity={querySubmitStatus.success ? "success" : "error"}
            sx={{ mt: 1 }}
          >
            {querySubmitStatus.message}
          </Alert>
        )}

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={queryLoading}
          sx={{
            backgroundColor: (theme) => theme.palette.primary.main,
            color: "#FFFFFF",
            fontWeight: 100,
            borderRadius: 2,
            py: 1.5,
            textTransform: "none",
            border: "1px solid transparent",
            transition: "all 0.3s ease",
            mt: 2,
            "&:hover": {
              borderColor: "#E57A44",
              transform: "translateY(-4px)",
            },
          }}
        >
          {queryLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Send Query"
          )}
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "calc(100vh - 64px)" }}>
      {/* Sidebar */}
      {isMobile ? (
        <Drawer
          anchor="left"
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: { xs: 320, sm: 380 },
              backgroundColor: "transparent",
              backgroundImage: "none",
            },
          }}
        >
          {sidebarContent}
        </Drawer>
      ) : (
        <Box
          sx={{
            width: { md: 380, lg: 420 },
            flexShrink: 0,
            borderRight: 1,
            borderColor: "divider",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "transparent",
            backgroundImage: "none",
            position: "relative",
            "&::after": {
              content: '""',
              position: "absolute",
              right: 0,
              top: 0,
              bottom: 0,
              width: "1px",
              boxShadow: (theme) =>
                theme.palette.mode === "light"
                  ? "2px 0 8px rgba(0, 0, 0, 0.15)"
                  : "2px 0 8px rgba(0, 0, 0, 0.4)",
              pointerEvents: "none",
            },
          }}
        >
          {sidebarContent}
        </Box>
      )}

      {/* Main content */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: { xs: 2, sm: 4 },
        }}
      >
        {/* Mobile menu button */}
        {isMobile && (
          <IconButton
            onClick={() => setSidebarOpen(true)}
            sx={{
              position: "absolute",
              top: 16,
              left: 16,
              zIndex: 1,
            }}
          >
            <MenuIcon />
          </IconButton>
        )}

        <Container maxWidth="sm" sx={{ width: "100%" }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 2,
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? "#B0D0B5"
              : theme.palette.background.paper,
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 600,
            textAlign: "center",
            color: (theme) => theme.palette.text.primary,
            mb: 3,
          }}
        >
          {activeTab === 0 ? "Login" : "Register"}
        </Typography>

        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
          centered
          sx={{
            mb: 3,
            "& .MuiTab-root": {
              color: (theme) => theme.palette.text.secondary,
              "&.Mui-selected": {
                color: (theme) => theme.palette.primary.main,
              },
            },
            "& .MuiTabs-indicator": {
              backgroundColor: (theme) => theme.palette.primary.main,
            },
          }}
        >
          <Tab label="Login" />
          <Tab label="Register" />
        </Tabs>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => dispatch(clearError())}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          {activeTab === 1 && (
            <TextField
              name="name"
              label="Name"
              variant="outlined"
              fullWidth
              required
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
              sx={{ mb: 2 }}
            />
          )}

          <TextField
            name="email"
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            required
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            sx={{ mb: 2 }}
          />

          <TextField
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            fullWidth
            required
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
            sx={{ mb: activeTab === 1 ? 2 : 3 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {activeTab === 1 && (
            <TextField
              name="password_confirmation"
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              variant="outlined"
              fullWidth
              required
              value={formData.password_confirmation}
              onChange={handleChange}
              error={!!errors.password_confirmation}
              helperText={errors.password_confirmation}
              sx={{ mb: 3 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{
              backgroundColor: (theme) => theme.palette.primary.main,
              color: "#FFFFFF",
              fontWeight: 100,
              borderRadius: 2,
              py: 1.5,
              textTransform: "none",
              border: "1px solid transparent",
              transition: "all 0.3s ease",
              "&:hover": {
                borderColor: "#E57A44",
                transform: "translateY(-4px)",
              },
            }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : activeTab === 0 ? (
              "Login"
            ) : (
              "Register"
            )}
          </Button>
        </Box>
      </Paper>
        </Container>
      </Box>
    </Box>
  );
}

export default User;
