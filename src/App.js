import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Homepage from "./pages/index"; // Import with an uppercase first letter
import BNIForm from "./form/Register"; 
function App() {
  return (
    <Router>
      <div className="App">
        {/* Navigation Bar */}
     

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Homepage />} /> {/* Default route for homepage */}
          <Route path="/BNIForm" element={<BNIForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
