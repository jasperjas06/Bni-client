import React from 'react';

const BNIConferencePromo = () => {
  const styles = {
container: {
  width: '100%',
  maxWidth: '1540px',
  margin: '0 auto',
  display: 'flex',
  padding: '16px',
  background: 'linear-gradient(to right, #fff1f2,)',
  overflow: 'hidden', 
  marginTop:'150px' // Hide both horizontal and vertical scrollbars
},

    card: {
      overflow: 'hidden',
      border: 'none',
      // boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      borderRadius: '8px',
      backgroundColor: "rgba(255, 255, 255, 0.57)",
    },
    flexContainer: {
      display: 'flex',
      flexDirection: 'column'
    },
    imageSection: {
      width: '100%',
      height: '400px'
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      filter: 'grayscale(100%)'
    },
    contentSection: {
      padding: '24px'
    },
    heading: {
      fontSize: '1.875rem',
      fontWeight: 'bold',
      position: 'relative',
      left: '600px', 
      
      color: '#dc2626',
      marginBottom: '24px'
    },
    paragraph: {
      fontSize: '140%',
      lineHeight: '1.75',
      color: '#1f2937',
      marginBottom: '16px',
      position: 'relative',
      left: '400px', 
    },
    emphasis: {
      fontWeight: '600'
    },
    '@media (min-width: 768px)': {
      flexContainer: {
        flexDirection: 'row'
      },
      imageSection: {
        width: '50%'
      },
      contentSection: {
        width: '50%',
        padding: '32px'
      }
    }
  };

  return (
    <div style={styles.container}
    
    >
      <div style={styles.card}>
        <div style={{
          ...styles.flexContainer,
          ...(window.innerWidth >= 768 ? styles['@media (min-width: 768px)'].flexContainer : {})
        }}>
          
          
          <div style={{
            ...styles.contentSection,
            ...(window.innerWidth >= 768 ? styles['@media (min-width: 768px)'].contentSection : {})
          }}>
            <h2 style={styles.heading}>
              Why attend?
            </h2>
            
            <p style={styles.paragraph}>
            Elevate your brand at the 14th Anniversary! Seize this unique chance to showcase your
            business to top entrepreneurs, leaders, and decision-makers
             from across the region. Stand out, connect, and grow with us.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BNIConferencePromo;