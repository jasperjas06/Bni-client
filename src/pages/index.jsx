import React from "react";
import { Button, Box, Typography } from "@mui/material";
import { LocationOn, Schedule, CalendarToday } from "@mui/icons-material";
import CountdownTimer from "../components/Time";
import { useNavigate } from "react-router-dom";
import  ConferenceSection from"../pages/view/whyattend";
import BNIEventDetails from "../pages/view/networkevent";
import RegionlImage from "../assets/Regional.jpg";
import backgroundImage from "../assets/image.jpg";
import BNIHighlights from"../pages/view/SneakPeek";
import AboutDetails from"../pages/view/About";
import Connect from "../pages/view/Connect";
import Footer from "../pages/view/copyright";
import HotelDetails from"../pages/view/map";
const ConferenceBanner = () => {
  const navigate = useNavigate();

  return (
    <div
    style={{
      backgroundImage: `url(${backgroundImage})`, // ✅ Correct usage
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      minHeight: "10vh", // Ensure full height
    }} 
 >
      <div className="text-left max-w-2xl"
      >
        <Typography variant="h3" fontWeight="bold" gutterBottom sx={{ mt: 20, ml: 20 }}>
          BNI CBD-B SOUTH 2025
        </Typography>

        <Box display="flex" alignItems="center" sx={{ gap: 3, ml: 20 }}>
          <CalendarToday sx={{ color: "gray" }} />
          <Typography>April 12 – 2025</Typography>

          <Box sx={{ width: 30 }} />
          
          <Schedule sx={{ color: "gray" }} />
          <Typography>08:00 AM</Typography>
        </Box>

        <Box display="flex" alignItems="center" sx={{ mt: 2, ml: 20, color: "gray.700" }}>
          <LocationOn sx={{ mr: 1, color: "gray.500" }} />
          <Typography>Agurchand Manmull Jain College, (A.M. Jain College) Meenambakkam, Chennai, 
            Tamilnadu 600061</Typography>
        </Box>
        <Box display="flex" alignItems="center" sx={{ ml: 120,height:5 }}>
  <img src={RegionlImage} alt="Regional" style={{ width: "100%", maxWidth: "700px" }} />
</Box>
<br/>
        <div className="mt-6 flex gap-10">
          <Button
            variant="contained"
            color="error"
            sx={{ ml: 20 }}
            className="bg-red-600 hover:bg-red-700"
            onClick={() => navigate("/BNIForm")}  // ✅ Corrected navigation
          >
            REGISTER NOW
          </Button>
          <br/>
          <Box sx={{ ml: 10,mt:3}}>
      <CountdownTimer targetDate={new Date("2025-05-24T08:00:00")} />
    </Box>
   
          
          {/* <Button variant="contained" color="error" sx={{ ml: 5 }} className="bg-red-600 hover:bg-red-700">
            BECOME AN EXHIBITOR
          </Button> */}
        </div>

        <div className="mt-4">
          {/* <Button variant="contained" color="error" sx={{ ml: 10, mt: 2 }} className="bg-red-700 hover:bg-red-800">
            SHOWCASE ON DIGITAL LED WALL
          </Button> */}
          
          {/* <Button variant="contained" color="error" sx={{ ml: 5, mt: 2 }} className="bg-red-600 hover:bg-red-700">
            BECOME AN EXHIBITOR
          </Button> */}
        </div>
      </div>
<br/>
      <div>
      <ConferenceSection/>
      <BNIEventDetails/>
      <br/>
      <BNIHighlights/>
      <br/>
      <Connect/>
      <br/>
      <AboutDetails/>
      <br/>
      <HotelDetails/>
      <br/>
     < Footer/>

      </div>

    </div>
  );
};

export default ConferenceBanner;
