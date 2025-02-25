import { Container } from "@mui/material";
import React from "react";

const BNIEventDetails = () => {

  return (
    <Container>
      <h2
        style={{
          fontSize: "1.875rem",
          color: "#dc2626",
          fontWeight: "bold",
          position: "relative",
        }}
      >
        Biggest Business Networking Event of the Year 2025
      </h2>
      <Container>
        <ul style={{fontSize: '140%',
      lineHeight: '1.75',
      color: '#1f2937',}}>
          <li>Link up with over 1000+ BNI Member</li>
          <li>Experience New Insights</li>
          <li>Enhance your Business Visibility on the Regional Platform</li>
        </ul>
      </Container>
      <div style={{
        fontSize: "1.2rem",
      color: "#dc2626",
      lineHeight: "1.6",
      fontWeight:"bold"
      }}>
      BNI Chennai CBD B & South 14th Anniversary is a flagship annual event of
        BNI Chennai and a perfect confluence of Business, Networking and Celebrations. The event will take place on 12 April 2025 at
         Agurchand Manmull Jain College, (A.M. Jain College) Meenambakkam, Chennai, Tamilnadu 600061
      </div>
    </Container>
  );
};
export default BNIEventDetails;
