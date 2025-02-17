import React from "react";
import { Button, Box, Typography } from "@mui/material";
import { LocationOn, Schedule, CalendarToday } from "@mui/icons-material";
import CountdownTimer from "../components/Time";
import { useNavigate } from "react-router-dom";

const ConferenceBanner = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between p-10 bg-pink-100">
      <div className="text-left max-w-2xl">
        <Typography variant="h3" fontWeight="bold" gutterBottom sx={{ mt: 20, ml: 10 }}>
          BNI India National Conference 2025
        </Typography>

        <Box display="flex" alignItems="center" sx={{ gap: 3, ml: 10 }}>
          <CalendarToday sx={{ color: "gray" }} />
          <Typography>May 24 – 25, 2025</Typography>

          <Box sx={{ width: 30 }} />
          
          <Schedule sx={{ color: "gray" }} />
          <Typography>08:00 AM</Typography>
        </Box>

        <Box display="flex" alignItems="center" sx={{ mt: 2, ml: 10, color: "gray.700" }}>
          <LocationOn sx={{ mr: 1, color: "gray.500" }} />
          <Typography>Chennai - Tamilnadu</Typography>
        </Box>
<br/>
        <div className="mt-6 flex gap-10">
          <Button
            variant="contained"
            color="error"
            sx={{ ml: 10 }}
            className="bg-red-600 hover:bg-red-700"
            onClick={() => navigate("/BNIForm")}  // ✅ Corrected navigation
          >
            REGISTER NOW
          </Button>
          
          <Button variant="contained" color="error" sx={{ ml: 5 }} className="bg-red-600 hover:bg-red-700">
            BECOME AN EXHIBITOR
          </Button>
        </div>

        <div className="mt-4">
          <Button variant="contained" color="error" sx={{ ml: 10, mt: 2 }} className="bg-red-700 hover:bg-red-800">
            SHOWCASE ON DIGITAL LED WALL
          </Button>
          
          <Button variant="contained" color="error" sx={{ ml: 5, mt: 2 }} className="bg-red-600 hover:bg-red-700">
            BECOME AN EXHIBITOR
          </Button>
        </div>
      </div>
<br/>
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <CountdownTimer targetDate={new Date("2025-05-24T08:00:00")} />
      </div>
    </div>
  );
};

export default ConferenceBanner;
