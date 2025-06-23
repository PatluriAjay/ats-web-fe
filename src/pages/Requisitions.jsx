import React, { useState } from "react";
import Modal from "react-modal";
import "../styles/Requisitions.scss";
import { Link, useNavigate } from "react-router-dom";

// Sample candidates data
const sampleCandidates = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    skills: ["React", "TypeScript", "Node.js"],
    experience: "4 years",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    skills: ["Python", "Machine Learning", "SQL"],
    experience: "6 years",
  },
  {
    id: 3,
    name: "Carol Davis",
    email: "carol@example.com",
    skills: ["Product Management", "Agile", "Analytics"],
    experience: "5 years",
  },
  {
    id: 4,
    name: "David Wilson",
    email: "david@example.com",
    skills: ["Figma", "Sketch", "User Research"],
    experience: "3 years",
  },
  {
    id: 5,
    name: "Eva Brown",
    email: "eva@example.com",
    skills: ["AWS", "Docker", "Kubernetes"],
    experience: "4 years",
  },
  {
    id: 6,
    name: "Frank Miller",
    email: "frank@example.com",
    skills: ["Digital Marketing", "SEO", "Analytics"],
    experience: "2 years",
  },
  {
    id: 7,
    name: "Grace Lee",
    email: "grace@example.com",
    skills: ["JavaScript", "React", "Vue.js"],
    experience: "3 years",
  },
  {
    id: 8,
    name: "Henry Chen",
    email: "henry@example.com",
    skills: ["HR Management", "Employee Relations"],
    experience: "7 years",
  },
  {
    id: 9,
    name: "Ivy Rodriguez",
    email: "ivy@example.com",
    skills: ["Sales", "CRM", "Communication"],
    experience: "4 years",
  },
  {
    id: 10,
    name: "Jack Green",
    email: "jack@example.com",
    skills: ["Testing", "Automation", "Selenium"],
    experience: "3 years",
  },
];

// All available skills for auto-complete
const allSkills = [
  "React",
  "TypeScript",
  "Node.js",
  "Python",
  "Machine Learning",
  "SQL",
  "Product Management",
  "Agile",
  "Analytics",
  "Figma",
  "Sketch",
  "User Research",
  "AWS",
  "Docker",
  "Kubernetes",
  "Digital Marketing",
  "SEO",
  "JavaScript",
  "Vue.js",
  "HR Management",
  "Employee Relations",
  "Sales",
  "CRM",
  "Communication",
  "Testing",
  "Automation",
  "Selenium",
  "Java",
  "C++",
  "GraphQL",
  "Redux",
  "MongoDB",
  "PostgreSQL",
  "Git",
  "CI/CD",
];

const initialRequisitions = [
  {
    id: 1,
    jobTitle: "Senior React Developer",
    department: "Engineering",
    hiringManager: "John Smith",
    openings: 2,
    jobDescription:
      "We are looking for a senior React developer to join our team...",
    skills: "React, TypeScript, Node.js",
    experience: "5+ years",
    status: "Active",
    remarks: "Urgent hiring needed",
    created: "2024-06-01",
    assignedCandidates: [],
  },
  {
    id: 2,
    jobTitle: "Product Manager",
    department: "Product",
    hiringManager: "Sarah Johnson",
    openings: 1,
    jobDescription: "Lead product strategy and development...",
    skills: "Product Management, Agile, Analytics",
    experience: "3+ years",
    status: "Active",
    remarks: "Remote position available",
    created: "2024-06-02",
    assignedCandidates: [],
  },
  {
    id: 3,
    jobTitle: "UX Designer",
    department: "Design",
    hiringManager: "Mike Wilson",
    openings: 1,
    jobDescription: "Create user-centered design solutions...",
    skills: "Figma, Sketch, User Research",
    experience: "4+ years",
    status: "On Hold",
    remarks: "Portfolio review required",
    created: "2024-06-03",
    assignedCandidates: [],
  },
  {
    id: 4,
    jobTitle: "DevOps Engineer",
    department: "Engineering",
    hiringManager: "Lisa Chen",
    openings: 2,
    jobDescription: "Manage cloud infrastructure and CI/CD pipelines...",
    skills: "AWS, Docker, Kubernetes",
    experience: "3+ years",
    status: "Active",
    remarks: "AWS certification preferred",
    created: "2024-06-04",
    assignedCandidates: [],
  },
  {
    id: 5,
    jobTitle: "Marketing Specialist",
    department: "Marketing",
    hiringManager: "David Brown",
    openings: 1,
    jobDescription: "Develop and execute marketing campaigns...",
    skills: "Digital Marketing, SEO, Analytics",
    experience: "2+ years",
    status: "Closed",
    remarks: "Position filled",
    created: "2024-06-05",
    assignedCandidates: [],
  },
  {
    id: 6,
    jobTitle: "Data Scientist",
    department: "Analytics",
    hiringManager: "Emily Davis",
    openings: 1,
    jobDescription: "Analyze complex data sets and build predictive models...",
    skills: "Python, R, Machine Learning, SQL",
    experience: "4+ years",
    status: "Active",
    remarks: "PhD preferred",
    created: "2024-06-06",
    assignedCandidates: [],
  },
  {
    id: 7,
    jobTitle: "Frontend Developer",
    department: "Engineering",
    hiringManager: "Alex Thompson",
    openings: 3,
    jobDescription:
      "Build responsive web applications using modern frameworks...",
    skills: "JavaScript, React, Vue.js, CSS",
    experience: "2+ years",
    status: "Active",
    remarks: "Junior level position",
    created: "2024-06-07",
    assignedCandidates: [],
  },
  {
    id: 8,
    jobTitle: "HR Manager",
    department: "Human Resources",
    hiringManager: "Jennifer Lee",
    openings: 1,
    jobDescription: "Manage HR operations and employee relations...",
    skills: "HR Management, Employee Relations, Recruitment",
    experience: "5+ years",
    status: "Draft",
    remarks: "Internal promotion opportunity",
    created: "2024-06-08",
    assignedCandidates: [],
  },
  {
    id: 9,
    jobTitle: "Sales Representative",
    department: "Sales",
    hiringManager: "Michael Rodriguez",
    openings: 2,
    jobDescription: "Drive sales growth and build client relationships...",
    skills: "Sales, CRM, Communication, Negotiation",
    experience: "3+ years",
    status: "Active",
    remarks: "Commission-based role",
    created: "2024-06-09",
    assignedCandidates: [],
  },
  {
    id: 10,
    jobTitle: "Quality Assurance Engineer",
    department: "Engineering",
    hiringManager: "Rachel Green",
    openings: 1,
    jobDescription: "Ensure software quality through testing and automation...",
    skills: "Testing, Automation, Selenium, JIRA",
    experience: "3+ years",
    status: "On Hold",
    remarks: "Automation experience required",
    created: "2024-06-10",
    assignedCandidates: [],
  },
];

Modal.setAppElement("#root");

const ITEMS_PER_PAGE = 5;

const Requisitions = () => {
  const navigate = useNavigate();
  const [requisitions, setRequisitions] = useState(initialRequisitions);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editRequisition, setEditRequisition] = useState(null);
  const [form, setForm] = useState({
    jobTitle: "",
    department: "",
    hiringManager: "",
    openings: "",
    jobDescription: "",
    skills: "",
    experience: "",
    status: "",
    remarks: "",
  });
  const [page, setPage] = useState(1);

  // Candidate assignment modal states
  const [candidateModalOpen, setCandidateModalOpen] = useState(false);
  const [currentRequisition, setCurrentRequisition] = useState(null);
  const [candidateSearch, setCandidateSearch] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [selectedCandidates, setSelectedCandidates] = useState([]);

  const filteredRequisitions = requisitions.filter(
    (r) =>
      r.jobTitle.toLowerCase().includes(search.toLowerCase()) ||
      r.department.toLowerCase().includes(search.toLowerCase()) ||
      r.hiringManager.toLowerCase().includes(search.toLowerCase())
  );
  const pageCount = Math.ceil(filteredRequisitions.length / ITEMS_PER_PAGE);
  const paginatedRequisitions = filteredRequisitions.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  // Filter candidates based on search and skills
  const filteredCandidates = sampleCandidates.filter((candidate) => {
    const matchesSearch =
      candidate.name.toLowerCase().includes(candidateSearch.toLowerCase()) ||
      candidate.email.toLowerCase().includes(candidateSearch.toLowerCase());

    const matchesSkills =
      selectedSkills.length === 0 ||
      selectedSkills.some((skill) => candidate.skills.includes(skill));

    return matchesSearch && matchesSkills;
  });

  // Available skills for auto-complete (excluding already selected)
  const availableSkills = allSkills.filter(
    (skill) => !selectedSkills.includes(skill)
  );

  const openCreate = () => {
    setEditRequisition(null);
    setForm({
      jobTitle: "",
      department: "",
      hiringManager: "",
      openings: "",
      jobDescription: "",
      skills: "",
      experience: "",
      status: "",
      remarks: "",
    });
    setModalOpen(true);
  };

  const openEdit = (requisition) => {
    setEditRequisition(requisition);
    setForm({
      jobTitle: requisition.jobTitle,
      department: requisition.department,
      hiringManager: requisition.hiringManager,
      openings: requisition.openings.toString(),
      jobDescription: requisition.jobDescription,
      skills: requisition.skills,
      experience: requisition.experience,
      status: requisition.status,
      remarks: requisition.remarks,
    });
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  // Candidate assignment functions
  const openCandidateAssignment = (requisition) => {
    setCurrentRequisition(requisition);
    setSelectedCandidates(requisition.assignedCandidates || []);
    setCandidateModalOpen(true);
  };

  const closeCandidateModal = () => {
    setCandidateModalOpen(false);
    setCandidateSearch("");
    setSelectedSkills([]);
    setSkillInput("");
    setSelectedCandidates([]);
    setCurrentRequisition(null);
  };

  const addSkill = (skill) => {
    if (skill && !selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
      setSkillInput("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setSelectedSkills(
      selectedSkills.filter((skill) => skill !== skillToRemove)
    );
  };

  const toggleCandidateSelection = (candidate) => {
    const isSelected = selectedCandidates.some((c) => c.id === candidate.id);
    if (isSelected) {
      setSelectedCandidates(
        selectedCandidates.filter((c) => c.id !== candidate.id)
      );
    } else {
      setSelectedCandidates([...selectedCandidates, candidate]);
    }
  };

  const saveCandidateAssignment = () => {
    if (currentRequisition) {
      setRequisitions(
        requisitions.map((r) =>
          r.id === currentRequisition.id
            ? { ...r, assignedCandidates: selectedCandidates }
            : r
        )
      );
    }
    closeCandidateModal();
  };

  const handleSave = () => {
    if (form.jobTitle.trim() === "") return;

    const requisitionData = {
      ...form,
      openings: parseInt(form.openings) || 0,
    };

    if (editRequisition) {
      setRequisitions(
        requisitions.map((r) =>
          r.id === editRequisition.id ? { ...r, ...requisitionData } : r
        )
      );
    } else {
      setRequisitions([
        ...requisitions,
        {
          id: Date.now(),
          ...requisitionData,
          created: new Date().toISOString().slice(0, 10),
          assignedCandidates: [],
        },
      ]);
    }
    setModalOpen(false);
  };

  const handleDelete = (id) =>
    setRequisitions(requisitions.filter((r) => r.id !== id));

  const handleExport = () => {
    const csv = [
      "Job Title,Department,Hiring Manager,Openings,Job Description,Skills,Experience,Status,Remarks,Created Date",
      ...requisitions.map(
        (r) =>
          `"${r.jobTitle}","${r.department}","${r.hiringManager}",${r.openings},"${r.jobDescription}","${r.skills}","${r.experience}","${r.status}","${r.remarks}","${r.created}"`
      ),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "requisitions.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > pageCount) return;
    setPage(newPage);
  };

  // Reset to page 1 on search
  React.useEffect(() => {
    setPage(1);
  }, [search, requisitions.length]);

  return (
    <div className="requisitions-page">
      <div className="requisitions-header-row">
        <div className="requisitions-title-group">
          <h1>Manage Requisitions</h1>
          <p>Manage and track all job requisitions</p>
        </div>
        <button className="export-btn" onClick={handleExport}>
          Export
        </button>
      </div>
      <div className="requisitions-table-controls">
        <input
          className="requisitions-search"
          placeholder="Search requisitions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Link to="/requisitions/create" className="create-btn">
          Create Requisition
        </Link>
      </div>
      <div className="requisitions-table-wrapper">
        <table className="requisitions-table">
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Department</th>
              <th>Hiring Manager</th>
              <th>Openings</th>
              <th>Status</th>
              <th>Created Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedRequisitions.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ textAlign: "center" }}>
                  No requisitions found
                </td>
              </tr>
            ) : (
              paginatedRequisitions.map((requisition) => (
                <tr key={requisition.id}>
                  <td>{requisition.jobTitle}</td>
                  <td>{requisition.department}</td>
                  <td>{requisition.hiringManager}</td>
                  <td>{requisition.openings}</td>
                  <td>
                    <span
                      className={`status-badge ${requisition.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {requisition.status}
                    </span>
                  </td>
                  <td>{requisition.created}</td>
                  <td>
                    <button
                      className="icon-btn edit-btn"
                      title="Edit"
                      onClick={() => openEdit(requisition)}
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.85 2.85a1.2 1.2 0 0 1 1.7 1.7l-1.1 1.1-1.7-1.7 1.1-1.1Zm-2.1 2.1-8.1 8.1a1 1 0 0 0-.26.45l-1 3.2a.5.5 0 0 0 .62.62l3.2-1a1 1 0 0 0 .45-.26l8.1-8.1-1.7-1.7Z"
                          fill="#0078B9"
                        />
                      </svg>
                    </button>
                    <button
                      className="icon-btn assign-btn"
                      title="Assign Candidates"
                      onClick={() => {
                        navigate("/requisitions/assign");
                      }}
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-7 9a7 7 0 1 1 14 0H3Zm7-11a5 5 0 1 1 0 10 5 5 0 0 1 0-10Z"
                          fill="#28a745"
                        />
                      </svg>
                    </button>
                    <button
                      className="icon-btn delete-btn"
                      title="Delete"
                      onClick={() => handleDelete(requisition.id)}
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.5 2a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1V3h4a1 1 0 1 1 0 2h-1v12a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2V5H2a1 1 0 1 1 0-2h4V2Zm7 3H5v12h10V5Zm-6 3a1 1 0 1 1 2 0v6a1 1 0 1 1-2 0V8Z"
                          fill="#e53e3e"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination Controls */}
      {pageCount > 1 && (
        <div className="requisitions-pagination">
          <button
            className="pagination-btn"
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            &lt;
          </button>
          {Array.from({ length: pageCount }, (_, i) => (
            <button
              key={i + 1}
              className={"pagination-btn" + (page === i + 1 ? " active" : "")}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="pagination-btn"
            onClick={() => handlePageChange(page + 1)}
            disabled={page === pageCount}
          >
            &gt;
          </button>
        </div>
      )}

      {/* Edit/Create Requisition Modal */}
      <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        className="requisitions-modal"
        overlayClassName="requisitions-modal-overlay"
      >
        <h2>{editRequisition ? "Edit Requisition" : "Create Requisition"}</h2>
        <div className="modal-field">
          <label>Job Title *</label>
          <input
            value={form.jobTitle}
            onChange={(e) =>
              setForm((f) => ({ ...f, jobTitle: e.target.value }))
            }
            placeholder="Enter job title"
          />
        </div>
        <div className="modal-field">
          <label>Department</label>
          <input
            value={form.department}
            onChange={(e) =>
              setForm((f) => ({ ...f, department: e.target.value }))
            }
            placeholder="Enter department"
          />
        </div>
        <div className="modal-field">
          <label>Hiring Manager</label>
          <input
            value={form.hiringManager}
            onChange={(e) =>
              setForm((f) => ({ ...f, hiringManager: e.target.value }))
            }
            placeholder="Enter hiring manager name"
          />
        </div>
        <div className="modal-field">
          <label>Number of Openings</label>
          <input
            type="number"
            value={form.openings}
            onChange={(e) =>
              setForm((f) => ({ ...f, openings: e.target.value }))
            }
            placeholder="Enter number of openings"
            min="1"
          />
        </div>
        <div className="modal-field">
          <label>Job Description</label>
          <textarea
            value={form.jobDescription}
            onChange={(e) =>
              setForm((f) => ({ ...f, jobDescription: e.target.value }))
            }
            placeholder="Enter job description"
            rows="4"
          />
        </div>
        <div className="modal-field">
          <label>Skills</label>
          <input
            value={form.skills}
            onChange={(e) => setForm((f) => ({ ...f, skills: e.target.value }))}
            placeholder="Enter required skills"
          />
        </div>
        <div className="modal-field">
          <label>Experience</label>
          <input
            value={form.experience}
            onChange={(e) =>
              setForm((f) => ({ ...f, experience: e.target.value }))
            }
            placeholder="Enter experience requirements"
          />
        </div>
        <div className="modal-field">
          <label>Status</label>
          <select
            value={form.status}
            onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
          >
            <option value="">Select status</option>
            <option value="Active">Active</option>
            <option value="On Hold">On Hold</option>
            <option value="Closed">Closed</option>
            <option value="Draft">Draft</option>
          </select>
        </div>
        <div className="modal-field">
          <label>Remarks</label>
          <textarea
            value={form.remarks}
            onChange={(e) =>
              setForm((f) => ({ ...f, remarks: e.target.value }))
            }
            placeholder="Enter any additional remarks"
            rows="3"
          />
        </div>
        <div className="modal-actions">
          <button className="save-btn" onClick={handleSave}>
            Save
          </button>
          <button className="cancel-btn" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </Modal>

      {/* Candidate Assignment Modal */}
      <Modal
        isOpen={candidateModalOpen}
        onRequestClose={closeCandidateModal}
        className="candidate-modal"
        overlayClassName="candidate-modal-overlay"
      >
        <h2>Assign Candidates to {currentRequisition?.jobTitle}</h2>

        {/* Skills Filter */}
        <div className="modal-field">
          <label>Filter by Skills</label>
          <div className="skills-filter">
            <div className="skill-chips">
              {selectedSkills.map((skill) => (
                <span key={skill} className="skill-chip">
                  {skill}
                  <button
                    onClick={() => removeSkill(skill)}
                    className="chip-remove"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="skill-input-container">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                placeholder="Type to add skills..."
                className="skill-input"
              />
              {skillInput && (
                <div className="skill-suggestions">
                  {availableSkills
                    .filter((skill) =>
                      skill.toLowerCase().includes(skillInput.toLowerCase())
                    )
                    .slice(0, 5)
                    .map((skill) => (
                      <div
                        key={skill}
                        className="skill-suggestion"
                        onClick={() => addSkill(skill)}
                      >
                        {skill}
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Candidate Search */}
        <div className="modal-field">
          <label>Search Candidates</label>
          <input
            type="text"
            value={candidateSearch}
            onChange={(e) => setCandidateSearch(e.target.value)}
            placeholder="Search by name or email..."
            className="candidate-search"
          />
        </div>

        {/* Selected Candidates Count */}
        <div className="selected-count">
          {selectedCandidates.length} candidate(s) selected
        </div>

        {/* Candidates List */}
        <div className="candidates-list">
          {filteredCandidates.length === 0 ? (
            <div className="no-candidates">No candidates found</div>
          ) : (
            filteredCandidates.map((candidate) => {
              const isSelected = selectedCandidates.some(
                (c) => c.id === candidate.id
              );
              return (
                <div
                  key={candidate.id}
                  className={`candidate-item ${isSelected ? "selected" : ""}`}
                  onClick={() => toggleCandidateSelection(candidate)}
                >
                  <div className="candidate-info">
                    <div className="candidate-name">{candidate.name}</div>
                    <div className="candidate-email">{candidate.email}</div>
                    <div className="candidate-skills">
                      {candidate.skills.map((skill) => (
                        <span key={skill} className="candidate-skill">
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div className="candidate-experience">
                      {candidate.experience}
                    </div>
                  </div>
                  <div className="candidate-checkbox">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleCandidateSelection(candidate)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="modal-actions">
          <button className="save-btn" onClick={saveCandidateAssignment}>
            Assign {selectedCandidates.length} Candidate(s)
          </button>
          <button className="cancel-btn" onClick={closeCandidateModal}>
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Requisitions;
