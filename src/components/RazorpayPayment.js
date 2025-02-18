import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import backgroundImage from "../assets/image.jpg";

const RazorpayPayment = () => {
  let { type } = useParams();
  const navigate = useNavigate();
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const baseUrl = "https://api-irlvtnbila-uc.a.run.app/api";
  const email = localStorage.getItem("email");
  const name = localStorage.getItem("name");
  const [displayData, setDisplaydata] = useState({});
  const [amountToPay, setAmountToPay] = useState(0);

  // Payment Data Based on Date Ranges
  const memberPaymentData = [
    { start: "2025-01-01", end: "2025-03-15", amount: 354, bannerAmount: 300 },
    { start: "2025-03-16", end: "2025-03-31", amount: 472, bannerAmount: 400 },
    { start: "2025-04-01", end: "2025-04-07", amount: 590, bannerAmount: 500 },
    { start: "2025-04-08", end: "2025-12-31", amount: 750, bannerAmount: 750 },
  ];

  const VisitorPaymentData = [
    { start: "2025-01-01", end: "2025-03-15", amount: 472, bannerAmount: 400 },
    { start: "2025-03-16", end: "2025-03-31", amount: 590, bannerAmount: 500 },
    { start: "2025-04-01", end: "2025-04-07", amount: 767, bannerAmount: 700 },
    { start: "2025-04-06", end: "2025-12-31", amount: 900, bannerAmount: 900 },
  ];

  const getPaymentData = () => {
    switch (type) {
      case "Member":
        return memberPaymentData;
      case "Visitor":
        return VisitorPaymentData;
      default:
        return [];
    }
  };

  const getBannerAmount = () => {
    const today = new Date().toISOString().split("T")[0];
    const paymentData = getPaymentData();
    const selectedPayment = paymentData.find(
      (entry) => today >= entry.start && today <= entry.end
    );

    if (selectedPayment) {
      setDisplaydata(selectedPayment);
      setAmountToPay(selectedPayment.amount);
    }
  };

  useEffect(() => {
    getBannerAmount();
  }, [type]);

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

  useEffect(() => {
    if (razorpayLoaded && amountToPay > 0) {
      initiatePayment();
    }
  }, [razorpayLoaded, amountToPay]);

  const initiatePayment = async () => {
    if (!razorpayLoaded) {
      return;
    }

    const amountInPaise = Math.round(amountToPay * 100);

    try {
      const response = await axios.post(`${baseUrl}/create-payment`, {
        amount: amountToPay,
        currency: "INR",
        receipt: `receipt_${new Date().getTime()}`,
        email: email,
      });

      if (!response.data || !response.data.id) {
        toast.error("Failed to create order.");
        return;
      }

      const options = {
        key: "rzp_live_EAMXNFUzpu2bkT",
        amount: response.data.amount,
        currency: response.data.currency,
        order_id: response.data.id,
        name: "BNI CBD-B ANNIVERSARY",
        description: "Registration fee",
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
        setTimeout(() => navigate("/"), 2000);
      } else {
        toast.error("Payment verification failed.");
      }
    } catch (error) {
      toast.error("Payment verification failed.");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `until ${date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`;
  };

  return (
    <div
      style={{
        height: "100vh",
        background: `url(${backgroundImage}) center/cover no-repeat`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "20px",
      }}
    >
      {/* {displayData.bannerAmount && (
        <div
          style={{
            backgroundColor: "#fff",
            padding: "20px 30px",
            borderRadius: "12px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            marginBottom: "20px",
          }}
        >
          <h2 style={{ fontSize: "28px", fontWeight: "bold", color: "#333" }}>
            <span>{displayData.bannerAmount}</span> {formatDate(displayData.end)}
          </h2>
          <p style={{ color: "gray" }}>GST applies</p>
        </div>
      )} */}
    </div>
  );
};

export default RazorpayPayment;
