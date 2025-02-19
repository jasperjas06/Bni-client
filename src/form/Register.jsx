import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./styles.css";
import toast from "react-hot-toast";
import { data, useNavigate } from "react-router-dom";
import { Box, colors, Typography } from "@mui/material";

const BNIForm = () => {
  const baseUrl = "https://api-irlvtnbila-uc.a.run.app/api";
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    whatsappNumber: "",
    registrationType: "",
    chapterName: "",
    memberName: "",
    powerTeam: "",
    categoryInBNI: "",
    termsAccepted: false,
    businessType: "",
    gstDetails:"",
    businessName:"",
    synergy: false,
  });
  const [loader, setloader] = useState(false);
  const [chapters, setChapters] = useState([]);
  const [tablecount, setTablecount] = useState("");
  const [members, setMembers] = useState([]);
  const [powerTeam, setPowerTeam] = useState([]);
  const [memberData, setMemberData] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpenMember, setDropdownOpenMember] = useState(false);
  const [dropdownOpenPowerTeam, setdropdownOpenPowerTeam] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const chapterDropdownRef = useRef(null);
  const memberDropdownRef = useRef(null);
  const powerDropdownRef = useRef(null);

  // table count
  useEffect(() => {
    const url = `${baseUrl}/displayTableCount`;
    axios
      .get(url)
      .then((response) => setTablecount(response?.data?.displayTableCount))
      .catch((error) => console.error("Error fetching table count:", error));
  }, []);

  // Fetch Chapters
  useEffect(() => {
    let url = "";
    if (formData.synergy === "Yes") {
      url = `${baseUrl}/synergy-chapter`;
    } else {
      url = `${baseUrl}/getOnlyChapterNames`;
    }
    // console.log("Fetching from:", url);
    axios
      .get(url)
      .then((response) => setChapters(response.data?.data || []))
      .catch((error) => console.error("Error fetching chapters:", error));
  }, [formData.synergy]);

  useEffect(() => {
    const url = `${baseUrl}/getpowerteam`;
    axios
      .get(url)
      .then((response) => setPowerTeam(response.data.data))
      .catch((error) => console.error("Error fetching power team:", error));
  }, []);

  // Fetch Members based on selected Chapter
  useEffect(() => {
    if (!formData.chapterName) return;

    const timer = setTimeout(() => {
      // console.log(searchQuery,"search")
      setIsLoading(true); // Set loading state while fetching
      let url = "";

      if (formData.synergy == "Yes" && formData.chapterName) {
        url = `${baseUrl}/synergy-member?chapterName=${formData.chapterName}`;
      } else {
        url = `${baseUrl}/getMembers?chapterName=${formData.chapterName}`;
      }

      axios
        .get(url)
        .then((response) => {
          const data = response.data?.data || [];
          console.log(response.data.data, url);
          const filteredMembers = data.filter((member) => !member.isRegistered);
          if (formData.registrationType === "Member") {
            setMembers(filteredMembers);
          } else {
            setMembers(data);
          }
        })
        .catch((error) => console.error("Error fetching members:", error))
        .finally(() => setIsLoading(false)); // Reset loading state after request
    }, 500); // Wait 500ms after the user stops typing

    // Cleanup function to clear the timer if the searchQuery changes before timeout
    return () => clearTimeout(timer);
  }, [formData.chapterName, formData.registrationType, formData.synergy]);

  // Close dropdown when clicking outside (for chapters)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        chapterDropdownRef.current &&
        !chapterDropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
      if (
        memberDropdownRef.current &&
        !memberDropdownRef.current.contains(event.target)
      ) {
        setDropdownOpenMember(false);
      }
      if (
        powerDropdownRef.current &&
        !powerDropdownRef.current.contains(event.target)
      ) {
        setdropdownOpenPowerTeam(false);
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
  const handleSynergyChange = (value) => {
    setFormData((prev) => ({ ...prev, synergy: value }));
  };

  const handleChapterChange = (value) => {
    setFormData((prev) => ({ ...prev, chapterName: value })); // Reset memberName when chapter changes
    setDropdownOpen(false);
  };
  const handlePowerTeamChange = (value) => {
    setFormData((prev) => ({ ...prev, powerTeam: value })); // Reset memberName when chapter changes
    setdropdownOpenPowerTeam(false);
  };

  const handleMemberChange = (value) => {
    setMemberData(value);
    if (formData.registrationType !== "Visitor") {
      formData.email = value["Email"];
    }
    // console.log(value);
    setFormData((prev) => ({
      ...prev,
      memberName:
        formData.synergy == "Yes"
          ? `${value["MemberName"]}`
          : `${value["First Name"]} ${value["Last Name"]}`,
    }));
    setDropdownOpenMember(false);
  };

  const filteredMembers = members.filter((member) => {
    const fullName = `${member["First Name"] || member["MemberName"]} ${
      member["Last Name"] || ""
    }`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase());
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setloader(true);

      // Validate required fields
      if (!formData.termsAccepted) {
        toast.error("Please accept the terms.");
        setloader(false);
        return;
      }

      if (!formData.email || !formData.registrationType) {
        toast.error("Please fill in all required fields");
        setloader(false);
        return;
      }
      if (formData.registrationType !== "Visitor" && !formData.powerTeam) {
        toast.error("Please fill in all required fields (Power Team)");
        setloader(false);
        return;
      }

      // Common data validation
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
      if (!isValidEmail) {
        toast.error("Please enter a valid email address");
        setloader(false);
        return;
      }

      // Phone number validation (assuming 10 digits)
      if (formData.mobileNumber && !/^\d{10}$/.test(formData.mobileNumber)) {
        toast.error("Please enter a valid 10-digit mobile number");
        setloader(false);
        return;
      }

      let url;
      let newobj;

      // Prepare request data based on registration type
      switch (formData.registrationType) {
        case "Goody bag":
          url = `${baseUrl}/goodybag`;
          newobj = {
            memberName: formData.memberName?.trim(),
            chapterName: formData.chapterName?.trim(),
            powerTeam: formData.powerTeam?.trim(),
            categoryInBNI: formData.categoryInBNI?.trim(),
            email: formData.email?.trim(),
            whatsappNumber: formData.whatsappNumber?.trim(),
            phone: formData.mobileNumber?.trim(),
            businessName:formData.businessName,
            gstDetails:formData.gstDetails
          };
          break;

        case "Member":
          url = `${baseUrl}/updateMember`;
          newobj = {
            firstName: memberData["First Name"]?.trim(),
            lastName: memberData["Last Name"]?.trim(),
            chapterName: formData.chapterName?.trim(),
            powerTeam: formData.powerTeam?.trim(),
            categoryInBNI: formData.categoryInBNI?.trim(),
            email: formData.email?.trim(),
            whatsappNumber: formData.whatsappNumber?.trim(),
            phone: formData.mobileNumber?.trim(),
            isRegistered: true,
            businessName:formData.businessName,
            gstDetails:formData.gstDetails
          };
          break;

        case "Visitor":
          url = `${baseUrl}/visitorRegister`;
          newobj = {
            firstname: formData.firstName?.trim(),
            lastname: formData.lastName?.trim(),
            memberName: formData.memberName?.trim(),
            chapterName: formData.chapterName?.trim(),
            email: formData.email?.trim(),
            whatsappNumber: formData.whatsappNumber?.trim(),
            phone: formData.mobileNumber?.trim(),
            invitedBy: formData.memberName?.trim(),
            isRegistered: true,
            businessType: formData.businessType?.trim(),
            businessName:formData.businessName,
            gstDetails:formData.gstDetails
          };
          break;

        case "Display Table":
          url = `${baseUrl}/displaytable`;
          newobj = {
            memberName: formData.memberName?.trim(),
            chapterName: formData.chapterName?.trim(),
            powerTeam: formData.powerTeam?.trim(),
            categoryInBNI: formData.categoryInBNI?.trim(),
            email: formData.email?.trim(),
            whatsappNumber: formData.whatsappNumber?.trim(),
            phone: formData.mobileNumber?.trim(),
            synergy: formData.synergy?.trim(),
            businessName:formData.businessName,
            gstDetails:formData.gstDetails
          };
          break;

        default:
          toast.error("Invalid registration type");
          setloader(false);
          return;
      }

      // Validate that required fields are present in newobj
      const requiredFields = ["email", "chapterName"];
      const missingFields = requiredFields.filter((field) => !newobj[field]);

      if (missingFields.length > 0) {
        toast.error(
          `Please fill in the following required fields: ${missingFields.join(
            ", "
          )}`
        );
        setloader(false);
        return;
      }

      // Make API request
      try {
        const response = formData.registrationType === "Member"
        ? await axios.put(url, newobj)  // Use PUT if registrationType is "Member"
        : await axios.post(url, newobj);

        if (response?.data) {
          // Store data in localStorage
          localStorage.setItem("email", formData.email);

          // Set name based on registration type
          let name = "";
          if (formData.registrationType === "Member") {
            name = `${newobj.firstName} ${newobj.lastName}`;
          } else if (formData.registrationType === "Visitor") {
            name = `${newobj.firstname} ${newobj.lastname}`;
          } else {
            name = newobj.memberName;
          }
          localStorage.setItem("name", name);

          // Store synergy if present
          if (formData.synergy) {
            localStorage.setItem("synergy", formData.synergy);
          }

          toast.success(response.data.message || "Registration successful!");

          // Navigate after a delay
          setTimeout(() => {
            navigate(`/payment/${formData.registrationType}`);
          }, 2000);
        }
      } catch (error) {
        let errorMessage = "An error occurred during registration";

        if (error.response) {
          // Server responded with an error
          errorMessage =
            error.response.data?.message || error.response.statusText;
        } else if (error.request) {
          // Request was made but no response
          errorMessage =
            "No response from server. Please check your connection.";
        } else {
          // Something else went wrong
          errorMessage = error.message;
        }

        toast.error(errorMessage);
        console.error("Registration error:", error);
      }
    } catch (error) {
      // Handle any unexpected errors
      console.error("Unexpected error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setloader(false);
    }
  };

  return (
    <div style={{ backgroundColor: "#ededff" }}>
      <div className="container">
        <h2 className="title">Register Here</h2>
        <div style={{ height: "1px", width: "100%", backgroundColor: "red" }} />
        <form onSubmit={handleSubmit} className="registration-form">
          {/* Registration Type (Radio Buttons) */}
          {100 - tablecount > 0 ? (
            <marquee style={{ color: "red", fontWeight: "bold" }}>
              {`There are ${
                100 - tablecount
              } spots available for Display Table Registration. Please register soon to secure your spot. Thank you.`}
            </marquee>
          ) : (
            <div
              style={{ textAlign: "center", color: "red", fontWeight: "bold" }}
            >
              Registration Full for Display Table
            </div>
          )}

          <div className="form-group">
            <br />
            <label>
              Registration Type <span style={{ color: "red" }}>*</span>
            </label>
            <div className="radio-group">
              {["Member", "Visitor", "Display Table", "Goody bag"].map(
                (type) => (
                  <label key={type}>
                    <input
                      type="radio"
                      name="registrationType"
                      value={type}
                      checked={formData.registrationType === type}
                      onChange={(e) => handleRegistrationChange(e.target.value)}
                      required
                      disabled={
                        type === "Display Table" && 100 - tablecount === 0
                      }
                    />
                    {type}{" "}
                    {type === "Display Table" &&
                      100 - tablecount === 0 &&
                      "(Full)"}
                  </label>
                )
              )}
            </div>
          </div>

          {formData.registrationType === "Display Table" && (
            <div className="form-group">
              {/* <br /> */}
              <label>
                Synergy stall owner <span style={{ color: "red" }}>*</span>
              </label>
              <div className="radio-group">
                {["Yes", "No"].map((type) => (
                  <label key={type}>
                    <input
                      type="radio"
                      name="synergy"
                      value={type}
                      checked={formData.synergy === type}
                      onChange={(e) => handleSynergyChange(e.target.value)}
                      required
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>
          )}

          {formData.registrationType === "Visitor" && (
            <div className="form-group">
              <label>
                Name <span style={{ color: "red" }}>*</span>
              </label>
              <div className="name-fields">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          )}
          {formData.registrationType === "Visitor" && <label>Invited By</label>}
          {/* Chapter Name Dropdown */}
          <div className="name-fields">
            <div className="form-group">
              <label>
                Chapter Name <span style={{ color: "red" }}>*</span>
              </label>
              <div className="dropdown-container" ref={chapterDropdownRef}>
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
                      chapters.map((chapter, index) => (
                        <div
                          key={index}
                          className="dropdown-item"
                          onClick={() => handleChapterChange(chapter)}
                        >
                          {chapter}
                        </div>
                      ))
                    ) : (
                      <div className="dropdown-item"> No chapters found</div>
                    )}
                  </div>
                )}
              </div>
            </div>
            {/* Member Name Dropdown */}
            <div className="form-group">
              <label>
                Member Name <span style={{ color: "red" }}>*</span>
              </label>
              <div className="dropdown-container" ref={memberDropdownRef}>
                <input
                  type="text"
                  name="memberName"
                  placeholder="Search Member"
                  value={formData.memberName}
                  onClick={() => setDropdownOpenMember(!dropdownOpenMember)}
                  onChange={(e) => {
                    setSearchQuery(e.target.value); // Update search query
                    setFormData((prev) => ({
                      ...prev,
                      memberName: e.target.value,
                    }));
                  }}
                  className="dropdown-input"
                />
                {dropdownOpenMember && (
                  <div className="dropdown-list">
                    {isLoading ? (
                      <div className="dropdown-item">Loading...</div>
                    ) : filteredMembers.length > 0 ? (
                      filteredMembers.map((item, index) => (
                        <div
                          key={index}
                          className="dropdown-item"
                          onClick={() => handleMemberChange(item)}
                        >
                          {item["First Name"] || item["MemberName"]}{" "}
                          {item["Last Name"] ? item["Last Name"] : ""}
                        </div>
                      ))
                    ) : (
                      <div className="dropdown-item">No members found</div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Gst and Buss */}
          <div className="name-fields">
          <div className="form-group">
              <label>
              GST Details 
              </label>
              <input
                type="text"
                name="gstDetails"
                placeholder="Your GST Details"
                value={formData.gstDetails}
                onChange={handleChange}
              />
            </div>
          <div className="form-group">
              <label>
              Business Name
              </label>
              <input
                type="text"
                name="businessName"
                placeholder="Your Business Name"
                value={formData.businessName}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Name Fields */}

          <div className="form-group">
            <label>
              Email <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="email"
              name="email"
              readOnly={
                formData.registrationType !== "Visitor" ||
                formData.synergy !== "Yes"
              }
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          {formData.registrationType === "Visitor" && (
            <div className="form-group">
              <label>
                Profession <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                name="businessType"
                placeholder="Type of Business / Profession"
                value={formData.businessType}
                onChange={handleChange}
                required
              />
            </div>
          )}

          {/* Contact Details */}
          <div className="form-group">
            <label>
              Mobile Number <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="tel"
              name="mobileNumber"
              placeholder="Your Mobile Number"
              value={formData.mobileNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>WhatsApp Number</label>
            <input
              type="tel"
              name="whatsappNumber"
              placeholder="Your WhatsApp Number"
              value={formData.whatsappNumber}
              onChange={handleChange}
            />
          </div>

          {formData.registrationType !== "Visitor" && (
            <div className="form-group">
              <label>
                Category in BNI <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                name="categoryInBNI"
                placeholder="Your Category in BNI"
                value={formData.categoryInBNI}
                onChange={handleChange}
                required
              />
            </div>
          )}

          {formData.registrationType !== "Visitor" && (
            <div className="name-fields">
              <div className="form-group">
                <label>
                  Power Team <span style={{ color: "red" }}>*</span>
                </label>
                <div className="dropdown-container" ref={powerDropdownRef}>
                  <input
                    type="text"
                    name="powerTeam"
                    placeholder="Select Power Team"
                    value={formData.powerTeam}
                    required={true}
                    readOnly
                    onClick={() =>
                      setdropdownOpenPowerTeam(!dropdownOpenPowerTeam)
                    }
                    className="dropdown-input"
                  />
                  {dropdownOpenPowerTeam && (
                    <div className="dropdown-list">
                      {powerTeam.length > 0 ? (
                        powerTeam.map((powerteam, index) => (
                          <div
                            key={index}
                            className="dropdown-item"
                            onClick={() =>
                              handlePowerTeamChange(powerteam.name)
                            }
                          >
                            {typeof powerteam === "object"
                              ? powerteam.name
                              : powerteam}
                          </div>
                        ))
                      ) : (
                        <div className="dropdown-item">No Power Team found</div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Terms & Conditions */}
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
                required
              />
              I agree to the <a href="#">Terms and Conditions</a>. All fees are
              non-refundable and non-transferable.
            </label>
            {formData.registrationType === "Display Table" && (
              <ul style={{ marginTop: 0 }}>
                <li variant="body1" gutterBottom>
                  Add 1 table & 2 chairs
                </li>
                <li variant="body1" gutterBottom>
                  Table top branding allowed - Tent cards, pamphlets & brochures
                </li>
                <li variant="body1" gutterBottom>
                  Registration included for display table owners
                </li>
                <li variant="body1" gutterBottom>
                  Allocation of tables will be based on power teams
                </li>
                <li variant="body1" gutterBottom>
                  No edible items to be displayed or sold
                </li>
                <li variant="body1" gutterBottom>
                  Heavy product displays are not allowed
                </li>
                <li variant="body1" gutterBottom>
                   No direct sales are encouraged in the stalls
                </li>
              </ul>
            )}
          </div>

          <button
            type="submit"
            style={{ backgroundColor: loader ? "gray" : "#007bff" }}
            disabled={loader}
            className="submit-btn"
          >
            {loader ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BNIForm;
