import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useLocation,
} from "react-router-dom";
import UserRegister from "../../pages/UserRegister";
import UserLogin from "../../pages/UserLogin";
import PartnerRegister from "../../pages/FoodPartnerRegister";
import PartnerLogin from "../../pages/FoodPartnerLogin";
import ChooseRegister from "../../pages/ChooseRegister";
import Home from "../../pages/general/Home";
import Saved from "../../pages/general/Saved";
import CreateFood from "../../pages/food-partner/CreateFood";
import Profile from "../../pages/food-partner/profile";

const TopNav = () => {
  const location = useLocation();
  // Show top nav only on home and saved pages
  const showNav = location.pathname === "/" || location.pathname === "/saved";

  if (!showNav) return null;

  return (
    <header className="top-nav">
      <div style={{ flex: 1 }} />
      <nav>
        <Link to="/register" className="primary">
          Register
        </Link>
      </nav>
    </header>
  );
};

const AppRoutes = () => {
  return (
    <Router>
      <TopNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/register" element={<ChooseRegister />} />
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/food-partner/register" element={<PartnerRegister />} />
        <Route path="/food-partner/login" element={<PartnerLogin />} />
        <Route path="/create-food" element={<CreateFood />} />
        <Route path="/food-partner/:id" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
