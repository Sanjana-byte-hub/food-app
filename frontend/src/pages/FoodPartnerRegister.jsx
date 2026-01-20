import React from "react";
import { Link } from "react-router-dom";
import "../styles/auth.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PartnerRegister = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const name = e.target.name.value;
      const contactName = e.target.contactName.value;
      const phone = e.target.phone.value;
      const email = e.target.email.value;
      const password = e.target.password.value;
      const address = e.target.address.value;

      const response = await axios.post(
        `${BACKEND_URL}/api/auth/food-partner/register`,
        {
          name,
          contactName,
          phone,
          email,
          password,
          address,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      alert("Partner registration successful");
      navigate("/create-food");
    } catch (err) {
      console.error(err);
      alert("partner already exists");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="brand">
          <div className="logo" aria-hidden />
          <div>
            <h2>Foodify Partner</h2>
            <p>Join as a partner to list your restaurant</p>
          </div>
        </div>

        <h3 className="auth-title">Partner sign up</h3>
        <p className="auth-sub">
          Create your business account to start receiving orders.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="name">Business name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Tasty Bites"
            />
          </div>

          <div className="row">
            <div className="field">
              <label htmlFor="phone">Phone</label>
              <input
                id="phone"
                name="phone"
                type="text"
                placeholder="+1 555 555 555"
              />
            </div>
            <div className="field">
              <label htmlFor="contactName">Contact name</label>
              <input
                id="contactName"
                name="contactName"
                type="text"
                placeholder="Contact name"
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="email">email</label>
            <input id="email" name="email" type="email" placeholder="email" />
          </div>

          <div className="field">
            <label htmlFor="address">Address</label>
            <input
              id="address"
              name="address"
              type="text"
              placeholder="address"
            />
          </div>

          <div className="field">
            <label htmlFor="Password">Password</label>
            <input
              id="Password"
              name="password"
              type="password"
              placeholder="Create a password"
            />
          </div>

          <button className="btn" type="submit">
            Create partner account
          </button>
        </form>

        <div className="meta">
          Already a partner? <Link to="/food-partner/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default PartnerRegister;
