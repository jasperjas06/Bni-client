import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const RazorpayPayment = () => {
  let {type} = useParams()
  // console.log(type,"text")
  const navigate = useNavigate();
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const baseUrl = "https://api-irlvtnbila-uc.a.run.app/api";
  const email = localStorage.getItem("email");
  const name = localStorage.getItem("name");
  const synergy = localStorage.getItem("synergy")

  // Payment Data Based on Date Ranges
  const memberPaymentData = [
    { start: "2025-01-01", end: "2025-03-15", amount: 354 , bannerAmount:300},  
    { start: "2025-03-16", end: "2025-03-31", amount: 472 ,bannerAmount:400},  
    { start: "2025-04-01", end: "2025-04-07", amount: 590 ,bannerAmount:500},  
    { start: "2025-04-08", end: "2025-12-31", amount: 750 ,bannerAmount:750},
  ];

  const VisitorPaymentData = [
    { start: "2025-01-01", end: "2025-03-15", amount: 472 ,bannerAmount:400},  
    { start: "2025-03-16", end: "2025-03-31", amount: 590 ,bannerAmount:500},  
    { start: "2025-04-01", end: "2025-04-07", amount: 767 ,bannerAmount:700},  
    { start: "2025-04-06", end: "2025-12-31", amount: 900 ,bannerAmount:900},
  ];

  const GoodyBagPaymentData = [
    { start: "2025-01-01", end: "2025-03-15", amount: 4720 ,bannerAmount:4000},  
    { start: "2025-03-16", end: "2025-03-31", amount: 472 },  
    { start: "2025-04-01", end: "2025-04-07", amount: 590 },  
    { start: "2025-04-06", end: "2025-12-31", amount: 6000 , bannerAmount:6000},
  ];

  const DisplayTablePaymentData = [
    { start: "2025-01-01", end: "2025-03-15", amount: 4720 ,bannerAmount:4000},  
    { start: "2025-03-16", end: "2025-03-31", amount: 5900 ,bannerAmount:5000},  
    { start: "2025-04-01", end: "2025-04-07", amount: 6490 ,bannerAmount:5500},  
    { start: "2025-04-06", end: "2025-12-31", amount: 7000 ,bannerAmount:7000},
  ];

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

  // Function to determine the amount based on the current date
  const getPaymentAmount = () => {
    const today = new Date().toISOString().split("T")[0]; // Current Date (YYYY-MM-DD)
    let paymentData;
    if(type == "Member") {
      paymentData = memberPaymentData;
    } else if(type == "Visitor") {
      paymentData = VisitorPaymentData;
    } else if(type == "Goody bag") {
      paymentData = GoodyBagPaymentData;
    } else if(type == "Display Table") {
      paymentData = DisplayTablePaymentData;
    }
     else {
      paymentData = [];
    }
    
    const selectedPayment = paymentData.find((entry) => 
      today >= entry.start && today <= entry.end
    );

    return selectedPayment ? selectedPayment.amount : 0;
  };

  useEffect(()=>{
    if(razorpayLoaded){
      initiatePayment()
    }
  },[razorpayLoaded])

  const initiatePayment = async () => {
    if (!razorpayLoaded) {
      alert("Razorpay script not loaded yet.");
      return;
    }

    const amountInRupees = getPaymentAmount();
    if (amountInRupees === 0) {
      toast.error("No valid payment amount found for today's date.");
      return;
    }

    // const amountInPaise = Math.round(amountInRupees * 100); // Convert to paise

    try {
      const response = await axios.post(`${baseUrl}/create-payment`, {
        amount: synergy == "Yes" ? 2500 : amountInRupees,
        currency: "INR",
        receipt: `receipt_${new Date().getTime()}`,
        email: email,
      });

      if (!response.data || !response.data.id) {
        alert("Failed to create order.");
        return;
      }

      const options = {
        key: "rzp_test_MGDrUtAHyZoesH",
        amount: response.data.amount,
        currency: response.data.currency,
        order_id: response.data.id,
        name: "BNI CBD-B ANNIVERSARY",
        description: "Registration fee",
        image: "https://your-logo-url.com",
        handler: function (paymentResponse) {
          verifyPayment({
            razorpay_order_id: response.data.id,
            razorpay_payment_id: paymentResponse.razorpay_payment_id,
            razorpay_signature: paymentResponse.razorpay_signature,
            email: email,
            amount: response.data.amount,
            name: name,
          });
        },
        prefill: { name: name || "John Doe", email: email, contact: "9487670852" },
        notes: { address: "Corporate Office" },
        theme: { color: "#3399cc" },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

      paymentObject.on("payment.failed", (failureResponse) => {
        toast.error(`Payment failed: ${failureResponse.error.description}`);
      });
    } catch (error) {
      toast.error("Failed to create order.");
    }
  };

  const verifyPayment = async (paymentResponse) => {
    try {
      const response = await fetch(`${baseUrl}/verify-payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentResponse),
      });

      const data = await response.json();
      if (data.success) {
        toast.success("Payment verified successfully!");
        localStorage.removeItem("name")
        localStorage.removeItem("email")
        localStorage.removeItem("synergy")
        setTimeout(() => navigate("/"), 2000);
      } else {
        toast.error("Payment verification failed.");
      }
    } catch (error) {
      toast.error("Payment verification failed.");
    }
  };


  return (
    <div style={{ height: "100vh", backgroundColor: "#f8f9fa", display: "flex", justifyContent: "center", alignItems: "center" }}>
      
    </div>
  );
};

export default RazorpayPayment;
