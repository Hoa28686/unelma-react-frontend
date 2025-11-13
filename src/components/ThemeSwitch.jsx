import { useTheme } from "../context/ThemeContext";
import { ThemeContext } from "@emotion/react";
import FlashlightOnIcon from "@mui/icons-material/FlashlightOn";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { IconButton } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";

const ThemeSwitch = () => {
  let { CurrentTheme, toogleTheme } = useTheme(ThemeContext);
  return (
    <>
      <IconButton
        aria-label="Example"
        onClick={toogleTheme}
        sx={{
          color: (theme) => theme.palette.text.primary,
          "&:hover": {
            color: (theme) => theme.palette.text.primary,
            backgroundColor: "transparent",
          },
          "&:focus": {
            outline: "none",
          },
          "&:focus-visible": {
            outline: "none",
          },
        }}
        disableRipple
      >
        {CurrentTheme == "dark" ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
    </>
  );
};

export default ThemeSwitch;
