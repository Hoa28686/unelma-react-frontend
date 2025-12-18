import React, { useState, useMemo, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Pagination,
  CircularProgress,
  Chip,
} from "@mui/material";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchServices } from "../../store/slices/services/servicesSlice";
import { getImageUrl, placeholderLogo } from "../../helpers/helpers";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import SecurityIcon from "@mui/icons-material/Security";
import StorageIcon from "@mui/icons-material/Storage";
import ScienceIcon from "@mui/icons-material/Science";
import CloudIcon from "@mui/icons-material/Cloud";
import PsychologyIcon from "@mui/icons-material/Psychology";
import ComputerIcon from "@mui/icons-material/Computer";

// Helper function to map service name to icon
const getServiceIcon = (serviceName) => {
  const name = serviceName?.toLowerCase() || "";
  if (name.includes("cyber") || name.includes("security")) return SecurityIcon;
  if (name.includes("data management") || name.includes("storage"))
    return StorageIcon;
  if (name.includes("data science") || name.includes("science"))
    return ScienceIcon;
  if (name.includes("cloud")) return CloudIcon;
  if (
    name.includes("ai") ||
    name.includes("machine learning") ||
    name.includes("psychology")
  )
    return PsychologyIcon;
  if (
    name.includes("web") ||
    name.includes("mobile") ||
    name.includes("development")
  )
    return ComputerIcon;
  return ComputerIcon; // Default icon
};

// Helper function to convert service name to URL slug
const getServiceSlug = (serviceName) => {
  const name = serviceName?.toLowerCase() || "";
  if (name.includes("cyber") || name.includes("security"))
    return "cyber-security";
  if (name.includes("data management")) return "data-management";
  if (name.includes("data science")) return "data-science";
  if (name.includes("cloud")) return "cloud-service";
  if (name.includes("ai") || name.includes("machine learning"))
    return "ai-machine-learning";
  if (name.includes("web") || name.includes("mobile"))
    return "web-mobile-development";
  return serviceName?.toLowerCase().replace(/\s+/g, "-") || "";
};

const ITEMS_PER_PAGE = 3; // Show 3 services per page

function Services() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { services, loading, error } = useSelector((state) => state.services);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (services.length === 0) {
      dispatch(fetchServices());
    }
  }, [dispatch, services.length]);

  // Map services with icons and slugs
  const servicesWithIcons = useMemo(() => {
    return services
      .filter((service) => service.is_active !== false)
      .map((service) => ({
        ...service,
        serviceId: getServiceSlug(service.name),
      }));
  }, [services]);

  // Filter services based on search query
  const filteredServices = useMemo(() => {
    if (!searchQuery.trim()) return servicesWithIcons;

    const query = searchQuery.toLowerCase().trim();
    const searchTerms = query.split(" ").filter((term) => term.length > 0);

    return servicesWithIcons.filter((service) => {
      const searchableText = [service.name, service.description]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchTerms.some((term) => searchableText.includes(term));
    });
  }, [searchQuery, servicesWithIcons]);

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
        backgroundColor: (theme) => theme.palette.background.default,
      }}
    >
      {/* Content */}
      <Box
        sx={{
          position: "relative",
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
                  backgroundColor: "transparent",
                  "& input:-webkit-autofill": {
                    WebkitBoxShadow: "0 0 0 1000px transparent inset",
                  },
                  "& input:-webkit-autofill:hover": {
                    WebkitBoxShadow: "0 0 0 1000px transparent inset",
                  },
                  "& input:-webkit-autofill:focus": {
                    WebkitBoxShadow: "0 0 0 1000px transparent inset",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: (theme) =>
                      theme.palette.mode === "dark"
                        ? "rgba(255, 255, 255, 0.2)"
                        : "rgba(0, 0, 0, 0.23)",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: (theme) => theme.palette.primary.main,
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: (theme) => theme.palette.primary.main,
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

          {/* Loading State */}
          {loading && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "400px",
              }}
            >
              <CircularProgress />
            </Box>
          )}

          {/* Error State */}
          {error && !loading && (
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
                  color: (theme) => theme.palette.error.main,
                  textAlign: "center",
                }}
              >
                Error loading services: {error}
              </Typography>
            </Box>
          )}

          {/* Services Grid */}
          {!loading &&
          !error &&
          filteredServices.length === 0 &&
          searchQuery ? (
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
                {paginatedServices.map((service) => {
                  const ServiceIconComponent = getServiceIcon(service.name);
                  const slug = getServiceSlug(service.name);
                  return (
                    <Card
                      key={service.id}
                      onClick={() => {
                        navigate(`/services/${service.id}/${slug}`);
                      }}
                      sx={{
                        backgroundColor: (theme) =>
                          theme.palette.mode === "light"
                            ? "rgba(0, 0, 0, 0.03)"
                            : "transparent",
                        border: (theme) =>
                          theme.palette.mode === "dark"
                            ? "1px solid rgba(255, 255, 255, 0.1)"
                            : "1px solid rgba(0, 0, 0, 0.1)",
                        borderRadius: 2,
                        transition: "all 0.3s ease",
                        overflow: "hidden",
                        cursor: "pointer",
                        display: "flex",
                        flexDirection: "column",
                        boxShadow: (theme) =>
                          theme.palette.mode === "light"
                            ? "0 2px 8px rgba(0, 0, 0, 0.05)"
                            : "none",
                        "&:hover": {
                          borderColor: (theme) => theme.palette.primary.main,
                          transform: "translateY(-4px)",
                          boxShadow: (theme) =>
                            theme.palette.mode === "light"
                              ? "0 4px 12px rgba(0, 0, 0, 0.1)"
                              : "0 8px 32px rgba(0, 0, 0, 0.3)",
                        },
                      }}
                    >
                      {/* Service Image */}
                      {(service.image_local_url ||
                        service.image_url ||
                        service.image) && (
                        <Box
                          sx={{
                            width: "100%",
                            height: { xs: "200px", sm: "220px", md: "240px" },
                            overflow: "hidden",
                            backgroundColor: (theme) =>
                              theme.palette.background.default,
                          }}
                        >
                          <Box
                            component="img"
                            src={getImageUrl(
                              service.image_local_url ||
                                service.image_url ||
                                service.image
                            )}
                            alt={service.name}
                            onError={(e) => {
                              e.target.src = placeholderLogo;
                            }}
                            sx={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              transition: "transform 0.3s ease",
                              "&:hover": {
                                transform: "scale(1.05)",
                              },
                            }}
                          />
                        </Box>
                      )}
                      <CardContent
                        sx={{ padding: { xs: "1.5rem", sm: "2rem" } }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            marginBottom: "1rem",
                          }}
                        >
                          {ServiceIconComponent && (
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: { xs: "48px", sm: "56px" },
                                height: { xs: "48px", sm: "56px" },
                                minWidth: { xs: "48px", sm: "56px" },
                                minHeight: { xs: "48px", sm: "56px" },
                                maxWidth: { xs: "48px", sm: "56px" },
                                maxHeight: { xs: "48px", sm: "56px" },
                                borderRadius: "50%",
                                overflow: "hidden",
                                flexShrink: 0,
                                backgroundColor: (theme) =>
                                  theme.palette.mode === "light"
                                    ? `${theme.palette.primary.main}15`
                                    : `${theme.palette.primary.main}25`,
                                color: (theme) => theme.palette.primary.main,
                              }}
                            >
                              <ServiceIconComponent
                                sx={{
                                  fontSize: { xs: "1.5rem", sm: "1.75rem" },
                                }}
                              />
                            </Box>
                          )}
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              flexWrap: "wrap",
                              mb: 0.5,
                            }}
                          >
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
                            <Chip
                              label={
                                service.payment_type === "subscription"
                                  ? "Subscription"
                                  : "One-time"
                              }
                              size="small"
                              color={
                                service.payment_type === "subscription"
                                  ? undefined
                                  : "primary"
                              }
                              sx={{
                                height: 22,
                                fontSize: "0.7rem",
                                ...(service.payment_type === "subscription"
                                  ? {
                                      backgroundColor: "#E57A44",
                                      color: "#FFFFFF",
                                    }
                                  : {}),
                              }}
                            />
                          </Box>
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
                  );
                })}
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
                        outline: (theme) =>
                          `2px solid ${theme.palette.primary.main}`,
                        outlineOffset: "2px",
                      },
                      "&:focus-visible": {
                        outline: (theme) =>
                          `2px solid ${theme.palette.primary.main}`,
                        outlineOffset: "2px",
                      },
                      "&:hover": {
                        borderColor: (theme) => theme.palette.primary.main,
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
                          backgroundColor: (theme) =>
                            theme.palette.primary.main,
                          color: "#FFFFFF",
                          border: (theme) =>
                            `1px solid ${theme.palette.primary.main}`,
                          boxShadow: "none !important",
                          "&:hover": {
                            backgroundColor: "#C85A2E",
                          },
                          "&:focus": {
                            outline: (theme) =>
                              `2px solid ${theme.palette.primary.main} !important`,
                            outlineOffset: "2px",
                            boxShadow: "none !important",
                          },
                          "&:focus-visible": {
                            outline: (theme) =>
                              `2px solid ${theme.palette.primary.main} !important`,
                            outlineOffset: "2px",
                            boxShadow: "none !important",
                          },
                        },
                        "&:focus": {
                          outline: (theme) =>
                            `2px solid ${theme.palette.primary.main} !important`,
                          outlineOffset: "2px",
                          boxShadow: "none !important",
                          border: "1px solid transparent",
                        },
                        "&:focus-visible": {
                          outline: (theme) =>
                            `2px solid ${theme.palette.primary.main} !important`,
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
                        outline: (theme) =>
                          `2px solid ${theme.palette.primary.main}`,
                        outlineOffset: "2px",
                      },
                      "&:focus-visible": {
                        outline: (theme) =>
                          `2px solid ${theme.palette.primary.main}`,
                        outlineOffset: "2px",
                      },
                      "&:hover": {
                        borderColor: (theme) => theme.palette.primary.main,
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
