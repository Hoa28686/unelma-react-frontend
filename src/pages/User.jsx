import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
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
  useTheme,
  useMediaQuery,
  Divider,
  Avatar,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  AccountCircle,
  Edit,
  Cancel,
  ShoppingBag,
  CardMembership,
  Settings,
  Delete,
} from "@mui/icons-material";
import { useContactForm } from "../hooks/useContactForm";
import { useAuth } from "../context/AuthContext";
import { getImageUrl, placeholderLogo } from "../helpers/helpers";
import { API } from "../api";
import { fetchProducts } from "../store/slices/products/productsSlice";

function User() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const products = useSelector((state) => state.products.products);
  const [activeTab, setActiveTab] = useState(0);
  const [userProfileTab, setUserProfileTab] = useState(0); // Tab for authenticated user (Profile, Purchases, Subscriptions, Settings)
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [profileErrors, setProfileErrors] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [itemToCancel, setItemToCancel] = useState(null);
  const [cancelType, setCancelType] = useState(null); // 'order' or 'subscription'

  // Purchases (one-time payments) and subscriptions state
  const [purchases, setPurchases] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [purchasesLoading, setPurchasesLoading] = useState(false);
  const [subscriptionsLoading, setSubscriptionsLoading] = useState(false);
  const [purchasesError, setPurchasesError] = useState(null);
  const [subscriptionsError, setSubscriptionsError] = useState(null);

  // Query form hook
  const {
    formData: queryFormData,
    loading: queryLoading,
    submitStatus: querySubmitStatus,
    fieldErrors: queryFieldErrors,
    handleChange: handleQueryChange,
    handleSubmit: handleQuerySubmit,
  } = useContactForm({ name: "", email: "", message: "" });

  const { loading, error, login, logout, clearError } = useAuth();

  const [registerLoading, setRegisterLoading] = useState(false);
  const [registerError, setRegisterError] = useState(null);

  // Clear errors when switching tabs
  useEffect(() => {
    clearError();
    setRegisterError(null);
    setErrors({});
    setFormData({
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    });
  }, [activeTab, clearError]);

  // Initialize profile data when user loads
  useEffect(() => {
    if (user) {
      const userName = user?.name || user?.user?.name || "";
      const userEmail = user?.email || user?.user?.email || "";
      setProfileData({
        name: userName,
        email: userEmail,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  }, [user]);

  // Fetch products to get product names for purchases (fallback if item_name is not available)
  useEffect(() => {
    if (!products || products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [products, dispatch]);

  // Helper function to get product name by product_id (fallback if item_name is not available)
  const getProductName = (productId) => {
    if (!productId || !products || products.length === 0) return null;
    const product = products.find((p) => {
      return (
        p.id === Number(productId) ||
        p.id === productId ||
        String(p.id) === String(productId)
      );
    });
    return product?.name || product?.title || null;
  };

  // Fetch purchases (one-time payments) when user is logged in
  useEffect(() => {
    const fetchPurchases = async () => {
      if (user && token) {
        setPurchasesLoading(true);
        setPurchasesError(null);
        try {
          const baseUrl =
            import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";
          const res = await axios.get(`${baseUrl}/profile/purchases`, {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          });
          // Handle different possible response structures
          const purchasesData =
            res.data?.data || res.data?.purchases || res.data || [];
          setPurchases(Array.isArray(purchasesData) ? purchasesData : []);
        } catch (error) {
          // If 404, endpoint doesn't exist yet - use empty array
          if (error.response?.status === 404) {
            setPurchases([]);
          } else {
            setPurchasesError(
              error.response?.data?.message || "Failed to load purchases"
            );
            setPurchases([]);
          }
        } finally {
          setPurchasesLoading(false);
        }
      } else {
        setPurchases([]);
      }
    };

    fetchPurchases();
  }, [user, token]);

  // Fetch subscriptions when user is logged in
  useEffect(() => {
    const fetchSubscriptions = async () => {
      if (user && token) {
        setSubscriptionsLoading(true);
        setSubscriptionsError(null);
        try {
          const baseUrl =
            import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";
          // Try profile/subscriptions first, fallback to subscriptions
          let res;
          try {
            res = await axios.get(`${baseUrl}/profile/subscriptions`, {
              headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
              },
            });
          } catch (profileError) {
            // Fallback to /subscriptions if profile/subscriptions doesn't exist
            if (profileError.response?.status === 404) {
              res = await axios.get(`${baseUrl}/subscriptions`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                  Accept: "application/json",
                },
              });
            } else {
              throw profileError;
            }
          }
          // Handle different possible response structures
          const subscriptionsData =
            res.data?.data || res.data?.subscriptions || res.data || [];
          setSubscriptions(
            Array.isArray(subscriptionsData) ? subscriptionsData : []
          );
        } catch (error) {
          // If 404, endpoint doesn't exist yet - use empty array
          if (error.response?.status === 404) {
            setSubscriptions([]);
          } else {
            setSubscriptionsError(
              error.response?.data?.message || "Failed to load subscriptions"
            );
            setSubscriptions([]);
          }
        } finally {
          setSubscriptionsLoading(false);
        }
      } else {
        setSubscriptions([]);
      }
    };

    fetchSubscriptions();
  }, [user, token]);

  // Redirect to login if not authenticated
  useEffect(() => {
    // Check if user is actually valid (has email or name, not just an empty object)
    const userEmail = user?.email || user?.user?.email;
    const userName = user?.name || user?.user?.name;
    const hasValidUser = user && (userEmail || userName);
    const hasValidAuth = hasValidUser;

    // If not loading and no valid authentication, redirect to login
    if (!loading && !hasValidAuth) {
      navigate("/login", { replace: true });
    }
  }, [user, loading, navigate]);

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
      await login({ email: formData.email, password: formData.password });
    } else {
      // Register
      setRegisterLoading(true);
      setRegisterError(null);
      try {
        await axios.post(API.register, {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          password_confirmation: formData.password_confirmation,
        });
        // Registration successful - show message and redirect to login
        setRegisterError(null);
        setFormData({
          name: "",
          email: "",
          password: "",
          password_confirmation: "",
        });
        // Switch to login tab after successful registration
        setTimeout(() => {
          setActiveTab(0);
          setRegisterLoading(false);
        }, 1000);
      } catch (e) {
        setRegisterError(e.response?.data?.message || "Registration failed");
        setRegisterLoading(false);
      }
    }
  };

  // Sidebar styling (desktop only)
  const sidebarSx = {
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
            fontWeight: 400,
            borderRadius: 2,
            py: 1.5,
            textTransform: "none",
            border: "1px solid transparent",
            transition: "all 0.3s ease",
            mt: 2,
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
              borderColor: (theme) => theme.palette.primary.main,
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

  // Show loading state while checking authentication to prevent flash
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "calc(100vh - 64px)",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  const handleProfileChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
    if (profileErrors[e.target.name]) {
      setProfileErrors({
        ...profileErrors,
        [e.target.name]: null,
      });
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!profileData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!profileData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(profileData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (profileData.newPassword) {
      if (!profileData.currentPassword) {
        newErrors.currentPassword =
          "Current password is required to change password";
      }
      if (profileData.newPassword.length < 8) {
        newErrors.newPassword = "Password must be at least 8 characters";
      }
      if (profileData.newPassword !== profileData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setProfileErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      // TODO: Make API call to update profile
      setEditMode(false);
      // Show success message
    }
  };

  const handleCancelPurchase = (purchaseId) => {
    setItemToCancel(purchaseId);
    setCancelType("purchase");
    setCancelDialogOpen(true);
  };

  const handleCancelSubscription = (subscriptionId) => {
    setItemToCancel(subscriptionId);
    setCancelType("subscription");
    setCancelDialogOpen(true);
  };

  const confirmCancel = async () => {
    if (!token) return;

    try {
      const baseUrl =
        import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

      if (cancelType === "purchase") {
        // Cancel purchase via API (if cancellable)
        try {
          await axios.delete(`${baseUrl}/profile/purchases/${itemToCancel}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          });
          // Remove from local state
          setPurchases(
            purchases.filter((purchase) => purchase.id !== itemToCancel)
          );
        } catch (error) {
          // If endpoint doesn't exist, still remove from UI
          if (error.response?.status === 404) {
            setPurchases(
              purchases.filter((purchase) => purchase.id !== itemToCancel)
            );
          } else {
            alert(error.response?.data?.message || "Failed to cancel purchase");
          }
        }
      } else if (cancelType === "subscription") {
        // Cancel subscription via API
        try {
          // Try profile/subscriptions first, fallback to subscriptions
          try {
            await axios.delete(
              `${baseUrl}/profile/subscriptions/${itemToCancel}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  Accept: "application/json",
                },
              }
            );
          } catch (profileError) {
            if (profileError.response?.status === 404) {
              await axios.delete(`${baseUrl}/subscriptions/${itemToCancel}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                  Accept: "application/json",
                },
              });
            } else {
              throw profileError;
            }
          }
          // Update local state
          setSubscriptions(
            subscriptions.map((sub) =>
              sub.id === itemToCancel ? { ...sub, status: "cancelled" } : sub
            )
          );
        } catch (error) {
          // If endpoint doesn't exist, still update UI
          if (error.response?.status === 404) {
            setSubscriptions(
              subscriptions.map((sub) =>
                sub.id === itemToCancel ? { ...sub, status: "cancelled" } : sub
              )
            );
          } else {
            alert(
              error.response?.data?.message || "Failed to cancel subscription"
            );
          }
        }
      }
    } catch (error) {
      // Error handled silently
    } finally {
      setCancelDialogOpen(false);
      setItemToCancel(null);
      setCancelType(null);
    }
  };

  // Check if user is actually valid (has email or name, not just an empty object)
  const userEmailCheck = user?.email || user?.user?.email;
  const userNameCheck = user?.name || user?.user?.name;
  const hasValidUser = user && (userEmailCheck || userNameCheck);
  const hasValidAuth = hasValidUser;

  // Show user profile if authenticated
  if (hasValidAuth) {
    const userName = user?.name || user?.user?.name || "User";
    const userEmail = user?.email || user?.user?.email || "N/A";

    return (
      <Box
        sx={{
          display: "flex",
          minHeight: "calc(100vh - 64px)",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        {/* Sidebar - Desktop only */}
        {!isMobile && <Box sx={sidebarSx}>{sidebarContent}</Box>}

        {/* Main content - User Dashboard */}
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            p: { xs: 2, sm: 4 },
            overflow: "auto",
          }}
        >
          <Container maxWidth="lg" sx={{ width: "100%" }}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: 2,
                backgroundColor: (theme) =>
                  theme.palette.mode === "light"
                    ? "rgba(0, 0, 0, 0.03)"
                    : "transparent",
                border: (theme) =>
                  theme.palette.mode === "dark"
                    ? "1px solid rgba(255, 255, 255, 0.1)"
                    : "1px solid rgba(0, 0, 0, 0.1)",
                boxShadow: (theme) =>
                  theme.palette.mode === "light"
                    ? "0 2px 8px rgba(0, 0, 0, 0.05)"
                    : "none",
              }}
            >
              {/* User Header */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  alignItems: { xs: "center", sm: "flex-start" },
                  mb: 3,
                  gap: 2,
                }}
              >
                <Avatar
                  src={
                    user?.profile_picture
                      ? getImageUrl(user.profile_picture)
                      : placeholderLogo
                  }
                  alt="User avatar"
                  onError={(e) => {
                    e.target.src = placeholderLogo;
                  }}
                  sx={{
                    width: 80,
                    height: 80,
                    backgroundColor: (theme) => theme.palette.primary.main,
                    border: (theme) =>
                      `0.5px solid ${theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.12)" : "rgba(255, 255, 255, 0.12)"}`,
                  }}
                >
                  {!user?.profile_picture && (
                    <AccountCircle sx={{ fontSize: 60 }} />
                  )}
                </Avatar>
                <Box sx={{ flex: 1, textAlign: { xs: "center", sm: "left" } }}>
                  <Typography
                    variant="h4"
                    component="h1"
                    sx={{
                      fontWeight: 600,
                      color: (theme) => theme.palette.text.primary,
                      mb: 1,
                    }}
                  >
                    {userName}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: (theme) => theme.palette.text.secondary,
                    }}
                  >
                    {userEmail}
                  </Typography>
                </Box>
                <Button
                  variant="outlined"
                  onClick={logout}
                  sx={{
                    borderColor: (theme) => theme.palette.primary.main,
                    color: (theme) => theme.palette.primary.main,
                    textTransform: "none",
                    "&:hover": {
                      borderColor: (theme) => theme.palette.primary.main,
                      backgroundColor: "transparent",
                    },
                  }}
                >
                  Logout
                </Button>
              </Box>

              <Divider sx={{ mb: 3 }} />

              {/* Tabs */}
              <Tabs
                value={userProfileTab}
                onChange={(e, newValue) => setUserProfileTab(newValue)}
                sx={{
                  mb: 3,
                  "& .MuiTab-root": {
                    textTransform: "none",
                    color: (theme) => theme.palette.text.secondary,
                    "&.Mui-selected": {
                      color: (theme) => theme.palette.primary.main,
                    },
                    "&:focus": {
                      outline: "none",
                    },
                    "&:focus-visible": {
                      outline: "none",
                    },
                    "&:active": {
                      outline: "none",
                    },
                    "& .MuiTouchRipple-root": {
                      display: "none",
                    },
                  },
                  "& .MuiButtonBase-root": {
                    "&:focus": {
                      outline: "none",
                    },
                    "&:focus-visible": {
                      outline: "none",
                    },
                    "&:active": {
                      outline: "none",
                    },
                  },
                  "& .MuiTabs-indicator": {
                    backgroundColor: (theme) => theme.palette.primary.main,
                  },
                }}
              >
                <Tab
                  icon={<AccountCircle />}
                  iconPosition="start"
                  label="Profile"
                />
                <Tab
                  icon={<ShoppingBag />}
                  iconPosition="start"
                  label="Purchases"
                />
                <Tab
                  icon={<CardMembership />}
                  iconPosition="start"
                  label="Subscriptions"
                />
                <Tab
                  icon={<Settings />}
                  iconPosition="start"
                  label="Settings"
                />
              </Tabs>

              {/* Tab Content */}
              {userProfileTab === 0 && (
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 3,
                    }}
                  >
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                      Profile Information
                    </Typography>
                    {!editMode && (
                      <Button
                        startIcon={<Edit />}
                        onClick={() => setEditMode(true)}
                        sx={{
                          textTransform: "none",
                          color: (theme) => theme.palette.primary.main,
                        }}
                      >
                        Edit Profile
                      </Button>
                    )}
                  </Box>

                  <Box component="form" onSubmit={handleProfileSubmit}>
                    <TextField
                      name="name"
                      label="Name"
                      fullWidth
                      required
                      value={profileData.name}
                      onChange={handleProfileChange}
                      disabled={!editMode}
                      error={!!profileErrors.name}
                      helperText={profileErrors.name}
                      sx={{ mb: 2 }}
                    />

                    <TextField
                      name="email"
                      label="Email"
                      type="email"
                      fullWidth
                      required
                      value={profileData.email}
                      onChange={handleProfileChange}
                      disabled={!editMode}
                      error={!!profileErrors.email}
                      helperText={profileErrors.email}
                      sx={{ mb: 2 }}
                    />

                    {editMode && (
                      <>
                        <Divider sx={{ my: 3 }} />
                        <Typography variant="h6" sx={{ mb: 2 }}>
                          Change Password (Optional)
                        </Typography>

                        <TextField
                          name="currentPassword"
                          label="Current Password"
                          type={showCurrentPassword ? "text" : "password"}
                          fullWidth
                          value={profileData.currentPassword}
                          onChange={handleProfileChange}
                          error={!!profileErrors.currentPassword}
                          helperText={profileErrors.currentPassword}
                          sx={{ mb: 2 }}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() =>
                                    setShowCurrentPassword(!showCurrentPassword)
                                  }
                                  edge="end"
                                >
                                  {showCurrentPassword ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />

                        <TextField
                          name="newPassword"
                          label="New Password"
                          type={showNewPassword ? "text" : "password"}
                          fullWidth
                          value={profileData.newPassword}
                          onChange={handleProfileChange}
                          error={!!profileErrors.newPassword}
                          helperText={profileErrors.newPassword}
                          sx={{ mb: 2 }}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() =>
                                    setShowNewPassword(!showNewPassword)
                                  }
                                  edge="end"
                                >
                                  {showNewPassword ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />

                        <TextField
                          name="confirmPassword"
                          label="Confirm New Password"
                          type={showNewPassword ? "text" : "password"}
                          fullWidth
                          value={profileData.confirmPassword}
                          onChange={handleProfileChange}
                          error={!!profileErrors.confirmPassword}
                          helperText={profileErrors.confirmPassword}
                          sx={{ mb: 2 }}
                        />
                      </>
                    )}

                    {editMode && (
                      <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
                        <Button
                          type="submit"
                          variant="contained"
                          sx={{
                            backgroundColor: (theme) =>
                              theme.palette.primary.main,
                            textTransform: "none",
                            "&:hover": {
                              backgroundColor: "#C85A2E",
                            },
                          }}
                        >
                          Save Changes
                        </Button>
                        <Button
                          variant="outlined"
                          onClick={() => {
                            setEditMode(false);
                            setProfileErrors({});
                            // Reset to original values
                            const userName =
                              user?.name || user?.user?.name || "";
                            const userEmail =
                              user?.email || user?.user?.email || "";
                            setProfileData({
                              name: userName,
                              email: userEmail,
                              currentPassword: "",
                              newPassword: "",
                              confirmPassword: "",
                            });
                          }}
                          sx={{ textTransform: "none" }}
                        >
                          Cancel
                        </Button>
                      </Box>
                    )}
                  </Box>
                </Box>
              )}

              {userProfileTab === 1 && (
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                    My Purchases
                  </Typography>
                  {purchasesLoading ? (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        minHeight: "200px",
                      }}
                    >
                      <CircularProgress />
                    </Box>
                  ) : purchasesError ? (
                    <Alert severity="error" sx={{ mb: 2 }}>
                      {purchasesError}
                    </Alert>
                  ) : purchases.length === 0 ? (
                    <Typography
                      color="text.secondary"
                      sx={{ textAlign: "center", py: 4 }}
                    >
                      No purchases found
                    </Typography>
                  ) : (
                    <List>
                      {purchases.map((purchase) => (
                        <Card key={purchase.id} sx={{ 
                          mb: 2,
                          backgroundColor: (theme) =>
                            theme.palette.mode === "light"
                              ? "rgba(0, 0, 0, 0.03)"
                              : "transparent",
                          border: (theme) =>
                            theme.palette.mode === "dark"
                              ? "1px solid rgba(255, 255, 255, 0.1)"
                              : "1px solid rgba(0, 0, 0, 0.1)",
                          boxShadow: (theme) =>
                            theme.palette.mode === "light"
                              ? "0 2px 8px rgba(0, 0, 0, 0.05)"
                              : "none",
                        }}>
                          <CardContent>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "flex-start",
                                mb: 2,
                              }}
                            >
                              <Box>
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                    mb: 0.5,
                                    flexWrap: "wrap",
                                  }}
                                >
                                  <Typography variant="h6">
                                    {purchase.order_number ||
                                      purchase.orderNumber ||
                                      purchase.purchase_number ||
                                      `Purchase #${purchase.id}`}
                                  </Typography>
                                  <Chip
                                    label="One-time"
                                    size="small"
                                    color="primary"
                                    sx={{ height: 20, fontSize: "0.7rem" }}
                                  />
                                  {(purchase.quantity ||
                                    purchase.qty ||
                                    purchase.total_quantity) && (
                                    <Chip
                                      label={`Qty: ${purchase.quantity || purchase.qty || purchase.total_quantity}`}
                                      size="small"
                                      sx={{
                                        height: 20,
                                        fontSize: "0.7rem",
                                        backgroundColor: (theme) =>
                                          theme.palette.mode === "dark"
                                            ? "rgba(255, 255, 255, 0.1)"
                                            : "rgba(0, 0, 0, 0.08)",
                                      }}
                                    />
                                  )}
                                </Box>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  {purchase.created_at ||
                                  purchase.date ||
                                  purchase.purchase_date
                                    ? new Date(
                                        purchase.created_at ||
                                          purchase.date ||
                                          purchase.purchase_date
                                      ).toLocaleDateString()
                                    : "Date not available"}
                                </Typography>
                              </Box>
                              <Chip
                                label={purchase.status || "unknown"}
                                color={
                                  purchase.status === "completed" ||
                                  purchase.status === "paid"
                                    ? "success"
                                    : purchase.status === "pending"
                                      ? "warning"
                                      : "default"
                                }
                                size="small"
                              />
                            </Box>
                            <Box sx={{ mb: 2 }}>
                              {/* Check if purchase has items array */}
                              {(
                                purchase.items ||
                                purchase.order_items ||
                                purchase.purchase_items ||
                                []
                              ).length > 0 ? (
                                (
                                  purchase.items ||
                                  purchase.order_items ||
                                  purchase.purchase_items ||
                                  []
                                ).map((item, idx) => {
                                  // Try to get product name from products array using product_id
                                  const productId =
                                    typeof item === "object"
                                      ? item.product_id ||
                                        item.productId ||
                                        item.id
                                      : null;
                                  const productName = productId
                                    ? getProductName(productId)
                                    : null;

                                  // Fallback to item name if product not found in products array
                                  const itemName =
                                    productName ||
                                    (typeof item === "string"
                                      ? item
                                      : item.name ||
                                        item.product_name ||
                                        item.service_name ||
                                        "Item");
                                  const quantity =
                                    typeof item === "object"
                                      ? item.quantity ||
                                        item.qty ||
                                        item.amount ||
                                        1
                                      : 1;

                                  return (
                                    <Typography
                                      key={idx}
                                      variant="body2"
                                      color="text.secondary"
                                    >
                                      • {itemName}{" "}
                                      {quantity > 1 ? `(Qty: ${quantity})` : ""}
                                    </Typography>
                                  );
                                })
                              ) : (
                                /* If no items array, check for purchase-level quantity or item info */
                                <>
                                  {(() => {
                                    // Try to get product name from products array using product_id
                                    const productId =
                                      purchase.product_id || purchase.productId;
                                    const productName = productId
                                      ? getProductName(productId)
                                      : null;

                                    // Use item_name from backend (primary), or fallback to product lookup or other fields
                                    // Check if item_name exists and is not empty/null
                                    const itemName =
                                      purchase.item_name &&
                                      purchase.item_name.trim() !== ""
                                        ? purchase.item_name
                                        : null;

                                    const displayName =
                                      itemName || // Primary: Backend provides item_name
                                      productName || // Fallback: Lookup from products array
                                      purchase.product_name ||
                                      purchase.service_name ||
                                      purchase.name;

                                    // Display product name if available, otherwise show generic "Product" for old purchases
                                    if (displayName) {
                                      return (
                                        <Typography
                                          variant="body2"
                                          color="text.secondary"
                                        >
                                          • {displayName}
                                          {purchase.quantity ||
                                          purchase.qty ||
                                          purchase.total_quantity
                                            ? ` (Qty: ${purchase.quantity || purchase.qty || purchase.total_quantity})`
                                            : ""}
                                        </Typography>
                                      );
                                    } else {
                                      // Fallback for old purchases without item_name populated
                                      return (
                                        <Typography
                                          variant="body2"
                                          color="text.secondary"
                                        >
                                          • Product
                                          {purchase.quantity ||
                                          purchase.qty ||
                                          purchase.total_quantity
                                            ? ` (Qty: ${purchase.quantity || purchase.qty || purchase.total_quantity})`
                                            : ""}
                                        </Typography>
                                      );
                                    }
                                  })()}
                                </>
                              )}
                            </Box>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <Typography variant="h6">
                                €
                                {parseFloat(
                                  purchase.total || purchase.amount || 0
                                ).toFixed(2)}
                              </Typography>
                              {(purchase.status === "pending" ||
                                purchase.status === "processing") && (
                                <Button
                                  startIcon={<Cancel />}
                                  onClick={() =>
                                    handleCancelPurchase(purchase.id)
                                  }
                                  color="error"
                                  size="small"
                                  sx={{ textTransform: "none" }}
                                >
                                  Cancel Purchase
                                </Button>
                              )}
                            </Box>
                          </CardContent>
                        </Card>
                      ))}
                    </List>
                  )}
                </Box>
              )}

              {userProfileTab === 2 && (
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                    My Subscriptions
                  </Typography>
                  {subscriptionsLoading ? (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        minHeight: "200px",
                      }}
                    >
                      <CircularProgress />
                    </Box>
                  ) : subscriptionsError ? (
                    <Alert severity="error" sx={{ mb: 2 }}>
                      {subscriptionsError}
                    </Alert>
                  ) : subscriptions.length === 0 ? (
                    <Typography
                      color="text.secondary"
                      sx={{ textAlign: "center", py: 4 }}
                    >
                      No active subscriptions
                    </Typography>
                  ) : (
                    <List>
                      {subscriptions.map((subscription) => (
                        <Card key={subscription.id} sx={{ 
                          mb: 2,
                          backgroundColor: (theme) =>
                            theme.palette.mode === "light"
                              ? "rgba(0, 0, 0, 0.03)"
                              : "transparent",
                          border: (theme) =>
                            theme.palette.mode === "dark"
                              ? "1px solid rgba(255, 255, 255, 0.1)"
                              : "1px solid rgba(0, 0, 0, 0.1)",
                          boxShadow: (theme) =>
                            theme.palette.mode === "light"
                              ? "0 2px 8px rgba(0, 0, 0, 0.05)"
                              : "none",
                        }}>
                          <CardContent>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "flex-start",
                                mb: 2,
                              }}
                            >
                              <Box>
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                    mb: 0.5,
                                  }}
                                >
                                  <Typography variant="h6">
                                    {subscription.item_name ||
                                      subscription.name ||
                                      subscription.subscription_name ||
                                      subscription.service_name ||
                                      "Subscription"}
                                  </Typography>
                                  <Chip
                                    label="Subscription"
                                    size="small"
                                    sx={{
                                      height: 20,
                                      fontSize: "0.7rem",
                                      backgroundColor: "#E57A44",
                                      color: "#FFFFFF",
                                    }}
                                  />
                                </Box>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  {subscription.plan ||
                                    subscription.plan_name ||
                                    subscription.billing_period ||
                                    "Plan"}
                                </Typography>
                              </Box>
                              <Chip
                                label={subscription.status || "unknown"}
                                color={
                                  subscription.status === "active"
                                    ? "success"
                                    : subscription.status === "cancelled"
                                      ? "default"
                                      : "warning"
                                }
                                size="small"
                              />
                            </Box>
                            <Box sx={{ mb: 2 }}>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                Price: €
                                {parseFloat(
                                  subscription.price || subscription.amount || 0
                                ).toFixed(2)}
                                /
                                {(
                                  subscription.plan ||
                                  subscription.billing_period ||
                                  ""
                                )
                                  .toLowerCase()
                                  .includes("month")
                                  ? "month"
                                  : (
                                        subscription.plan ||
                                        subscription.billing_period ||
                                        ""
                                      )
                                        .toLowerCase()
                                        .includes("year")
                                    ? "year"
                                    : "period"}
                                {subscription.quantity &&
                                  subscription.quantity > 1 && (
                                    <span> × {subscription.quantity}</span>
                                  )}
                              </Typography>
                              {subscription.quantity &&
                                subscription.quantity > 1 && (
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ mt: 0.5 }}
                                  >
                                    Quantity: {subscription.quantity}
                                  </Typography>
                                )}
                              {(subscription.start_date ||
                                subscription.startDate ||
                                subscription.created_at) && (
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  Started:{" "}
                                  {new Date(
                                    subscription.start_date ||
                                      subscription.startDate ||
                                      subscription.created_at
                                  ).toLocaleDateString()}
                                </Typography>
                              )}
                              {subscription.status === "active" &&
                                (subscription.next_billing_date ||
                                  subscription.nextBilling ||
                                  subscription.next_billing) && (
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    Next billing:{" "}
                                    {new Date(
                                      subscription.next_billing_date ||
                                        subscription.nextBilling ||
                                        subscription.next_billing
                                    ).toLocaleDateString()}
                                  </Typography>
                                )}
                            </Box>
                            {subscription.status === "active" && (
                              <Button
                                startIcon={<Cancel />}
                                onClick={() =>
                                  handleCancelSubscription(subscription.id)
                                }
                                color="error"
                                variant="outlined"
                                size="small"
                                sx={{ textTransform: "none" }}
                              >
                                Cancel Subscription
                              </Button>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </List>
                  )}
                </Box>
              )}

              {userProfileTab === 3 && (
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                    Settings
                  </Typography>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" sx={{ mb: 2 }}>
                        Account Preferences
                      </Typography>
                      <List>
                        <ListItem>
                          <ListItemText
                            primary="Email Notifications"
                            secondary="Receive email updates about your purchases and subscriptions"
                          />
                          <ListItemSecondaryAction>
                            <Button size="small" sx={{ textTransform: "none" }}>
                              Enable
                            </Button>
                          </ListItemSecondaryAction>
                        </ListItem>
                        <Divider />
                        <ListItem>
                          <ListItemText
                            primary="Two-Factor Authentication"
                            secondary="Add an extra layer of security to your account"
                          />
                          <ListItemSecondaryAction>
                            <Button size="small" sx={{ textTransform: "none" }}>
                              Setup
                            </Button>
                          </ListItemSecondaryAction>
                        </ListItem>
                        <Divider />
                        <ListItem>
                          <ListItemText
                            primary="Delete Account"
                            secondary="Permanently delete your account and all associated data"
                          />
                          <ListItemSecondaryAction>
                            <Button
                              size="small"
                              color="error"
                              startIcon={<Delete />}
                              sx={{ textTransform: "none" }}
                            >
                              Delete
                            </Button>
                          </ListItemSecondaryAction>
                        </ListItem>
                      </List>
                    </CardContent>
                  </Card>
                </Box>
              )}
            </Paper>
          </Container>

          {/* Query Form - Mobile only, at bottom */}
          {isMobile && (
            <Box
              sx={{
                mt: 4,
                mb: 2,
                width: "100%",
              }}
            >
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  backgroundColor: (theme) => theme.palette.background.paper,
                }}
              >
                {sidebarContent}
              </Paper>
            </Box>
          )}
        </Box>

        {/* Cancel Confirmation Dialog */}
        <Dialog
          open={cancelDialogOpen}
          onClose={() => setCancelDialogOpen(false)}
        >
          <DialogTitle>
            Cancel {cancelType === "order" ? "Order" : "Subscription"}?
          </DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to cancel this {cancelType}? This action
              cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setCancelDialogOpen(false)}
              sx={{ textTransform: "none" }}
            >
              No, Keep It
            </Button>
            <Button
              onClick={confirmCancel}
              color="error"
              variant="contained"
              sx={{ textTransform: "none" }}
            >
              Yes, Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "calc(100vh - 64px)",
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      {/* Sidebar - Desktop only */}
      {!isMobile && <Box sx={sidebarSx}>{sidebarContent}</Box>}

      {/* Main content */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          p: { xs: 2, sm: 4 },
        }}
      >
        <Container maxWidth="sm" sx={{ width: "100%" }}>
          <Paper
            elevation={3}
            sx={{
              p: 4,
              borderRadius: 2,
              backgroundColor: (theme) => theme.palette.background.paper,
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

            {error && activeTab === 0 && (
              <Alert
                severity="error"
                sx={{ mb: 2 }}
                onClose={() => clearError()}
              >
                {error}
              </Alert>
            )}
            {registerError && activeTab === 1 && (
              <Alert
                severity="error"
                sx={{ mb: 2 }}
                onClose={() => setRegisterError(null)}
              >
                {registerError}
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
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          edge="end"
                        >
                          {showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
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
                disabled={activeTab === 0 ? loading : registerLoading}
                sx={{
                  backgroundColor: (theme) => theme.palette.primary.main,
                  color: "#FFFFFF",
                  fontWeight: 400,
                  borderRadius: 2,
                  py: 1.5,
                  textTransform: "none",
                  border: "1px solid transparent",
                  transition: "all 0.3s ease",
                  outline: "none",
                  "&:focus": {
                    outline: "none",
                    boxShadow: "none",
                  },
                  "&:focus-visible": {
                    outline: "none",
                    boxShadow: "none",
                  },
                  "&:hover": {
                    borderColor: (theme) => theme.palette.primary.main,
                    transform: "translateY(-4px)",
                  },
                }}
              >
                {(activeTab === 0 ? loading : registerLoading) ? (
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

        {/* Query Form - Mobile only, at bottom */}
        {isMobile && (
          <Box
            sx={{
              mt: 4,
              mb: 2,
              width: "100%",
              maxWidth: "sm",
            }}
          >
            <Paper
              elevation={3}
              sx={{
                p: 3,
                borderRadius: 2,
                backgroundColor: (theme) => theme.palette.background.paper,
              }}
            >
              {sidebarContent}
            </Paper>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default User;
