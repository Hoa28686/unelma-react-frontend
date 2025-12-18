import {
  Typography,
  useMediaQuery,
  useTheme as useMuiTheme,
} from "@mui/material";
import React, { useMemo } from "react";
import { Box, Card, CardContent, CardHeader, CardMedia } from "@mui/material";

import {
  getImageUrl,
  handleItemClick,
  placeholderLogo,
} from "../../helpers/helpers";
import { useNavigate } from "react-router";
import FavoriteButtonAndCount from "../favorite/FavoriteButtonAndCount";
import Chip from "@mui/material/Chip";

function SuggestedServices({ currentService, allServices }) {
  const navigate = useNavigate();
  const theme = useMuiTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const isMedium = useMediaQuery(theme.breakpoints.between("sm", "md"));

  let suggestedServices = useMemo(() => {
    return allServices
      .filter((service) => service.id !== currentService.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
  }, [allServices, currentService.id]);

  if (isSmall) {
    suggestedServices = suggestedServices.slice(0, 1);
  }
  if (isMedium) {
    suggestedServices = suggestedServices.slice(0, 2);
  }

  const handleServiceClick = (service) => {
    handleItemClick(navigate, service, "services");
  };

  if (suggestedServices.length === 0) {
    return null;
  }

  return (
    <>
      <Typography
        variant="h3"
        sx={{ textAlign: "center", marginBlock: 4, fontWeight: 500 }}
      >
        You might also like:
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          py: 1,
          width: { xs: "90%", sm: "85%", md: "80%" },
          margin: "0 auto",
          flexWrap: "wrap",
        }}
      >
        {suggestedServices.map((service) => (
          <Card
            key={service.id}
            onClick={() => handleServiceClick(service)}
            sx={{
              borderRadius: 2,
              width: { xs: "100%", sm: "20rem" },
              maxWidth: "20rem",
              height: "37rem",
              p: 0,
              flexShrink: 0,
              backgroundColor: (theme) => theme.palette.background.paper,
              border: (theme) => `1px solid ${theme.palette.text.secondary}20`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              transition: "all 0.3s ease",
              cursor: "pointer",
              "&:hover": {
                borderColor: (theme) => theme.palette.primary.main,
                transform: "translateY(-4px)",
              },
            }}
          >
            <CardMedia
              component="img"
              src={getImageUrl(
                service.image_local_url || service.image_url || service.image
              )}
              alt={service.name}
              onError={(e) => {
                e.target.src = placeholderLogo;
              }}
              sx={{
                width: "100%",
                height: "13rem",
                objectFit: "cover",
                display: "block",
                p: 0,
                backgroundColor: (theme) => theme.palette.background.paper,
              }}
            />
            <Box sx={{ p: 2, width: "100%", flex: 1, display: "flex", flexDirection: "column" }}>
              <CardHeader
                title={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap", mb: 0.5 }}>
                    <Typography
                      variant="h6"
                      component="h2"
                      sx={{
                        fontWeight: 600,
                        color: (theme) => theme.palette.text.primary,
                        ":hover": { textDecoration: "underline" },
                        flex: 1,
                      }}
                    >
                      {service.name}
                    </Typography>
                    {service.payment_type === "subscription" && (
                      <Chip
                        label="Subscription"
                        size="small"
                        sx={{
                          height: 20,
                          fontSize: "0.7rem",
                          backgroundColor: "#E57A44",
                          color: "#FFFFFF"
                        }}
                      />
                    )}
                  </Box>
                }
                sx={{ pb: 1, px: 0, cursor: "pointer" }}
              />
              <Box sx={{ mb: 1 }}>
                <FavoriteButtonAndCount type="service" item={service} />
              </Box>
              <CardContent
                sx={{ mb: 0, px: 0, pt: 1, cursor: "pointer", flex: 1 }}
              >
                {service.description && (
                  <Typography
                    variant="body2"
                    sx={{
                      color: (theme) => theme.palette.text.secondary,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 5,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {service.description}
                  </Typography>
                )}
              </CardContent>
            </Box>
          </Card>
        ))}
      </Box>
    </>
  );
}

export default SuggestedServices;



