import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";

function Register() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const navigate = useNavigate();
  const registerAPI = import.meta.env.VITE_REGISTER_API_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
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
      console.error(e);
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
        <TextField
          required
          margin="normal"
          fullWidth
          type="password"
          label="Password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />
        <TextField
          required
          margin="normal"
          fullWidth
          type="password"
          label="Confirm Passsword"
          name="password_confirmation"
          value={form.password_confirmation}
          onChange={handleChange}
        />
        <Button
          type="submit"
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
            "&:disabled": {
              opacity: 0.6,
            },
          }}
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </Button>
      </form>
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
