import React, { useState, useRef, useEffect } from "react";
import { NavLink, Outlet, Routes, Route, useLocation } from "react-router-dom";
import "../styles/Layout.scss";
import Dashboard from "../pages/Dashboard";
import Requisitions from "../pages/Requisitions";
import Candidates from "../pages/Candidates";
import Users from "../pages/Users";
import Profile from "../pages/Profile";
import Skills from "../pages/settings/Skills";
import Tags from "../pages/settings/Tags";
import Locations from "../pages/settings/Locations";
import Statuses from "../pages/settings/Statuses";
import CreateRequisition from "../pages/CreateRequisition";
import CandidateCreate from "../pages/CandidateCreate";
import AssignCandidates from "../pages/AssignCandidates";
import CandidateProfile from "../pages/CandidateProfile";
import CreateUser from "../pages/CreateUser";

const user = { name: "User" };

const Layout = () => {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [settingsDropdownOpen, setSettingsDropdownOpen] = useState(false);
  const profileDropdownRef = useRef(null);
  const settingsDropdownRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
      if (settingsDropdownRef.current && !settingsDropdownRef.current.contains(event.target)) {
        setSettingsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="layout">
      <nav className="navbar">
        {/* <div className="logo">CandidateHub</div> */}
        <img src="/logo.png" alt="Logo" className="logo" />
        <ul className="nav-links">
          <li><NavLink to="/dashboard">Dashboard</NavLink></li>
          <li><NavLink to="/requisitions">Requisitions</NavLink></li>
          <li><NavLink to="/candidates">Candidates</NavLink></li>
          <li><NavLink to="/users">Users</NavLink></li>
          <li className="settings-nav-item" ref={settingsDropdownRef}>
            <span
              className={settingsDropdownOpen ? "settings-text active" : "settings-text"}
              onClick={() => setSettingsDropdownOpen((v) => !v)}
              tabIndex={0}
              style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}
            >
              Settings
              <svg
                className={settingsDropdownOpen ? "chevron-icon open" : "chevron-icon"}
                width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"
                style={{ transition: 'transform 0.2s' }}
              >
                <path d="M6 8l4 4 4-4" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            {settingsDropdownOpen && (
              <div className="settings-dropdown" onMouseLeave={() => setSettingsDropdownOpen(false)}>
                <NavLink className="px-2" to="/settings/skills" onClick={() => setSettingsDropdownOpen(false)}>Skills</NavLink>
                <NavLink className="px-2" to="/settings/tags" onClick={() => setSettingsDropdownOpen(false)}>Tags</NavLink>
                <NavLink className="px-2" to="/settings/locations" onClick={() => setSettingsDropdownOpen(false)}>Locations</NavLink>
                <NavLink className="px-2" to="/settings/statuses" onClick={() => setSettingsDropdownOpen(false)}>Statuses</NavLink>
              </div>
            )}
          </li>
        </ul>
        <div className="navbar-right">
          <div className="profile-section" ref={profileDropdownRef}>
            <div className="profile-icon" onClick={() => setProfileDropdownOpen((v) => !v)}>
              {user.name.charAt(0).toUpperCase()}
            </div>
            {profileDropdownOpen && (
              <div className="profile-dropdown">
                <NavLink to="/profile">Profile</NavLink>
                <button onClick={() => alert("Logout")}>Logout</button>
              </div>
            )}
          </div>
        </div>
      </nav>
      <main className="main-content">
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="requisitions" element={<Requisitions />} />
          <Route path="requisitions/create" element={<CreateRequisition />} />
          <Route path="requisitions/assign" element={<AssignCandidates />} />
          <Route path="candidates" element={<Candidates />} />
          <Route path="candidates/create" element={<CandidateCreate />} />
          <Route path="candidate-profile" element={<CandidateProfile />} />
          <Route path="users" element={<Users />} />
          <Route path="users/create" element={<CreateUser />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings/skills" element={<Skills />} />
          <Route path="settings/tags" element={<Tags />} />
          <Route path="settings/locations" element={<Locations />} />
          <Route path="settings/statuses" element={<Statuses />} />
        </Routes>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;