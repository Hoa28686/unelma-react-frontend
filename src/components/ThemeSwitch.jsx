import { useTheme } from "../context/ThemeContext";
import { ThemeContext } from "@emotion/react";
import FlashlightOnIcon from "@mui/icons-material/FlashlightOn";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { IconButton } from "@mui/material";

const ThemeSwitch = () => {
  let { CurrentTheme, toogleTheme } = useTheme(ThemeContext);
  return (
    <>
      <IconButton aria-label="Example" onClick={toogleTheme}>
        {CurrentTheme == "dark" ? <FlashlightOnIcon /> : <DarkModeIcon />}
      </IconButton>
    </>
  );
};

export default ThemeSwitch;
