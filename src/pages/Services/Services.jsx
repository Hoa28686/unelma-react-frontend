import React, { useState, useMemo } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Pagination,
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import SecurityIcon from "@mui/icons-material/Security";
import StorageIcon from "@mui/icons-material/Storage";
import ScienceIcon from "@mui/icons-material/Science";
import CloudIcon from "@mui/icons-material/Cloud";
import PsychologyIcon from "@mui/icons-material/Psychology";
import { useNavigate } from "react-router";
import HeroImage from "../../components/HeroImage";
import commonBackground from "../../assets/earthy_common_background.png";

// Hardcoded services data with icons
const servicesData = [
  {
    id: 1,
    name: "Cyber Security",
    description: "We help with cyber security tools and services",
    icon: SecurityIcon,
  },
  {
    id: 2,
    name: "Data Management",
    description: "We at Unelma Platforms can help you with different types of data management products and services.",
    icon: StorageIcon,
  },
  {
    id: 3,
    name: "Data Science",
    description: "Previously, we have developed AI-powered email applications which have scaled to millions of users and subscribers. Feel free to contact us if you would need help with data science-related services.",
    icon: ScienceIcon,
  },
  {
    id: 4,
    name: "Cloud Service",
    description: "We are masters of cloud services as we have developed one of the platforms called \"Unelma Cloud\".",
    icon: CloudIcon,
  },
  {
    id: 5,
    name: "AI and machine learning",
    description: "We deliver AI-driven solutions to our clients by providing world-class AI expertise and tooling for computer vision, natural language processing and machine learning.",
    icon: PsychologyIcon,
  },
];

const ITEMS_PER_PAGE = 3; // Show 3 services per page

// Service ID mapping
const serviceIdMap = {
  1: "cyber-security",
  2: "data-management",
  3: "data-science",
  4: "cloud-service",
  5: "ai-machine-learning",
};

function Services() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter services based on search query
  const filteredServices = useMemo(() => {
    if (!searchQuery.trim()) return servicesData;

    const query = searchQuery.toLowerCase().trim();
    const searchTerms = query.split(" ").filter((term) => term.length > 0);

    return servicesData.filter((service) => {
      const searchableText = [service.name, service.description]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchTerms.some((term) => searchableText.includes(term));
    });
  }, [searchQuery]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredServices.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedServices = filteredServices.slice(startIndex, endIndex);

  // Reset to page 1 when search changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };


  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      {/* Hero Image - static, no animation */}
      <HeroImage imageSource={commonBackground} animate={false} />

      {/* Content overlay */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
          width: "100%",
          padding: { xs: "2rem 1rem", sm: "3rem 2rem", md: "4rem 3rem" },
        }}
      >
        <Box
          sx={{
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {/* Page Title */}
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              fontWeight: 700,
              color: (theme) => theme.palette.text.primary,
              marginBottom: { xs: "2rem", sm: "3rem" },
              textAlign: "center",
            }}
          >
            Our Services
          </Typography>

          {/* Search Bar */}
          <Box
            sx={{
              marginBottom: { xs: "2rem", sm: "3rem" },
            }}
          >
            <TextField
              fullWidth
              placeholder="Search services by name or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchOutlinedIcon
                      sx={{
                        color: (theme) => theme.palette.text.secondary,
                      }}
                    />
                  </InputAdornment>
                ),
                endAdornment: searchQuery && (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      onClick={() => setSearchQuery("")}
                      sx={{
                        color: (theme) => theme.palette.text.secondary,
                      }}
                    >
                      <ClearOutlinedIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ),
                sx: {
                  backgroundColor: (theme) =>
                    theme.palette.mode === "light"
                      ? "#FFFFFF"
                      : theme.palette.background.paper,
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: (theme) =>
                      theme.palette.mode === "dark"
                        ? "rgba(255, 255, 255, 0.2)"
                        : "rgba(0, 0, 0, 0.23)",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#E57A44",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#E57A44",
                    borderWidth: "2px",
                  },
                },
              }}
            />
            {searchQuery && (
              <Typography
                variant="body2"
                sx={{
                  mt: 1,
                  color: (theme) => theme.palette.text.secondary,
                }}
              >
                {filteredServices.length === 0
                  ? "No services found"
                  : `Found ${filteredServices.length} service${filteredServices.length !== 1 ? "s" : ""}`}
              </Typography>
            )}
          </Box>

          {/* Services Grid */}
          {filteredServices.length === 0 && searchQuery ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "400px",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: (theme) => theme.palette.text.secondary,
                  textAlign: "center",
                }}
              >
                No services match your search "{searchQuery}"
              </Typography>
            </Box>
          ) : (
            <>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "repeat(2, 1fr)",
                    md: "repeat(3, 1fr)",
                  },
                  gap: { xs: 2, sm: 3, md: 4 },
                  marginBottom: { xs: "2rem", sm: "3rem" },
                }}
              >
                {paginatedServices.map((service) => (
                  <Card
                    key={service.id}
                    onClick={() => {
                      const serviceId = serviceIdMap[service.id];
                      navigate(`/services/${serviceId}`);
                    }}
                    sx={{
                      backgroundColor: (theme) =>
                        theme.palette.mode === "light"
                          ? "#B0D0B5"
                          : theme.palette.background.paper,
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: 2,
                      transition: "all 0.3s ease",
                      overflow: "hidden",
                      cursor: "pointer",
                      "&:hover": {
                        borderColor: "#E57A44",
                        transform: "translateY(-4px)",
                      },
                    }}
                  >
                    <CardContent sx={{ padding: { xs: "1.5rem", sm: "2rem" } }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                          marginBottom: "1rem",
                        }}
                      >
                        {service.icon && (
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: { xs: "48px", sm: "56px" },
                              height: { xs: "48px", sm: "56px" },
                              borderRadius: "50%",
                              backgroundColor: "rgba(229, 122, 68, 0.1)",
                              color: "#E57A44",
                            }}
                          >
                            <service.icon
                              sx={{
                                fontSize: { xs: "1.5rem", sm: "1.75rem" },
                              }}
                            />
                          </Box>
                        )}
                        <Typography
                          variant="h5"
                          component="h3"
                          sx={{
                            fontSize: { xs: "1.25rem", sm: "1.5rem" },
                            fontWeight: 600,
                            color: (theme) => theme.palette.text.primary,
                          }}
                        >
                          {service.name}
                        </Typography>
                      </Box>
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: { xs: "0.875rem", sm: "1rem" },
                          color: (theme) => theme.palette.text.secondary,
                          lineHeight: 1.6,
                        }}
                      >
                        {service.description}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </Box>

              {/* Pagination */}
              {totalPages > 1 && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 2,
                    marginTop: { xs: "2rem", sm: "3rem" },
                    flexWrap: "wrap",
                  }}
                >
                  {/* Previous Arrow */}
                  <IconButton
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    sx={{
                      color: (theme) => theme.palette.text.primary,
                      border: "1px solid transparent",
                      transition: "all 0.3s ease",
                      "&:focus": {
                        outline: "2px solid #E57A44",
                        outlineOffset: "2px",
                      },
                      "&:focus-visible": {
                        outline: "2px solid #E57A44",
                        outlineOffset: "2px",
                      },
                      "&:hover": {
                        borderColor: "#E57A44",
                        transform: "translateY(-4px)",
                        backgroundColor: "transparent",
                      },
                      "&:disabled": {
                        opacity: 0.5,
                      },
                    }}
                  >
                    <NavigateBeforeIcon />
                  </IconButton>

                  {/* Page Numbers */}
                  <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    sx={{
                      "& .MuiPaginationItem-root": {
                        color: (theme) => theme.palette.text.primary,
                        border: "1px solid transparent",
                        boxShadow: "none !important",
                        "&.Mui-selected": {
                          backgroundColor: "#E57A44",
                          color: "#FFFFFF",
                          border: "1px solid #E57A44",
                          boxShadow: "none !important",
                          "&:hover": {
                            backgroundColor: "#C85A2E",
                          },
                          "&:focus": {
                            outline: "2px solid #E57A44 !important",
                            outlineOffset: "2px",
                            boxShadow: "none !important",
                          },
                          "&:focus-visible": {
                            outline: "2px solid #E57A44 !important",
                            outlineOffset: "2px",
                            boxShadow: "none !important",
                          },
                        },
                        "&:focus": {
                          outline: "2px solid #E57A44 !important",
                          outlineOffset: "2px",
                          boxShadow: "none !important",
                          border: "1px solid transparent",
                        },
                        "&:focus-visible": {
                          outline: "2px solid #E57A44 !important",
                          outlineOffset: "2px",
                          boxShadow: "none !important",
                          border: "1px solid transparent",
                        },
                        "&:hover": {
                          backgroundColor: (theme) =>
                            theme.palette.mode === "light"
                              ? "rgba(229, 122, 68, 0.1)"
                              : "rgba(229, 122, 68, 0.2)",
                          border: "1px solid transparent",
                          boxShadow: "none !important",
                        },
                      },
                    }}
                  />

                  {/* Next Arrow */}
                  <IconButton
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    sx={{
                      color: (theme) => theme.palette.text.primary,
                      border: "1px solid transparent",
                      transition: "all 0.3s ease",
                      "&:focus": {
                        outline: "2px solid #E57A44",
                        outlineOffset: "2px",
                      },
                      "&:focus-visible": {
                        outline: "2px solid #E57A44",
                        outlineOffset: "2px",
                      },
                      "&:hover": {
                        borderColor: "#E57A44",
                        transform: "translateY(-4px)",
                        backgroundColor: "transparent",
                      },
                      "&:disabled": {
                        opacity: 0.5,
                      },
                    }}
                  >
                    <NavigateNextIcon />
                  </IconButton>
                </Box>
              )}
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default Services;

