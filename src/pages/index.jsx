import React, { useState } from "react";
import {
  Button,
  Box,
  Typography,
  Container,
  Grid,
  useMediaQuery,
  useTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { LocationOn, Schedule, CalendarToday } from "@mui/icons-material";
import CountdownTimer from "../components/Time";
import { useNavigate } from "react-router-dom";
import ConferenceSection from "../pages/view/whyattend";
import BNIEventDetails from "../pages/view/networkevent";
import RegionlImage from "../assets/Regional_Logo.jpg";
import backgroundImage from "../assets/image.jpg";
import BNIHighlights from "../pages/view/SneakPeek";
import Connect from "../pages/view/Connect";
import Footer from "../pages/view/copyright";
import HotelDetails from "../pages/view/map";
import Poster from "../assets/poster.jpg";
import ImageCarousel from "./view/Carousel";
import slide1 from "../assets/slide1.jpg"
import slide2 from "../assets/slide2.jpg"
import slide3 from "../assets/slide3.jpg"
import slide4 from "../assets/slide4.jpg"
const ConferenceBanner = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleAgree = () => {
    setOpen(false);
    navigate("/BNIForm"); // Navigate to the form after agreeing
  };
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const currentDate = new Date(); // Get today's date
  const cutoffDate = new Date("2025-04-08"); // 8th April 2025
  const imagesArray = [slide4,slide1,slide3,slide2,  ];
  return (
    <div>
      <div
        className=" "
        style={{
          backgroundImage: `url(${backgroundImage})`, // ✅ Correct usage
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh", // Ensure full height
        }}
      >
        <Box
          sx={{
            padding: "20px",
            ml: { md: "90px", xs: 0 },
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <img
            src={RegionlImage}
            alt="Regional Event"
            style={{
              width: "100%",
              maxWidth: "500px",
              borderRadius: "12px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          />
        </Box>
        <Container
          maxWidth="lg"
          sx={{
            py: { xs: 4, md: 4, position: "relative", top: "0" },
            textAlign: "center",
          }}
        >
          <Grid container spacing={4} alignItems="center">
            {/* Left Content */}
            <Grid item xs={12} md={6} textAlign={{ xs: "center", md: "left" }}>
              <Typography
                variant="h4"
                fontWeight="bold"
                gutterBottom
                sx={{ fontSize: { xs: "2rem", md: "3rem" } }}
              >
                BNI Chennai CBD B
              </Typography>

              <Typography
                variant="h4"
                fontWeight="bold"
                gutterBottom
                sx={{ fontSize: { xs: "1.8rem", md: "2rem" } }}
              >
                14th Anniversary Celebrations
              </Typography>

              {/* Event Details */}
              <Box
                display="flex"
                alignItems="center"
                justifyContent={{ xs: "center", md: "flex-start" }}
                sx={{ gap: 2, mt: 2 }}
              >
                <CalendarToday sx={{ color: "gray" }} />
                <Typography variant="h6">April 12, 2025</Typography>
                <Schedule sx={{ color: "gray" }} />
                <Typography variant="h6">02:00 PM - 06:00 PM</Typography>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                justifyContent={{ xs: "center", md: "flex-start" }}
                sx={{ gap: 2, mt: 2 }}
              >
                <LocationOn sx={{ color: "gray" }} />
                <Typography variant="h6">
                  A. M Jain College, Meenambakkam
                </Typography>
              </Box>
              {currentDate < cutoffDate && (
                <p style={{ color: "gray" }}>
                  Early Bird Offers available. Kindly click on the Registration
                  to check the Price.
                </p>
              )}
              {/* Register Button */}
              <Button
                variant="contained"
                color="error"
                sx={{
                  mt: 3,
                  px: 4,
                  py: 1.5,
                  fontSize: "1rem",
                  textTransform: "uppercase",
                }}
                onClick={() => navigate("/registration_form")}
              >
                Register Now
              </Button>

              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Terms and Conditions</DialogTitle>
                <DialogContent>
                  <Typography variant="body1" gutterBottom>
                    1. Add 1 table & 2 chairs
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    2. Table top branding allowed - Tent cards, pamphlets &
                    brochures
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    3. Registration included for display table owners
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    4. Allocation of tables will be based on power teams
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    5. No edible items to be displayed or sold
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    6. Heavy product displays are not allowed
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    7. No direct sales are encouraged in the stalls
                  </Typography>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    Close
                  </Button>
                  <Button onClick={handleAgree} color="primary">
                    Agree and Continue
                  </Button>
                </DialogActions>
              </Dialog>

              {/* Countdown Timer */}
              <Box
                sx={{
                  mt: 3,
                  position: "relative",
                  left: isMobile ? "0px" : "-60px",
                }}
              >
                <CountdownTimer targetDate={new Date("2025-04-12T14:00:00")} />
              </Box>
            </Grid>

            {/* Right Image */}
            <Grid item xs={12} md={6} display="flex" justifyContent="center">
              <img
                src={Poster}
                alt="Regional Event"
                style={{
                  width: "100%",
                  maxWidth: "700px",
                  borderRadius: "12px",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Box>
                <Typography></Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </div>
      <br />
      <div>

      <Container>
      <center>
      <h1 style={{fontSize: '2.87rem',
      color: '#dc2626',
      fontWeight: 'bold',
      position: 'relative',}}>
         Early Bird Offers
        </h1>

      </center>
      <ImageCarousel images={imagesArray}/>
      </Container>
        <br />
        <br />
        <ConferenceSection />
        <br />
        <br />
        <BNIEventDetails />
        <br />
        <br />
        <BNIHighlights />
        <br />
        <br />
        <br />
        <Connect />
        <br />
        <br />
        <br />
        <HotelDetails />
        <br />
        <Footer />
      </div>
    </div>
  );
};

export default ConferenceBanner;
