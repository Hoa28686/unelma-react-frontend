import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

export default function HandleBackButton({ content, link }) {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(link);
  };
  return (
    <Button
      variant="text"
      onClick={handleBack}
      startIcon={<ArrowBackIosIcon />}
      sx={{
        textTransform: "none",
        color: "secondary.main",
        m: 2,
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
        ":hover": { textDecoration: "underline" },
      }}
    >
      Back to {content}
    </Button>
  );
}
