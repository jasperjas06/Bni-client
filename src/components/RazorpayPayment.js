import React, { useEffect, useState } from "react";
import axios from "axios"
const RazorpayPayment = () => {
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [received,setReceived]= useState({})
  const baseUrl = "https://api-irlvtnbila-uc.a.run.app/api";
  let email = localStorage.getItem("email")
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

  const initiatePayment = async () => {
    if (!razorpayLoaded) {
      alert("Razorpay script not loaded yet.");
      return;
    }

    // 1. Call your backend to create an order
    try {
        let url = `${baseUrl}/create-payment`
        let data = JSON.stringify({
          "amount": 2,
          "currency": "INR",
          "receipt": "receipt_001",
          email:email
        });
        
        let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url:  url   ,
          headers: { 
            'Content-Type': 'application/json'
          },
          data : data
        };
        
        axios.request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          setReceived(response.data)
          if (!response.data) {
            alert("Failed to create order.");
            return;
          }
        })
        .catch((error) => {
          console.log(error);
        });
        

      

      const options = {
        key: "rzp_live_EAMXNFUzpu2bkT",  // Your Razorpay Key ID
        amount: data.amount,            // Order amount (in paisa)
        currency: data.currency,
        order_id: data.orderId,         // Use the order ID received from backend
        name: "Your Company Name",
        description: "Test Transaction",
        image: "https://your-logo-url.com",
        handler: function (response) {
          // 2. Verify payment signature with backend
          verifyPayment(response);
        },
        prefill: {
          name: "John Doe",
          email: "jas131059@gmail.com",
          contact: "9487670852",
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
    } catch (error) {
      console.error("Error while creating order:", error);
      alert("Failed to create order.");
    }
  };

  const verifyPayment = async (paymentResponse) => {
    try {
      const response = await fetch(`${baseUrl}/verify-payment`, {  // Replace with your backend API URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          payment_id: paymentResponse.razorpay_payment_id,
          order_id: paymentResponse.razorpay_order_id,
          signature: paymentResponse.razorpay_signature,
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert("Payment verified successfully!");
      } else {
        alert("Payment verification failed.");
      }
    } catch (error) {
      console.error("Error while verifying payment:", error);
      alert("Payment verification failed.");
    }
  };

  useEffect(() => {
    initiatePayment(); // Automatically trigger payment when page loads
  }, [razorpayLoaded]);

  return (
    <div style={{ height: "100vh", backgroundColor: "#f8f9fa", display: "flex", justifyContent: "center", alignItems: "center" }}>
      {/* No button needed, payment will open automatically */}
    </div>
  );
};

export default RazorpayPayment;
