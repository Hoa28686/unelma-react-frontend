import React, { useEffect } from "react";
import { SignInPage } from "@toolpad/core/SignInPage";
import { Box, Button, Paper, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const { user, login, logout, message, loading, error } = useAuth();
  const navigate = useNavigate();

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
    setTimeout(() => {
      navigate("/");
    }, 5000);
  };

  const handleLogout = async () => {
    await logout();
  };

  // custom Slots
  const Title = () => (
    <h3 style={{ marginBottom: 2 }}>Welcome to Unelma Platforms</h3>
  );

  const Subtitle = () => <p>Get started by logging in</p>;

  const RememberMe = (props) => (
    <label
      style={{
        fontSize: "0.9rem",
        marginBlock: ".6rem .5rem",
        color: "#545353",
      }}
    >
      <input
        type="checkbox"
        name="remember"
        {...props}
        style={{ marginInline: "0 .5rem" }}
      />
      Remember me
    </label>
  );
  const SignUpLink = () => (
    <Typography variant="body2" sx={{ mt: 3 }}>
      Don't have an account?{" "}
      <Link
        to={"/register"}
        style={{
          fontWeight: "bold",
          color: "#E57A44",
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
            outline: "2px solid #E57A44",
            outlineOffset: "2px",
            boxShadow: "none",
          },
          "&:focus-visible": {
            outline: "2px solid #E57A44",
            outlineOffset: "2px",
            boxShadow: "none",
          },
          "&:hover": {
            borderColor: "#E57A44",
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
    <Box sx={{ position: "relative" }}>
      {(message || error) && (
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
      )}
      {!user && (
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
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? "#B0D0B5"
                : theme.palette.background.paper,
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
                borderColor: "#E57A44",
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
