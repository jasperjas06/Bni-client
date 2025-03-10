import {
    Container,
    Typography,
    List,
    ListItem,
    ListItemText,
    Box,
    Divider,
    Link
  } from "@mui/material";
  import logo from "../../assets/Regional.jpg";
  
  const PrivacyPolicy = () => {
    return (
      <Container maxWidth="md" sx={{ py: 6 }}>
        {/* Header */}
        <Box display="flex" alignItems="center" flexWrap="wrap" mb={4}>
          <img src={logo} alt="BNI Chennai CBD Logo" style={{ width: 200, marginRight: 16 }} />
          <Typography variant="h4" fontWeight={700} color="">
            BNI Chennai CBD Privacy Policy
          </Typography>
        </Box>
  

  
        {/* Sections */}
        {sections.map(({ title, content }, index) => (
          <Box key={index} mt={4}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              {title}
            </Typography>
            {Array.isArray(content) ? (
              <List>
                {content.map((item, idx) => (
                  <ListItem key={idx} disablePadding>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography>{content}</Typography>
            )}
            <Divider sx={{ mt: 2 }} />
          </Box>
        ))}
  
        {/* Footer */}
        <Typography mt={6} variant="body2" color="textSecondary" align="center">
          Last Updated: March 10, 2025
        </Typography>
      </Container>
    );
  };
  
  const sections = [
    {
      title: "BNI CHENNAI CBD DATA PROTECTION AND PRIVACY POLICY",
      content:
        "This Privacy Policy outlines how BNI Chennai CBD collects, processes, and safeguards your personal data for the 14th Anniversary event registration at 14anniversary.bnichennaicbdb.in."
    },
    {
      title: "What Information We Collect",
      content: [
        "Personal details: Name, email, phone number, and professional details.",
        "Payment details: Transactions processed securely through third-party payment gateways.",
        "Technical information: IP address, browser type, and device data to enhance user experience."
      ]
    },
    {
      title: "How We Use Your Data",
      content: [
        "To facilitate event registration and attendance management.",
        "To process payments securely and confirm bookings.",
        "To communicate important event updates and notifications.",
        "To comply with legal and regulatory requirements."
      ]
    },
    {
      title: "Data Protection and Security",
      content:
        "We implement strict security measures to protect your personal data. However, we cannot guarantee absolute security due to the nature of digital communications."
    },
    {
      title: "Data Sharing Policy",
      content:
        "We do not sell, rent, or trade your personal data. Your information may only be shared with trusted service providers assisting in event organization."
    },
    {
      title: "Your Rights and Choices",
      content: [
        "You can request access, correction, or deletion of your personal data.",
        "You can opt out of marketing communications at any time.",
        "You can contact us regarding any concerns about your data privacy."
      ]
    },
    {
      title: "Changes to the Privacy Policy",
      content:
        "BNI Chennai CBD reserves the right to update this Privacy Policy. Any changes will be reflected on this page."
    },
    {
      title: "Contact Information",
      content: [
        "BNI Chennai CBD",
        "14th Anniversary Event Team",
        "Email: support@bnichennaicbd.com",
        "Phone: +91 8754445068"
      ]
    }
  ];
  
  export default PrivacyPolicy;
  