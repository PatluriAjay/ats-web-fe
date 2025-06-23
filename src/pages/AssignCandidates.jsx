import React, { useState, useEffect } from "react";
import "../styles/AssignCandidates.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { skillsOptions } from "../constants/skills";
import Select from "react-select";
import Swal from "sweetalert2";
import { AiOutlineEye } from "react-icons/ai";

const PAGE_SIZE = 4;

const AssignCandidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [searchSkills, setSearchSkills] = useState([]);
  const [page, setPage] = useState(1);
  const location = useLocation();
  const [requisition, setRequisition] = useState(null);
  const navigate = useNavigate();

  // Fetch candidates and requisition data from API (integration ready)
  useEffect(() => {
    // Replace with real API calls
    async function fetchData() {
      // Example: fetch requisition from location.state or API
      let req = location.state?.requisition;
      if (!req) {
        // Simulate API call
        req = {
          jobTitle: "Frontend Developer",
          location: "Remote",
          department: "Engineering",
          hiringManager: "John Doe",
          openings: 2,
          description: "Build and maintain web apps.",
          skills: ["React", "JavaScript", "CSS"]
        };
      }
      setRequisition(req);

      // Simulate fetching candidates from API
      const response = await Promise.resolve([
        {
          id: 1,
          name: "Priya Sharma",
          fullName: "Priya Sharma",
          email: "priya.sharma@email.com",
          phone: "+91-9876543210",
          profilePicUrl: "https://randomuser.me/api/portraits/women/44.jpg",
          jobTitle: "Frontend Developer",
          location: "Bangalore",
          experience: 4,
          age: 27,
          dob: "1998-05-12",
          gender: "Female",
          nationality: "Indian",
          linkedin: "https://linkedin.com/in/priyasharma",
          portfolio: "https://priyasharma.dev",
          github: "https://github.com/priyasharma",
          status: "Shortlisted",
          skills: ["React", "JavaScript", "TypeScript", "Redux", "HTML", "CSS"],
          resumeUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
          assigned: false
        },
        {
          id: 2,
          name: "Bob Smith",
          fullName: "Bob Smith",
          email: "bob.smith@email.com",
          phone: "+91-9876543211",
          profilePicUrl: "https://randomuser.me/api/portraits/men/32.jpg",
          jobTitle: "Data Scientist",
          location: "Hyderabad",
          experience: 5,
          age: 29,
          dob: "1996-03-22",
          gender: "Male",
          nationality: "Indian",
          linkedin: "https://linkedin.com/in/bobsmith",
          portfolio: "https://bobsmith.dev",
          github: "https://github.com/bobsmith",
          status: "Shortlisted",
          skills: ["Python", "Machine Learning", "SQL", "Pandas", "TensorFlow"],
          resumeUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
          assigned: true
        },
        {
          id: 3,
          name: "Carol Davis",
          fullName: "Carol Davis",
          email: "carol.davis@email.com",
          phone: "+91-9876543212",
          profilePicUrl: "https://randomuser.me/api/portraits/women/65.jpg",
          jobTitle: "Product Manager",
          location: "Chennai",
          experience: 6,
          age: 31,
          dob: "1994-08-10",
          gender: "Female",
          nationality: "Indian",
          linkedin: "https://linkedin.com/in/caroldavis",
          portfolio: "https://caroldavis.dev",
          github: "https://github.com/caroldavis",
          status: "New",
          skills: ["Product Management", "Agile", "Analytics", "JIRA", "Scrum"],
          resumeUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
          assigned: false
        },
        {
          id: 4,
          name: "David Wilson",
          fullName: "David Wilson",
          email: "david.wilson@email.com",
          phone: "+91-9876543213",
          profilePicUrl: "https://randomuser.me/api/portraits/men/45.jpg",
          jobTitle: "UX Designer",
          location: "Delhi NCR",
          experience: 3,
          age: 26,
          dob: "1999-12-01",
          gender: "Male",
          nationality: "Indian",
          linkedin: "https://linkedin.com/in/davidwilson",
          portfolio: "https://davidwilson.design",
          github: "https://github.com/davidwilson",
          status: "Rejected",
          skills: ["Figma", "Sketch", "User Research", "Wireframing"],
          resumeUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
          assigned: false
        },
        {
          id: 5,
          name: "Eva Brown",
          fullName: "Eva Brown",
          email: "eva.brown@email.com",
          phone: "+91-9876543214",
          profilePicUrl: "https://randomuser.me/api/portraits/women/68.jpg",
          jobTitle: "DevOps Engineer",
          location: "Pune",
          experience: 4,
          age: 28,
          dob: "1997-07-18",
          gender: "Female",
          nationality: "Indian",
          linkedin: "https://linkedin.com/in/evabrown",
          portfolio: "https://evabrown.dev",
          github: "https://github.com/evabrown",
          status: "New",
          skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Linux"],
          resumeUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
          assigned: false
        },
        { id: 6, name: "Frank Miller", email: "frank@example.com", phone: "9876543215", skills: ["Digital Marketing", "SEO", "Analytics"], resumeUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", status: "New", assigned: false },
        { id: 7, name: "Grace Lee", email: "grace@example.com", phone: "9876543216", skills: ["JavaScript", "React", "Vue.js"], resumeUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", status: "New", assigned: false },
        { id: 8, name: "Henry Chen", email: "henry@example.com", phone: "9876543217", skills: ["HR Management", "Employee Relations"], resumeUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", status: "New", assigned: false },
        { id: 9, name: "Ivy Rodriguez", email: "ivy@example.com", phone: "9876543218", skills: ["Sales", "CRM", "Communication"], resumeUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", status: "New", assigned: false },
        { id: 10, name: "Jack Green", email: "jack@example.com", phone: "9876543219", skills: ["Testing", "Automation", "Selenium"], resumeUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", status: "New", assigned: false }
      ]);
      setCandidates(response);
    }
    fetchData();
  }, [location.state]);

  if (!requisition) return <div>Loading...</div>;

  // Filter candidates by name and skills
  const filteredCandidates = candidates.filter(c => {
    const nameMatch = c.name.toLowerCase().includes(searchName.toLowerCase());
    const skillMatch = searchSkills.length > 0
      ? searchSkills.every(skill => c.skills.map(s => s.toLowerCase()).includes(skill.toLowerCase()))
      : true;
    return nameMatch && skillMatch;
  });

  // Pagination
  const pageCount = Math.ceil(filteredCandidates.length / PAGE_SIZE);
  const paginatedCandidates = filteredCandidates.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Pagination handler (same as Requisitions)
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pageCount) {
      setPage(newPage);
    }
  };

  const toggleCandidateSelection = (candidate) => {
    setSelectedCandidates(prev =>
      prev.some(c => c.id === candidate.id)
        ? prev.filter(c => c.id !== candidate.id)
        : [...prev, candidate]
    );
  };

  const handleAccordionToggle = () => setAccordionOpen(open => !open);

  const handleAssign = () => {
    if (selectedCandidates.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "No candidates selected!",
        confirmButtonColor: "#2563eb",
        confirmButtonText: "OK"
      });
      return;
    }
    // Mark selected candidates as assigned
    setCandidates(prev =>
      prev.map(c =>
        selectedCandidates.some(sel => sel.id === c.id)
          ? { ...c, assigned: true }
          : c
      )
    );
    Swal.fire({
      icon: "success",
      title: `Assigned ${selectedCandidates.length} candidate(s)` ,
      confirmButtonColor: "#2563eb",
      confirmButtonText: "OK"
    });
    setSelectedCandidates([]);
  };

  return (
    <div className="assign-candidates-container">
      <div className="assign-candidates-inner">
        <div className="requisition-accordion">
          <div className="accordion-summary" onClick={handleAccordionToggle}>
            <div>{requisition.jobTitle}</div>
            <div style={{display:'flex',alignItems:'center',gap:'0.5rem'}}>
              <span style={{color:'#2563eb',fontWeight:'bold'}}>200 profiles matched</span>
              <svg style={{transform:accordionOpen?'rotate(90deg)':'rotate(0deg)',transition:'transform 0.2s'}} width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </div>
          {accordionOpen && (
            <div className="accordion-details">
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1.2rem 2.5rem',marginBottom:'0.7rem'}}>
                <div><span className="accordion-details-label">Job Title:</span> {requisition.jobTitle}</div>
                <div><span className="accordion-details-label">Location:</span> {requisition.location}</div>
                <div><span className="accordion-details-label">Department:</span> {requisition.department}</div>
                <div><span className="accordion-details-label">Openings:</span> {requisition.openings}</div>
                <div><span className="accordion-details-label">Skills:</span> {requisition.skills && Array.isArray(requisition.skills) && requisition.skills.length > 0 ? requisition.skills.join(', ') : '-'}</div>
              </div>
              <div style={{marginTop:'0.5rem'}}>
                <span className="accordion-details-label">Description:</span> {requisition.description}
              </div>
            </div>
          )}
        </div>
        <div className="assign-candidates-filters" style={{marginBottom:'1.5rem',padding:'0.5rem 0'}}>
          <input
            type="text"
            placeholder="Search by name"
            value={searchName}
            onChange={e => { setSearchName(e.target.value); setPage(1); }}
            style={{minWidth:180,maxWidth:260,padding:'0.6rem 1rem',border:'1.5px solid #d1d5db',borderRadius:6,background:'#fff',fontSize:'1rem'}}
          />
          <Select
            isMulti
            options={skillsOptions.map(s => ({ value: s, label: s }))}
            value={searchSkills.map(s => ({ value: s, label: s }))}
            onChange={selected => { setSearchSkills(selected ? selected.map(opt => opt.value) : []); setPage(1); }}
            placeholder="Search by skills"
            classNamePrefix="react-select"
            styles={{ container: base => ({ ...base, minWidth: 300, maxWidth: 340 }), menu: base => ({ ...base, zIndex: 9999 }) }}
          />
          <button className="assign-btn" style={{marginLeft:'auto',minWidth:180,fontWeight:600,fontSize:'1.05rem',padding:'0.7rem 1.5rem'}} onClick={handleAssign}>
            Assign {selectedCandidates.length} Candidate(s)
          </button>
        </div>
        <div className="assign-candidates-table-wrapper" style={{boxShadow:'0 2px 16px rgba(0,0,0,0.07)',borderRadius:12,background:'#fff'}}>
          <table className="assign-candidates-table" style={{width:'100%',borderCollapse:'collapse'}}>
            <thead>
              <tr style={{background:'#f8fafc'}}>
                <th style={{padding:'16px',fontWeight:600,color:'#4a5568',fontSize:14,textTransform:'uppercase',letterSpacing:'0.5px',borderBottom:'1px solid #f7fafc'}}> </th>
                <th style={{padding:'16px'}}>Name</th>
                <th style={{padding:'16px'}}>Email</th>
                <th style={{padding:'16px'}}>Phone</th>
                <th style={{padding:'16px'}}>Skills</th>
                <th style={{padding:'16px'}}>Resume</th>
                <th style={{padding:'16px'}}>Status</th>
              </tr>
            </thead>
            <tbody>
              {paginatedCandidates.length === 0 ? (
                <tr><td colSpan={7} style={{textAlign:'center',padding:'2rem 0'}}>No candidates found</td></tr>
              ) : paginatedCandidates.map(candidate => {
                const isSelected = selectedCandidates.some(c => c.id === candidate.id);
                return (
                  <tr key={candidate.id} className={isSelected ? 'selected' : ''} style={{background:isSelected?'#e6f0fa':'#fff',transition:'background 0.2s', cursor:'pointer'}}
                    onClick={e => {
                      // Prevent navigation if clicking on checkbox or assign button
                      if (e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON' || e.target.closest('a')) return;
                      window.scrollTo(0, 0); // Scroll to top before navigating
                      navigate('/candidate-profile', {
                        state: {
                          candidate: {
                            ...candidate,
                            fullName: candidate.fullName || candidate.name || '',
                            dob: candidate.dob || '',
                            age: candidate.age || '',
                            gender: candidate.gender || '',
                            nationality: candidate.nationality || '',
                            linkedin: candidate.linkedin || '',
                            portfolio: candidate.portfolio || '',
                            github: candidate.github || ''
                          }
                        }
                      });
                    }}
                  >
                    <td style={{padding:'12px 16px'}}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleCandidateSelection(candidate)}
                        style={{width:18,height:18,cursor:'pointer'}}
                        onClick={e => e.stopPropagation()}
                      />
                    </td>
                    <td style={{padding:'12px 16px',fontWeight:500}}>{candidate.fullName || candidate.name}</td>
                    <td style={{padding:'12px 16px'}}>{candidate.email}</td>
                    <td style={{padding:'12px 16px'}}>{candidate.phone || '-'}</td>
                    <td style={{padding:'12px 16px'}}>{candidate.skills && candidate.skills.length > 0 ? candidate.skills.join(", ") : '-'}</td>
                    <td style={{padding:'12px 16px'}}>
                      {candidate.resumeUrl ? (
                        <a href={candidate.resumeUrl} target="_blank" rel="noopener noreferrer" title="View Resume">
                          <AiOutlineEye size={22} color="#2563eb" style={{verticalAlign:'middle'}} />
                        </a>
                      ) : '-'}
                    </td>
                    <td style={{padding:'12px 16px',fontWeight:600}}>
                      <button
                        className="assign-btn"
                        style={{padding:'0.4rem 1rem',fontSize:'0.95rem',minWidth:120,background:candidate.assigned?'#f8fafc':'#2563eb',color:candidate.assigned?'#2563eb':'#fff',border:candidate.assigned?'1.5px solid #2563eb':'none',fontWeight:600,transition:'all 0.2s'}}
                        onClick={e => {
                          e.preventDefault();
                          e.stopPropagation();
                          if (candidate.assigned) {
                            setCandidates(prev => prev.map(c => c.id === candidate.id ? { ...c, assigned: false } : c));
                            Swal.fire({icon:'success',title:'Candidate is now unassigned', confirmButtonColor:'#2563eb', confirmButtonText:'OK'});
                          } else {
                            setCandidates(prev => prev.map(c => c.id === candidate.id ? { ...c, assigned: true } : c));
                            Swal.fire({icon:'success',title:'Candidate assigned successfully', confirmButtonColor:'#2563eb', confirmButtonText:'OK'});
                          }
                        }}
                      >
                        {candidate.assigned ? 'Re Assign' : 'Assign'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {/* Pagination Controls (same as Requisitions) */}
        {pageCount > 1 && (
          <div className="assign-candidates-pagination">
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
      </div>
    </div>
  );
};

export default AssignCandidates;
