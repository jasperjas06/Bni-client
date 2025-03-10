import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Homepage from "./pages/index"; // Import with an uppercase first letter
import BNIForm from "./form/Register"; 
import RazorpayPayment from "./components/RazorpayPayment";
import TermsAndConditions from "./pages/view/TermsAndConditions";
import PrivacyPolicy from "./pages/view/PrivacyPolicy";
function App() {
  return (
    <Router>
      <div className="App">
        {/* Navigation Bar */}
     

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Homepage />} /> 
          <Route path="/registration_form" element={<BNIForm />} />
          <Route path="/payment/:type" element={<RazorpayPayment/>} />
          <Route path="/termsandconditions" element={<TermsAndConditions />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
