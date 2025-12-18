import React from "react";
import { Box, Typography } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DescriptionIcon from "@mui/icons-material/Description";
import PaymentIcon from "@mui/icons-material/Payment";

const stats = [
  {
    number: "1M+",
    label: "Happy Users",
    icon: PersonAddIcon,
    gradient: "linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)",
  },
  {
    number: "3M+",
    label: "Total Downloads",
    icon: ShoppingCartIcon,
    gradient: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
  },
  {
    number: "2",
    label: "Awards Won",
    icon: DescriptionIcon,
    gradient: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
  },
  {
    number: "18",
    label: "Total Agents",
    icon: PaymentIcon,
    gradient: "linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)",
  },
];

function Stats() {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "100%",
        backgroundColor: (theme) => theme.palette.background.default,
        padding: { xs: "3rem 1rem", sm: "4rem 2rem", md: "5rem 3rem" },
        boxSizing: "border-box",
      }}
    >
      {/* Statistics Grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
          },
          gap: { xs: 2.5, sm: 3, md: 3 },
          width: "100%",
          maxWidth: "100%",
        }}
      >
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Box
              key={index}
              sx={{
                textAlign: "center",
                transition: "all 0.3s ease",
                "&:hover": {
                  "& .stat-icon": {
                    transform: "scale(1.1) rotate(5deg)",
                  },
                  "& .stat-number": {
                    background: stat.gradient,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  },
                },
              }}
            >
              {/* Icon with gradient background */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: { xs: "1rem", sm: "1.25rem" },
                }}
              >
                <Box
                  className="stat-icon"
                  sx={{
                    width: { xs: "56px", sm: "64px", md: "72px" },
                    height: { xs: "56px", sm: "64px", md: "72px" },
                    borderRadius: "50%",
                    background: stat.gradient,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: (theme) =>
                      theme.palette.mode === "dark"
                        ? `0 4px 12px rgba(0, 0, 0, 0.3)`
                        : `0 4px 12px rgba(59, 130, 246, 0.2)`,
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  <IconComponent
                    sx={{
                      fontSize: { xs: "1.75rem", sm: "2rem", md: "2.25rem" },
                      color: "#FFFFFF",
                    }}
                  />
                </Box>
              </Box>

              {/* Number with gradient text */}
              <Typography
                className="stat-number"
                variant="h2"
                component="div"
                sx={{
                  fontSize: { xs: "1.75rem", sm: "2rem", md: "2.25rem", lg: "2.5rem" },
                  fontWeight: 700,
                  color: (theme) => theme.palette.primary.main,
                  marginBottom: { xs: "0.5rem", sm: "0.75rem" },
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                {stat.number}
              </Typography>

              {/* Label */}
              <Typography
                variant="body1"
                component="div"
                sx={{
                  fontSize: { xs: "0.75rem", sm: "0.875rem", md: "0.9375rem" },
                  fontWeight: 500,
                  color: (theme) => theme.palette.text.secondary,
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                {stat.label}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

export default Stats;
