import { Typography } from "@mui/material";
import React from "react";

function ParagraphText({ text, variant = "body1" }) {
  if (!text) return null;

  const normalizedText = text.replace(/\\n/g, "\n");

  return normalizedText.split("\n").map((paragraph, index) => (
    <Typography
      variant={variant}
      key={index}
      sx={{ color: (theme) => theme.palette.text.primary }}
    >
      {paragraph.trim()}
    </Typography>
  ));
}

export default ParagraphText;
