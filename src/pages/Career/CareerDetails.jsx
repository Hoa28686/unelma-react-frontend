import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Chip from "@mui/material/Chip";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { fetchCareers } from "../../store/slices/career/careerSlice";
import JobApply from "./JobApply";
import ParagraphText from "../../components/blog/ParagraphText";

const CareerDetails = () => {
  let { id } = useParams();
  const [selectedJob, setSelectedJob] = useState(null);
  //   console.log("Id of career is", id);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { jobs, loading, error } = useSelector((state) => state.careers);
  // console.log(jobs);

  // fetch jobs on jobs.length is empty
  useEffect(() => {
    if (jobs.length === 0) {
      dispatch(fetchCareers());
    }
  }, [jobs, dispatch]);

  //Set selected Job now
  useEffect(() => {
    if (jobs.length > 0) {
      setSelectedJob(jobs.find((job) => job.id == id));
    }
  }, [jobs]);

  //   console.log(jobs);
  // console.log("single job is:", selectedJob);
  function getProperDate(date) {
    let dates = new Date(date);
    console.log(new Date().getMonth());
    if (dates.getFullYear() - new Date().getFullYear() == 0) {
      if (dates.getMonth() - (new Date().getMonth() + 1) == 0) {
        if (dates.getDay() - new Date().getDay() < 30) {
          return `${dates.getDay() - new Date().getDay()} Days ago`;
        }
      } else {
        return `${dates.getMonth() - (new Date().getMonth() + 1)} Months ago`;
      }
    } else {
      return `${Number(dates.getFullYear() - new Date().getFullYear())} Years ago`;
    }
  }
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
        <Typography variant="h3" color="white">
          Our Job:
        </Typography>

        {selectedJob && (
          <>
            <Typography variant="h2" color="white">
              {selectedJob.name}
            </Typography>
            <Chip label={getProperDate(selectedJob.created_at)} />
            <Box sx={{ display: "flex", gap: 3 }} color="white">
              Location:
              {selectedJob.location}
            </Box>
            m: 0,
            <ParagraphText text={selectedJob?.description} />
            {/* //Job apply here */}
            <JobApply career_id={selectedJob.id}></JobApply>
          </>
        )}
      </Box>
    </Box>
  );
};

export default CareerDetails;
