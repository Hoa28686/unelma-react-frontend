import { Box } from "@mui/material";

const CenteredMessage = ({ children }) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "50vh",
    }}
  >
    {children}
  </Box>
);

export default CenteredMessage;
