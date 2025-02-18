import { useState, useEffect } from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";

const CountdownTimer = ({ targetDate }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
        flexWrap: "wrap",
        // justifyContent: "center",
        // alignItems: "center",
        boxShadow: 1,
        padding: 2,
        borderRadius: 2,
        border: "1px solid #ddd",
        maxWidth: isMobile ? 300 : 400, // ✅ Adjusts width dynamically
        width: "100%",
        mx: "auto", // Centering horizontally
        transition: "max-width 0.3s ease-in-out", // ✅ Smooth transitions
      }}
    >
      {Object.entries(timeLeft).map(([unit, value], index, arr) => (
        <Box key={unit} sx={{ display: "flex", alignItems: "center" }}>
          {/* Time value and label */}
          <Box sx={{ textAlign: "center", px: isMobile ? 1 : 2 }}>
            <Typography variant={isMobile ? "h6" : "h5"} fontWeight="bold">
              {String(value).padStart(2, "0")}
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: "gray", textTransform: "uppercase" }}
            >
              {unit}
            </Typography>
          </Box>

          {/* Vertical divider except for the last item */}
          {index < arr.length - 1 && (
            <Box
              sx={{
                height: isMobile ? 25 : 40,
                width: 1,
                borderRight: "1px solid gray",
                mx: isMobile ? 0.5 : 1,
              }}
            />
          )}
        </Box>
      ))}
    </Box>
  );
};

export default CountdownTimer;
