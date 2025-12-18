import React from "react";
import { Box, Typography } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SendIcon from "@mui/icons-material/Send";
import DescriptionIcon from "@mui/icons-material/Description";
import PaymentIcon from "@mui/icons-material/Payment";

const processSteps = [
  {
    number: "1",
    title: "Register/ Login",
    icon: <PersonAddIcon sx={{ fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" } }} />,
  },
  {
    number: "2",
    title: "Select Product or Service",
    icon: <ShoppingCartIcon sx={{ fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" } }} />,
  },
  {
    number: "3",
    title: "Submit Your Order",
    icon: <SendIcon sx={{ fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" } }} />,
  },
  {
    number: "4",
    title: "Provide Contents",
    icon: <DescriptionIcon sx={{ fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" } }} />,
  },
  {
    number: "5",
    title: "Payment & Delivery",
    icon: <PaymentIcon sx={{ fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" } }} />,
  },
];

function WorkProcess() {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "100%",
        backgroundColor: (theme) => theme.palette.background.default,
        padding: { xs: "4rem 1rem", sm: "5rem 2rem", md: "6rem 3rem" },
        boxSizing: "border-box",
      }}
    >
      {/* Section Title */}
      <Typography
        variant="h2"
        component="h2"
        sx={{
          fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
          fontWeight: 700,
          color: (theme) => theme.palette.text.primary,
          textAlign: "center",
          marginBottom: { xs: "3rem", sm: "4rem" },
        }}
      >
        Work Process
      </Typography>

      {/* Process Steps */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: { xs: 3, sm: 4, md: 4 },
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        {processSteps.map((step, index) => (
          <Box
            key={index}
            sx={{
              flex: {
                xs: "1 1 100%",
                sm: "1 1 calc(50% - 16px)",
                md: "1 1 calc(20% - 16px)",
              },
              minWidth: { xs: "100%", sm: "200px", md: "180px" },
              maxWidth: { xs: "100%", sm: "none", md: "220px" },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              position: "relative",
            }}
          >
            {/* Step Number */}
            <Box
              sx={{
                width: { xs: "50px", sm: "60px", md: "70px" },
                height: { xs: "50px", sm: "60px", md: "70px" },
                borderRadius: "50%",
                backgroundColor: (theme) => theme.palette.primary.main,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1.5rem",
                fontWeight: 700,
                fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" },
                color: "#FFFFFF",
              }}
            >
              {step.number}
            </Box>

            {/* Icon */}
            <Box
              sx={{
                color: (theme) => theme.palette.primary.main,
                marginBottom: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {step.icon}
            </Box>

            {/* Step Title */}
            <Typography
              variant="h6"
              component="h3"
              sx={{
                fontSize: { xs: "1rem", sm: "1.125rem", md: "1.25rem" },
                fontWeight: 600,
                color: (theme) => theme.palette.text.primary,
              }}
            >
              {step.title}
            </Typography>

            {/* Connector Line (except for last item) */}
            {index < 4 && (
              <Box
                sx={{
                  display: { xs: "none", md: "block" },
                  position: "absolute",
                  top: { xs: "35px", md: "35px" },
                  left: "calc(100% + 8px)",
                  width: "calc(20% - 16px)",
                  height: "2px",
                  backgroundColor: (theme) => theme.palette.primary.main,
                  opacity: 0.3,
                }}
              />
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default WorkProcess;
