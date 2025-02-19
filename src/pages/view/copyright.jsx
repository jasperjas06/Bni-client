import React from 'react';

const footerStyles = {
  footer: {
    backgroundColor: "black",
    color: "#fff",
    padding: "10px 0",
    textAlign: "center",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
  },
  flexContainer: {
    display: "flex",
    flexDirection:"column",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  },
  copyright: {
    fontSize: "14px",
  },
  developedBy: {
    fontSize: "14px",
    fontStyle: "italic",
  }
};


const Footer = () => {
  return (
    <footer style={footerStyles.footer}>
  <div style={footerStyles.container}>
    <div style={footerStyles.flexContainer}>

      {/* Copyright Text */}
      <div style={footerStyles.copyright}>
        <p>© 2025 BNI Chennai CBD B</p> 
        {/* Alternatively: <p>&copy; 2025 BNI Chennai CBD B</p> */}
      </div>

      {/* Developed By Text */}
      <div style={footerStyles.developedBy} >
        <p>Developed by <strong><a href='https://kittivaasal.com/' style={{color:"white"}} target='_blank' rel="noreferrer">Kittivaasal Technologies Pvt Ltd</a></strong></p>
      </div>

    </div>
  </div>
</footer>

  );
};

export default Footer;