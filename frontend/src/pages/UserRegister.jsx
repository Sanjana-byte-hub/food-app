import React from "react";
import { Link } from "react-router-dom";
import "../styles/auth.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserRegister = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{const firstName = e.target.firstname.value;
    const lastName = e.target.lastname.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const response = await axios.post(
      "http://localhost:3000/api/auth/user/register",
      {
        fullName: `${firstName} ${lastName}`,
        email,
        password,
      }
    );
    console.log(response.data);
    alert("user registered successfully🎉")
    navigate("/");}
    catch (err) {
      console.error(err);
      alert("user already exist.");
    }

  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="brand">
          <div className="logo" aria-hidden />
          <div>
            <h2>Foodify</h2>
            <p>Sign up to order your favorite meals</p>
          </div>
        </div>

        <h3 className="auth-title">Create an account</h3>
        <p className="auth-sub">Fast onboarding — get ordering in seconds.</p>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="firstname">First name</label>
            <input
              id="firstname"
              name="firstname"
              type="text"
              placeholder="John Doe"
            />
          </div>
          <div className="field">
            <label htmlFor="lastname">Last name</label>
            <input
              id="lastname"
              name="lastname"
              type="text"
              placeholder="John Doe"
            />
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@domain.com"
            />
          </div>

          <div className="row">
            <div className="field">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Choose a password"
              />
            </div>
          </div>

          <button className="btn" type="submit">
            Create account
          </button>
        </form>

        <div className="meta">
          Already have an account? <Link to="/user/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
};
export default UserRegister;
