import React, { useState } from "react";
import { Box, Typography, Card, Chip } from "@mui/material";
import { placeholderLogo } from "../../helpers/helpers";

const portfolioProjects = [
  {
    id: 1,
    name: "E-Commerce Platform",
    category: "Web development",
    image: "/e_commerce.png",
  },
  {
    id: 2,
    name: "Corporate Website Redesign",
    category: "Website Design",
    image: "/web_design.png",
  },
  {
    id: 3,
    name: "Healthcare Mobile App",
    category: "Mobile Development",
    image: "/mobile_app.png",
  },
  {
    id: 4,
    name: "Enterprise Security Suite",
    category: "Cyber Support",
    image: "/security.png",
  },
  {
    id: 5,
    name: "SaaS Dashboard",
    category: "Web development",
    image: placeholderLogo,
  },
  {
    id: 6,
    name: "Brand Identity Website",
    category: "Website Design",
    image: "/brand_identity.png",
  },
  {
    id: 7,
    name: "Fitness Tracking App",
    category: "Mobile Development",
    image: "/app.png",
  },
  {
    id: 8,
    name: "Network Security Audit",
    category: "Cyber Support",
    image: "/network_security.png",
  },
  {
    id: 9,
    name: "API Integration Platform",
    category: "Web development",
    image: "/api.png",
  },
];

const filterOptions = ["All", "Web development", "Website Design", "Mobile Development", "Cyber Support"];

function Portfolio() {
  const [selectedFilter, setSelectedFilter] = useState("All");

  const filteredProjects =
    selectedFilter === "All"
      ? portfolioProjects
      : portfolioProjects.filter((project) => project.category === selectedFilter);

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
        <Box sx={{ maxWidth: "1200px", margin: "0 auto" }}>
          {/* Section Title */}
          <Typography
        variant="h2"
        component="h2"
        sx={{
          fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
          fontWeight: 700,
          color: (theme) => theme.palette.text.primary,
          textAlign: "center",
          marginBottom: { xs: "1rem", sm: "1.5rem" },
        }}
      >
        Our Portfolio
      </Typography>

      {/* Recent Works Subtitle */}
      <Typography
        variant="h5"
        component="h3"
        sx={{
          fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" },
          fontWeight: 500,
          color: (theme) => theme.palette.text.secondary,
          textAlign: "center",
          marginBottom: { xs: "2rem", sm: "3rem" },
        }}
      >
        Recent Works
      </Typography>

      {/* Filter Chips */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: { xs: 1, sm: 1.5 },
          marginBottom: { xs: "3rem", sm: "4rem" },
        }}
      >
        {filterOptions.map((filter) => (
          <Chip
            key={filter}
            label={filter}
            clickable
            onClick={() => setSelectedFilter(filter)}
            sx={{
              fontSize: { xs: "0.875rem", sm: "1rem" },
              padding: { xs: "0.5rem 1rem", sm: "0.75rem 1.5rem" },
              height: "auto",
              backgroundColor: (theme) =>
                selectedFilter === filter
                  ? theme.palette.primary.main
                  : theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.1)"
                  : "rgba(0, 0, 0, 0.06)",
              color: (theme) =>
                selectedFilter === filter ? "#FFFFFF" : theme.palette.text.primary,
              border: (theme) =>
                selectedFilter === filter
                  ? `1px solid ${theme.palette.primary.main}`
                  : theme.palette.mode === "dark"
                  ? "1px solid rgba(255, 255, 255, 0.1)"
                  : "1px solid rgba(0, 0, 0, 0.1)",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: (theme) =>
                  selectedFilter === filter
                    ? theme.palette.primary.main
                    : theme.palette.mode === "dark"
                    ? "rgba(255, 255, 255, 0.15)"
                    : "rgba(0, 0, 0, 0.1)",
                borderColor: (theme) => theme.palette.primary.main,
              },
            }}
          />
        ))}
      </Box>

      {/* Portfolio Grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
          gap: { xs: 2, sm: 2.5, md: 3 },
          width: "100%",
          maxWidth: "100%",
        }}
      >
        {filteredProjects.map((project) => (
          <Card
            key={project.id}
            sx={{
              aspectRatio: "4/3",
              backgroundColor: (theme) =>
                theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.05)"
                  : "rgba(0, 0, 0, 0.03)",
              border: (theme) =>
                theme.palette.mode === "dark"
                  ? "1px solid rgba(255, 255, 255, 0.1)"
                  : "1px solid rgba(0, 0, 0, 0.1)",
              borderRadius: 2,
              overflow: "hidden",
              position: "relative",
              transition: "all 0.3s ease",
              cursor: "pointer",
              "&:hover": {
                transform: "translateY(-4px)",
                borderColor: (theme) => theme.palette.primary.main,
                boxShadow: (theme) =>
                  theme.palette.mode === "light"
                    ? "0 4px 12px rgba(0, 0, 0, 0.1)"
                    : "0 8px 32px rgba(0, 0, 0, 0.3)",
                "& .portfolio-overlay": {
                  backdropFilter: "blur(0px)",
                  WebkitBackdropFilter: "blur(0px)",
                  opacity: 0,
                },
              },
            }}
          >
            <Box
              component="img"
              src={project.image}
              alt={project.name}
              onError={(e) => {
                e.target.src = placeholderLogo;
              }}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "opacity 0.3s ease",
              }}
            />
            {/* Blur overlay to mute image by default - fades on hover to reveal image */}
            <Box
              className="portfolio-overlay"
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: (theme) =>
                  theme.palette.mode === "light"
                    ? "rgba(0, 0, 0, 0.03)"
                    : "rgba(10, 15, 28, 0.85)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                pointerEvents: "none",
                zIndex: 1,
                transition: "backdrop-filter 0.3s ease, opacity 0.3s ease, background-color 0.3s ease",
              }}
            />
            {/* Always visible project name and chip at bottom */}
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: { xs: "1rem", sm: "1.25rem" },
                display: "flex",
                flexDirection: "column",
                gap: 0.75,
                zIndex: 2,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontSize: { xs: "0.9375rem", sm: "1rem" },
                  fontWeight: 600,
                  color: "#FFFFFF",
                  lineHeight: 1.2,
                }}
              >
                {project.name}
              </Typography>
              <Chip
                label={project.category}
                size="small"
                sx={{
                  fontSize: "0.75rem",
                  backgroundColor: (theme) => theme.palette.primary.main,
                  color: "#FFFFFF",
                  height: 24,
                  width: "fit-content",
                  alignSelf: "flex-start",
                }}
              />
            </Box>
          </Card>
        ))}
      </Box>
        </Box>
    </Box>
  );
}

export default Portfolio;
