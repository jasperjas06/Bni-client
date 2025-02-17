import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";

const CountdownTimer = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = targetDate - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        Days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        Hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        Minutes: Math.floor((difference / (1000 * 60)) % 60),
        Seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Box
    sx={{
      display: "flex",
      alignItems: "center",
      gap: 1,
      ml: 9, // Left margin
      position: "relative", // Needed for bottom to work
      bottom: 8, // Moves the box upwards
    //   backgroundColor: "white",
      boxShadow: 1,
      padding: 1,
      borderRadius: 1,
      border: "1px solid #ddd",
      width:400
    }}
  >
      {Object.entries(timeLeft).map(([unit, value], index, arr) => (
    <Box key={unit} sx={{ display: "flex", alignItems: "center" }}>
      {/* Time value and label */}
      <Box sx={{ textAlign: "center", px: 2 }}>
        <Typography variant="h5" fontWeight="bold">
          {String(value).padStart(2, "0")}
        </Typography>
        <Typography variant="caption" sx={{ color: "gray", textTransform: "uppercase" }}>
          {unit}
        </Typography>
      </Box>

      {/* Vertical divider except for the last item */}
      {index < arr.length - 1 && (
  <Box sx={{ height: 40, width: 1, borderRight: "1px solid gray", mx: 1 }} />
)}

    </Box>
  ))}
</Box>
  );
};

export default CountdownTimer;
