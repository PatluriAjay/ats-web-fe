import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../styles/Users.scss";

const userTypes = [
  "Recruiter",
  "Hiring Manager",
  "HR Admin",
  "Reporting Manager"
];

const CreateUser = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    userType: "Recruiter",
    dateOfJoining: "",
    notes: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.mobile.trim() || !form.dateOfJoining) {
      setError("Please fill all required fields.");
      return;
    }
    Swal.fire({
      icon: "success",
      title: "User created successfully!",
      showConfirmButton: false,
      timer: 1500
    }).then(() => {
      navigate("/users");
    });
  };

  return (
    <div className="users-page">
      <div className="user-create-container">
        <h2 style={{ fontWeight: 600, fontSize: "1.3rem" }}>Create User</h2>
        <form className="user-create-form" onSubmit={handleSubmit} autoComplete="off">
          <div className="user-section">
            <div className="user-section-title">User Details</div>
            <div className="user-row">
              <div className="user-field" style={{ minWidth: 0 }}>
                <label>Name *</label>
                <input name="name" value={form.name} onChange={handleChange} required />
              </div>
              <div className="user-field" style={{ minWidth: 0 }}>
                <label>Email *</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} required />
              </div>
            </div>
            <div className="user-row">
              <div className="user-field" style={{ minWidth: 0 }}>
                <label>Mobile *</label>
                <input name="mobile" value={form.mobile} onChange={handleChange} required />
              </div>
              <div className="user-field" style={{ minWidth: 0 }}>
                <label>User Type *</label>
                <select name="userType" value={form.userType} onChange={handleChange} required>
                  {userTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="user-row">
              <div className="user-field" style={{ minWidth: 0 }}>
                <label>Date of Joining *</label>
                <input name="dateOfJoining" type="date" value={form.dateOfJoining} onChange={handleChange} required />
              </div>
              <div className="user-field" style={{ minWidth: 0, visibility: 'hidden' }}>
                {/* Empty field for alignment */}
                <label style={{ visibility: 'hidden' }}>Spacer</label>
                <input style={{ visibility: 'hidden' }} tabIndex={-1} readOnly />
              </div>
            </div>
          </div>
          <div className="user-section">
            <div className="user-section-title">Additional Notes</div>
            <textarea className="user-notes" name="notes" value={form.notes} onChange={handleChange} placeholder="Add any additional notes about the user" rows="2" />
          </div>
          {error && <div style={{ color: "#e53e3e", marginBottom: 12 }}>{error}</div>}
          <div className="user-actions">
            <button className="cancel-btn" type="button" onClick={() => navigate("/users")}>Cancel</button>
            <button className="save-btn" type="submit">Save User</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
