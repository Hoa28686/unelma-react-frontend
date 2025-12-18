import React, { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Snackbar,
  Typography,
  CircularProgress,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SendIcon from "@mui/icons-material/Send";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import axios from "axios";
import { API } from "../../api";
import StyledTextField from "../../components/StyledTextField";

const JobApply = ({ career_id, jobName }) => {
  const [personalDetails, setPersonalDetails] = useState({
    name: "",
    email: "",
    cover_letter: "",
    CV: null,
  });
  const [isApplied, setIsApplied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setPersonalDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData();
    formData.append("CV", personalDetails.CV);
    formData.append("name", personalDetails.name);
    formData.append("email", personalDetails.email);
    formData.append("cover_letter", personalDetails.cover_letter);
    formData.append("career_id", career_id);

    try {
      await axios.post(API.careers, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      });
      setIsApplied(true);
      // Reset form
      setPersonalDetails({
        name: "",
        email: "",
        cover_letter: "",
        CV: null,
      });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleClose() {
    setIsApplied(false);
  }

  useEffect(() => {
    if (isApplied) {
      const timer = setTimeout(() => {
        setIsApplied(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isApplied]);

  return (
    <Card
      elevation={0}
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "dark"
            ? "transparent"
            : theme.palette.background.paper,
        border: (theme) =>
          theme.palette.mode === "dark"
            ? "1px solid rgba(255, 255, 255, 0.1)"
            : "1px solid rgba(0, 0, 0, 0.1)",
        borderRadius: 3,
      }}
    >
      <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            color: (theme) => theme.palette.text.primary,
            mb: 1,
          }}
        >
          Apply for this Position
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: (theme) => theme.palette.text.secondary,
            mb: 3,
          }}
        >
          Fill out the form below to submit your application
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2.5,
          }}
        >
          <StyledTextField
            label="Full Name"
            name="name"
            value={personalDetails.name}
            onChange={handleChange}
            required
            fullWidth
          />

          <StyledTextField
            label="Email Address"
            name="email"
            type="email"
            value={personalDetails.email}
            onChange={handleChange}
            required
            fullWidth
          />

          <StyledTextField
            label="Cover Letter"
            name="cover_letter"
            value={personalDetails.cover_letter}
            onChange={handleChange}
            multiline
            rows={6}
            required
            fullWidth
            placeholder="Tell us why you're interested in this position and what makes you a great fit..."
          />

          {/* CV Upload */}
          <Box>
            <Typography
              variant="body2"
              sx={{
                color: (theme) => theme.palette.text.secondary,
                mb: 1,
              }}
            >
              Resume/CV (PDF) *
            </Typography>
            <Button
              component="label"
              variant="outlined"
              fullWidth
              startIcon={
                personalDetails.CV ? (
                  <InsertDriveFileIcon />
                ) : (
                  <CloudUploadIcon />
                )
              }
              sx={{
                py: 2,
                borderStyle: "dashed",
                borderColor: (theme) =>
                  personalDetails.CV
                    ? theme.palette.success.main
                    : theme.palette.mode === "dark"
                    ? "rgba(255, 255, 255, 0.2)"
                    : "rgba(0, 0, 0, 0.23)",
                backgroundColor: (theme) =>
                  personalDetails.CV
                    ? theme.palette.mode === "dark"
                      ? "rgba(46, 125, 50, 0.1)"
                      : "rgba(46, 125, 50, 0.05)"
                    : "transparent",
                color: (theme) =>
                  personalDetails.CV
                    ? theme.palette.success.main
                    : theme.palette.text.secondary,
                textTransform: "none",
                "&:hover": {
                  borderColor: (theme) => theme.palette.primary.main,
                  backgroundColor: (theme) =>
                    theme.palette.mode === "dark"
                      ? "rgba(255, 255, 255, 0.05)"
                      : "rgba(0, 0, 0, 0.02)",
                },
              }}
            >
              {personalDetails.CV
                ? personalDetails.CV.name
                : "Click to upload your CV"}
              <input
                type="file"
                name="CV"
                accept="application/pdf"
                hidden
                onChange={(e) => {
                  setPersonalDetails((prev) => ({
                    ...prev,
                    CV: e.target.files[0],
                  }));
                }}
              />
            </Button>
          </Box>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={
              isSubmitting ||
              !personalDetails.name ||
              !personalDetails.email ||
              !personalDetails.cover_letter ||
              !personalDetails.CV
            }
            startIcon={
              isSubmitting ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <SendIcon />
              )
            }
            sx={{
              py: 1.5,
              mt: 1,
              textTransform: "none",
              fontWeight: 600,
              fontSize: "1rem",
              "&:disabled": {
                opacity: 0.6,
              },
            }}
          >
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </Button>
        </Box>

        <Snackbar
          open={isApplied}
          autoHideDuration={5000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            variant="filled"
            icon={<CheckCircleIcon />}
            sx={{ width: "100%" }}
          >
            Your application has been submitted successfully!
          </Alert>
        </Snackbar>
      </CardContent>
    </Card>
  );
};

export default JobApply;
