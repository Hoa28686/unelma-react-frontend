import React from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  Card,
  CardContent,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useContactForm } from "../hooks/useContactForm";
import StyledTextField from "../components/StyledTextField";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { commonButtonStyles } from "../constants/styles";

function Contact() {
  const {
    formData,
    loading,
    submitStatus,
    fieldErrors,
    handleChange,
    handleSubmit,
  } = useContactForm({ name: "", email: "", message: "" });

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        backgroundColor: (theme) => theme.palette.background.default,
      }}
    >
      {/* Content */}
      <Box
        sx={{
          position: "relative",
          minHeight: "100vh",
          width: "100%",
          padding: { xs: "3rem 1rem", sm: "4rem 2rem", md: "5rem 3rem" },
        }}
      >
        <Box
          sx={{
            maxWidth: "1400px",
            margin: "0 auto",
          }}
        >
          {/* Page Title */}
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3.5rem", lg: "4rem" },
              fontWeight: 700,
              color: (theme) => theme.palette.text.primary,
              marginBottom: { xs: "3rem", sm: "4rem" },
              textAlign: "center",
            }}
          >
            Keep In Touch
          </Typography>

          <Grid container spacing={4}>
            {/* Top Row - Contact Information Cards */}
            <Grid size={{ xs: 12 }}>
              <Grid container spacing={3}>
                {/* Email */}
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <Card
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === "light"
                        ? "rgba(0, 0, 0, 0.03)"
                        : "transparent",
                    border: (theme) => 
                      theme.palette.mode === 'dark' 
                        ? "1px solid rgba(255, 255, 255, 0.1)" 
                        : "1px solid rgba(0, 0, 0, 0.1)",
                    borderRadius: 2,
                    transition: "all 0.3s ease",
                    boxShadow: (theme) =>
                      theme.palette.mode === "light"
                        ? "0 2px 8px rgba(0, 0, 0, 0.05)"
                        : "none",
                    "&:hover": {
                      borderColor: (theme) => theme.palette.primary.main,
                      transform: "translateY(-4px)",
                      boxShadow: (theme) =>
                        theme.palette.mode === "light"
                          ? "0 4px 12px rgba(0, 0, 0, 0.1)"
                          : "none",
                    },
                  }}
                >
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        marginBottom: 1,
                      }}
                    >
                      <EmailIcon
                        sx={{
                          color: (theme) => theme.palette.primary.main,
                          fontSize: { xs: "1.5rem", sm: "2rem" },
                        }}
                      />
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          color: (theme) => theme.palette.text.primary,
                        }}
                      >
                        Email Address
                      </Typography>
                    </Box>
                    <Typography
                      sx={{
                        color: (theme) => theme.palette.text.secondary,
                        fontSize: { xs: "0.875rem", sm: "1rem" },
                      }}
                    >
                      info@unelmaplatforms.com
                    </Typography>
                  </CardContent>
                </Card>
                </Grid>

                {/* Phone */}
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <Card
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === "light"
                        ? "rgba(0, 0, 0, 0.03)"
                        : "transparent",
                    border: (theme) => 
                      theme.palette.mode === 'dark' 
                        ? "1px solid rgba(255, 255, 255, 0.1)" 
                        : "1px solid rgba(0, 0, 0, 0.1)",
                    borderRadius: 2,
                    transition: "all 0.3s ease",
                    boxShadow: (theme) =>
                      theme.palette.mode === "light"
                        ? "0 2px 8px rgba(0, 0, 0, 0.05)"
                        : "none",
                    "&:hover": {
                      borderColor: (theme) => theme.palette.primary.main,
                      transform: "translateY(-4px)",
                      boxShadow: (theme) =>
                        theme.palette.mode === "light"
                          ? "0 4px 12px rgba(0, 0, 0, 0.1)"
                          : "none",
                    },
                  }}
                >
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        marginBottom: 1,
                      }}
                    >
                      <PhoneIcon
                        sx={{
                          color: (theme) => theme.palette.primary.main,
                          fontSize: { xs: "1.5rem", sm: "2rem" },
                        }}
                      />
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          color: (theme) => theme.palette.text.primary,
                        }}
                      >
                        Phone
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 0.5,
                      }}
                    >
                      <Typography
                        sx={{
                          color: (theme) => theme.palette.text.secondary,
                          fontSize: { xs: "0.875rem", sm: "1rem" },
                        }}
                      >
                        +358(0)449889771 (EU)
                      </Typography>
                      <Typography
                        sx={{
                          color: (theme) => theme.palette.text.secondary,
                          fontSize: { xs: "0.875rem", sm: "1rem" },
                        }}
                      >
                        +1 (302) 703-7343 (US)
                      </Typography>
                      <Typography
                        sx={{
                          color: (theme) => theme.palette.text.secondary,
                          fontSize: { xs: "0.875rem", sm: "1rem" },
                        }}
                      >
                        +977 56-562130 (NP)
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
                </Grid>

                {/* Open Hours */}
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <Card
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === "light"
                        ? "rgba(0, 0, 0, 0.03)"
                        : "transparent",
                    border: (theme) => 
                      theme.palette.mode === 'dark' 
                        ? "1px solid rgba(255, 255, 255, 0.1)" 
                        : "1px solid rgba(0, 0, 0, 0.1)",
                    borderRadius: 2,
                    transition: "all 0.3s ease",
                    boxShadow: (theme) =>
                      theme.palette.mode === "light"
                        ? "0 2px 8px rgba(0, 0, 0, 0.05)"
                        : "none",
                    "&:hover": {
                      borderColor: (theme) => theme.palette.primary.main,
                      transform: "translateY(-4px)",
                      boxShadow: (theme) =>
                        theme.palette.mode === "light"
                          ? "0 4px 12px rgba(0, 0, 0, 0.1)"
                          : "none",
                    },
                  }}
                >
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        marginBottom: 1,
                      }}
                    >
                      <AccessTimeIcon
                        sx={{
                          color: (theme) => theme.palette.primary.main,
                          fontSize: { xs: "1.5rem", sm: "2rem" },
                        }}
                      />
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          color: (theme) => theme.palette.text.primary,
                        }}
                      >
                        Open Hours
                      </Typography>
                    </Box>
                    <Typography
                      sx={{
                        color: (theme) => theme.palette.text.secondary,
                        fontSize: { xs: "0.875rem", sm: "1rem" },
                      }}
                    >
                      Mon - Fri
                    </Typography>
                    <Typography
                      sx={{
                        color: (theme) => theme.palette.text.secondary,
                        fontSize: { xs: "0.875rem", sm: "1rem" },
                      }}
                    >
                      10AM - 5PM
                    </Typography>
                  </CardContent>
                </Card>
                </Grid>

                {/* Location */}
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <Card
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === "light"
                        ? "rgba(0, 0, 0, 0.03)"
                        : "transparent",
                    border: (theme) => 
                      theme.palette.mode === 'dark' 
                        ? "1px solid rgba(255, 255, 255, 0.1)" 
                        : "1px solid rgba(0, 0, 0, 0.1)",
                    borderRadius: 2,
                    transition: "all 0.3s ease",
                    boxShadow: (theme) =>
                      theme.palette.mode === "light"
                        ? "0 2px 8px rgba(0, 0, 0, 0.05)"
                        : "none",
                    "&:hover": {
                      borderColor: (theme) => theme.palette.primary.main,
                      transform: "translateY(-4px)",
                      boxShadow: (theme) =>
                        theme.palette.mode === "light"
                          ? "0 4px 12px rgba(0, 0, 0, 0.1)"
                          : "none",
                    },
                  }}
                >
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        marginBottom: 1,
                      }}
                    >
                      <LocationOnIcon
                        sx={{
                          color: (theme) => theme.palette.primary.main,
                          fontSize: { xs: "1.5rem", sm: "2rem" },
                        }}
                      />
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          color: (theme) => theme.palette.text.primary,
                        }}
                      >
                        Location
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 0.5,
                      }}
                    >
                      <Typography
                        sx={{
                          color: (theme) => theme.palette.text.secondary,
                          fontSize: { xs: "0.875rem", sm: "1rem" },
                        }}
                      >
                        Tallinn, EE
                      </Typography>
                      <Typography
                        sx={{
                          color: (theme) => theme.palette.text.secondary,
                          fontSize: { xs: "0.875rem", sm: "1rem" },
                        }}
                      >
                        Espoo, FI
                      </Typography>
                      <Typography
                        sx={{
                          color: (theme) => theme.palette.text.secondary,
                          fontSize: { xs: "0.875rem", sm: "1rem" },
                        }}
                      >
                        CO, US
                      </Typography>
                      <Typography
                        sx={{
                          color: (theme) => theme.palette.text.secondary,
                          fontSize: { xs: "0.875rem", sm: "1rem" },
                        }}
                      >
                        Chitwan, NP
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
                </Grid>
              </Grid>
            </Grid>

            {/* Bottom Row - Contact Form and Google Maps */}
            <Grid size={{ xs: 12 }}>
              <Box
                sx={{
                  backgroundColor: (theme) =>
                    theme.palette.mode === "light"
                      ? "rgba(0, 0, 0, 0.03)"
                      : "transparent",
                  border: (theme) => 
                    theme.palette.mode === 'dark' 
                      ? "1px solid rgba(255, 255, 255, 0.1)" 
                      : "1px solid rgba(0, 0, 0, 0.1)",
                  borderRadius: 2,
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: { xs: "column", lg: "row" },
                  boxShadow: (theme) =>
                    theme.palette.mode === "light"
                      ? "0 2px 8px rgba(0, 0, 0, 0.05)"
                      : "none",
                }}
              >
                {/* Contact Form */}
                <Box
                  sx={{
                    flex: { xs: "1 1 100%", lg: "1 1 50%" },
                    width: { xs: "100%", lg: "50%" },
                    padding: { xs: 2, sm: 3 },
                  }}
                >
                    <Typography
                      variant="h5"
                      component="h2"
                      sx={{
                        fontWeight: 600,
                        color: (theme) => theme.palette.text.primary,
                        marginBottom: 3,
                      }}
                    >
                      Send Message
                    </Typography>
                    {/* Success/Error Alert */}
                    {submitStatus.success !== null && (
                      <Alert
                        severity={submitStatus.success ? "success" : "error"}
                        sx={{
                          mb: 2,
                          borderRadius: 2,
                        }}
                      >
                        {submitStatus.message}
                      </Alert>
                    )}
                    <Box
                      component="form"
                      onSubmit={handleSubmit}
                      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                    >
                      <StyledTextField
                        name="name"
                        label="Your Name"
                        fullWidth
                        required
                        value={formData.name}
                        onChange={handleChange}
                        error={!!fieldErrors.name}
                        helperText={fieldErrors.name}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            backgroundColor: "transparent",
                            "& input:-webkit-autofill": {
                              WebkitBoxShadow: "0 0 0 1000px transparent inset",
                            },
                            "& input:-webkit-autofill:hover": {
                              WebkitBoxShadow: "0 0 0 1000px transparent inset",
                            },
                            "& input:-webkit-autofill:focus": {
                              WebkitBoxShadow: "0 0 0 1000px transparent inset",
                            },
                          },
                        }}
                      />
                      <StyledTextField
                        name="email"
                        label="Your Email"
                        type="email"
                        fullWidth
                        required
                        value={formData.email}
                        onChange={handleChange}
                        error={!!fieldErrors.email}
                        helperText={fieldErrors.email}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            backgroundColor: "transparent",
                            "& input:-webkit-autofill": {
                              WebkitBoxShadow: "0 0 0 1000px transparent inset",
                            },
                            "& input:-webkit-autofill:hover": {
                              WebkitBoxShadow: "0 0 0 1000px transparent inset",
                            },
                            "& input:-webkit-autofill:focus": {
                              WebkitBoxShadow: "0 0 0 1000px transparent inset",
                            },
                          },
                        }}
                      />
                      <StyledTextField
                        name="message"
                        label="Message"
                        fullWidth
                        required
                        multiline
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        error={!!fieldErrors.message}
                        helperText={fieldErrors.message}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            backgroundColor: "transparent",
                            "& textarea:-webkit-autofill": {
                              WebkitBoxShadow: "0 0 0 1000px transparent inset",
                            },
                          },
                        }}
                      />
                      <Button
                        type="submit"
                        variant="contained"
                        disabled={loading}
                        sx={{
                          ...commonButtonStyles,
                          whiteSpace: "nowrap",
                          mt: 1,
                        }}
                      >
                        {loading ? (
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <CircularProgress size={20} color="inherit" />
                            Sending...
                          </Box>
                        ) : (
                          "Send Message"
                        )}
                      </Button>
                    </Box>
                  </Box>

                {/* Google Maps */}
                <Box
                  sx={{
                    flex: { xs: "1 1 100%", lg: "1 1 50%" },
                    width: { xs: "100%", lg: "50%" },
                    height: { xs: "400px", lg: "auto" },
                    minHeight: { xs: "400px", lg: "100%" },
                    borderLeft: (theme) => ({
                      xs: "none",
                      lg: theme.palette.mode === 'dark' 
                        ? "1px solid rgba(255, 255, 255, 0.1)" 
                        : "1px solid rgba(0, 0, 0, 0.1)",
                    }),
                  }}
                >
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2028.5!2d24.7536!3d59.4370!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4692935b8b8b8b8b%3A0x8b8b8b8b8b8b8b8b!2sViru%20v%C3%A4ljak%2C%2010111%20Tallinn%2C%20Estonia!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0, display: "block" }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Head Office - Viru väljak, 10111 Tallinn, Estonia"
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

export default Contact;
