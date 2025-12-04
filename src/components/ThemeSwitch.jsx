import { useTheme } from "../context/ThemeContext";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { IconButton } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";

const ThemeSwitch = () => {
  const { CurrentTheme, toggleTheme } = useTheme();
  return (
    <>
      <IconButton
        aria-label="Toggle theme"
        onClick={toggleTheme}
        sx={{
          color: (theme) => theme.palette.mode === 'dark' ? '#000000' : '#FFFFFF',
          "&:hover": {
            color: (theme) => theme.palette.mode === 'dark' ? '#000000' : '#FFFFFF',
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
