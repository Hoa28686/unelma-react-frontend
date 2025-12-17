import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCareers } from "../../store/slices/career/careerSlice";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
  CircularProgress,
  Button,
} from "@mui/material";
import LocationPinIcon from "@mui/icons-material/LocationPin";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { useNavigate } from "react-router";
import HandleBackButton from "../../components/HandleBackButton";

const ITEMS_PER_PAGE = 9; // Show 9 products per page

function Careers() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { jobs, loading, error } = useSelector((state) => state.careers);

  // fetch jobs on jobs.length is empty
  useEffect(() => {
    if (jobs.length === 0) {
      dispatch(fetchCareers());
      console.log(jobs);
    }
  }, [jobs, dispatch]);

  const handleCareerClick = (job) => {
    // handleItemClick(navigate, job, "jobs");
    // console.log("CLicked Job head or apply button", job.id);
    navigate(`/career/${job.id}`);
  };

  // main component render
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
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
            marginBottom: { xs: "2rem", sm: "3rem" },
            textAlign: "center",
          }}
        >
          Open positions now
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
              justifyContent: "center",
              alignItems: "center",
              minHeight: "400px",
            }}
          >
            <Typography variant="h4">Error loading Jobs: {error}</Typography>
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
                  justifyContent: "center",
                  alignItems: "center",
                  minHeight: "400px",
                  border: "2px solid red",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: (theme) => theme.palette.text.secondary,
                    textAlign: "center",
                  }}
                >
                  No Jobs at the moment
                </Typography>
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "center",
                  maxWidth: "1200px",
                  margin: "0 auto",
                }}
              >
                {jobs.map((job) => (
                  <Card
                    key={job.id}
                    sx={{
                      width: 350,
                      minHeight: 180,
                      m: 2,
                      position: "relative",
                    }}
                  >
                    <Box
                      sx={{
                        flexDirection: "column",
                        alignItems: "flex-start",
                        p: 0,
                      }}
                    >
                      <CardHeader
                        onClick={() => {
                          handleCareerClick(job);
                        }}
                        title={
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              flexWrap: "wrap",
                            }}
                          >
                            <Typography
                              variant="h4"
                              sx={{
                                flex: 1,
                                color: "primary.main",
                              }}
                            >
                              {job.name.length > 50
                                ? `${job.name.substring(0, 50)}...`
                                : job.name}
                            </Typography>
                          </Box>
                        }
                        sx={{ cursor: "pointer" }}
                      />
                      <CardContent sx={{ pt: 0 }}>
                        <Typography variant="h6" sx={{ flex: 1 }}>
                          {job.description.length > 200
                            ? `${job.description.substring(0, 100)}...`
                            : job.description}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            mt: 2,
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Box sx={{ display: "flex" }}>
                            <LocationPinIcon />
                            <Typography variant="p">
                              {job.location.includes(",")
                                ? `${job.location.split(",")[0]} +${job.location.split(",").length - 1}`
                                : job.location}
                            </Typography>
                          </Box>
                          <CardActions>
                            <Button
                              size="small"
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                border: "2px solid green",
                                transition: "all .3s ease",

                                "&:hover": {
                                  "& svg": {
                                    transform: "Translate(5px, -5px)",
                                    transition: "all .3s ease",
                                  },
                                },
                              }}
                              onClick={() => {
                                handleCareerClick(job);
                              }}
                            >
                              Apply
                              <ArrowOutwardIcon
                                sx={{
                                  fontSize: "18px",
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                }}
                              />
                            </Button>
                          </CardActions>
                        </Box>
                      </CardContent>
                    </Box>
                  </Card>
                ))}
              </Box>
            )}
          </>
        )}
      </Box>
    </Box>
  );
}

export default Careers;
