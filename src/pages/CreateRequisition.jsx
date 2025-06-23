import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CreateRequisition.scss";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const statusOptions = ["Active", "On Hold", "Closed", "Draft"];
const experienceOptions = ["0-1 years", "1-3 years", "3-5 years", "5+ years"];
const departmentOptions = ["Engineering", "Product", "Design", "Marketing", "Analytics", "Human Resources", "Sales"];
const recruiterOptions = [
  "John Smith", "Sarah Johnson", "Mike Wilson", "Lisa Chen", "David Brown", "Emily Davis", "Alex Thompson", "Jennifer Lee", "Michael Rodriguez", "Rachel Green"
];

const fetchSkills = async (query) => {
  // Simulate API call, replace with real API
  const allSkills = [
    "React", "TypeScript", "Node.js", "Python", "Machine Learning", "SQL", 
    "Product Management", "Agile", "Analytics", "Figma", "Sketch", "User Research",
    "AWS", "Docker", "Kubernetes", "Digital Marketing", "SEO", "JavaScript", 
    "Vue.js", "HR Management", "Employee Relations", "Sales", "CRM", 
    "Communication", "Testing", "Automation", "Selenium", "Java", "C++", 
    "GraphQL", "Redux", "MongoDB", "PostgreSQL", "Git", "CI/CD"
  ];
  if (!query) return allSkills;
  return allSkills.filter(skill => skill.toLowerCase().includes(query.toLowerCase()));
};

const CreateRequisition = () => {
  const [form, setForm] = useState({
    jobTitle: "",
    department: "",
    recruiters: [],
    openings: "1",
    jobDescription: "",
    skills: [],
    skillInput: "",
    experience: "",
    status: "Draft",
    remarks: ""
  });
  const [error, setError] = useState("");
  const [skillSuggestions, setSkillSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;
    if (form.skillInput) {
      fetchSkills(form.skillInput).then(skills => {
        if (active) setSkillSuggestions(skills.filter(s => !form.skills.includes(s)));
      });
    } else {
      setSkillSuggestions([]);
    }
    return () => { active = false; };
  }, [form.skillInput, form.skills]);

  const handleChange = (e) => {
    const { name, value, options, multiple } = e.target;
    if (multiple) {
      const selected = Array.from(options).filter(o => o.selected).map(o => o.value);
      setForm(f => ({ ...f, [name]: selected }));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  };

  const handleSkillInput = (e) => {
    setForm(f => ({ ...f, skillInput: e.target.value }));
    setShowSuggestions(true);
  };

  const handleSkillKeyDown = (e) => {
    if ((e.key === "Enter" || e.key === ",") && form.skillInput.trim()) {
      e.preventDefault();
      addSkill(form.skillInput.trim());
    }
  };

  const addSkill = (skill) => {
    if (!form.skills.includes(skill)) {
      setForm(f => ({ ...f, skills: [...f.skills, skill], skillInput: "" }));
      setShowSuggestions(false);
    }
  };

  const removeSkill = (skill) => {
    setForm(f => ({ ...f, skills: f.skills.filter(s => s !== skill) }));
  };

  const handleSuggestionClick = (skill) => {
    addSkill(skill);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    // Recruiters field is now optional, so no validation
    console.log("Submitting form data:", form);
    Swal.fire({
      icon: "success",
      title: "Requisition created successfully!",
      confirmButtonColor: "#2563eb",
      confirmButtonText: "OK"
    }).then(() => navigate("/requisitions"));
  };

  return (
    <div className="create-requisition-container">
      <h2 style={{fontWeight:600, fontSize:'1.4rem', }}>Create Requisition</h2>
      <form onSubmit={handleSubmit} >
        {/* Basic Information */}
        <div className="create-requisition-section">
          <div className="create-requisition-section-title">
            <span role="img" aria-label="info">🔵</span> Basic Information
          </div>
          <div className="create-requisition-row">
            <div className="create-requisition-field">
              <label>Job Title *</label>
              <input
                name="jobTitle"
                value={form.jobTitle}
                onChange={handleChange}
                placeholder="e.g. Senior Software Engineer"
                required
              />
            </div>
            <div className="create-requisition-field">
              <label>Department *</label>
              <select name="department" value={form.department} onChange={handleChange} required>
                <option value="">Select Department</option>
                {departmentOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="create-requisition-row">
            <div className="create-requisition-field">
              <label>Recruiters *</label>
              <Autocomplete
                multiple
                options={recruiterOptions}
                value={form.recruiters}
                onChange={(_, value) => setForm(f => ({ ...f, recruiters: value }))}
                renderInput={(params) => (
                  <TextField {...params} placeholder="Select Recruiter(s)" variant="outlined" size="small" />
                )}
                filterSelectedOptions
                disableCloseOnSelect
                sx={{ background: '#fff', borderRadius: '5px' }}
                getOptionDisabled={(option) => form.recruiters.includes(option)}
              />
              <div style={{fontSize:'0.92em',color:'#888',marginTop:2}}>Search and select one or more recruiters</div>
            </div>
            <div className="create-requisition-field">
              <label>Number of Openings *</label>
              <input
                type="number"
                name="openings"
                value={form.openings}
                onChange={handleChange}
                min="1"
                required
              />
            </div>
          </div>
        </div>
        {/* Job Details */}
        <div className="create-requisition-section">
          <div className="create-requisition-section-title">
            <span role="img" aria-label="details">🟦</span> Job Details
          </div>
          <div className="create-requisition-row">
            <div className="create-requisition-field" style={{flex:2}}>
              <label>Job Description *</label>
              <textarea
                name="jobDescription"
                value={form.jobDescription}
                onChange={handleChange}
                placeholder="Provide a detailed description of the role, responsibilities, and requirements..."
                rows="4"
                required
              />
              <div style={{fontSize:'0.85rem', color:'#888', marginTop:2}}>Minimum 100 characters recommended</div>
            </div>
          </div>
          <div className="create-requisition-row">
            <div className="create-requisition-field" style={{position:'relative'}}>
              <label>Skills *</label>
              <Autocomplete
                multiple
                freeSolo
                options={skillSuggestions.length ? skillSuggestions : []}
                value={form.skills}
                onChange={(_, value) => setForm(f => ({ ...f, skills: value }))}
                onInputChange={(_, value) => setForm(f => ({ ...f, skillInput: value }))}
                renderInput={(params) => (
                  <TextField {...params} placeholder="Type or select skills" variant="outlined" size="small" />
                )}
                filterSelectedOptions
                disableCloseOnSelect
                sx={{ background: '#fff', borderRadius: '5px' }}
              />
              <div style={{fontSize:'0.92em',color:'#888',marginTop:2}}>Search, select or add new skills</div>
            </div>
            <div className="create-requisition-field">
              <label>Experience Level *</label>
              <select name="experience" value={form.experience} onChange={handleChange} required>
                <option value="">Select Experience Level</option>
                {experienceOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        {/* Status & Additional Information */}
        <div className="create-requisition-section">
          <div className="create-requisition-section-title">
            <span role="img" aria-label="status">🟦</span> Status & Additional Information
          </div>
          <div className="create-requisition-row">
            <div className="create-requisition-field">
              <label>Status *</label>
              <select name="status" value={form.status} onChange={handleChange} required>
                {statusOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <div className="create-requisition-field">
              <label>Additional Remarks</label>
              <textarea
                name="remarks"
                value={form.remarks}
                onChange={handleChange}
                placeholder="Any additional notes, special requirements, or comments..."
                rows="2"
              />
            </div>
          </div>
        </div>
        {error && <div style={{ color: "#e53e3e", marginBottom: 12 }}>{error}</div>}
        <div className="create-requisition-actions">
          <button className="cancel-btn" type="button" onClick={() => navigate("/requisitions")}>Cancel</button>
          <button className="save-btn" type="submit">Create Requisition</button>
        </div>
      </form>
    </div>
  );
};

export default CreateRequisition;
