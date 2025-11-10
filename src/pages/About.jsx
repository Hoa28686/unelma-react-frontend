import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import ComputerIcon from "@mui/icons-material/Computer";
import SecurityIcon from "@mui/icons-material/Security";
import PeopleIcon from "@mui/icons-material/People";
import PublicIcon from "@mui/icons-material/Public";
import heroImage from "../assets/hero.webp";
import globalMapImage from "../assets/global-office-presence.png";

function About() {
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
      <Box
        component="img"
        src={heroImage}
        alt="Hero background"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          objectFit: "contain",
          zIndex: 0,
        }}
      />
      
      {/* Content overlay */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
          width: "100%",
          paddingBottom: { xs: "4rem", sm: "6rem" },
        }}
      >
        <Box
          sx={{
            maxWidth: { xs: "90%", sm: "85%", md: "1200px" },
            margin: "0 auto",
            padding: { xs: "3rem 1rem", sm: "4rem 2rem", md: "5rem 3rem" },
          }}
        >
          {/* Main Title */}
          <Box
            sx={{
              backgroundColor: (theme) => theme.palette.mode === 'light' ? theme.palette.background.paper : "transparent",
              border: (theme) => theme.palette.mode === 'light' ? "1px solid rgba(0, 0, 0, 0.1)" : "none",
              borderRadius: (theme) => theme.palette.mode === 'light' ? 2 : 0,
              padding: (theme) => theme.palette.mode === 'light' ? { xs: "2rem", sm: "2.5rem", md: "3rem" } : 0,
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
          </Box>

          {/* Welcome Message */}
          <Box
            sx={(theme) => ({
              mb: 5,
              p: { xs: 3, sm: 4 },
              marginBottom: { xs: "3rem", sm: "4rem" },
              backgroundColor: theme.palette.mode === 'light' ? theme.palette.background.paper : "transparent",
              border: theme.palette.mode === 'light' ? "1px solid rgba(0, 0, 0, 0.1)" : "none",
              borderRadius: theme.palette.mode === 'light' ? 2 : 0,
              transition: theme.palette.mode === 'light' ? "all 0.3s ease" : "none",
              ...(theme.palette.mode === 'light' ? {
                "&:hover": {
                  borderColor: "#3B82F6",
                  transform: "translateY(-4px)",
                }
              } : {}),
            })}
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
                title: "Provide all kind of IT service",
              },
              {
                icon: <SecurityIcon sx={{ fontSize: { xs: "2.5rem", sm: "3rem", md: "3.5rem" } }} />,
                title: "Solutions for all security",
              },
              {
                icon: <PeopleIcon sx={{ fontSize: { xs: "2.5rem", sm: "3rem", md: "3.5rem" } }} />,
                title: "Most expert peoples",
              },
              {
                icon: <PublicIcon sx={{ fontSize: { xs: "2.5rem", sm: "3rem", md: "3.5rem" } }} />,
                title: "Global support for all",
              },
            ].map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index} sx={{ display: "flex", justifyContent: "center" }}>
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
                      color: "#3B82F6",
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

          {/* Global Presence Section */}
          <Box
            sx={{
              marginTop: { xs: "4rem", sm: "5rem", md: "6rem" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: { xs: 3, md: 4 },
                alignItems: { xs: "stretch", md: "center" },
              }}
            >
              {/* Text Content - Left Side */}
              <Box
                sx={{
                  flex: { xs: "1 1 100%", md: "1 1 50%" },
                  width: { xs: "100%", md: "50%" },
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
                  sx={(theme) => ({
                    backgroundColor: theme.palette.mode === 'light' ? theme.palette.background.paper : "transparent",
                    border: theme.palette.mode === 'light' ? "1px solid rgba(0, 0, 0, 0.1)" : "none",
                    borderRadius: theme.palette.mode === 'light' ? 2 : 0,
                    padding: theme.palette.mode === 'light' ? { xs: "2rem", sm: "2.5rem", md: "3rem" } : 0,
                    transition: theme.palette.mode === 'light' ? "all 0.3s ease" : "none",
                    ...(theme.palette.mode === 'light' ? {
                      "&:hover": {
                        borderColor: "#3B82F6",
                        transform: "translateY(-4px)",
                      }
                    } : {}),
                  })}
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

              {/* World Map - Right Side */}
              <Box
                sx={{
                  flex: { xs: "1 1 100%", md: "1 1 50%" },
                  width: { xs: "100%", md: "50%" },
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
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default About;
