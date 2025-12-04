import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
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

function User() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [activeTab, setActiveTab] = useState(0);
  const [userProfileTab, setUserProfileTab] = useState(0); // Tab for authenticated user (Profile, Orders, Subscriptions, Settings)
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

  // Mock data for orders and subscriptions (replace with API calls)
  const [orders, setOrders] = useState([
    {
      id: 1,
      orderNumber: "ORD-2024-001",
      date: "2024-01-15",
      items: ["UnelmaMail Pro", "UnelmaBrowser Premium"],
      total: 299.99,
      status: "completed",
    },
    {
      id: 2,
      orderNumber: "ORD-2024-002",
      date: "2024-02-20",
      items: ["Unelma-Code Translator"],
      total: 149.99,
      status: "pending",
    },
  ]);

  const [subscriptions, setSubscriptions] = useState([
    {
      id: 1,
      name: "UnelmaMail Pro",
      plan: "Monthly",
      price: 29.99,
      status: "active",
      nextBilling: "2024-03-15",
      startDate: "2024-02-15",
    },
    {
      id: 2,
      name: "UnelmaBrowser Premium",
      plan: "Annual",
      price: 199.99,
      status: "active",
      nextBilling: "2025-02-15",
      startDate: "2024-02-15",
    },
  ]);

  // Query form hook
  const {
    formData: queryFormData,
    loading: queryLoading,
    submitStatus: querySubmitStatus,
    fieldErrors: queryFieldErrors,
    handleChange: handleQueryChange,
    handleSubmit: handleQuerySubmit,
  } = useContactForm({ name: "", email: "", message: "" });

  const navigate = useNavigate();
  const { user, loading, error, login, logout, clearError } = useAuth();

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
            fontWeight: 100,
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
      console.log("Updating profile:", profileData);
      setEditMode(false);
      // Show success message
    }
  };

  const handleCancelOrder = (orderId) => {
    setItemToCancel(orderId);
    setCancelType("order");
    setCancelDialogOpen(true);
  };

  const handleCancelSubscription = (subscriptionId) => {
    setItemToCancel(subscriptionId);
    setCancelType("subscription");
    setCancelDialogOpen(true);
  };

  const confirmCancel = () => {
    if (cancelType === "order") {
      setOrders(orders.filter((order) => order.id !== itemToCancel));
    } else if (cancelType === "subscription") {
      setSubscriptions(
        subscriptions.map((sub) =>
          sub.id === itemToCancel ? { ...sub, status: "cancelled" } : sub
        )
      );
    }
    setCancelDialogOpen(false);
    setItemToCancel(null);
    setCancelType(null);
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
              elevation={3}
              sx={{
                p: 4,
                borderRadius: 2,
                backgroundColor: (theme) =>
                  theme.palette.mode === "light"
                    ? theme.palette.background.paper
                    : theme.palette.background.paper,
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
                  label="Orders"
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
                    My Orders
                  </Typography>
                  {orders.length === 0 ? (
                    <Typography
                      color="text.secondary"
                      sx={{ textAlign: "center", py: 4 }}
                    >
                      No orders found
                    </Typography>
                  ) : (
                    <List>
                      {orders.map((order) => (
                        <Card key={order.id} sx={{ mb: 2 }}>
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
                                <Typography variant="h6">
                                  {order.orderNumber}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  {new Date(order.date).toLocaleDateString()}
                                </Typography>
                              </Box>
                              <Chip
                                label={order.status}
                                color={
                                  order.status === "completed"
                                    ? "success"
                                    : "warning"
                                }
                                size="small"
                              />
                            </Box>
                            <Box sx={{ mb: 2 }}>
                              {order.items.map((item, idx) => (
                                <Typography
                                  key={idx}
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  • {item}
                                </Typography>
                              ))}
                            </Box>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <Typography variant="h6">
                                €{order.total.toFixed(2)}
                              </Typography>
                              {order.status === "pending" && (
                                <Button
                                  startIcon={<Cancel />}
                                  onClick={() => handleCancelOrder(order.id)}
                                  color="error"
                                  size="small"
                                  sx={{ textTransform: "none" }}
                                >
                                  Cancel Order
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
                  {subscriptions.length === 0 ? (
                    <Typography
                      color="text.secondary"
                      sx={{ textAlign: "center", py: 4 }}
                    >
                      No active subscriptions
                    </Typography>
                  ) : (
                    <List>
                      {subscriptions.map((subscription) => (
                        <Card key={subscription.id} sx={{ mb: 2 }}>
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
                                <Typography variant="h6">
                                  {subscription.name}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  {subscription.plan} Plan
                                </Typography>
                              </Box>
                              <Chip
                                label={subscription.status}
                                color={
                                  subscription.status === "active"
                                    ? "success"
                                    : "default"
                                }
                                size="small"
                              />
                            </Box>
                            <Box sx={{ mb: 2 }}>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                Price: €{subscription.price.toFixed(2)}/
                                {subscription.plan === "Monthly"
                                  ? "month"
                                  : "year"}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                Started:{" "}
                                {new Date(
                                  subscription.startDate
                                ).toLocaleDateString()}
                              </Typography>
                              {subscription.status === "active" && (
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  Next billing:{" "}
                                  {new Date(
                                    subscription.nextBilling
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
                            secondary="Receive email updates about your orders and subscriptions"
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
                  fontWeight: 100,
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
