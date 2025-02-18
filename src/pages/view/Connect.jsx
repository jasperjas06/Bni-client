import React from "react";
import { Box, Container, Typography } from "@mui/material";

const BNIHighlights = () => {
  const headings = ["CONNECT", "COLLABORATE", "CELEBRATE"];

  return (
    <Container maxWidth="lg" sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: "center",justifyContent:"center", gap: 4, mt: 4 }}>
      {/* Headings Section */}
     <Box sx={{ display: "flex", flexDirection: "column", textAlign: { xs: "center", md: "left" } }}>
        {headings.map((word) => (
          <Typography
            key={word}
            variant="h3"
            sx={{ fontWeight: "bold", color: "#000" }}
          >
            <span style={{ color: "#dc2626" }}>{word[0]}</span>
            {word.slice(1)}
          </Typography>
        ))}
      </Box>

      {/* Why Attend Section */}
      <Box sx={{ maxWidth: "700px", mx: "auto", mb: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#1f2937", mb: 2 }}>
          Empowering Connections, Inspiring Growth
        </Typography>
        <Typography variant="body1" sx={{ fontSize: "1.2rem", lineHeight: "1.75", color: "#1f2937" }}>
          Elevate your brand at the 14th Anniversary! Seize this unique chance to showcase your business
          to top entrepreneurs, leaders, and decision-makers from across the region. Stand out, connect, and grow with us.
        </Typography>
      </Box>
    </Container>
  );
};

export default BNIHighlights;
