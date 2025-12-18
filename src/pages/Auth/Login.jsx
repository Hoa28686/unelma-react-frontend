import React, { useEffect, useState } from "react";
import { SignInPage } from "@toolpad/core";
import {
  Box,
  Link as MuiLink,
  Button,
  Paper,
  Typography,
  IconButton,
  TextField,
  InputAdornment,
} from "@mui/material";
import { Link, useNavigate } from "react-router";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useAuth } from "../../context/AuthContext";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

function Login() {
  const { user, login, logout, message, loading, error } = useAuth();

  const navigate = useNavigate();

  // Navigate to home on successful login
  useEffect(() => {
    if (user) {
      navigate("/user");
    } else {
      navigate("/login");
    }
  }, [user, navigate]);

  // Fix aria-hidden accessibility issue
  useEffect(() => {
    const rootElement = document.getElementById("root");
    if (rootElement && rootElement.getAttribute("aria-hidden") === "true") {
      // Remove aria-hidden from root if it's incorrectly set
      rootElement.removeAttribute("aria-hidden");
    }

    // Monitor for aria-hidden changes and fix them
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "aria-hidden" &&
          rootElement &&
          rootElement.getAttribute("aria-hidden") === "true"
        ) {
          // Check if there's a focused element inside
          const focusedElement = document.activeElement;
          if (focusedElement && rootElement.contains(focusedElement)) {
            // Remove aria-hidden if a focused element is inside
            rootElement.removeAttribute("aria-hidden");
          }
        }
      });
    });

    if (rootElement) {
      observer.observe(rootElement, {
        attributes: true,
        attributeFilter: ["aria-hidden"],
      });
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const providers = [{ id: "credentials", name: "Email & Password" }];

  const signIn = async (provider, formData) => {
    const email = formData.get("email");
    const password = formData.get("password");
    const remember = formData.get("remember") === "on";
    await login({ email, password, remember });
  };

  // custom Slots
  const Title = () => (
    <Typography
      variant="h4"
      component="h3"
      sx={{
        marginBlock: 2,
        fontWeight: 600,
        color: (theme) => theme.palette.text.primary,
        textAlign: "center",
      }}
    >
      Welcome to Unelma Platforms
    </Typography>
  );

  const Subtitle = () => (
    <Typography
      variant="body1"
      component="p"
      sx={{
        color: (theme) => theme.palette.text.secondary,
        mb: 2,
      }}
    >
      Get started by logging in
    </Typography>
  );

  const EmailField = (props) => (
    <TextField
      {...props}
      name="email"
      type="email"
      required
      label="Email"
      fullWidth
    />
  );

  const PasswordField = (props) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
      <Box sx={{ position: "relative" }}>
        <TextField
          {...props}
          name="password"
          type={showPassword ? "text" : "password"}
          required
          label="Password"
          fullWidth
        />
        <IconButton
          aria-label={showPassword ? "Hide password" : "Show password"}
          onClick={() => setShowPassword((prev) => !prev)}
          sx={{
            position: "absolute",
            top: "50%",
            right: 8,
            transform: "translateY(-50%)",
          }}
        >
          {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
        </IconButton>
      </Box>
    );
  };

  const RememberMe = (props) => (
    <Box
      component="label"
      sx={{
        fontSize: "0.9rem",
        color: (theme) => theme.palette.text.secondary,
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        "&:hover": {
          color: (theme) => theme.palette.text.primary,
        },
      }}
    >
      <input
        type="checkbox"
        name="remember"
        {...props}
        style={{ marginInline: "0 .5rem", cursor: "pointer" }}
      />
      Remember me
    </Box>
  );
  const SignUpLink = () => (
    <Typography
      variant="body2"
      sx={{ mt: 3, color: (theme) => theme.palette.text.secondary }}
    >
      Don't have an account?{" "}
      <MuiLink
        component={Link}
        to={"/register"}
        style={{
          fontWeight: "bold",
          color: (theme) => theme.palette.primary.main,
          cursor: "pointer",
          textDecoration: "none",
          mb: 2,
        }}
        onMouseEnter={(e) => {
          e.target.style.textDecoration = "underline";
        }}
        onMouseLeave={(e) => {
          e.target.style.textDecoration = "none";
        }}
      >
        Create one.
      </MuiLink>
    </Typography>
  );
  const SubmitButton = (props) => {
    return (
      <Button
        type="submit"
        {...props}
        sx={{
          backgroundColor: (theme) => theme.palette.primary.main,
          color: "#FFFFFF",
          fontWeight: 500,
          borderRadius: 2,
          boxShadow: "none",
          textTransform: "none",
          border: "1px solid transparent",
          transition: "all 0.3s ease",
          width: "100%",
          fontSize: "inherit",
          mt: 3,
          py: 1,
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
        Log In
      </Button>
    );
  };

  if (loading) return <LoadingSpinner />;

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "auto",
        backgroundColor: (theme) => theme.palette.background.default,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        py: { xs: 3, sm: 4, md: 5 },
        px: { xs: 2, sm: 2.5 },
      }}
    >
      {(message || error) && (
        <Box
          sx={{
            width: "100%",
            maxWidth: { xs: "90%", sm: "500px", md: "550px" },
            mb: 2,
          }}
        >
          <Typography
            variant="body1"
            sx={{
              width: "100%",
              color: message
                ? (theme) => theme.palette.primary.main
                : (theme) => theme.palette.error.main,
              textAlign: "center",
              fontWeight: message ? 500 : 400,
            }}
          >
            {message || error}
          </Typography>
        </Box>
      )}
      {!user && (
        <SignInPage
          providers={providers}
          signIn={signIn}
          slots={{
            title: Title,
            subtitle: Subtitle,
            emailField: EmailField,
            passwordField: PasswordField,
            rememberMe: RememberMe,
            signUpLink: SignUpLink,
            submitButton: SubmitButton,
          }}
        />
      )}{" "}
      {user && (
        <Paper
          sx={{
            width: "25rem",
            mx: "auto",
            my: 8,
            p: 4,
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: (theme) => theme.palette.background.paper,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              textAlign: "center",
              fontWeight: 600,
              color: (theme) => theme.palette.text.primary,
              mb: 2,
            }}
          >
            {user.name || "User"}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              textAlign: "center",
              color: (theme) => theme.palette.text.secondary,
              mb: 3,
            }}
          >
            {user.email || ""}
          </Typography>
          <Button
            sx={{
              backgroundColor: (theme) => theme.palette.primary.main,
              color: "#FFFFFF",
              fontWeight: 400,
              borderRadius: 2,
              textTransform: "none",
              border: "1px solid transparent",
              transition: "all 0.3s ease",
              width: "100%",
              fontSize: "inherit",
              mt: 3,
              py: 1,
              "&:hover": {
                borderColor: (theme) => theme.palette.primary.main,
                transform: "translateY(-4px)",
              },
            }}
            onClick={logout}
          >
            Log out
          </Button>
        </Paper>
      )}
    </Box>
  );
}

export default Login;
