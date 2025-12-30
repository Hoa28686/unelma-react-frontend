import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCareers } from "../../store/slices/career/careerSlice";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Button,
  Chip,
  Alert,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkIcon from "@mui/icons-material/Work";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router";
import HandleBackButton from "../../components/HandleBackButton";

function Careers() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { jobs, loading, error } = useSelector((state) => state.careers);

  useEffect(() => {
    if (jobs.length === 0) {
      dispatch(fetchCareers());
    }
  }, [jobs, dispatch]);

  const handleCareerClick = (job) => {
    navigate(`/career/${job.id}`);
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        backgroundColor: (theme) => theme.palette.background.default,
      }}
    >
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
          {/* Page Title */}
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              fontWeight: 700,
              color: (theme) => theme.palette.text.primary,
              marginBottom: { xs: "1rem", sm: "1.5rem" },
              textAlign: "center",
            }}
          >
            Open Positions
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: "1rem", sm: "1.125rem" },
              color: (theme) => theme.palette.text.secondary,
              textAlign: "center",
              marginBottom: { xs: "2rem", sm: "3rem" },
              maxWidth: "600px",
              margin: "0 auto",
              mb: { xs: 4, sm: 5 },
            }}
          >
            Join our team and help us build the future of technology
          </Typography>

          {/* Loading State */}
          {loading && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "400px",
              }}
            >
              <CircularProgress />
            </Box>
          )}

          {/* Error State */}
          {error && !loading && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "400px",
                gap: 2,
              }}
            >
              <Alert severity="error" sx={{ mb: 2 }}>
                Error loading jobs: {error}
              </Alert>
              <HandleBackButton content="Home" link="/" />
            </Box>
          )}

          {/* Jobs Grid */}
          {!loading && !error && (
            <>
              {jobs.length === 0 ? (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "300px",
                    backgroundColor: (theme) =>
                      theme.palette.mode === "dark"
                        ? "rgba(255, 255, 255, 0.05)"
                        : "rgba(0, 0, 0, 0.02)",
                    borderRadius: 3,
                    border: (theme) => `1px dashed ${theme.palette.divider}`,
                  }}
                >
                  <WorkIcon
                    sx={{
                      fontSize: "3rem",
                      color: (theme) => theme.palette.text.secondary,
                      mb: 2,
                    }}
                  />
                  <Typography
                    variant="h6"
                    sx={{
                      color: (theme) => theme.palette.text.secondary,
                      textAlign: "center",
                    }}
                  >
                    No open positions at the moment
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: (theme) => theme.palette.text.secondary,
                      textAlign: "center",
                      mt: 1,
                    }}
                  >
                    Check back later for new opportunities
                  </Typography>
                </Box>
              ) : (
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "1fr",
                      sm: "repeat(2, 1fr)",
                      lg: "repeat(3, 1fr)",
                    },
                    gap: { xs: 2, sm: 3 },
                  }}
                >
                  {jobs.map((job) => (
                    <Card
                      key={job.id}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        backgroundColor: (theme) =>
                          theme.palette.mode === "light"
                            ? "rgba(0, 0, 0, 0.03)"
                            : "transparent",
                        border: (theme) =>
                          theme.palette.mode === "dark"
                            ? "1px solid rgba(255, 255, 255, 0.1)"
                            : "1px solid rgba(0, 0, 0, 0.1)",
                        borderRadius: 3,
                        transition: "all 0.3s ease",
                        cursor: "pointer",
                        boxShadow: (theme) =>
                          theme.palette.mode === "light"
                            ? "0 2px 8px rgba(0, 0, 0, 0.05)"
                            : "none",
                        "&:hover": {
                          transform: "translateY(-4px)",
                          borderColor: (theme) => theme.palette.primary.main,
                          boxShadow: (theme) =>
                            theme.palette.mode === "light"
                              ? "0 4px 12px rgba(0, 0, 0, 0.1)"
                              : "0 8px 32px rgba(0, 0, 0, 0.3)",
                        },
                      }}
                      onClick={() => handleCareerClick(job)}
                    >
                      <CardContent
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          flex: 1,
                          p: { xs: 2.5, sm: 3 },
                        }}
                      >
                        {/* Job Icon */}
                        <Box
                          sx={{
                            width: 48,
                            height: 48,
                            borderRadius: 2,
                            backgroundColor: (theme) =>
                              `${theme.palette.primary.main}15`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mb: 2,
                          }}
                        >
                          <WorkIcon
                            sx={{
                              color: (theme) => theme.palette.primary.main,
                              fontSize: "1.5rem",
                            }}
                          />
                        </Box>

                        {/* Job Title */}
                        <Typography
                          variant="h5"
                          sx={{
                            fontWeight: 600,
                            color: (theme) => theme.palette.text.primary,
                            mb: 1.5,
                            fontSize: { xs: "1.1rem", sm: "1.25rem" },
                          }}
                        >
                          {job.name.length > 50
                            ? `${job.name.substring(0, 50)}...`
                            : job.name}
                        </Typography>

                        {/* Job Description */}
                        <Typography
                          variant="body2"
                          sx={{
                            color: (theme) => theme.palette.text.secondary,
                            mb: 2,
                            flex: 1,
                            lineHeight: 1.6,
                          }}
                        >
                          {job.description.length > 150
                            ? `${job.description.substring(0, 150)}...`
                            : job.description}
                        </Typography>

                        {/* Location and Apply Button */}
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mt: "auto",
                            pt: 2,
                            borderTop: (theme) =>
                              `1px solid ${theme.palette.divider}`,
                          }}
                        >
                          <Chip
                            icon={
                              <LocationOnIcon
                                sx={{ fontSize: "1rem !important" }}
                              />
                            }
                            label={
                              job.location.includes(",")
                                ? `${job.location.split(",")[0]} +${
                                    job.location.split(",").length - 1
                                  }`
                                : job.location
                            }
                            size="small"
                            sx={{
                              backgroundColor: (theme) =>
                                theme.palette.mode === "dark"
                                  ? "rgba(255, 255, 255, 0.1)"
                                  : "rgba(0, 0, 0, 0.06)",
                              color: (theme) => theme.palette.text.secondary,
                              "& .MuiChip-icon": {
                                color: (theme) => theme.palette.text.secondary,
                              },
                            }}
                          />
                          <Button
                            size="small"
                            endIcon={<ArrowForwardIcon />}
                            sx={{
                              textTransform: "none",
                              fontWeight: 600,
                              color: (theme) => theme.palette.primary.main,
                              "&:hover": {
                                backgroundColor: (theme) =>
                                  `${theme.palette.primary.main}10`,
                              },
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCareerClick(job);
                            }}
                          >
                            Apply Now
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              )}
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default Careers;
