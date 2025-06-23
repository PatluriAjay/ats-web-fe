import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import "../styles/CandidateCreate.scss";

const statusOptions = ["New", "In Review", "Shortlisted", "Rejected", "Hired"];
const skillsOptions = [
  "React", "TypeScript", "Node.js", "Python", "Machine Learning", "SQL", 
  "Product Management", "Agile", "Analytics", "Figma", "Sketch", "User Research",
  "AWS", "Docker", "Kubernetes", "Digital Marketing", "SEO", "JavaScript", 
  "Vue.js", "HR Management", "Employee Relations", "Sales", "CRM", 
  "Communication", "Testing", "Automation", "Selenium", "Java", "C++", 
  "GraphQL", "Redux", "MongoDB", "PostgreSQL", "Git", "CI/CD"
];

const CandidateCreate = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    jobTitle: "",
    experience: "",
    location: "",
    status: "New",
    skills: [],
    resume: null,
    profilePic: null,
    linkedin: "",
    portfolio: "",
    notes: ""
  });
  const [resumeName, setResumeName] = useState("");
  const [profilePicName, setProfilePicName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setForm(f => ({ ...f, [name]: files[0] }));
      if (name === "resume") setResumeName(files[0].name);
      if (name === "profilePic") setProfilePicName(files[0].name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.fullName.trim() || !form.email.trim() || !form.phone.trim() || !form.resume) {
      setError("Please fill all required fields and upload resume.");
      return;
    }
    // Simulate API call
    alert("Candidate profile created successfully!");
    navigate("/candidates");
  };

  return (
    <div className="candidates-page">
      <div className="candidate-create-container">
        <h2 style={{fontWeight:600, fontSize:'1.3rem', }}>Create Candidate Profile</h2>
        <form className="candidate-create-form" onSubmit={handleSubmit} autoComplete="off">
          {/* Candidate Details */}
          <div className="candidate-section">
            <div className="candidate-section-title">Candidate Details</div>
            <div className="candidate-row">
              <div className="candidate-field">
                <label>Full Name *</label>
                <input name="fullName" value={form.fullName} onChange={handleChange} required />
              </div>
              <div className="candidate-field">
                <label>Email *</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} required />
              </div>
            </div>
            <div className="candidate-row">
              <div className="candidate-field">
                <label>Phone Number *</label>
                <input name="phone" value={form.phone} onChange={handleChange} required />
              </div>
              <div className="candidate-field">
                <label>Years of Experience</label>
                <input name="experience" type="number" min="0" value={form.experience} onChange={handleChange} />
              </div>
            </div>
            <div className="candidate-row">
              <div className="candidate-field">
                <label>LinkedIn URL</label>
                <input name="linkedin" value={form.linkedin} onChange={handleChange} placeholder="https://www.linkedin.com/in/your-profile" />
              </div>
              <div className="candidate-field">
                <label>Location</label>
                <select name="location" value={form.location} onChange={handleChange}>
                  <option value="">Select Location</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Chennai">Chennai</option>
                  <option value="Delhi NCR">Delhi NCR</option>
                  <option value="Pune">Pune</option>
                  <option value="Remote">Remote</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>
          {/* Skills */}
          <div className="candidate-section">
            <div className="candidate-section-title">Skills</div>
            <Autocomplete
              multiple
              options={skillsOptions}
              value={form.skills}
              onChange={(_, value) => setForm(f => ({ ...f, skills: value }))}
              renderInput={(params) => (
                <TextField {...params} placeholder="Select skills" variant="outlined" size="small" />
              )}
              filterSelectedOptions
              disableCloseOnSelect
              popupIcon={<ArrowDropDownIcon />}
              sx={{ background: '#fff', borderRadius: '5px', marginBottom: '1.2rem' }}
            />
          </div>
          {/* Documents & Profile */}
          <div className="candidate-section">
            <div className="candidate-section-title">Documents</div>
            <div className="candidate-row">
              <div className="candidate-field" style={{flex:2}}>
                <label>Upload Resume *</label>
                <div className="file-upload-box">
                  <input type="file" name="resume" accept=".pdf,.doc,.docx" style={{display:'none'}} id="resume-upload" onChange={handleFileChange} required />
                  <label htmlFor="resume-upload" className="file-upload-label">
                    <span className="file-upload-icon">&#8682;</span>
                    {resumeName ? resumeName : <span>Drop resume here or <span className="file-upload-link">browse</span></span>}
                    <div className="file-upload-desc">PDF, DOC, DOCX up to 10MB</div>
                  </label>
                </div>
              </div>
            </div>
          </div>
          {/* Additional Notes */}
          <div className="candidate-section">
            <div className="candidate-section-title">Additional</div>
            <label>Additional Notes</label>
            <textarea className="candidate-notes" name="notes" value={form.notes} onChange={handleChange} placeholder="Add any additional remarks or notes about the candidate" rows="2" />
          </div>
          {error && <div style={{ color: "#e53e3e", marginBottom: 12 }}>{error}</div>}
          <div className="candidate-actions">
            <button className="cancel-btn" type="button" onClick={() => navigate("/candidates")}>Cancel</button>
            <button className="save-btn" type="submit">Save Candidate</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CandidateCreate;
