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
         Why attend?
        </h2>
        <Container sx={{fontSize: '140%',
      lineHeight: '1.75',
      color: '#1f2937',
      marginBottom: '16px',}}>
        Elevate your brand at the 14th Anniversary! Seize this unique chance to showcase your
         Business to Top Entrepreneurs, Leaders and Decision-Makers
         from across the Region. Stand out, Connect, and Grow with us.
        </Container>
      </Container>
    </div>
  );
};


export default BNIConferencePromo;