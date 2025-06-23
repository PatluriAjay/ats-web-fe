import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/CandidateCreate.scss";
import { Card, Chip, Button } from "@mui/material";
import { AiOutlineEye } from "react-icons/ai";

const CandidateProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [candidate, setCandidate] = useState(location.state?.candidate || null);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    // If no candidate in location.state, load from mockCandidate.json
    if (!candidate) {
      fetch(require("../mockCandidate.json"))
        .then((res) => (res.json ? res.json() : res))
        .then((data) => setCandidate(data));
    }
    window.scrollTo(0, 0);
  }, [candidate]);

  if (!candidate) {
    return <div style={{ padding: 40 }}>No candidate data found.</div>;
  }

  return (
    <div className="" style={{ background: "#f8fafc", minHeight: "100vh" }}>
      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
          padding: 32,
        }}
      >
        <Button
          onClick={() => navigate(-1)}
          style={{ marginBottom: 18, color: "#2563eb", fontWeight: 500 }}
        >
          &lt; Back to Candidates
        </Button>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            marginBottom: 24,
          }}
        >
          {/* Avatar removed as there is no image for candidate */}
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, fontSize: 22 }}>
              {candidate.fullName || candidate.name}
            </div>
            <div style={{ color: "#4a5568", fontSize: 16 }}>
              {candidate.jobTitle || "-"}
            </div>
            <div style={{ color: "#64748b", fontSize: 15, marginTop: 4 }}>
              <span style={{ marginRight: 18 }}>{candidate.email}</span>
              {candidate.phone && <span>| {candidate.phone}</span>}
            </div>
            <div style={{ color: "#64748b", fontSize: 15, marginTop: 4 }}>
              {candidate.location && <span>{candidate.location}</span>}
              {candidate.experience && (
                <span> | {candidate.experience} years experience</span>
              )}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {candidate.resumeUrl && (
              <Button
                variant="outlined"
                startIcon={<AiOutlineEye size={22} color="#2563eb" />}
                style={{ color: "#2563eb", borderColor: "#2563eb" }}
                href={candidate.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Resume
              </Button>
            )}
          </div>
        </div>
        {/* Tabs - Only Personal Info shown */}
        <div
          style={{
            display: "flex",
            gap: 24,
            borderBottom: "1px solid #e5e7eb",
            marginBottom: 24,
          }}
        >
          <div
            style={{
              fontWeight: 600,
              padding: "8px 0",
              borderBottom: "2.5px solid #2563eb",
              color: "#2563eb",
            }}
          >
            Personal Info
          </div>
        </div>
        {/* Personal Info Section */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1.2rem 2.5rem",
            marginBottom: 24,
          }}
        >
          <div>
            <span className="accordion-details-label">Date of Birth:</span>{" "}
            {candidate.dob || "-"}
          </div>
          <div>
            <span className="accordion-details-label">Age:</span>{" "}
            {candidate.age !== undefined ? candidate.age : "-"}
          </div>
          <div>
            <span className="accordion-details-label">Gender:</span>{" "}
            {candidate.gender || "-"}
          </div>
          <div>
            <span className="accordion-details-label">Nationality:</span>{" "}
            {candidate.nationality || "-"}
          </div>
          <div>
            <span className="accordion-details-label">LinkedIn Profile:</span>{" "}
            {candidate.linkedin ? (
              <a
                href={candidate.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                {candidate.linkedin}
              </a>
            ) : (
              "-"
            )}
          </div>
        </div>
        {/* Technical Skills Section */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 10 }}>
            Technical Skills
          </div>
          <div style={{ marginBottom: 8, fontWeight: 500 }}>
            Programming Languages
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
              marginBottom: 16,
            }}
          >
            {(candidate.skills || []).map((skill) => (
              <Chip
                key={skill}
                label={skill}
                style={{
                  background: "#f1f5f9",
                  color: "#2563eb",
                  fontWeight: 500,
                }}
              />
            ))}
            {(!candidate.skills || candidate.skills.length === 0) && (
              <span>-</span>
            )}
          </div>
        </div>
        {/* <div style={{ display: "flex", gap: 16, marginTop: 32, justifyContent: "flex-end" }}>
          <Button variant="contained" style={{ background: "#2563eb" }}>Save Changes</Button>
        </div> */}
      </div>
    </div>
  );
};

export default CandidateProfile;
