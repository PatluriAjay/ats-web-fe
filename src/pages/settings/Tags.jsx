import React, { useState } from "react";
import Modal from "react-modal";
import "../../styles/Settings.scss";

const initialTags = [
  { id: 1, name: "Urgent", description: "High priority candidate", created: "2024-06-01" },
  { id: 2, name: "Remote", description: "Remote position", created: "2024-06-02" },
  { id: 3, name: "Senior", description: "Senior level position", created: "2024-06-03" },
  { id: 4, name: "Junior", description: "Junior level position", created: "2024-06-04" },
  { id: 5, name: "Contract", description: "Contract position", created: "2024-06-05" },
  { id: 6, name: "Full-time", description: "Full-time position", created: "2024-06-06" },
  { id: 7, name: "Part-time", description: "Part-time position", created: "2024-06-07" },
];

Modal.setAppElement("#root");

const ITEMS_PER_PAGE = 5;

const Tags = () => {
  const [tags, setTags] = useState(initialTags);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editTag, setEditTag] = useState(null);
  const [form, setForm] = useState({ name: "", description: "" });
  const [page, setPage] = useState(1);

  const filteredTags = tags.filter(t => t.name.toLowerCase().includes(search.toLowerCase()));
  const pageCount = Math.ceil(filteredTags.length / ITEMS_PER_PAGE);
  const paginatedTags = filteredTags.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const openCreate = () => {
    setEditTag(null);
    setForm({ name: "", description: "" });
    setModalOpen(true);
  };
  const openEdit = (tag) => {
    setEditTag(tag);
    setForm({ name: tag.name, description: tag.description });
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);

  const handleSave = () => {
    if (form.name.trim() === "") return;
    if (editTag) {
      setTags(tags.map(t => t.id === editTag.id ? { ...t, ...form } : t));
    } else {
      setTags([...tags, { id: Date.now(), ...form, created: new Date().toISOString().slice(0,10) }]);
    }
    setModalOpen(false);
  };
  const handleDelete = (id) => setTags(tags.filter(t => t.id !== id));
  const handleExport = () => {
    const csv = ["Name,Description,Created Date", ...tags.map(t => `${t.name},${t.description},${t.created}`)].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "tags.csv";
    a.click();
    URL.revokeObjectURL(url);
  };
  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > pageCount) return;
    setPage(newPage);
  };

  // Reset to page 1 on search
  React.useEffect(() => { setPage(1); }, [search, tags.length]);

  return (
    <div className="settings-page">
      <div className="settings-header-row">
        <div className="settings-title-group">
          <h1>Manage Tags</h1>
          <p>Manage and track all application tags</p>
        </div>
        <button className="export-btn" onClick={handleExport}>Export</button>
      </div>
      <div className="settings-table-controls">
        <input
          className="settings-search"
          placeholder="Search tags..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button className="create-btn" onClick={openCreate}>Create Tag</button>
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
            {paginatedTags.length === 0 ? (
              <tr><td colSpan={3} style={{textAlign:'center'}}>No tags found</td></tr>
            ) : paginatedTags.map(tag => (
              <tr key={tag.id}>
                <td>{tag.name}</td>
                <td>{tag.created}</td>
                <td>
                  <button className="icon-btn edit-btn" title="Edit" onClick={() => openEdit(tag)}>
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.85 2.85a1.2 1.2 0 0 1 1.7 1.7l-1.1 1.1-1.7-1.7 1.1-1.1Zm-2.1 2.1-8.1 8.1a1 1 0 0 0-.26.45l-1 3.2a.5.5 0 0 0 .62.62l3.2-1a1 1 0 0 0 .45-.26l8.1-8.1-1.7-1.7Z" fill="#0078B9"/></svg>
                  </button>
                  <button className="icon-btn delete-btn" title="Delete" onClick={() => handleDelete(tag.id)}>
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
        <h2>{editTag ? "Edit Tag" : "Create Tag"}</h2>
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

export default Tags; 