import React from 'react';

const AboutDetails = () => {
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
        position: 'relative', /* if you want to adjust position */
        textDecoration: 'underline',
        textDecorationColor: '#dc2626', /* sets the color of the underline */
        textDecorationThickness: '3px', /* optional, adjust thickness */
        position: 'relative',
        left: '600px',
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
      lineHeight: '1.4'
    },
    paragraph: {
        fontSize: '140%',
        lineHeight: '1.75',
        color: '#1f2937',
        marginBottom: '16px', 
        position: 'relative',
        left: '400px',
      },
    footer: {
      fontSize: '1rem',
      color: 'rgb(207, 32, 48)', 
      lineHeight: '1.6'
    }
  };

  return (
    <div style={styles.container}>
     
      <div style={styles.contentSection}>
        <h1 style={styles.title}>
        About Chennai
        </h1>
        <ul style={styles.bulletPoints}>
          {/* <li style={styles.bulletPoint}>
            Meet BNI's CEO Mary Kennedy Thompson
          </li> */}
          <p style={styles.paragraph}>
          Welcome to Chennai, the vibrant gateway to Kerala, known as “God’s Own Country.” 
          This coastal city is a perfect blend of rich history, diverse culture,
           and breathtaking landscapes. Wander through the charming lanes of Fort Chennai, 
           where colonial architecture meets local artistry, or visit the iconic Chinese 
           fishing nets for a unique photo op. Explore the lush backwaters, savor Kerala’s 
           renowned cuisine, and experience traditional Kathakali dance performances. From 
           serene beaches to spice markets, Kochi offers a refreshing escape, inviting conference 
           attendees to immerse in its heritage, natural beauty, and warm hospitality.
            </p>
        </ul>
      </div>
    </div>
  );
};

export default AboutDetails;