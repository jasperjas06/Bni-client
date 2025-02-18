// import React from "react";
// import { MapPin } from "lucide-react";
// import Map from "../../assets/map.jpg"
// const HotelDetails = () => {
//   return (
//     <div className="container">
//       <div className="card">
//         {/* Header Section */}
//         <div className="header">
       
//         </div>

//         {/* Content Section */}
//         <div className="content">
//           {/* Images Grid */}
//           <div className="image-grid">
//             {/* Hotel Image */}
//             <div className="">
//             <div className="address-section">
//             <h3 className="address-title">Address</h3>
//             <div className="address">
//               {/* <MapPin className="icon" /> */}
//               <div>
//                 {/* <p className="hotel-name">BNI Chennai </p> */}
//                 <p>Agurchand Manmull Jain College, (A.M. Jain College) Meenambakkam </p>
//                 <p>Chennai, Tamilnadu 600061</p>
//                 <button
//             className="directions-button"
//             onClick={() => window.open("https://maps.google.com", "_blank")}
//           >
//             <MapPin className="button-icon" />
//             Get Directions
//           </button>
//               </div>
              
//             </div>
//           </div>
//             </div>

//             {/* Map Image */}
//             <div className="image-container">
//             <img
//     src={Map}  // Use the imported map image here
//     alt="Hotel Location Map"
//     className="image"
//   />
//             </div>
//           </div>

//           {/* Address Section */}
         

//           {/* Directions Button */}
       
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HotelDetails;

// // CSS STYLES
// const style = document.createElement("style");
// style.innerHTML = `
// .container {
//   max-width: 1500px;
//   margin: 0 auto;
//   padding: 16px;
// }

// .card {
//   background-color: white;
//   border-radius: 8px;
//   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//   overflow: hidden;
//   margin-bottom: 24px;
// }

// .header {
//   padding: 16px;
//   border-bottom: 1px solid #ddd;
// }

// .title {
//   font-size: 24px;
//   font-weight: bold;
//   color: #333;
//   margin-bottom: 8px;
// }

// .rating {
//   display: flex;
//   align-items: center;
//   gap: 8px;
// }

// .rating-score {
//   font-size: 18px;
//   font-weight: bold;
//   color: #ffcc00;
// }

// .stars {
//   color: #ffcc00;
// }

// .reviews {
//   font-size: 14px;
//   color: #666;
// }

// .content {
//   padding: 16px;
// }

// .image-grid {
//   display: flex;
//   gap: 16px;
//   margin-bottom: 16px;
// }

// .image-container {
//   flex: 1;
//   border-radius: 8px;
//   overflow: hidden;
//   background-color: #eee;
//   height: 400px;
//   width: 300px;
// }

// .image {
//   width: 100%;
//   height: 100%;
//   object-fit: cover;
// }

// /* Responsive: Stack images on smaller screens */
// @media (max-width: 600px) {
//   .image-grid {
//     flex-direction: column;
//   }
// }

// .address-section {
//   margin-bottom: 16px;
// }

// .address-title {
//   font-size: 18px;
//   font-weight: bold;
//   color: #333;
//   margin-bottom: 8px;
// }

// .address {
//   display: flex;
//   align-items: flex-start;
//   gap: 8px;
//   color: #666;
// }

// .icon {
//   width: 20px;
//   height: 20px;
//   flex-shrink: 0;
//   margin-top: 4px;
// }

// .hotel-name {
//   font-weight: bold;
// }

// .directions-button {
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   gap: 8px;
//   background-color: #e3342f;
//   color: white;
//   padding: 10px 18px;
//   border-radius: 6px;
//   font-weight: bold;
//   cursor: pointer;
//   border: none;
//   transition: all 0.3s ease-in-out;
//   box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.1);
// }

// .directions-button:hover {
//   background-color: #cc1f1a;
//   transform: translateY(-2px);
// }

// .button-icon {
//   width: 16px;
//   height: 16px;
// }
// `;

// document.head.appendChild(style);


import { Container, Typography, Button, Box } from "@mui/material";
import { MapPin } from "lucide-react"; // Ensure you have lucide-react installed
import React from "react";

const BNIConferencePromo = () => {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        py: 4, // Padding Y-axis
      }}
    >
      <Typography
        variant="h4"
        sx={{
          color: "#dc2626",
          fontWeight: "bold",
          position: "relative",
        }}
      >
        Venue
      </Typography>

      <Box
        sx={{
          fontSize: "1.4rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          lineHeight: 1.75,
          color: "#1f2937",
          mb: 2,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Address
        </Typography>
        <Typography>Agurchand Manmull Jain College, (A.M. Jain College)</Typography>
        <Typography>Meenambakkam, Chennai, Tamilnadu 600061</Typography>
      </Box>

      <Button
        variant="contained"
        color="error"
        startIcon={<MapPin />}
        onClick={() =>
          window.open(
            "https://www.google.com/maps/dir/12.9851521,80.1794778/AGURCHAND+MANMULL+JAIN+COLLEGE,+railway+station,+BV+Nagar+3rd+Main+Rd,+Meenambakkam,+Chennai,+Tamil+Nadu+600114/@12.9850188,80.1794456,18z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3a525e0305be150f:0x85a0453c427fd349!2m2!1d80.1794134!2d12.9848855?entry=ttu&g_ep=EgoyMDI1MDIxMi4wIKXMDSoASAFQAw%3D%3D",
            "_blank"
          )
        }
        sx={{ mt: 2 }}
      >
        Get Directions
      </Button>
    </Container>
  );
};

export default BNIConferencePromo;
