import React from "react";
import Slider from "react-slick";
import { Box } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImageCarousel = ({ images }) => {
  const settings = {
    dots: true, // Shows navigation dots
    infinite: true, // Loops back after last image
    speed: 500, // Transition speed
    slidesToShow: 1, // Show 1 image at a time
    slidesToScroll: 1,
    autoplay: true, // Auto-play enabled
    autoplaySpeed: 3000, // Slide every 3 seconds
    arrows: true, // Left & Right arrows
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1024, // Large screens
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // Tablets
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, // Mobile
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false, // Hide arrows on small screens
        },
      },
    ],
  };

  return (
    <Box sx={{ width: "100%", maxWidth: "800px", margin: "auto",  }}>
      <Slider {...settings}>
        {images.map((image, index) => (
          <Box key={index} sx={{ display: "flex", justifyContent: "center" }}>
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              style={{
                width: "100%",
                height: "auto",
                maxHeight: "400px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default ImageCarousel;
