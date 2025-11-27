import { Box, Typography } from "@mui/material";
import React from "react";
import FavoriteButton from "./FavoriteButton";

function FavoriteButtonAndCount({ type, item }) {
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 0.5,
        ml: 1,
      }}
    >
      <FavoriteButton type={type} itemId={item.id} />
      {item.favorite_count > 0 && (
        <Typography variant="body2" color="text.secondary">
          {item.favorite_count}
        </Typography>
      )}
    </Box>
  );
}

export default FavoriteButtonAndCount;
