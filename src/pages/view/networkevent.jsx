import React from 'react';

const BNIEventDetails = () => {
  const styles = {
    container: {
      width: '100%',
      maxWidth: '1500px',
      margin: '0 auto',
      padding: '16px',
      display: 'flex',
      backgroundColor: "rgba(255, 255, 255, 0.57)",
    },
    imagesContainer: {
      display: 'flex',
      width: '50%',
      gap: '0',
      height: '400px'
    },
    leftImage: {
      width: '50%',
      height: '100%',
      objectFit: 'cover',
      filter: 'grayscale(100%)'
    },
    rightImage: {
      width: '50%',
      height: '100%',
      objectFit: 'cover',
      backgroundColor: '#000'
    },
    contentSection: {
      width: '50%',
      padding: '0 40px'
    },
    title: {
      fontSize: '1.875rem',
      fontWeight: 'bold',
      color: '#dc2626',
      marginBottom: '10px',
      lineHeight: '1.2',
      position: 'relative',
      left: ' 400px',
    },
    subtitle: {
      fontSize: '1.5rem',
      color: '#374151',
      marginBottom: '30px'
    },
    bulletPoints: {
      listStyleType: 'bullet',
      paddingLeft: '20px',
      marginBottom: '30px'
    },
    bulletPoint: {
      fontSize: '140%',
      color: '#000',
      marginBottom: '15px',
      lineHeight: '1.4',
      position: 'relative',
      left: '500px', 
    },
    footer: {
      fontSize: '1rem',
      color: 'rgb(207, 32, 48)', 
      lineHeight: '1.6',
      position: 'relative',
      left: '500px', 
    }
  };

  return (
    <div style={styles.container}>
    

      <div style={styles.contentSection}>
        <h1 style={styles.title}>
        Biggest Business Networking Event of the Year 2025
        </h1>
        <ul style={styles.bulletPoints}>
          {/* <li style={styles.bulletPoint}>
            Meet BNI's CEO Mary Kennedy Thompson
          </li> */}
          <li style={styles.bulletPoint}>
          Link up with over 1000+ BNI Member 
          </li>
          <li style={styles.bulletPoint}>
          Experience New Insights 
          </li>
          <li style={styles.bulletPoint}>
          Enhance your Business Visibility on the Regional Platform
          </li>
        </ul>

        <p style={styles.footer}>
        BNI Chennai CBD B & South 14th Anniversary is a flagship annual event of 
        BNI Chennai and a perfect confluence of business, networking and celebrations. The event will take place on 12 April 2025 at
         Agurchand Manmull Jain College, (A.M. Jain College) Meenambakkam, Chennai, Tamilnadu 600061
         </p>
      </div>
    </div>
  );
};

export default BNIEventDetails;