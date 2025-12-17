import {
  Link as MuiLink,
  Button,
  Paper,
  TextField,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { API } from "../../api";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

function Register() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirm: false,
  });
  const [message, setMessage] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const navigate = useNavigate();
  const registerAPI = API.register;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    // form validation
    if (
      !form.name ||
      !form.email ||
      !form.password ||
      !form.password_confirmation
    ) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      setLoading(false);
      return;
    }
    if (form.password !== form.password_confirmation) {
      setError("Password and confirmation do not match.");
      setLoading(false);
      return;
    }

    try {
      await axios.post(registerAPI, form);
      setMessage("Account created successfully!");
      setTimeout(() => navigate("/login"), 3000);
      setLoading(false);
      setForm({ name: "", email: "", password: "", password_confirmation: "" });
    } catch (e) {
      setError(e.response?.data?.message || "Registration failed");
      setLoading(false);
    }
  };

  return (
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
        position: "relative",
      }}
    >
      <form onSubmit={handleRegister}>
        <Typography
          variant="h5"
          sx={{
            mb: 2,
            textAlign: "center",
            fontWeight: 600,
            color: (theme) => theme.palette.text.primary,
          }}
        >
          Create an account
        </Typography>
        <TextField
          required
          autoFocus
          margin="normal"
          fullWidth
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        <TextField
          required
          type="email"
          margin="normal"
          fullWidth
          label="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        <Box
          margin="normal"
          sx={{
            height: "fit-content",
            position: "relative",
            "& button": {
              position: "absolute",
              right: 10,
              top: "55%",
              transform: "translateY(-50%)",
              p: "6px",
            },
          }}
        >
          <TextField
            required
            margin="normal"
            fullWidth
            type={showPassword.password ? "text" : "password"}
            label="Password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
          <IconButton
            aria-label="see-hide"
            onClick={() => {
              setShowPassword((prev) => ({
                ...prev,
                password: !prev.password,
              }));
            }}
          >
            {showPassword.password ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </IconButton>
        </Box>
        <Box
          margin="normal"
          sx={{
            height: "fit-content",
            position: "relative",
            "& button": {
              position: "absolute",
              right: 10,
              top: "55%",
              transform: "translateY(-50%)",
              p: "6px",
            },
          }}
        >
          <TextField
            required
            margin="normal"
            fullWidth
            type={showPassword.confirm ? "text" : "password"}
            label="Confirm Passsword"
            name="password_confirmation"
            value={form.password_confirmation}
            onChange={handleChange}
          />
          <IconButton
            aria-label="see-hide"
            onClick={() => {
              setShowPassword((prev) => ({
                ...prev,
                confirm: !prev.confirm,
              }));
            }}
          >
            {showPassword.confirm ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </IconButton>
        </Box>
        <Button
          type="submit"
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
            "&:disabled": {
              opacity: 0.6,
            },
          }}
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </Button>
      </form>
      <Typography
        variant="body2"
        sx={{ mt: 3, color: (theme) => theme.palette.text.secondary }}
      >
        Already have an account?{" "}
        <MuiLink
          to={"/login"}
          component={Link}
          sx={{
            fontWeight: "bold",
            color: (theme) => theme.palette.primary.main,
            cursor: "pointer",
            textDecoration: "none",
            mb: 2,
          }}
        >
          Log in
        </MuiLink>
      </Typography>

      {(message || error) && (
        <Typography
          variant="body1"
          sx={{
            mt: 2,
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
    </Paper>
  );
}

export default Register;
