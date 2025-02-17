import React from 'react';

const Connec = () => {
  const styles = {
    container: {
      width: '100%',
      hight:'60px',
      maxWidth: '1500px',
      margin: '0 auto',
      padding: '10px',
      display: 'flex',
      backgroundColor: "rgba(255, 255, 255, 0.57)",
    },
    innerContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'flex',
      flexDirection: window.innerWidth < 768 ? 'column' : 'row',
      gap: '2rem',
      alignItems: 'flex-start',
      justifyContent: 'space-between'
    },
    contentSection: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem'
    },
    headingContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.25rem',
    },
    heading: {
      fontSize: '160%',
      fontWeight: 'bold',
      margin: 0,
      position: 'relative',
      right: '50px',
      top: '160px',
    },
    redLetter: {
      color: '#FF0000'
    },
    tagline: {
      fontSize: '1.25rem',
      fontWeight: '600',
      margin: 0,
      position: 'relative',
      left: '200px', 
    },
    description: {
      fontSize: '140%',
      lineHeight: '1.7',
      margin: 0,
      position: 'relative',
      left: '200px', 
    }
  };

  const headings = ['CONNECT', 'COLLABORATE', 'CELEBRATE'];

  return (
    <div style={styles.container}>
      <div style={styles.innerContainer}>
        <div style={styles.contentSection}>
          <div style={styles.headingContainer}>
            {headings.map((word) => (
              <h1 key={word} style={styles.heading}>
                <span style={styles.redLetter}>{word[0]}</span>
                {word.slice(1)}
              </h1>
            ))}
          </div>

          <h2 style={styles.tagline}>
            Empowering Connections Inspiring Growth
          </h2>

          <p style={styles.description}>
            The BNI India National Conference, held this year at the Grand Hyatt Kochi Bolgatty, brings together
            <br />
            entrepreneurs nationwide for networking, business growth, and insights on industry trends. Focused 
            <br />
            on BNI's "Givers Gain" philosophy, it's a prime opportunity to foster connections and celebrate
            <br />
             top-performing members.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Connec;
