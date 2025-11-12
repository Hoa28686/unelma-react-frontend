import React from "react";
import { SignInPage } from "@toolpad/core/SignInPage";
import { Box, Button, Paper, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const { user, login, logout, message, loading, error } = useAuth();
  const navigate = useNavigate();

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
        style={{ fontWeight: "bold", color: "#0260c1", cursor: "pointer" }}
        to={"/register"}
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
          background: "#0173E6",
          border: "1px solid #006BD6",
          boxShadow:
            "0 1px 0px inset #3399FF80, 0 1px 0 #004D9966, 0 2px 4px 0 #090B0B1A",
          textTransform: "none",
          width: "100%",
          fontSize: "inherit",
          mt: 3,
          py: 1,
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
            color: message ? "#1565c0" : "#dc362e",
            textAlign: "center",
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
            boxShadow: "0 4px 12px #0000001A",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#fff",
          }}
        >
          <Typography variant="h4" sx={{ textAlign: "center" }}>
            {user.name || "User"}
          </Typography>
          <Typography variant="subtitle1" sx={{ textAlign: "center" }}>
            {user.email || ""}
          </Typography>
          <Button
            sx={{
              border: "1px solid #006BD6",
              color: "#006BD6",
              textTransform: "none",
              width: "100%",
              fontSize: "inherit",
              mt: 3,
              py: 1,
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
