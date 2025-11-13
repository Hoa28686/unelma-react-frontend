import React from "react";
import { useNavigate, useSearchParams } from "react-router";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HeroImage from "../../components/HeroImage";
import commonBackground from "../../assets/earthy_common_background.png";

function PaymentSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      <HeroImage imageSource={commonBackground} animate={false} />

      <Box
        sx={{
          position: "relative",
          zIndex: 1,
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
            <CheckCircleIcon
              sx={{
                fontSize: 80,
                color: "success.main",
                mb: 2,
              }}
            />
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
              Payment Successful!
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, color: "text.secondary" }}>
              Thank you for your purchase. Your payment has been processed successfully.
            </Typography>
            {sessionId && (
              <Typography variant="body2" sx={{ mb: 2, color: "text.secondary", fontStyle: "italic" }}>
                Session ID: {sessionId.substring(0, 20)}...
              </Typography>
            )}
            <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
              <Button
                variant="contained"
                onClick={() => navigate("/services")}
                sx={{
                  backgroundColor: (theme) => theme.palette.primary.main,
                  color: "#FFFFFF",
                  "&:hover": {
                    backgroundColor: (theme) => theme.palette.primary.dark,
                  },
                }}
              >
                Browse More Services
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate("/")}
                sx={{
                  borderColor: (theme) => theme.palette.primary.main,
                  color: (theme) => theme.palette.primary.main,
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

export default PaymentSuccess;
