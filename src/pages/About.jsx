import React, { useState, useRef } from "react";
import { Box, Typography, Grid, IconButton, Card, CardContent, Chip, Avatar, Link } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ComputerIcon from "@mui/icons-material/Computer";
import SecurityIcon from "@mui/icons-material/Security";
import PeopleIcon from "@mui/icons-material/People";
import PublicIcon from "@mui/icons-material/Public";
import CodeIcon from "@mui/icons-material/Code";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import StorageIcon from "@mui/icons-material/Storage";
import EmailIcon from "@mui/icons-material/Email";
// Using image from public folder
const globalMapImage = "/global_office_presence.webp";
import heroVideo from "../assets/hero_video.mp4?url";
import { placeholderLogo } from "../helpers/helpers";

function About() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    setIsPlaying(false);
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
          paddingBottom: { xs: "4rem", sm: "6rem" },
        }}
      >
        <Box
          sx={{
            maxWidth: { xs: "90%", sm: "85%", md: "1280px" },
            margin: "0 auto",
            padding: { xs: "3rem 1rem", sm: "4rem 2rem", md: "5rem 3rem" },
            width: "100%",
          }}
        >
          {/* Main Title */}
          <Box
            sx={{
              backgroundColor: "transparent",
              border: "none",
              borderRadius: 0,
              padding: 0,
              marginBottom: { xs: "2rem", sm: "3rem" },
            }}
          >
            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontSize: { xs: "2rem", sm: "2.5rem", md: "3.5rem", lg: "4rem" },
                fontWeight: 700,
                color: (theme) => theme.palette.mode === 'light' ? theme.palette.text.primary : "#FFFFFF",
                marginBottom: { xs: "2rem", sm: "3rem" },
                lineHeight: 1.2,
                textAlign: "left",
              }}
            >
              We have 15 Years of Experience of any kind IT solutions
            </Typography>

            {/* Main Content */}
            <Box
              sx={{
                "& p": {
                  fontSize: { xs: "1rem", sm: "1.125rem", md: "1.25rem" },
                  fontWeight: 400,
                  color: (theme) => theme.palette.mode === 'light' ? theme.palette.text.primary : "rgba(255, 255, 255, 0.95)",
                  lineHeight: 1.8,
                  textAlign: "left",
                  marginBottom: "1.5rem",
                  marginTop: 0,
                  "&:last-child": {
                    marginBottom: 0,
                  },
                },
              }}
            >
            <p>
              Welcome to Unelma Platforms, where our mission is to "empower people." Funny thing is nobody were talking about "empowering people" in IT industry some 15 years ago and when we started a slogan of "empower people" with our business many big corporate giants and other consulting companies started copying our slogan and now almost everybody is talking about how to help and empower clients.
            </p>

            <p>
              With over 15 years of experience in the tech landscape, Unelma Platforms has grown into a household name heralding the digital revolution. We proudly strut a rich legacy that intersects innovation, user experience, and transformative power, borne out of our unwavering commitment to empower the lives of people through technology.
            </p>

            <p>
              We believe in the profound potential technology holds to create positive change, and we channel this belief into creating platforms and software that are user-friendly, efficient, and groundbreaking. Our team comprises seasoned professionals who are passionate about harnessing the power of technology to optimize processes, solve complex problems, and ultimately, transform lives.
            </p>

            <p>
              Our product portfolio - including UnelmaMail, UnelmaBrowser, and Unelma-Code Translator - is a testament to our motivation to build technology that makes a difference. Each of our cutting-edge products comes with full support, maintenance, and security provisions to ensure a seamless user experience.
            </p>

            <p>
              At Unelma Platforms, our journey is always about more than just developing technology. It is about empowering people, fostering growth, and pushing boundaries. We don't just create platforms; we create opportunities where none existed before.
            </p>

            <p>
              So come with us on this exciting journey and allow us to empower you. Welcome to Unelma Platforms. Embrace the power of technology to transform your world.
            </p>
            </Box>

            {/* Welcome Message */}
            <Box
              sx={{
                mb: 5,
                p: 0,
                marginTop: { xs: "2rem", sm: "3rem" },
                marginBottom: { xs: "3rem", sm: "4rem" },
                backgroundColor: "transparent",
                border: "none",
                borderRadius: 0,
              }}
            >
              <Typography
                variant="h3"
                component="h2"
                sx={{
                  fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
                  fontWeight: 600,
                  color: (theme) => theme.palette.mode === 'light' ? theme.palette.text.primary : "#FFFFFF",
                  textAlign: "left",
                  letterSpacing: "0.05em",
                }}
              >
                Welcome to Unelma Platforms, where our mission is to "empower people."
              </Typography>
            </Box>

            {/* Features Section */}
            <Grid container spacing={3} justifyContent="center">
              {[
                {
                  icon: <ComputerIcon sx={{ fontSize: { xs: "2.5rem", sm: "3rem", md: "3.5rem" } }} />,
                  title: "Comprehensive IT Services",
                },
                {
                  icon: <SecurityIcon sx={{ fontSize: { xs: "2.5rem", sm: "3rem", md: "3.5rem" } }} />,
                  title: "Enterprise-Grade Security Solutions",
                },
                {
                  icon: <PeopleIcon sx={{ fontSize: { xs: "2.5rem", sm: "3rem", md: "3.5rem" } }} />,
                  title: "Expert Professional Team",
                },
                {
                  icon: <PublicIcon sx={{ fontSize: { xs: "2.5rem", sm: "3rem", md: "3.5rem" } }} />,
                  title: "Worldwide Global Support",
                },
              ].map((feature, index) => (
                <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index} sx={{ display: "flex", justifyContent: "center" }}>
                  <Box
                    sx={{
                      padding: { xs: "2rem 1.5rem", sm: "2.5rem 2rem", md: "3rem 2rem" },
                      textAlign: "center",
                      transition: "all 0.3s ease",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      maxWidth: { xs: "100%", sm: "280px", md: "220px" },
                      width: "100%",
                      "&:hover": {
                        transform: "translateY(-4px)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        color: (theme) => theme.palette.primary.main,
                        marginBottom: "1.5rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "transform 0.3s ease",
                        "&:hover": {
                          transform: "scale(1.1)",
                        },
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Typography
                      variant="h6"
                      component="h3"
                      sx={{
                        fontSize: { xs: "1rem", sm: "1.125rem", md: "1.25rem" },
                        fontWeight: 400,
                        color: (theme) => theme.palette.mode === 'light' ? theme.palette.text.primary : "#FFFFFF",
                        textAlign: "center",
                        lineHeight: 1.4,
                        minHeight: { xs: "2.8em", sm: "2.8em", md: "2.8em" },
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {feature.title}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Global Office Presence Image */}
          <Box
            sx={{
              marginTop: { xs: "2rem", sm: "3rem" },
              marginBottom: { xs: "3rem", sm: "4rem" },
              width: "100%",
            }}
          >
            <Box
              component="img"
              src={globalMapImage}
              alt="Global office presence map"
              sx={{
                width: "100%",
                height: "auto",
                objectFit: "contain",
                borderRadius: 3,
              }}
            />
          </Box>

          {/* Global Presence Section */}
          <Box
            sx={{
              marginTop: { xs: "4rem", sm: "5rem", md: "6rem" },
            }}
          >
            <Box
              sx={{
                "& p": {
                  fontSize: { xs: "1rem", sm: "1.125rem", md: "1.25rem" },
                  fontWeight: 400,
                  color: (theme) => theme.palette.mode === 'light' ? theme.palette.text.primary : "rgba(255, 255, 255, 0.95)",
                  lineHeight: 1.8,
                  textAlign: "left",
                  marginBottom: "1.5rem",
                  marginTop: 0,
                  "&:last-child": {
                    marginBottom: 0,
                  },
                },
              }}
            >
              <Box
                sx={{
                  backgroundColor: "transparent",
                  border: "none",
                  borderRadius: 0,
                  padding: 0,
                }}
              >
                <Typography
                  variant="h2"
                  component="h2"
                  sx={{
                    fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                    fontWeight: 700,
                    color: (theme) => theme.palette.mode === 'light' ? theme.palette.text.primary : "#FFFFFF",
                    marginBottom: { xs: "1.5rem", sm: "2rem" },
                    lineHeight: 1.2,
                    textAlign: "left",
                  }}
                >
                  Global Presence
                </Typography>
                <p>
                  Our services reach clients across the globe, from major metropolitan areas to emerging markets. We have successfully delivered IT solutions to businesses in North America, Europe, Asia, and beyond, helping organizations transform their digital infrastructure regardless of their location.
                </p>
                <p>
                  With our global network and expertise, we are equipped to serve clients worldwide, providing tailored solutions that meet local requirements while maintaining international standards of excellence.
                </p>
              </Box>
            </Box>
          </Box>

          {/* 15 Years of Experience Section */}
          <Box
            sx={{
              marginTop: { xs: "4rem", sm: "5rem", md: "6rem" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: { xs: 3, md: 5 },
                alignItems: { xs: "stretch", md: "center" },
              }}
            >
              {/* Video - Left Side */}
              <Box
                sx={{
                  flex: { xs: "1 1 100%", md: "1 1 50%" },
                  width: { xs: "100%", md: "50%" },
                  display: "flex",
                  order: { xs: 1, md: 1 },
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    aspectRatio: { xs: "16/9", md: "9/16" },
                    backgroundColor: (theme) => theme.palette.background.paper,
                    border: (theme) => 
                      theme.palette.mode === 'dark' 
                        ? "1px solid rgba(255, 255, 255, 0.1)" 
                        : "1px solid rgba(0, 0, 0, 0.1)",
                    borderRadius: { xs: 2, md: 3 },
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    position: "relative",
                    boxShadow: (theme) =>
                      theme.palette.mode === "dark"
                        ? "0 8px 32px rgba(0, 0, 0, 0.3)"
                        : "0 8px 32px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <Box
                    component="video"
                    ref={videoRef}
                    controls
                    loop
                    muted
                    playsInline
                    onPlay={handlePlay}
                    onPause={handlePause}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  >
                    <source src={heroVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                  </Box>
                  {!isPlaying && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "rgba(0, 0, 0, 0.3)",
                        cursor: "pointer",
                        zIndex: 1,
                      }}
                      onClick={handlePlay}
                    >
                      <IconButton
                        sx={{
                          width: { xs: "64px", sm: "80px", md: "96px" },
                          height: { xs: "64px", sm: "80px", md: "96px" },
                          backgroundColor: (theme) => theme.palette.primary.main,
                          color: "#FFFFFF",
                          "&:hover": {
                            backgroundColor: (theme) => theme.palette.primary.dark || theme.palette.primary.main,
                            transform: "scale(1.1)",
                          },
                          transition: "all 0.3s ease",
                        }}
                        disableRipple
                      >
                        <PlayArrowIcon
                          sx={{
                            fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                            marginLeft: "4px",
                          }}
                        />
                      </IconButton>
                    </Box>
                  )}
                </Box>
              </Box>

              {/* Text Content - Right Side */}
              <Box
                sx={{
                  flex: { xs: "1 1 100%", md: "1 1 50%" },
                  width: { xs: "100%", md: "50%" },
                  display: "flex",
                  order: { xs: 2, md: 2 },
                  "& p": {
                    fontSize: { xs: "1rem", sm: "1.125rem", md: "1.25rem" },
                    fontWeight: 400,
                    color: (theme) =>
                      theme.palette.mode === "light"
                        ? theme.palette.text.primary
                        : "rgba(255, 255, 255, 0.95)",
                    lineHeight: 1.8,
                    textAlign: "left",
                    marginBottom: "1.5rem",
                    marginTop: 0,
                    "&:last-child": {
                      marginBottom: 0,
                    },
                  },
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    backgroundColor: "transparent",
                    border: "none",
                    borderRadius: 0,
                    padding: 0,
                  }}
                >
                  <Typography
                    variant="h2"
                    component="h2"
                    sx={{
                      fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                      fontWeight: 700,
                      color: (theme) =>
                        theme.palette.mode === "light"
                          ? theme.palette.text.primary
                          : "#FFFFFF",
                      marginBottom: { xs: "1.5rem", sm: "2rem" },
                      lineHeight: 1.2,
                      textAlign: "left",
                    }}
                  >
                    15 Years of Technology Excellence
                  </Typography>
                  <p>
                    For over 15 years, Unelma Platforms has been at the
                    forefront of helping businesses harness the power of
                    technology to drive success. Our comprehensive range of
                    innovative and user-friendly software solutions enables
                    businesses to operate more efficiently, reach their customers
                    effectively, and ultimately, boost their bottom line.
                  </p>
                  <p>
                    With a rich experience spanning more than a decade, Unelma
                    Platforms stands as a reliable partner in your journey toward
                    growth and success. Our goal has been, and always will be,
                    to empower businesses with the best technology tools and
                    services available.
                  </p>
                  <p>
                    From custom software development to cloud solutions and
                    cybersecurity, we provide end-to-end IT services that
                    transform how businesses operate and compete in today's
                    digital landscape.
                  </p>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Team/Contributors Section */}
          <Box
            sx={{
              marginTop: { xs: "4rem", sm: "5rem", md: "6rem" },
            }}
          >
            <Typography
              variant="h2"
              component="h2"
              sx={{
                fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                fontWeight: 700,
                color: (theme) =>
                  theme.palette.mode === "light"
                    ? theme.palette.text.primary
                    : "#FFFFFF",
                marginBottom: { xs: "2rem", sm: "3rem" },
                textAlign: "center",
              }}
            >
              Our Team
            </Typography>
            <Grid container spacing={4} justifyContent="center">
              {[
                {
                  name: "Binyam Angamo",
                  roles: ["UI Design", "Style Guide", "Frontend Contributions", "Backend Contributions"],
                  icon: DesignServicesIcon,
                  profilePicture: null, // Set to profile picture URL when available
                  linkedinUrl: "https://www.linkedin.com/in/binyam-angamo-0611172b9",
                },
                {
                  name: "Lu Hoa",
                  roles: ["Frontend Lead", "Backend Contributions"],
                  icon: CodeIcon,
                  profilePicture: null,
                  linkedinUrl: null, // Add LinkedIn URL when available
                },
                {
                  name: "Elias Bekele",
                  roles: ["Backend Lead", "Authentication", "Payment System", "API Integration"],
                  icon: VpnKeyIcon,
                  profilePicture: null,
                  linkedinUrl: null, // Add LinkedIn URL when available
                },
                {
                  name: "Basudev Pokharel",
                  roles: ["Backend Lead", "DB Integration"],
                  icon: StorageIcon,
                  profilePicture: null,
                  linkedinUrl: null, // Add LinkedIn URL when available
                },
                {
                  name: "Shihab Mahfuz",
                  roles: ["Common Email", "Footer Content"],
                  icon: EmailIcon,
                  profilePicture: null,
                  linkedinUrl: null, // Add LinkedIn URL when available
                },
              ].map((member, index) => {
                const IconComponent = member.icon;
                return (
                  <Grid size={{ xs: 12 }} key={index}>
                    <Card
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        backgroundColor: (theme) =>
                          theme.palette.mode === "light"
                            ? "rgba(0, 0, 0, 0.03)"
                            : "transparent",
                        border: (theme) =>
                          theme.palette.mode === "light"
                            ? "1px solid rgba(0, 0, 0, 0.1)"
                            : "1px solid rgba(255, 255, 255, 0.1)",
                        borderRadius: 2,
                        padding: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
                        overflow: "visible",
                        position: "relative",
                        transition: "all 0.3s ease",
                        minHeight: { xs: 120, sm: 140, md: 160 },
                        boxShadow: (theme) =>
                          theme.palette.mode === "light"
                            ? "0 2px 8px rgba(0, 0, 0, 0.05)"
                            : "none",
                        "&:hover": {
                          transform: "translateY(-4px)",
                          borderColor: (theme) => theme.palette.primary.main,
                          boxShadow: (theme) =>
                            theme.palette.mode === "light"
                              ? "0 4px 12px rgba(0, 0, 0, 0.1)"
                              : "none",
                        },
                      }}
                    >
                      <Box
                        sx={{
                          position: "absolute",
                          left: { xs: -40, sm: -50, md: -60 },
                          top: "50%",
                          transform: "translateY(-50%)",
                          zIndex: 1,
                        }}
                      >
                        <Link
                          href={member.linkedinUrl || undefined}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => {
                            if (!member.linkedinUrl) {
                              e.preventDefault();
                            }
                          }}
                          sx={{
                            textDecoration: "none",
                            cursor: member.linkedinUrl ? "pointer" : "default",
                            display: "block",
                          }}
                        >
                          <Avatar
                            src={member.profilePicture || undefined}
                            alt={member.name}
                            sx={{
                              width: { xs: 80, sm: 100, md: 120 },
                              height: { xs: 80, sm: 100, md: 120 },
                              border: (theme) =>
                                theme.palette.mode === "light"
                                  ? `3px solid ${theme.palette.primary.main}`
                                  : `3px solid ${theme.palette.primary.light}`,
                              boxShadow: (theme) =>
                                theme.palette.mode === "light"
                                  ? `0 4px 12px ${theme.palette.primary.main}30`
                                  : `0 4px 12px ${theme.palette.primary.light}30`,
                              backgroundColor: (theme) => theme.palette.primary.main,
                              color: "#FFFFFF",
                              transition: "all 0.3s ease",
                              "&:hover": member.linkedinUrl
                                ? {
                                    transform: "scale(1.05)",
                                    boxShadow: (theme) =>
                                      theme.palette.mode === "light"
                                        ? `0 6px 16px ${theme.palette.primary.main}50`
                                        : `0 6px 16px ${theme.palette.primary.light}50`,
                                  }
                                : {},
                            }}
                          >
                            <IconComponent sx={{ fontSize: { xs: "2.5rem", sm: "3rem", md: "3.5rem" } }} />
                          </Avatar>
                        </Link>
                      </Box>
                      <CardContent
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          flex: 1,
                          p: 0,
                          paddingLeft: { xs: 4, sm: 5, md: 6 },
                        }}
                      >
                        <Typography
                          variant="h5"
                          component="h3"
                          sx={{
                            fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" },
                            fontWeight: 600,
                            color: (theme) => theme.palette.text.primary,
                            marginBottom: 2,
                            textAlign: "left",
                          }}
                        >
                          {member.name}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            flexWrap: "wrap",
                            gap: 1,
                            width: "100%",
                          }}
                        >
                          {member.roles.map((role, roleIndex) => (
                            <Chip
                              key={roleIndex}
                              label={role}
                              size="small"
                              sx={{
                                fontSize: { xs: "0.75rem", sm: "0.875rem" },
                                height: { xs: 24, sm: 28 },
                                backgroundColor: (theme) =>
                                  theme.palette.mode === "light"
                                    ? `${theme.palette.primary.main}15`
                                    : `${theme.palette.primary.main}25`,
                                color: (theme) => theme.palette.text.primary,
                                border: (theme) =>
                                  theme.palette.mode === "light"
                                    ? `1px solid ${theme.palette.primary.main}30`
                                    : `1px solid ${theme.palette.primary.main}40`,
                              }}
                            />
                          ))}
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default About;
