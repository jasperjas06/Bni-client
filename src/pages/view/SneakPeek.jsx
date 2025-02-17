import React from 'react';
import backgroundImage from "../../assets/inngurel.jpg";
import Power from "../../assets/power.jpg"; 
import Member from"../../assets/Member.jpg";
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
      fontSize: '32px',
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
      position: 'relative', /* if you want to adjust position */
      left: '300px',
      maxWidth: '120px'

    }
  };

  const highlightItems = [
    {
      icon: Member,  // Corrected the image reference
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
    <div style={styles.mainContainer}>
      <div style={styles.titleContainer}>
        <h1 style={styles.mainTitle}>BNI INC</h1>
        <h2 style={styles.subTitle}>Highlights</h2>
        <h2 style={styles.subTitle}>Sneak Peek</h2>
      </div>

      <div style={styles.gridContainer}>
        {highlightItems.map((item, index) => (
          <div key={index} style={styles.gridItem}>
            <div style={styles.iconWrapper}>
              <img
                src={item.icon}
                alt={item.label}
                style={styles.icon}
              />
            </div>
            <span style={styles.label}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BNIHighlights;