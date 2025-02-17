import React, { useEffect, useState } from "react";
import axios from "axios";

const RazorpayPayment = () => {
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const baseUrl = "https://api-irlvtnbila-uc.a.run.app/api";
  let email = localStorage.getItem("email") || "jasper.in2024@gmail.com";

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => {
      setRazorpayLoaded(true);
      console.log("✅ Razorpay script loaded");
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const initiatePayment = async () => {
    if (!razorpayLoaded) {
      alert("Razorpay script not loaded yet.");
      return;
    }

    try {
      let url = `${baseUrl}/create-payment`;
      let payload = {
        amount: 2, // Amount in INR (2 INR = 200 paisa)
        currency: "INR",
        email: email,
      };

      let response = await axios.post(url, payload, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("✅ Order Created:", response.data);

      if (!response.data || !response.data.id) {
        alert("Failed to create order.");
        return;
      }

      const options = {
        key: "rzp_live_EAMXNFUzpu2bkT", // Razorpay Key ID
        amount: response.data.amount, // Amount in paisa
        currency: response.data.currency,
        order_id: response.data.id, // Correct order ID
        name: "Your Company Name",
        description: "Test Transaction",
        image: "https://your-logo-url.com",
        handler: async function (paymentResponse) {
          console.log("✅ Payment Success Response:", paymentResponse);

          const verificationResponse = await verifyPayment(paymentResponse);
          if (verificationResponse.success) {
            alert("✅ Payment verified successfully!");
          } else {
            alert("❌ Payment verification failed.");
          }
        },
        prefill: {
          name: "John Doe",
          email: email,
          contact: "9487670852",
        },
        theme: { color: "#3399cc" },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("❌ Error while creating order:", error);
      alert("Failed to create order.");
    }
  };

  const verifyPayment = async (paymentResponse) => {
    try {
      const response = await axios.post(`${baseUrl}/verify-payment`, {
        razorpay_payment_id: paymentResponse.razorpay_payment_id,
        razorpay_order_id: paymentResponse.razorpay_order_id,
        razorpay_signature: paymentResponse.razorpay_signature,
        email: email,
      });

      console.log("✅ Verification Response:", response.data);

      return response.data;
    } catch (error) {
      console.error("❌ Error while verifying payment:", error);
      return { success: false };
    }
  };

  return (
    <div style={{ height: "100vh", backgroundColor: "#f8f9fa", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <button onClick={initiatePayment} style={{ padding: "10px 20px", fontSize: "16px", backgroundColor: "#3399cc", color: "#fff", border: "none", borderRadius: "5px" }}>
        Pay Now
      </button>
    </div>
  );
};

export default RazorpayPayment;
