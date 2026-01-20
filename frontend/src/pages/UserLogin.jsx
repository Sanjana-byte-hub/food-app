import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/auth.css";
import axios from "axios";
import { BACKEND_URL } from "../config"; 

const UserLogin = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
      try{const email = e.target.email.value;
      const password = e.target.password.value;

      if (!email || !password) {
        alert("Please enter both email and password.");
        return;
      }

      const response = await axios.post(
        `${BACKEND_URL}/api/auth/user/login`,
        { email, password },
        { withCredentials: true }
      );

      console.log("login response", response.data);
      alert("Login successful");
      navigate("/");}
      catch (err) {
      console.error(err);
      alert("user not  exist.");
    }
    
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="brand">
          <div className="logo" aria-hidden />
          <div>
            <h2>Foodify</h2>
            <p>Welcome back — pick up where you left off</p>
          </div>
        </div>

        <h3 className="auth-title">Sign in</h3>
        <p className="auth-sub">Welcome back! Please enter your details.</p>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@domain.com"
            />
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Your password"
            />
          </div>

          <button className="btn" type="submit">
            Sign in
          </button>
        </form>

        <div className="meta">
          New here? <Link to="/user/register">Create account</Link>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
