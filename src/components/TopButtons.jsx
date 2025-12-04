import React, { useState } from "react";
import { Box, Button, Dialog, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router";

const TopButtons = () => {
  const navigate = useNavigate();
  const [subscribeModalOpen, setSubscribeModalOpen] = useState(false);

  const handleOpenSubscribeModal = () => {
    setSubscribeModalOpen(true);
  };

  const handleCloseSubscribeModal = () => {
    setSubscribeModalOpen(false);
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const handleRequestQuote = () => {
    navigate("/contact");
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: { xs: "28px", sm: "32px" },
          gap: { xs: 1.5, sm: 2, md: 3 },
          backgroundColor: (theme) => theme.palette.background.default,
        }}
      >
        <Button
          onClick={handleOpenSubscribeModal}
          sx={{
            color: (theme) => theme.palette.text.primary,
            textTransform: "none",
            fontSize: { xs: "0.875rem", sm: "0.9375rem" },
            fontWeight: 400,
            padding: "0.25rem 0.5rem",
            position: "relative",
            backgroundColor: "transparent",
            border: "none",
            outline: "none",
            boxShadow: "none",
            "&:hover": {
              backgroundColor: "transparent",
              "&::after": {
                width: "100%",
              },
            },
            "&:focus": {
              outline: "none",
              boxShadow: "none",
            },
            "&:focus-visible": {
              outline: "none",
              boxShadow: "none",
            },
            "&:active": {
              outline: "none",
              boxShadow: "none",
            },
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "0%",
              height: "2px",
              backgroundColor: (theme) => theme.palette.primary.main,
              transition: "width 0.3s ease",
            },
          }}
        >
          Subscribe
        </Button>

        <Button
          onClick={handleRegister}
          sx={{
            color: (theme) => theme.palette.text.primary,
            textTransform: "none",
            fontSize: { xs: "0.875rem", sm: "0.9375rem" },
            fontWeight: 400,
            padding: "0.25rem 0.5rem",
            position: "relative",
            backgroundColor: "transparent",
            border: "none",
            outline: "none",
            boxShadow: "none",
            "&:hover": {
              backgroundColor: "transparent",
              "&::after": {
                width: "100%",
              },
            },
            "&:focus": {
              outline: "none",
              boxShadow: "none",
            },
            "&:focus-visible": {
              outline: "none",
              boxShadow: "none",
            },
            "&:active": {
              outline: "none",
              boxShadow: "none",
            },
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "0%",
              height: "2px",
              backgroundColor: (theme) => theme.palette.primary.main,
              transition: "width 0.3s ease",
            },
          }}
        >
          Register
        </Button>

        <Button
          onClick={handleRequestQuote}
          sx={{
            color: (theme) => theme.palette.text.primary,
            textTransform: "none",
            fontSize: { xs: "0.875rem", sm: "0.9375rem" },
            fontWeight: 400,
            padding: "0.25rem 0.5rem",
            position: "relative",
            backgroundColor: "transparent",
            border: "none",
            outline: "none",
            boxShadow: "none",
            "&:hover": {
              backgroundColor: "transparent",
              "&::after": {
                width: "100%",
              },
            },
            "&:focus": {
              outline: "none",
              boxShadow: "none",
            },
            "&:focus-visible": {
              outline: "none",
              boxShadow: "none",
            },
            "&:active": {
              outline: "none",
              boxShadow: "none",
            },
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "0%",
              height: "2px",
              backgroundColor: (theme) => theme.palette.primary.main,
              transition: "width 0.3s ease",
            },
          }}
        >
          Request a Quote
        </Button>
      </Box>

      {/* Subscribe Modal */}
      <Dialog
        open={subscribeModalOpen}
        onClose={handleCloseSubscribeModal}
        maxWidth="sm"
        fullWidth={false}
        PaperProps={{
          sx: {
            margin: "auto",
            width: { xs: "90%", sm: "500px", md: "550px" },
            maxHeight: "90vh",
            position: "relative",
          },
        }}
        sx={{
          "& .MuiDialog-container": {
            alignItems: "center",
            justifyContent: "center",
          },
        }}
      >
        <DialogContent
          sx={{
            position: "relative",
            padding: 0,
            height: "400px",
            overflow: "hidden",
          }}
        >
          <IconButton
            aria-label="close"
            onClick={handleCloseSubscribeModal}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              zIndex: 1,
              color: (theme) => theme.palette.grey[500],
              backgroundColor: (theme) => theme.palette.background.paper,
              "&:hover": {
                backgroundColor: (theme) => theme.palette.grey[200],
              },
            }}
          >
            <CloseIcon />
          </IconButton>
          <iframe
            src="/subscribe-form-embed.html"
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              display: "block",
            }}
            scrolling="no"
            title="Subscribe Form"
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TopButtons;

