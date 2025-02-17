import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Homepage from "./pages/index"; // Import with an uppercase first letter
import BNIForm from "./form/Register"; 
import RazorpayPayment from "./components/RazorpayPayment";
function App() {
  return (
    <Router>
      <div className="App">
        {/* Navigation Bar */}
     

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Homepage />} /> {/* Default route for homepage */}
          <Route path="/BNIForm" element={<BNIForm />} />
          <Route path="/payment/:type" element={<RazorpayPayment/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
