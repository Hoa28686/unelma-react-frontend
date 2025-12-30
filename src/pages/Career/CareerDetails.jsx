import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { fetchCareers } from "../../store/slices/career/careerSlice";
import JobApply from "./JobApply";
import HandleBackButton from "../../components/HandleBackButton";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkIcon from "@mui/icons-material/Work";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const CareerDetails = () => {
  const { id } = useParams();
  const [selectedJob, setSelectedJob] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { jobs, loading, error } = useSelector((state) => state.careers);

  useEffect(() => {
    if (jobs.length === 0) {
      dispatch(fetchCareers());
    }
  }, [jobs, dispatch]);

  useEffect(() => {
    if (jobs.length > 0) {
      const job = jobs.find((job) => job.id == id);
      setSelectedJob(job);
    }
  }, [jobs, id]);

  // Loading state
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "50vh",
          backgroundColor: (theme) => theme.palette.background.default,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // Error state
  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "50vh",
          gap: 2,
          backgroundColor: (theme) => theme.palette.background.default,
        }}
      >
        <Alert severity="error" sx={{ mb: 2 }}>
          Error loading job details: {error}
        </Alert>
        <HandleBackButton content="Careers" link="/career" />
      </Box>
    );
  }

  // Job not found
  if (!selectedJob && !loading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "50vh",
          gap: 2,
          backgroundColor: (theme) => theme.palette.background.default,
        }}
      >
        <Typography
          variant="h5"
          sx={{ color: (theme) => theme.palette.text.secondary }}
        >
          Job not found
        </Typography>
        <HandleBackButton content="Careers" link="/career" />
      </Box>
    );
  }

  // Helper function to format date as relative time
  function getProperDate(date) {
    const dates = new Date(date);
    const now = new Date();
    const diffTime = Math.abs(now - dates);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 1) return "Today";
    if (diffDays === 1) return "1 day ago";
    if (diffDays < 30) return `${diffDays} days ago`;
    if (diffDays < 60) return "1 month ago";
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    if (diffDays < 730) return "1 year ago";
    return `${Math.floor(diffDays / 365)} years ago`;
  }

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        backgroundColor: (theme) => theme.palette.background.default,
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          backgroundColor: (theme) =>
            theme.palette.mode === "dark"
              ? "rgba(255, 255, 255, 0.03)"
              : "rgba(0, 0, 0, 0.02)",
          py: { xs: 4, sm: 6, md: 8 },
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <Box
          sx={{
            maxWidth: "1200px",
            margin: "0 auto",
            px: { xs: 2, sm: 3, md: 4 },
          }}
        >
          {/* Back Button */}
          <Box sx={{ mb: 3 }}>
            <HandleBackButton content="Careers" link="/career" />
          </Box>

          {/* Job Icon */}
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: 3,
              backgroundColor: (theme) => `${theme.palette.primary.main}15`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 3,
            }}
          >
            <WorkIcon
              sx={{
                color: (theme) => theme.palette.primary.main,
                fontSize: "2rem",
              }}
            />
          </Box>

          {/* Job Title */}
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontSize: { xs: "1.75rem", sm: "2.25rem", md: "2.75rem" },
              fontWeight: 700,
              color: (theme) => theme.palette.text.primary,
              mb: 2,
            }}
          >
            {selectedJob?.name}
          </Typography>

          {/* Job Meta */}
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <Chip
              icon={<LocationOnIcon />}
              label={selectedJob?.location}
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === "dark"
                    ? "rgba(255, 255, 255, 0.1)"
                    : "rgba(0, 0, 0, 0.06)",
                color: (theme) => theme.palette.text.primary,
                "& .MuiChip-icon": {
                  color: (theme) => theme.palette.primary.main,
                },
              }}
            />
            <Chip
              icon={<AccessTimeIcon />}
              label={selectedJob?.created_at ? getProperDate(selectedJob.created_at) : "Full-time"}
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === "dark"
                    ? "rgba(255, 255, 255, 0.1)"
                    : "rgba(0, 0, 0, 0.06)",
                color: (theme) => theme.palette.text.primary,
                "& .MuiChip-icon": {
                  color: (theme) => theme.palette.primary.main,
                },
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* Content */}
      <Box
        sx={{
          width: "100%",
          padding: { xs: "2rem 1rem", sm: "3rem 2rem", md: "4rem 3rem" },
        }}
      >
        <Box
          sx={{
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <Grid container spacing={4}>
            {/* Left Column - Job Details */}
            <Grid size={{ xs: 12, md: 7 }}>
              <Card
                elevation={0}
                sx={{
                  backgroundColor: (theme) =>
                    theme.palette.mode === "light"
                      ? "rgba(0, 0, 0, 0.03)"
                      : "transparent",
                  border: (theme) =>
                    theme.palette.mode === "dark"
                      ? "1px solid rgba(255, 255, 255, 0.1)"
                      : "1px solid rgba(0, 0, 0, 0.1)",
                  borderRadius: 3,
                  boxShadow: (theme) =>
                    theme.palette.mode === "light"
                      ? "0 2px 8px rgba(0, 0, 0, 0.05)"
                      : "none",
                }}
              >
                <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 600,
                      color: (theme) => theme.palette.text.primary,
                      mb: 2,
                    }}
                  >
                    Job Description
                  </Typography>
                  <Divider sx={{ mb: 3 }} />
                  <Typography
                    variant="body1"
                    sx={{
                      color: (theme) => theme.palette.text.secondary,
                      lineHeight: 1.8,
                      whiteSpace: "pre-line",
                    }}
                  >
                    {selectedJob?.description}
                  </Typography>

                  {selectedJob?.requirements && (
                    <>
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: 600,
                          color: (theme) => theme.palette.text.primary,
                          mt: 4,
                          mb: 2,
                        }}
                      >
                        Requirements
                      </Typography>
                      <Divider sx={{ mb: 3 }} />
                      <Typography
                        variant="body1"
                        sx={{
                          color: (theme) => theme.palette.text.secondary,
                          lineHeight: 1.8,
                          whiteSpace: "pre-line",
                        }}
                      >
                        {selectedJob.requirements}
                      </Typography>
                    </>
                  )}
                </CardContent>
              </Card>
            </Grid>

            {/* Right Column - Application Form */}
            <Grid size={{ xs: 12, md: 5 }}>
              <Box
                sx={{
                  position: { md: "sticky" },
                  top: { md: "2rem" },
                }}
              >
                <JobApply career_id={selectedJob?.id} jobName={selectedJob?.name} />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default CareerDetails;
