import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/bottomnav.css";

const BottomNav = () => {
  const location = useLocation();

  return (
    <div className="bottom-nav">
      <Link
        to="/"
        className={`nav-item ${location.pathname === "/" ? "active" : ""}`}
      >
        <svg
          className="nav-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
        <span className="nav-label">Home</span>
      </Link>
      <Link
        to="/saved"
        className={`nav-item ${location.pathname === "/saved" ? "active" : ""}`}
      >
        <svg
          className="nav-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
          <polyline points="17 21 17 13 7 13 7 21" />
          <polyline points="7 5 7 1 17 1 17 5" />
        </svg>
        <span className="nav-label">Saved</span>
      </Link>
    </div>
  );
};

export default BottomNav;
