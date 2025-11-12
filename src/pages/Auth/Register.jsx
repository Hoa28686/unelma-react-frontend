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
        boxShadow: "0 4px 12px #0000001A",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#fff",
        position: "relative",
      }}
    >
      <form onSubmit={handleRegister}>
        <Typography variant="h5" sx={{ mb: 2, textAlign: "center" }}>
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
            color: message ? "#1565c0" : "#dc362e",
            textAlign: "center",
          }}
        >
          {message || error}
        </Typography>
      )}
    </Paper>
  );
}

export default Register;
