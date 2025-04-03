import {
    Container,
    Typography,
    List,
    ListItem,
    ListItemText,
    Box,
    Divider
  } from "@mui/material";
  import logo from "../../assets/Regional.jpg";
  
  const TermsAndConditions = () => {
    return (
      <Container maxWidth="md" sx={{ py: 6 }}>
        {/* Header */}
        <Box display="flex" alignItems="center" flexWrap="wrap" mb={4}>
          <img src={logo} alt="BNI Chennai CBD Logo" style={{ width: 200, marginRight: 16 }} />
          <Typography variant="h4" fontWeight={700}>
            Terms and Conditions
          </Typography>
        </Box>
  
        {/* Terms Content */}
        {sections.map(({ title, content, link }, index) => (
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
            {link && (
              <Typography sx={{ mt: 2 }}>
                <a href={link.href} style={{ color: "#1976D2", textDecoration: "none", fontWeight: "bold" }}>
                  {link.label}
                </a>
              </Typography>
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
      title: "1. Introduction",
      content:
        "Welcome to 14anniversary.bnichennaicbdb.in, the official registration website for the 14th Anniversary celebration of BNI Chennai CBD. By accessing or using this website, you agree to be bound by these Terms and Conditions."
    },
    {
      title: "2. Event Registration",
      content: [
        "This website is solely for registration purposes for the BNI Chennai CBD 14th Anniversary event.",
        "By registering, you confirm that all information provided is accurate and complete.",
        "Your registration is non-transferable and must be completed within the given timelines.",
        "Event details, including date, venue, and agenda, are subject to change at the discretion of the organizers."
      ]
    },
    {
      title: "3. Code of Conduct",
      content: [
        "All attendees are expected to maintain professional conduct during the event.",
        "Disruptive behavior, harassment, or violation of event policies may result in removal from the event without prior notice.",
        "BNI Chennai CBD reserves the right to deny or revoke access to any attendee violating these terms."
      ]
    },
    {
      title: "4. Intellectual Property",
      content:
        "All content on this website, including text, images, graphics, and event materials, are the property of BNI Chennai CBD and are protected under copyright and intellectual property laws."
    },
    {
      title: "5. Privacy Policy",
      content: "Your privacy is important to us. Please refer to our Privacy Policy for details on data handling and protection.",
      link: {
        label: "View Privacy Policy",
        href: "/privacypolicy"
      }
    },
    {
      title: "6. Limitation of Liability",
      content:
        "BNI Chennai CBD is not responsible for any technical issues, disruptions, or unauthorized access affecting your use of this website."
    },
    {
      title: "7. Changes to Terms and Conditions",
      content:
        "BNI Chennai CBD reserves the right to modify these Terms and Conditions at any time. Any changes will be updated on this page."
    },
    {
      title: "8. Contact Information",
      content: [
        "BNI Chennai CBD 14th Anniversary Event Team",
        "Email: support@bnichennaicbd.com",
        "Phone: +91 8754445068"
      ]
    }
  ];
  
  export default TermsAndConditions;
  