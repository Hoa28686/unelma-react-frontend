import React, { useEffect } from "react";
import { SignInPage } from "@toolpad/core";
import { Box, Button, Paper, Typography, useTheme } from "@mui/material";
import { Link, useNavigate } from "react-router";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const { user, login, logout, message, loading, error } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();

  // Navigate to home on successful login
  useEffect(() => {
    if (user && user.email) {
      navigate("/");
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

  const handleLogout = async () => {
    await logout();
  };

  // custom Slots
  const Title = () => (
    <Typography
      variant="h4"
      component="h3"
      sx={{
        marginBottom: 2,
        fontWeight: 600,
        color: (theme) => theme.palette.text.primary,
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

  const RememberMe = (props) => (
    <Box
      component="label"
      sx={{
        fontSize: "0.9rem",
        marginBlock: ".6rem .5rem",
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
    <Typography variant="body2" sx={{ mt: 3, color: (theme) => theme.palette.text.secondary }}>
      Don't have an account?{" "}
      <Link
        to={"/register"}
        style={{
          fontWeight: "bold",
          color: theme.palette.primary.main,
          cursor: "pointer",
          textDecoration: "none",
        }}
        onMouseEnter={(e) => {
          e.target.style.textDecoration = "underline";
        }}
        onMouseLeave={(e) => {
          e.target.style.textDecoration = "none";
        }}
      >
        Create one.
      </Link>
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
          fontWeight: 100,
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
        <Box sx={{ width: "100%", maxWidth: { xs: "90%", sm: "500px", md: "550px" }, mb: 2 }}>
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
        <Paper
          elevation={3}
          sx={{
            width: "100%",
            maxWidth: { xs: "90%", sm: "500px", md: "550px" },
            p: { xs: 3, sm: 4 },
            borderRadius: 2,
            backgroundColor: (theme) => theme.palette.background.paper,
            "& input": {
              color: (theme) => theme.palette.text.primary,
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? "#FFFFFF"
                  : theme.palette.background.default,
            },
            "& input::placeholder": {
              color: (theme) => theme.palette.text.secondary,
              opacity: 0.7,
            },
            "& label": {
              color: (theme) => theme.palette.text.secondary,
            },
            "& .MuiInputBase-root": {
              color: (theme) => theme.palette.text.primary,
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? "#FFFFFF"
                  : theme.palette.background.default,
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: (theme) =>
                  theme.palette.mode === "dark"
                    ? "rgba(255, 255, 255, 0.2)"
                    : "rgba(0, 0, 0, 0.23)",
              },
              "&:hover fieldset": {
                borderColor: (theme) => theme.palette.primary.main,
              },
              "&.Mui-focused fieldset": {
                borderColor: (theme) => theme.palette.primary.main,
                borderWidth: "2px",
              },
            },
          }}
        >
          <SignInPage
            providers={providers}
            signIn={signIn}
            slots={{
              title: Title,
              subtitle: Subtitle,
              rememberMe: RememberMe,
              signUpLink: SignUpLink,
              submitButton: SubmitButton,
            }}
          />
        </Paper>
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
              fontWeight: 100,
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
            onClick={handleLogout}
          >
            Log out
          </Button>
        </Paper>
      )}
    </Box>
  );
}

export default Login;
