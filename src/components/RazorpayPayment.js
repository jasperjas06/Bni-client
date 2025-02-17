import React, { useEffect, useState } from "react";

const RazorpayPayment = () => {
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setRazorpayLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = async () => {
    if (!razorpayLoaded) {
      alert("Razorpay script not loaded yet.");
      return;
    }

    const options = {
      key: "rzp_live_EAMXNFUzpu2bkT", // Replace with your Razorpay Key ID
      amount: 50000, // Amount in paisa (e.g., 50000 for ₹500)
      currency: "INR",
      name: "Your Company Name",
      description: "Test Transaction",
      image: "https://your-logo-url.com",
      handler: function (response) {
        alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
      },
      prefill: {
        name: "John Doe",
        email: "johndoe@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div>
      <button
        onClick={handlePayment}
        style={{ padding: "10px", fontSize: "16px" }}
        disabled={!razorpayLoaded} // Disable button until Razorpay is loaded
      >
        Pay Now
      </button>
    </div>
  );
};

export default RazorpayPayment;
