import React from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../context/AuthContext";
import {
  addFavorite,
  removeFavorite,
} from "../../store/slices/favorites/favoritesSlice";

function FavoriteButton({ type, itemId }) {
  const dispatch = useDispatch();
  const { token } = useAuth();
  const favorites = useSelector((state) => state.favorites.favorites);

  const isFavorite = favorites.some(
    (fav) => fav.favorite_type === type && fav.item_id == itemId
  );

  const handleToggleFavorite = () => {
    if (!token) return alert("Log in to add favorites");

    if (isFavorite) {
      dispatch(removeFavorite({ type, itemId, token }));
    } else {
      dispatch(addFavorite({ type, itemId, token }));
    }
  };
  return (
    <IconButton
      aria-label="favorite"
      onClick={handleToggleFavorite}
      sx={{
        color: "#ED310C",
        outline: "none",
        ":focus": { outline: "none" },
      }}
    >
      {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    </IconButton>
  );
}

export default FavoriteButton;
