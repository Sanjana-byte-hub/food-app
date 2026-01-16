import React from "react";
import { Link } from "react-router-dom";
import "../styles/auth.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PartnerLogin = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const email = e.target.email.value;
      const password = e.target.password.value;

      const response = await axios.post(
        "http://localhost:3000/api/auth/food-partner/login",
        { email, password },
        { withCredentials: true }
      );
      console.log(response.data);
      alert("Partner login successful");
      navigate("/create-food");
    } catch (err) {
      console.error(err);
      alert("Partner not exist.");
    }
  };
  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="brand">
          <div className="logo" aria-hidden />
          <div>
            <h2>Foodify Partner</h2>
            <p>Manage your restaurant and orders</p>
          </div>
        </div>

        <h3 className="auth-title">Partner sign in</h3>
        <p className="auth-sub">Access your partner dashboard.</p>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="owner@restaurant.com"
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
          Need an account?{" "}
          <Link to="/food-partner/register">Create partner account</Link>
        </div>
      </div>
    </div>
  );
};

export default PartnerLogin;
