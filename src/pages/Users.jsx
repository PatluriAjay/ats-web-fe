import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import Select from "react-select";
import "../styles/Users.scss";

const userTypeOptions = [
	{ value: "Recruiter", label: "Recruiter" },
	{ value: "Hiring Manager", label: "Hiring Manager" },
	{ value: "HR Admin", label: "HR Admin" },
	{ value: "Reporting Manager", label: "Reporting Manager" },
];

const initialUsers = [
	{
		id: 1,
		name: "Priya Sharma",
		email: "priya.sharma@email.com",
		mobile: "9876543210",
		userType: "Recruiter",
		dateOfJoining: "2023-01-15",
		notes: "Senior recruiter.",
	},
	{
		id: 2,
		name: "Bob Smith",
		email: "bob.smith@email.com",
		mobile: "9876543211",
		userType: "Hiring Manager",
		dateOfJoining: "2022-11-10",
		notes: "Manages engineering hires.",
	},
	{
		id: 3,
		name: "Carol Davis",
		email: "carol.davis@email.com",
		mobile: "9876543212",
		userType: "HR Admin",
		dateOfJoining: "2024-02-01",
		notes: "HR admin for onboarding.",
	},
	{
		id: 4,
		name: "David Wilson",
		email: "david.wilson@email.com",
		mobile: "9876543213",
		userType: "Reporting Manager",
		dateOfJoining: "2023-07-20",
		notes: "Reports to HR head.",
	},
	{
		id: 5,
		name: "Eva Brown",
		email: "eva.brown@email.com",
		mobile: "9876543214",
		userType: "Recruiter",
		dateOfJoining: "2023-09-05",
		notes: "Junior recruiter.",
	},
];

const ITEMS_PER_PAGE = 4;

const Users = () => {
	const [users, setUsers] = useState(initialUsers);
	const [search, setSearch] = useState("");
	const [selectedUserTypes, setSelectedUserTypes] = useState([]);
	const [page, setPage] = useState(1);
	const navigate = useNavigate();

	// Filter users by name/email/mobile/userType
	const filteredUsers = users.filter((u) => {
		const q = search.toLowerCase();
		const matchesText =
			u.name.toLowerCase().includes(q) ||
			u.email.toLowerCase().includes(q) ||
			u.mobile.toLowerCase().includes(q) ||
			u.userType.toLowerCase().includes(q);
		const matchesType =
			selectedUserTypes.length === 0 ||
			selectedUserTypes.some((type) => u.userType === type.value);
		return matchesText && matchesType;
	});

	const pageCount = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
	const paginatedUsers = filteredUsers.slice(
		(page - 1) * ITEMS_PER_PAGE,
		page * ITEMS_PER_PAGE
	);

	const handleDelete = (id) => {
		const user = users.find((u) => u.id === id);
		Swal.fire({
			title: `Delete user?`,
			text: `Are you sure you want to delete ${user?.name || "this user"}?`,
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#d33",
			cancelButtonColor: "#3085d6",
			confirmButtonText: "Yes, delete it!",
		}).then((result) => {
			if (result.isConfirmed) {
				setUsers(users.filter((u) => u.id !== id));
				Swal.fire("Deleted!", "User has been deleted.", "success");
			}
		});
	};

	const handleEdit = (id) => {
		// For now, just navigate to create page with edit mode (can be extended)
		navigate(`/users/create?id=${id}`);
	};

	// Reset to page 1 on filter change
	React.useEffect(() => {
		setPage(1);
	}, [search, selectedUserTypes, users.length]);

	return (
		<div className="requisitions-page">
			<div className="requisitions-header-row">
				<div className="requisitions-title-group">
					<h1>Users</h1>
					<p>Manage all users in the system</p>
				</div>
				<Link to="/users/create" className="create-btn">
					+ Create User
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
					placeholder="Search by name, email, mobile, or user type"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
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
					options={userTypeOptions}
					value={selectedUserTypes}
					onChange={setSelectedUserTypes}
					classNamePrefix="react-select"
					placeholder="Filter by user type"
					styles={{
						control: (base) => ({
							...base,
							minWidth: 220,
							borderRadius: 6,
							fontSize: "1rem",
							background: "#fff",
							border: "1.5px solid #d1d5db",
						}),
						menu: (base) => ({ ...base, zIndex: 20 }),
					}}
				/>
			</div>
			<div className="requisitions-table-wrapper">
				<table className="requisitions-table">
					<thead>
						<tr>
							<th>Name</th>
							<th>Email</th>
							<th>Mobile</th>
							<th>User Type</th>
							<th>Date of Joining</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{paginatedUsers.length === 0 ? (
							<tr>
								<td colSpan={7} style={{ textAlign: "center" }}>
									No users found.
								</td>
							</tr>
						) : (
							paginatedUsers.map((user) => (
								<tr key={user.id}>
									<td>{user.name}</td>
									<td>{user.email}</td>
									<td>{user.mobile}</td>
									<td>{user.userType}</td>
									<td>{user.dateOfJoining}</td>
									<td>
										<button
											className="icon-btn"
											onClick={() => handleEdit(user.id)}
											title="Edit"
											style={{
												color: "#2563eb",
												background: "none",
												border: "none",
												marginRight: 8,
											}}
										>
											<AiOutlineEdit size={20} />
										</button>
										<button
											className="icon-btn"
											onClick={() => handleDelete(user.id)}
											title="Delete"
											style={{
												color: "#e53e3e",
												background: "none",
												border: "none",
											}}
										>
											<AiOutlineDelete size={20} />
										</button>
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
						onClick={() => setPage(page - 1)}
						disabled={page === 1}
					>
						&lt;
					</button>
					{Array.from({ length: pageCount }, (_, i) => (
						<button
							key={i + 1}
							className={
								"pagination-btn" + (page === i + 1 ? " active" : "")
							}
							onClick={() => setPage(i + 1)}
						>
							{i + 1}
						</button>
					))}
					<button
						className="pagination-btn"
						onClick={() => setPage(page + 1)}
						disabled={page === pageCount}
					>
						&gt;
					</button>
				</div>
			)}
		</div>
	);
};

export default Users;