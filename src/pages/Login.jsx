import React from "react";
import "../styles/Login.scss";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="login-container">
      <form className="login-form" onSubmit={(ev) => {
        ev.preventDefault();
        navigate('/dashboard')
      }}>
        <div className="text-center">
        <img src="/logo.png" alt="Logo" className="logo" />
        </div>
        <h2 className="text-center">Login</h2>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login; 