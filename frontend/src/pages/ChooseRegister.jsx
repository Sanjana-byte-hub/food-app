import React from "react";
import { Link } from "react-router-dom";
import "../styles/variables.css";

const ChooseRegister = () => {
  return (
    <main className="choose-register">
      <section className="choose-card">
        <h1>Get Started</h1>
        <p>Join our community — pick the account type that fits you best.</p>

        <div className="choose-actions">
          <Link to="/user/register" className="choose-btn primary">
            Register as User
          </Link>

          <Link to="/food-partner/register" className="choose-btn outline">
            Register as Partner
          </Link>
        </div>
      </section>
    </main>
  );
};

export default ChooseRegister;
