
import { Container } from '@mui/material';
import React from 'react';

const BNIConferencePromo = () => {
  return (
    <div>
      <Container sx={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
      <h2 style={{fontSize: '1.875rem',
      color: '#dc2626',
      fontWeight: 'bold',
      position: 'relative',}}>
          About Chennai
        </h2>
        <Container sx={{fontSize: '140%',
      lineHeight: '1.75',
      color: '#1f2937',
      marginBottom: '16px',}}>
      Welcome to Chennai, the vibrant gateway to Chennai, known as “God’s Own Country.” 
           This coastal city is a perfect blend of rich history, diverse culture,
            and breathtaking landscapes. Wander through the charming lanes of Fort Chennai, 
            where colonial architecture meets local artistry, or visit the iconic Chinese 
            fishing nets for a unique photo op. Explore the lush backwaters, savor Chennai’s 
            renowned cuisine, and experience traditional Kathakali dance performances. From 
            serene beaches to spice markets, Chennai offers a refreshing escape, inviting conference 
            attendees to immerse in its heritage, natural beauty, and warm hospitality.
        </Container>
      </Container>
    </div>
  );
};


export default BNIConferencePromo;


