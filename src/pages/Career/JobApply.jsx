import {
  Alert,
  Box,
  Button,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import { API } from "../../api";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const JobApply = ({ career_id }) => {
  const [personalDetails, setPersonalDetails] = useState({});
  const [isApplied, setIsApplied] = useState(false);
  function handleChange(e) {
    const { name, value } = e.target;
    setPersonalDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
    // console.log(e.target.name, e.target.value);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    console.log(personalDetails);
    const formData = new FormData();
    formData.append("CV", personalDetails.CV);
    formData.append("name", personalDetails.name);
    formData.append("email", personalDetails.email);
    formData.append("cover_letter", personalDetails.cover_letter);
    formData.append("career_id", career_id);
    try {
      const res = await axios.post(API.careers, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      });
      console.log(res);
      setIsApplied(true);
    } catch (err) {
      console.error(err.response.data);
    }

    console.log("clicked apply");
  }

  //Snack bar for applied
  function handleClose() {
    setTimeout(() => {
      setIsApplied(false);
    }, 3000);
  }
  useEffect(() => {
    if (isApplied) {
      handleClose();
    }
  }, [isApplied]);
  return (
    <Box>
      <Typography color="white">hello world: Job apply here</Typography>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexDirection: "column",
        }}
        component="form"
        // onChange={handleChange}
      >
        <TextField
          id="outlined-basic"
          label="Enter Your Name"
          variant="outlined"
          name="name"
          onChange={handleChange}
        />
        <TextField
          id="outlined-basic"
          label="Enter Your EMAIL"
          variant="outlined"
          name="email"
          onChange={handleChange}
        />
        <TextField
          id="outlined-multiline-flexible"
          label="Free form Cover letter"
          multiline
          name="cover_letter"
          rows={10}
          onChange={handleChange}
        />
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
        >
          Upload CV
          <VisuallyHiddenInput
            type="file"
            name="CV"
            accept="application/pdf"
            onChange={(e) => {
              setPersonalDetails((prev) => ({
                ...prev,
                CV: e.target.files[0],
              }));
            }}
          />
        </Button>
        <Button type="submit" onClick={handleSubmit}>
          Submit
        </Button>
        <Snackbar
          open={isApplied}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            variant="filled"
            sx={{ width: "100%" }}
          >
            Your Application has been received!
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default JobApply;
