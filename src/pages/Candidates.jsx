import React, { useEffect, useState } from "react";
import "../styles/Candidates.scss";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";
import Select from "react-select";
import { skillsOptions } from "../constants/skills";

const candidateList = [
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
		resumeUrl:
			"https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
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
		resumeUrl:
			"https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
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
		resumeUrl:
			"https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
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
		resumeUrl:
			"https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
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
		resumeUrl:
			"https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
	},
];

const ITEMS_PER_PAGE = 4;

const Candidates = () => {
	const [candidates, setCandidates] = useState([]);
	const [searchName, setSearchName] = useState("");
	const [searchSkills, setSearchSkills] = useState([]);
	const [page, setPage] = useState(1);
	const navigate = useNavigate();

	useEffect(() => {
		setCandidates(candidateList);
	}, []);

	// Filter candidates by name and skills
	const filteredCandidates = candidates.filter((c) => {
		const nameMatch =
			c.fullName.toLowerCase().includes(searchName.toLowerCase()) ||
			c.name.toLowerCase().includes(searchName.toLowerCase());
		const skillMatch =
			searchSkills.length > 0
				? searchSkills.every((skill) =>
						(c.skills || []).map((s) => s.toLowerCase()).includes(skill.toLowerCase())
				  )
				: true;
		return nameMatch && skillMatch;
	});

	const pageCount = Math.ceil(filteredCandidates.length / ITEMS_PER_PAGE);
	const paginatedCandidates = filteredCandidates.slice(
		(page - 1) * ITEMS_PER_PAGE,
		page * ITEMS_PER_PAGE
	);

	// Reset to page 1 on filter change
	useEffect(() => {
		setPage(1);
	}, [searchName, searchSkills, candidates.length]);

	// Pagination handler (same as Requisitions)
	const handlePageChange = (newPage) => {
		if (newPage >= 1 && newPage <= pageCount) {
			setPage(newPage);
		}
	};

	return (
		<div className="requisitions-page">
			<div className="requisitions-header-row">
				<div className="requisitions-title-group">
					<h1>Candidates</h1>
				</div>
				<Link to="/candidates/create" className="create-btn">
					Create Candidate
				</Link>
			</div>
			<div
				style={{
					display: "flex",
					gap: "1rem",
					marginBottom: "1.5rem",
					alignItems: "center",
				}}
			>
				<input
					type="text"
					placeholder="Search by name"
					value={searchName}
					onChange={(e) => setSearchName(e.target.value)}
					style={{
						minWidth: 180,
						maxWidth: 260,
						padding: "0.6rem 1rem",
						border: "1.5px solid #d1d5db",
						borderRadius: 6,
						background: "#fff",
						fontSize: "1rem",
					}}
				/>
				<Select
					isMulti
					options={skillsOptions.map((s) => ({ value: s, label: s }))}
					value={searchSkills.map((s) => ({ value: s, label: s }))}
					onChange={(selected) =>
						setSearchSkills(selected ? selected.map((opt) => opt.value) : [])
					}
					placeholder="Search by skills"
					classNamePrefix="react-select"
					styles={{
						container: (base) => ({
							...base,
							minWidth: 300,
							maxWidth: 340,
						}),
						menu: (base) => ({ ...base, zIndex: 9999 }),
					}}
				/>
			</div>
			<div className="requisitions-table-wrapper">
				<table className="requisitions-table">
					<thead>
						<tr>
							<th>Name</th>
							<th>Email</th>
							<th>Phone</th>
							<th>Skills</th>
							<th>Resume View</th>
						</tr>
					</thead>
					<tbody>
						{paginatedCandidates.length === 0 ? (
							<tr>
								<td
									colSpan={5}
									style={{
										textAlign: "center",
										padding: "2rem 0",
									}}
								>
									No candidates found
								</td>
							</tr>
						) : (
							paginatedCandidates.map((candidate) => (
								<tr
									key={candidate.id}
									style={{ cursor: "pointer" }}
									onClick={(e) => {
										// Prevent navigation if clicking on resume link
										if (e.target.closest("a")) return;
										navigate("/candidate-profile", {
											state: {
												candidate: {
													...candidate,
													fullName:
														candidate.fullName ||
														candidate.name ||
														"",
													dob: candidate.dob || "",
													age: candidate.age || "",
													gender: candidate.gender || "",
													nationality:
														candidate.nationality || "",
													linkedin: candidate.linkedin || "",
													portfolio: candidate.portfolio || "",
													github: candidate.github || "",
												},
											},
										});
									}}
								>
									<td>{candidate.fullName || candidate.name}</td>
									<td>{candidate.email}</td>
									<td>{candidate.phone || "-"}</td>
									<td>
										{candidate.skills &&
										candidate.skills.length > 0
											? candidate.skills.join(", ")
											: "-"}
									</td>
									<td>
										{candidate.resumeUrl ? (
											<a
												href={candidate.resumeUrl}
												target="_blank"
												rel="noopener noreferrer"
												title="View Resume"
												onClick={(e) => e.stopPropagation()}
											>
												<AiOutlineEye
													size={22}
													color="#2563eb"
													style={{
														verticalAlign: "middle",
													}}
												/>
											</a>
										) : (
											"-"
										)}
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>
			{/* Pagination Controls (same as Requisitions) */}
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
		</div>
	);
};

export default Candidates;