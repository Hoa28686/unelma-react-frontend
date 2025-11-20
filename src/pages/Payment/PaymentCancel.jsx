import React from "react";
import { useNavigate } from "react-router";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

function PaymentCancel() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        backgroundColor: (theme) => theme.palette.background.default,
      }}
    >
      <Box
        sx={{
          position: "relative",
          minHeight: "100vh",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: { xs: "2rem 1rem", sm: "3rem 2rem", md: "4rem 3rem" },
        }}
      >
        <Card
          sx={{
            maxWidth: { xs: "100%", sm: "600px" },
            width: "100%",
            p: 4,
            textAlign: "center",
          }}
        >
          <CardContent>
            <CancelIcon
              sx={{
                fontSize: 80,
                color: "error.main",
                mb: 2,
              }}
            />
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
              Payment Cancelled
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, color: "text.secondary" }}>
              Your payment was cancelled. No charges have been made to your account.
            </Typography>
            <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
              <Button
                variant="contained"
                onClick={() => navigate("/services")}
                startIcon={<ArrowBackIosIcon />}
                sx={{
                  backgroundColor: (theme) => theme.palette.primary.main,
                  color: "#FFFFFF",
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
                  "&:hover": {
                    backgroundColor: (theme) => theme.palette.primary.dark,
                  },
                }}
              >
                Back to Services
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate("/")}
                sx={{
                  borderColor: (theme) => theme.palette.primary.main,
                  color: (theme) => theme.palette.primary.main,
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
                }}
              >
                Go to Home
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

export default PaymentCancel;

