import React, { useState } from "react";
import {
  Box,
  Typography,
  Link,
  Grid,
  Button,
  Dialog,
  DialogContent,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import businessFinlandLogo from "../assets/business-finland-logo.webp";
import estoniaLogo from "../assets/republic-of-estonia-logo.webp";
import shortlistLogo from "../assets/shortlist-logo.webp";

// Style Guide Colors as defined:
// Updated to match blue theme from main branch
const COLORS = {
  // Background - Darker Blue (matching dark theme background)
  footerBg: "#0A0F1C",
  // Text - White (matching dark theme text)
  textDark: "#FFFFFF",
  // Secondary Accent - Dark blue-gray for subtle backgrounds
  secondaryAccent: "#151B2E",
};

// Footer Links Data
const usefulLinks = [
  { label: "Home", href: "/" },
  { label: "Feedback", href: "#" },
  { label: "Clients Feedback", href: "#" },
  { label: "Support Ticket", href: "#" },
];

const careerLinks = [
  { label: "Come work with us", href: "/career" },
  { label: "Internship", href: "/career/" },
  { label: "UI/ UX Designer", href: "/career/2" },
  { label: "Software Engineer", href: "/career/1" },
  { label: "Office Management", href: "/career/3" },
];

const offices = [
  {
    title: "Northern Europe office",
    company: "Unelma Platforms OÜ",
    address: "Tallinn, Estonia region 10111, Estonia",
    registry: "Company Registry code: 16069962",
    phone: "+358(0) 44 9889771",
    email: "info@unelmaplatforms.com",
  },
  {
    title: "North America office",
    company: "Unelma Pay Ltd",
    address: "215 Anne Street N, Barrie, Ontario, Canada",
    registry: "Incorporation number: 1000986742",
    phone: "+1 (705) 790-8047",
    email: "unelmapayca@gmail.com",
  },
  {
    title: "South Asia office",
    company: "Unelma Platforms Pvt. Ltd",
    address: "Ratnanagar, Chitwan 44204, Nepal",
    registry: "Business ID with VAT/PAN number: 606863094",
    phone: "+977 56-562130",
    email: "hello@unelma.com.np",
  },
  {
    title: "United States of America (USA)",
    company: "Unelma Platforms Inc.",
    address: "Incorporation states: Delaware, Illinois Alabama, Montana",
    registry: "",
    phone: "+13027037343",
    email: "info@unelmaplatforms.com",
  },
];

// Partner Logos
const partnerLogos = [
  {
    src: businessFinlandLogo,
    alt: "Business Finland Logo",
    href: "https://www.businessfinland.com/",
  },
  {
    src: estoniaLogo,
    alt: "Republic of Estonia e-Residency Logo",
    href: "https://www.e-resident.gov.ee/",
  },
  {
    src: shortlistLogo,
    alt: "Shortlist Logo",
    href: "https://www.sortlist.com/",
  },
];

// Renamed component from App to Footer
const Footer = () => {
  const [subscribeModalOpen, setSubscribeModalOpen] = useState(false);

  const handleOpenSubscribeModal = () => {
    setSubscribeModalOpen(true);
  };

  const handleCloseSubscribeModal = () => {
    setSubscribeModalOpen(false);
  };

  return (
    <>
      {/* This is the footer element itself. The parent Layout.jsx handles the full-page layout. */}
      <Box
        component="footer"
        sx={{
          backgroundColor: COLORS.footerBg,
          color: COLORS.textDark,
          p: { xs: 3, md: 6 },
          boxShadow: "none",
        }}
      >
        {/* Inner content is centered via margin: 0 auto and max-width: 1280px */}
        <Box sx={{ maxWidth: "1280px", margin: "0 auto" }}>
          {/* Clients and Partners Logo Section */}
          <Box
            sx={{
              mb: 5,
              p: { xs: 3, sm: 4 },
              backgroundColor: COLORS.secondaryAccent,
              borderRadius: 3,
              border: "1px solid rgba(255, 255, 255, 0.1)",
              transition: "all 300ms",
              "&:hover": {
                borderColor: (theme) => `${theme.palette.primary.main}80`, // 50% opacity blue
              },
            }}
          >
            <Typography
              variant="h6"
              component="h2"
              sx={{
                fontWeight: 700,
                textAlign: "center",
                mb: 3,
                letterSpacing: "0.05em",
              }}
            >
              Trusted by Innovators & Industry Leaders
            </Typography>

            {/* Partner Logos Grid */}
            <Grid
              container
              spacing={3}
              justifyContent="center"
              alignItems="center"
            >
              {partnerLogos.map((logo, index) => (
                <Grid
                  size={{ xs: 12, sm: 6, md: 4 }}
                  key={index}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <Link
                    href={logo.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      textDecoration: "none",
                    }}
                  >
                    <Box
                      component="img"
                      src={logo.src}
                      alt={logo.alt}
                      sx={{
                        height: { xs: 35, sm: 40, md: 50 },
                        width: "auto",
                        maxWidth: "100%",
                        objectFit: "contain",
                        opacity: 0.8,
                        transition: "all 200ms",
                        cursor: "pointer",
                        "&:hover": {
                          transform: "scale(1.05)",
                          opacity: 1,
                        },
                      }}
                    />
                  </Link>
                </Grid>
              ))}
            </Grid>
            <Typography
              variant="caption"
              display="block"
              sx={{
                fontSize: "0.75rem",
                textAlign: "center",
                color: COLORS.textDark,
                opacity: 0.7,
                mt: 2,
              }}
            ></Typography>
          </Box>
          {/* END: Clients and Partners Logo Section */}

          {/* Main Footer Grid */}
          <Grid
            container
            spacing={4}
            sx={{ pb: 4, borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}
          >
            {/* Top Row: Useful Links, Career With Us, Newsletter */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography
                variant="h6"
                component="h2"
                sx={{
                  fontWeight: 600,
                  mb: 2,
                  borderLeft: 4,
                  borderColor: (theme) => theme.palette.primary.main,
                  pl: 2,
                  fontSize: "1.125rem",
                }}
              >
                Useful Links
              </Typography>
              <Box
                component="ul"
                sx={{
                  listStyle: "none",
                  p: 0,
                  m: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                {usefulLinks.map((item) => (
                  <Box component="li" key={item.label}>
                    <Link
                      href={item.href}
                      underline="none"
                      sx={{
                        fontSize: "0.875rem",
                        color: COLORS.textDark,
                        transition: "color 200ms",
                        "&:hover": {
                          color: (theme) => theme.palette.primary.main,
                        },
                      }}
                    >
                      {item.label}
                    </Link>
                  </Box>
                ))}
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Typography
                variant="h6"
                component="h2"
                sx={{
                  fontWeight: 600,
                  mb: 2,
                  borderLeft: 4,
                  borderColor: (theme) => theme.palette.primary.main,
                  pl: 2,
                  fontSize: "1.125rem",
                }}
              >
                Career With Us
              </Typography>
              <Box
                component="ul"
                sx={{
                  listStyle: "none",
                  p: 0,
                  m: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                {careerLinks.map((item) => (
                  <Box component="li" key={item.label}>
                    <Link
                      href={item.href}
                      underline="none"
                      sx={{
                        fontSize: "0.875rem",
                        color: COLORS.textDark,
                        transition: "color 200ms",
                        "&:hover": {
                          color: (theme) => theme.palette.primary.main,
                        },
                      }}
                    >
                      {item.label}
                    </Link>
                  </Box>
                ))}
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Typography
                variant="h6"
                component="h2"
                sx={{
                  fontWeight: 600,
                  mb: 2,
                  borderLeft: 4,
                  borderColor: (theme) => theme.palette.primary.main,
                  pl: 2,
                  fontSize: "1.125rem",
                }}
              >
                Subscribe to our Newsletter
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontSize: "0.875rem",
                  mb: 2,
                  color: "rgba(255, 255, 255, 0.7)",
                }}
              >
                Based on the GDPR rule, we will only contact you if it is
                essential and all personal data collected is anonymized.
              </Typography>

              {/* Subscribe Button */}
              <Button
                variant="contained"
                color="primary"
                onClick={handleOpenSubscribeModal}
                sx={{
                  py: 1,
                  px: 3,
                  fontWeight: 400,
                  borderRadius: 2,
                  boxShadow: "none",
                  textTransform: "none",
                  whiteSpace: "nowrap",
                  border: "1px solid transparent",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    borderColor: (theme) => theme.palette.primary.main,
                    transform: "translateY(-4px)",
                  },
                  "&:focus": {
                    outline: (theme) =>
                      `2px solid ${theme.palette.primary.main}`,
                    outlineOffset: "2px",
                    boxShadow: "none",
                  },
                  "&:focus-visible": {
                    outline: (theme) =>
                      `2px solid ${theme.palette.primary.main}`,
                    outlineOffset: "2px",
                    boxShadow: "none",
                  },
                  "&:active": {
                    outline: (theme) =>
                      `2px solid ${theme.palette.primary.main}`,
                    outlineOffset: "2px",
                    boxShadow: "none",
                  },
                }}
                disableRipple
              >
                Subscribe
              </Button>
            </Grid>

            {/* Office Locations - Horizontal Layout */}
            <Grid size={{ xs: 12 }}>
              <Typography
                variant="h6"
                component="h2"
                sx={{
                  fontWeight: 600,
                  mb: 3,
                  borderLeft: 4,
                  borderColor: (theme) => theme.palette.primary.main,
                  pl: 2,
                  fontSize: "1.125rem",
                }}
              >
                Offices
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  flexWrap: "wrap",
                  gap: { xs: 3, sm: 4, md: 4 },
                }}
              >
                {offices.map((office, index) => (
                  <Box
                    key={index}
                    sx={{
                      flex: {
                        xs: "1 1 100%",
                        sm: "1 1 calc(50% - 16px)",
                        md: "1 1 calc(25% - 24px)",
                      },
                      minWidth: { xs: "100%", sm: "250px", md: "200px" },
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      component="p"
                      sx={{
                        fontWeight: 600,
                        color: (theme) => theme.palette.secondary.main,
                        mb: 0.5,
                        fontSize: "0.875rem",
                      }}
                    >
                      {office.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: "0.75rem",
                        color: COLORS.textDark,
                        mb: 0.5,
                      }}
                    >
                      {office.company}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: "0.75rem",
                        color: "rgba(255, 255, 255, 0.7)",
                        mb: 0.5,
                      }}
                    >
                      {office.address}
                    </Typography>
                    {office.registry && (
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: "0.75rem",
                          color: "rgba(255, 255, 255, 0.7)",
                          mb: 0.5,
                        }}
                      >
                        {office.registry}
                      </Typography>
                    )}
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: "0.75rem",
                        color: "rgba(255, 255, 255, 0.7)",
                        mb: 0.5,
                      }}
                    >
                      {office.phone}
                    </Typography>
                    <Link
                      href={`mailto:${office.email}`}
                      underline="none"
                      sx={{
                        fontSize: "0.75rem",
                        color: (theme) => theme.palette.secondary.main,
                        transition: "color 200ms",
                        "&:hover": { color: COLORS.textDark },
                      }}
                    >
                      {office.email}
                    </Link>
                  </Box>
                ))}
              </Box>
            </Grid>
          </Grid>

          {/* Copyright and Social Media Row */}
          <Box
            sx={{
              pt: 3,
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", sm: "center" },
              gap: { xs: 2, sm: 0 },
            }}
          >
            {/* Copyright Text - Left */}
            <Typography
              variant="caption"
              component="p"
              sx={{
                fontSize: "0.875rem",
                color: "rgba(255, 255, 255, 0.7)",
                textAlign: "left",
              }}
            >
              &copy; 2025 UNELMA Platforms. All rights reserved.
            </Typography>

            {/* Social Media Icons - Right */}
            <Box sx={{ display: "flex", gap: 2 }}>
              {/* LinkedIn Icon */}
              <Link
                href="https://linkedin.com/company/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: (theme) => theme.palette.primary.main,
                  transition: "color 300ms, transform 300ms",
                  "&:hover": {
                    color: COLORS.textDark,
                    transform: "scale(1.15)",
                  },
                  display: "flex",
                  alignItems: "center",
                }}
                aria-label="Follow us on LinkedIn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </Link>

              {/* X (formerly Twitter) Icon */}
              <Link
                href="https://x.com/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: (theme) => theme.palette.primary.main,
                  transition: "color 300ms, transform 300ms",
                  "&:hover": {
                    color: COLORS.textDark,
                    transform: "scale(1.15)",
                  },
                  display: "flex",
                  alignItems: "center",
                }}
                aria-label="Follow us on X"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2 1.1-.8 1.4-2.8 0-4s-3.7-1-4.7-3c-3-6 2-10.2 6-8.2 2.8 1.4 5 3.8 6.4 5.7.5.3 1.1.2 1.4-.4.4-.8.4-1.6 0-2.4 1.3.1 2.3 0 3.3-.8z" />
                </svg>
              </Link>

              {/* Instagram Icon */}
              <Link
                href="https://instagram.com/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: (theme) => theme.palette.primary.main,
                  transition: "color 300ms, transform 300ms",
                  "&:hover": {
                    color: COLORS.textDark,
                    transform: "scale(1.15)",
                  },
                  display: "flex",
                  alignItems: "center",
                }}
                aria-label="Follow us on Instagram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Subscribe Modal */}
      <Dialog
        open={subscribeModalOpen}
        onClose={handleCloseSubscribeModal}
        maxWidth="sm"
        sx={{
          "& .MuiDialog-container": {
            alignItems: "center",
            justifyContent: "center",
          },
        }}
        PaperProps={{
          sx: {
            borderRadius: 2,
            backgroundColor: "#0A0F1C",
            maxHeight: "95vh",
            width: { xs: "90%", sm: "500px", md: "550px" },
            margin: { xs: "16px", sm: "32px" },
            position: "relative",
          },
        }}
      >
        <DialogContent
          sx={{
            p: 0,
            position: "relative",
            overflow: "hidden",
            height: "400px",
          }}
        >
          {/* Close Button */}
          <IconButton
            onClick={handleCloseSubscribeModal}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              zIndex: 1,
              color: "#FFFFFF",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.7)",
              },
            }}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>

          {/* UnelmaMail Embedded Subscription Form */}
          <iframe
            src="/subscribe-form-embed.html"
            title="Newsletter Subscription Form"
            scrolling="no"
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              borderRadius: "8px",
              display: "block",
            }}
            loading="lazy"
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Footer;
