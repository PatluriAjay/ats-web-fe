import React, { useState } from "react";
import Modal from "react-modal";
import "../../styles/Settings.scss";

const initialSkills = [
  { id: 1, name: "React", description: "React library", created: "2024-06-01" },
  { id: 2, name: "Node.js", description: "Node.js runtime", created: "2024-06-02" },
  { id: 3, name: "Python", description: "Python language", created: "2024-06-03" },
  { id: 4, name: "TypeScript", description: "TypeScript language", created: "2024-06-04" },
  { id: 5, name: "GraphQL", description: "GraphQL API", created: "2024-06-05" },
  { id: 6, name: "Redux", description: "Redux state", created: "2024-06-06" },
  { id: 7, name: "Docker", description: "Docker containers", created: "2024-06-07" },
];

Modal.setAppElement("#root");

const ITEMS_PER_PAGE = 5;

const Skills = () => {
  const [skills, setSkills] = useState(initialSkills);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editSkill, setEditSkill] = useState(null);
  const [form, setForm] = useState({ name: "", description: "" });
  const [page, setPage] = useState(1);

  const filteredSkills = skills.filter(s => s.name.toLowerCase().includes(search.toLowerCase()));
  const pageCount = Math.ceil(filteredSkills.length / ITEMS_PER_PAGE);
  const paginatedSkills = filteredSkills.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const openCreate = () => {
    setEditSkill(null);
    setForm({ name: "", description: "" });
    setModalOpen(true);
  };
  const openEdit = (skill) => {
    setEditSkill(skill);
    setForm({ name: skill.name, description: skill.description });
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);

  const handleSave = () => {
    if (form.name.trim() === "") return;
    if (editSkill) {
      setSkills(skills.map(s => s.id === editSkill.id ? { ...s, ...form } : s));
    } else {
      setSkills([...skills, { id: Date.now(), ...form, created: new Date().toISOString().slice(0,10) }]);
    }
    setModalOpen(false);
  };
  const handleDelete = (id) => setSkills(skills.filter(s => s.id !== id));
  const handleExport = () => {
    const csv = ["Name,Description,Created Date", ...skills.map(s => `${s.name},${s.description},${s.created}`)].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "skills.csv";
    a.click();
    URL.revokeObjectURL(url);
  };
  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > pageCount) return;
    setPage(newPage);
  };

  // Reset to page 1 on search
  React.useEffect(() => { setPage(1); }, [search, skills.length]);

  return (
    <div className="settings-page">
      <div className="settings-header-row">
        <div className="settings-title-group">
          <h1>Manage Skills</h1>
          <p>Manage and track all skills</p>
        </div>
        <button className="export-btn" onClick={handleExport}>Export</button>
      </div>
      <div className="settings-table-controls">
        <input
          className="settings-search"
          placeholder="Search skills..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button className="create-btn" onClick={openCreate}>Create Skill</button>
      </div>
      <div className="settings-table-wrapper">
        <table className="settings-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Created Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedSkills.length === 0 ? (
              <tr><td colSpan={3} style={{textAlign:'center'}}>No skills found</td></tr>
            ) : paginatedSkills.map(skill => (
              <tr key={skill.id}>
                <td>{skill.name}</td>
                <td>{skill.created}</td>
                <td>
                  <button className="icon-btn edit-btn" title="Edit" onClick={() => openEdit(skill)}>
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.85 2.85a1.2 1.2 0 0 1 1.7 1.7l-1.1 1.1-1.7-1.7 1.1-1.1Zm-2.1 2.1-8.1 8.1a1 1 0 0 0-.26.45l-1 3.2a.5.5 0 0 0 .62.62l3.2-1a1 1 0 0 0 .45-.26l8.1-8.1-1.7-1.7Z" fill="#0078B9"/></svg>
                  </button>
                  <button className="icon-btn delete-btn" title="Delete" onClick={() => handleDelete(skill.id)}>
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 2a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1V3h4a1 1 0 1 1 0 2h-1v12a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2V5H2a1 1 0 1 1 0-2h4V2Zm7 3H5v12h10V5Zm-6 3a1 1 0 1 1 2 0v6a1 1 0 1 1-2 0V8Z" fill="#e53e3e"/></svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination Controls */}
      {pageCount > 1 && (
        <div className="settings-pagination">
          <button className="pagination-btn" onClick={() => handlePageChange(page - 1)} disabled={page === 1}>&lt;</button>
          {Array.from({ length: pageCount }, (_, i) => (
            <button
              key={i+1}
              className={"pagination-btn" + (page === i+1 ? " active" : "")}
              onClick={() => handlePageChange(i+1)}
            >
              {i+1}
            </button>
          ))}
          <button className="pagination-btn" onClick={() => handlePageChange(page + 1)} disabled={page === pageCount}>&gt;</button>
        </div>
      )}
      <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        className="settings-modal"
        overlayClassName="settings-modal-overlay"
      >
        <h2>{editSkill ? "Edit Skill" : "Create Skill"}</h2>
        <div className="modal-field">
          <label>Name</label>
          <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
        </div>
        <div className="modal-field">
          <label>Description</label>
          <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
        </div>
        <div className="modal-actions">
          <button className="save-btn" onClick={handleSave}>Save</button>
          <button className="cancel-btn" onClick={closeModal}>Cancel</button>
        </div>
      </Modal>
    </div>
  );
};

export default Skills; 