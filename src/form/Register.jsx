import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./styles.css";

const BNIForm = () => {
  const baseUrl = "https://api-irlvtnbila-uc.a.run.app/api";
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    whatsappNumber: "",
    registrationType: "", // Stores the selected radio button value
    chapterName: "", // Stores the selected dropdown value
    termsAccepted: false,
  });

  const [chapters, setChapters] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const url = `${baseUrl}/getOnlyChapterNames`;
    console.log("Fetching from:", url);  // Log the full URL
    axios
      .get(url)
      .then((response) => setChapters(response.data?.data || []))
      .catch((error) => console.error("Error fetching chapters:", error));
  }, []);
  

  useEffect(()=>{
    if(!formData.chapterName) return;
    let url = `${baseUrl}/getMembers?chapterName=${formData.chapterName}`;
    axios.get(url)
    .then((response)=>console.log(response.data))
    .catch((error)=>console.error("Error fetching members:",error));
  },[formData.chapterName])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleRegistrationChange = (value) => {
    setFormData((prev) => ({ ...prev, registrationType: value }));
  };

  const handleChapterChange = (value) => {
    setFormData((prev) => ({ ...prev, chapterName: value }));
    setDropdownOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.termsAccepted) return alert("Please accept the terms.");
    console.log(formData);
  };

  return (
    <div className="container">
      <h2 className="title">Registration Here</h2>
      <form onSubmit={handleSubmit} className="registration-form">
        {/* Registration Type (Radio Buttons) */}
        <div className="form-group">
          <label>Registration Type</label>
          <div className="radio-group">
            {["Member", "Visitor", "Display Table", "Goody bag"].map((type) => (
              <label key={type}>
                <input
                  type="radio"
                  name="registrationType"
                  value={type}
                  checked={formData.registrationType === type}
                  onChange={(e) => handleRegistrationChange(e.target.value)}
                  required
                />
                {type}
              </label>
            ))}
          </div>
        </div>

        {/* Chapter Name Dropdown (Separate from Registration Type) */}
        <div className="form-group">
          <label>Chapter Name</label>
          <div className="dropdown-container" ref={dropdownRef}>
            <input
              type="text"
              name="chapterName"
              placeholder="Select Chapter"
              value={formData.chapterName}
              readOnly
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="dropdown-input"
            />
            {dropdownOpen && (
              <div className="dropdown-list">
                {chapters.length > 0 ? (
                  chapters.map((chapter) => (
                    <div
                      key={chapter}
                      className="dropdown-item"
                      onClick={() => handleChapterChange(chapter)}
                    >
                      {chapter}
                    </div>
                  ))
                ) : (
                  <div className="dropdown-item">No chapters found</div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Name Fields */}
        <div className="form-group">
          <label>Name</label>
          <div className="name-fields">
            <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
            <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
          </div>
        </div>

        {/* Contact Details */}
        <div className="form-group">
          <label>Mobile Number</label>
          <input type="tel" name="mobileNumber" placeholder="81234 56789" value={formData.mobileNumber} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>WhatsApp Number</label>
          <input type="tel" name="whatsappNumber" placeholder="81234 56789" value={formData.whatsappNumber} onChange={handleChange} />
        </div>

        {/* Terms & Conditions */}
        <div className="form-group">
          <label>
            <input type="checkbox" name="termsAccepted" checked={formData.termsAccepted} onChange={handleChange} required />
            I agree to the <a href="#">Terms and Conditions</a>. All fees are non-refundable and non-transferable.
          </label>
        </div>

        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
};

export default BNIForm;
