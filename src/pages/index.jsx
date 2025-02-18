import React from "react";
import { Button, Box, Typography, Container, Grid, useMediaQuery, useTheme } from "@mui/material";
import { LocationOn, Schedule, CalendarToday } from "@mui/icons-material";
import CountdownTimer from "../components/Time";
import { useNavigate } from "react-router-dom";
import ConferenceSection from "../pages/view/whyattend";
import BNIEventDetails from "../pages/view/networkevent";
import RegionlImage from "../assets/Regional.jpg";
import backgroundImage from "../assets/image.jpg";
import BNIHighlights from "../pages/view/SneakPeek";
import AboutDetails from "../pages/view/About";
import Connect from "../pages/view/Connect";
import Footer from "../pages/view/copyright";
import HotelDetails from "../pages/view/map";
const ConferenceBanner = () => {
  const navigate = useNavigate();
   const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <div>
      <div className=" " style={{
        backgroundImage: `url(${backgroundImage})`, // ✅ Correct usage
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh", // Ensure full height
      }}>
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8,position:"relative", top:"100px" }, textAlign: "center" }}>
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
          <Box display="flex" alignItems="center" justifyContent={{ xs: "center", md: "flex-start" }} sx={{ gap: 2, mt: 2 }}>
            <CalendarToday sx={{ color: "gray" }} />
            <Typography variant="h6">April 12, 2025</Typography>
            <Schedule sx={{ color: "gray" }} />
            <Typography variant="h6">02:00 PM</Typography>
          </Box>
          <Box display="flex" alignItems="center" justifyContent={{ xs: "center", md: "flex-start" }} sx={{ gap: 2, mt: 2 }}>
          <LocationOn sx={{ color: "gray" }} />
          <Typography variant="h6">A. M Jain College, Meenambakkam</Typography>
          </Box>

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
            onClick={() => navigate("/BNIForm")}
          >
            Register Now
          </Button>

          {/* Countdown Timer */}
          <Box sx={{ mt: 3, position:"relative", left:isMobile?"0px":"-60px" }}>
            <CountdownTimer targetDate={new Date("2025-05-24T08:00:00")} />
          </Box>
        </Grid>

        {/* Right Image */}
        <Grid item xs={12} md={6} display="flex" justifyContent="center">
          <img
            src={RegionlImage}
            alt="Regional Event"
            style={{ width: "100%", maxWidth: "500px", borderRadius: "12px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}
          />
        </Grid>
      </Grid>
    </Container>


        
      </div>
      <br />
      <div>
        <ConferenceSection />
        <br/>
        <BNIEventDetails />
        <br />
        <BNIHighlights />
        <br />
        <Connect />
        <br />
        {/* <AboutDetails /> */}
        <br />
        {/* <HotelDetails /> */}
        <br />
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default ConferenceBanner;
