import React from 'react';
import backgroundImage from "../../assets/inngurel.jpg";
import Power from "../../assets/power.jpg"; 
import Member from"../../assets/Member.jpg";
import { Box, Container, Typography } from '@mui/material';
const BNIHighlights = () => {
  const styles = {
    mainContainer: {
      width: '100%',
      maxWidth: '1500px',
      margin: '0 auto',
      padding: '16px',
      display: 'flex',
      backgroundColor: "rgba(255, 255, 255, 0.57)",
    },
    titleContainer: {
        textAlign: 'center',
        marginTop: '20px',
        position: 'relative',
        left: '200px', 
      },
      
    mainTitle: {
      color: '#dc2626',
      fontSize: '42px',
      fontWeight: 'bold',
      marginBottom: '5px',
      letterSpacing: '1px'
    },
    subTitle: {
      color: '#000',
      fontSize: '140%',
      fontWeight: 'bold',
      margin: '0',
      lineHeight: '1.2'
    },
    gridContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '40px 20px',
      maxWidth: '1000px',
      margin: '0 auto',
      padding: '0 20px'
    },
    gridItem: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '15px'
    },
    iconWrapper: {
      width: '50px',
      height: '50px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    icon: {
      width: '210px',
      height: '70px',
      textAlign: 'center',
      marginTop: '150px',
      position: 'relative', /* if you want to adjust position */
      left: '300px', /* only if positioning is required */
   
    },
    label: {
      textAlign: 'center',
      fontSize: '20px',
      lineHeight: '1.3',
      color: '#000',
      marginTop: '80px',
      position: 'relative',
      left: '300px',
      maxWidth: '120px'

    }
  };

  const highlightItems = [
    {
      icon: Member, 
      label: 'Inaugural Session'
    },
    {
      icon: backgroundImage,
      label: 'Network & Stall Visits'
    },
   
    {
      icon: Power,
      label: 'Power Team Networking'
    },
  
  ];

  return (
<Container maxWidth="lg" sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: "center",justifyContent:"space-around", gap: 4, mt: 4 }}>
      {/* Left Column (Headings) */}
      <Box sx={{ display: "flex", flexDirection: "column", textAlign: { xs: "center", md: "left" } }}>
        <Typography variant="h3" sx={{ m: 0, fontWeight: "bold" }}>BNI CBD-B </Typography>
        <Typography variant="h3" sx={{ m: 0, fontWeight: "bold" }}>Chennai South</Typography>
        <Typography variant="h3" sx={{ m: 0, fontWeight: "bold" }}>Highlights</Typography>
        <Typography variant="h3" sx={{ m: 0, fontWeight: "bold" }}>Sneak Peek</Typography>
      </Box>

      {/* Right Column (Icons) */}
      <Box sx={{
        display: "flex",
        flexWrap: "wrap",
        maxWidth: { xs: "100%", md: "100%" },
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
      }}>
        {highlightItems.map((item, index) => (
          <Box key={index} sx={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
            <img
              src={item.icon}
              alt={item.label}
              style={{ width: '180px', height: 'auto' }} // Adjusts image size for better mobile scaling
            />
            <Typography variant="body1" sx={{ mt: 1, fontSize: "1rem", fontWeight: "700" }}>{item.label}</Typography>
          </Box>
        ))}
      </Box>
    </Container>
  
  );
};

export default BNIHighlights;
