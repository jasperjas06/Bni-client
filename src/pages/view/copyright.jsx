import React from 'react';

const footerStyles = {
  footer: {
    backgroundColor: '#000',
   
    color: '#fff',
    padding: '32px',
  },
  container: {
    width: '100%',
    maxWidth: '1400px',
    margin: '0 auto',
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
  },
  textCenter: {
    textAlign: 'center',
  },
  link: {
    color: '#60A5FA',
    textDecoration: 'none',
  },
  linkHover: {
    color: '#93C5FD',
  },
  downloadButtons: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '16px',
  },
  button: {
    display: 'inline-block',
  },
  image: {
    height: '40px',
    width: 'auto',
  },
  copyright: {
    textAlign: 'center',
    marginTop: '16px',
    fontSize: '14px',
  }
};

const Footer = () => {
  return (
    <footer style={footerStyles.footer}>
      <div style={footerStyles.container}>
        <div style={footerStyles.flexContainer}>
          {/* Terms and Conditions Link */}
          <div style={footerStyles.textCenter}>
            <span>Please find the </span>
            <a 
              href="#" 
              style={footerStyles.link}
              onMouseOver={(e) => e.target.style.color = footerStyles.linkHover.color}
              onMouseOut={(e) => e.target.style.color = footerStyles.link.color}
            >
              Terms and Conditions
            </a>
          </div>

          {/* Download Buttons */}
          <div style={footerStyles.downloadButtons}>
           
         
         
          </div>

          {/* Copyright Text */}
          <div style={footerStyles.copyright}>
            <p>
              Copyright 2025 BNI India Enterprises Pvt Ltd
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;