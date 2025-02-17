import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./styles.css";
import toast from "react-hot-toast";
import { data, useNavigate } from "react-router-dom";

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
    powerTeam:"",
    categoryInBNI:"",
    termsAccepted: false,
    businessType:""
  });

  const [chapters, setChapters] = useState([]);
  const [members, setMembers] = useState([]);
  const [powerTeam,setPowerTeam] = useState([])
  const [memberData, setMemberData] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpenMember, setDropdownOpenMember] = useState(false);
  const [dropdownOpenPowerTeam,setdropdownOpenPowerTeam] = useState(false)
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const chapterDropdownRef = useRef(null);
  const memberDropdownRef = useRef(null);
  const powerDropdownRef = useRef(null);

  // Fetch Chapters
  useEffect(() => {
    const url = `${baseUrl}/getOnlyChapterNames`;
    // console.log("Fetching from:", url);
    axios
      .get(url)
      .then((response) => setChapters(response.data?.data || []))
      .catch((error) => console.error("Error fetching chapters:", error));
  }, []);

  useEffect(()=>{
    const url = `${baseUrl}/getpowerteam`
    axios.get(url)
    .then((response)=>setPowerTeam(response.data.data))
    .catch((error) => console.error("Error fetching power team:", error));
  },[])

  // Fetch Members based on selected Chapter
  useEffect(() => {
    if (!formData.chapterName || !searchQuery) return;

    const timer = setTimeout(() => {
      setIsLoading(true); // Set loading state while fetching
      const url = `${baseUrl}/getMembers?chapterName=${formData.chapterName}&search=${searchQuery}`;
      
      axios
        .get(url)
        .then((response) => {
          const data = response.data?.data || [];
          const filteredMembers = data.filter(member => !member.isRegistered);
          setMembers(filteredMembers);
        })
        .catch((error) => console.error("Error fetching members:", error))
        .finally(() => setIsLoading(false)); // Reset loading state after request
    }, 500); // Wait 500ms after the user stops typing

    // Cleanup function to clear the timer if the searchQuery changes before timeout
    return () => clearTimeout(timer);
  }, [searchQuery, formData.chapterName]);

  // Close dropdown when clicking outside (for chapters)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chapterDropdownRef.current && !chapterDropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (memberDropdownRef.current && !memberDropdownRef.current.contains(event.target)) {
        setDropdownOpenMember(false);
      }
      if(powerDropdownRef.current && !powerDropdownRef.current.contains(event.target)){
        setdropdownOpenPowerTeam(false)
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
    setFormData((prev) => ({ ...prev, chapterName: value })); // Reset memberName when chapter changes
    setDropdownOpen(false);
  };
  const handlePowerTeamChange = (value) => {
    setFormData((prev) => ({ ...prev, powerTeam: value,  })); // Reset memberName when chapter changes
    setdropdownOpenPowerTeam(false);
  };

  const handleMemberChange = (value) => {
    setMemberData(value)
    if(formData.registrationType !== "Visitor"){
      formData.email = value["Email"]
    }
    console.log(value)
    setFormData((prev) => ({ ...prev, memberName: `${value["First Name"]} ${value["Last Name"]}` }));
    setDropdownOpenMember(false);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!formData.termsAccepted) return alert("Please accept the terms.");
// goodybag
    if(formData.registrationType === "Goody bag"){
      let url = `${baseUrl}/goodybag`
      let newobj = {
        memberName:formData.memberName,
        chapterName:formData.chapterName,
        powerTeam:formData.powerTeam,
        categoryInBNI:formData.categoryInBNI,
        email:formData.email,
        whatsappNumber:formData.whatsappNumber,
        phone:formData.mobileNumber
      }
      await axios.post(url,newobj)
      .then((response)=>{
        if(response.data){
          localStorage.setItem("email",formData.email)
          toast.success(response.data.message)
          setTimeout(()=>navigate(`/payment/${formData.registrationType}`),2000)
        }
      })
      .catch((error) => toast.error(error));
    }

    // memeber 
    if(formData.registrationType === "Member"){
      let url = `${baseUrl}/updateMember`
      let newobj = {
        firstName:memberData["First Name"],
        lastName:memberData["Last Name"],
        chapterName:formData.chapterName,
        powerTeam:formData.powerTeam,
        categoryInBNI:formData.categoryInBNI,
        email:formData.email,
        whatsappNumber:formData.whatsappNumber,
        phone:formData.mobileNumber,
        isRegistered:true
      }
      await axios.put(url,newobj)
      .then((response)=>{
        if(response.data){
          localStorage.setItem("email",formData.email)
          toast.success(response.data.message)
          setTimeout(()=>navigate(`/payment/${formData.registrationType}`),2000)
        }
      })
      .catch((error) => toast.error(error));
    }

    // visitors
    if(formData.registrationType === "Visitor"){
      let url = `${baseUrl}/visitorRegister`
      let newobj = {
        firstname:formData.firstName,
        lastname:formData.lastName,
        memberName:formData.memberName,
        chapterName:formData.chapterName,
        email:formData.email,
        whatsappNumber:formData.whatsappNumber,
        phone:formData.mobileNumber,
        invitedBy:formData.memberName,
        isRegistered:true,
        businessType:formData.businessType
      }
      await axios.post(url,newobj)
      .then((response)=>{
        if(response.data){
          localStorage.setItem("email",formData.email)
          toast.success(response.data.message)
          setTimeout(()=>navigate(`/payment/${formData.registrationType}`),2000)
        }
      })
      .catch((error) => toast.error(error));
    }
    // console.log(formData);
    // Display Table
    if(formData.registrationType === "Display Table"){
      let url = `${baseUrl}/displaytable`
      let newobj = {
        memberName:formData.memberName,
        chapterName:formData.chapterName,
        powerTeam:formData.powerTeam,
        categoryInBNI:formData.categoryInBNI,
        email:formData.email,
        whatsappNumber:formData.whatsappNumber,
        phone:formData.mobileNumber
      }
      await axios.post(url,newobj)
      .then((response)=>{
        if(response.data){
          localStorage.setItem("email",formData.email)
          toast.success(response.data.message)
          setTimeout(()=>navigate(`/payment/${formData.registrationType}`),2000)
        }
      })
      .catch((error) => toast.error(error));
    }
  };

  return (
    <div style={{backgroundColor:"#ededff"}}>
    <div className="container">
      <h2 className="title">Registration Here</h2>
      <div style={{height:"1px", width:"100%",backgroundColor:"red"}} />
      <form onSubmit={handleSubmit} className="registration-form">
        {/* Registration Type (Radio Buttons) */}
        <div className="form-group">
        <br/>
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
        {
          formData.registrationType === "Visitor" && (
        <div className="form-group">
          <label>Name</label>
          <div className="name-fields">
            <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
            <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
          </div>
        </div>
          )
        }
        {
          formData.registrationType === "Visitor" &&
        <label>invited By</label>
        }
        {/* Chapter Name Dropdown */}
        <div className="name-fields">
        <div className="form-group">
          <label>Chapter Name</label>
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
                  <div className="dropdown-item">No chapters found</div>
                )}
              </div>
            )}
          </div>
        </div>
        {/* Member Name Dropdown */}
        <div className="form-group">
      <label>Member Name</label>
      <div className="dropdown-container" ref={memberDropdownRef}>
        <input
          type="text"
          name="memberName"
          va
          placeholder="Search Member"
          value={formData.memberName}
          onClick={() => setDropdownOpenMember(!dropdownOpenMember)}
          onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery on typing
          className="dropdown-input"
        />
        {dropdownOpenMember && (
          <div className="dropdown-list">
            {isLoading ? (
              <div className="dropdown-item">Loading...</div>
            ) : members.length > 0 ? (
              members.map((item, index) => (
                <div
                  key={index}
                  className="dropdown-item"
                  onClick={() => handleMemberChange(item)}
                >
                  {item["First Name"]} {item["Last Name"]}
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


        {/* Name Fields */}
        
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email"  readOnly={formData.registrationType !== "Visitor"?true:false} placeholder="Your Email"  value={formData.email} onChange={handleChange} required />
        </div>
        {
          formData.registrationType === "Visitor" && (

        <div className="form-group">
          <label>Profession </label>
          <input type="text" name="businessType"   placeholder="Type of Business / Profession"  value={formData.businessType} onChange={handleChange} required />
        </div>
          )
        }

        {/* Contact Details */}
        <div className="form-group">
          <label>Mobile Number</label>
          <input type="tel" name="mobileNumber" placeholder="81234 56789" value={formData.mobileNumber} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>WhatsApp Number</label>
          <input type="tel" name="whatsappNumber" placeholder="81234 56789" value={formData.whatsappNumber} onChange={handleChange} />
        </div>

        {
          formData.registrationType !== "Visitor" &&
        <div className="form-group">
          <label>Category in BNI</label>
          <input type="text" name="categoryInBNI"  value={formData.categoryInBNI} onChange={handleChange} required />
        </div>
        }

        {
          formData.registrationType !== "Visitor" &&
        <div className="form-group">
          <label>Power Team</label>
          <div className="dropdown-container" ref={powerDropdownRef}>
            <input
              type="text"
              name="powerTeam"
              placeholder="Select Power Team"
              value={formData.powerTeam}
              readOnly
              onClick={() => setdropdownOpenPowerTeam(!dropdownOpenPowerTeam)}
              className="dropdown-input"
            />
            {dropdownOpenPowerTeam && (
              <div className="dropdown-list">
                {powerTeam.length > 0 ? (
                  powerTeam.map((powerteam,index) => (
                    <div
        key={index}
        className="dropdown-item"
        onClick={() => handlePowerTeamChange(powerteam.name)}
    >
        {typeof powerteam === "object" ? powerteam.name : powerteam} 
    </div>
                  ))
                ) : (
                  <div className="dropdown-item">No Power Team found</div>
                )}
              </div>
            )}
          </div>
        </div>
        }


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
    </div>
  );
};

export default BNIForm;
