import React from "react";
import { Link, useLocation } from "react-router-dom";
const Navbar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  return (
    <nav style={{ 
      padding: "15px 25px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <Link
        to="/"
        style={{
          marginRight: "30px",
          fontWeight: isActive("/") ? "600" : "500",
          textDecoration: "none",
          color: isActive("/") ? "#fff" : "rgba(255, 255, 255, 0.8)",
          fontSize: "1.1rem",
          padding: "8px 16px",
          borderRadius: "8px",
          background: isActive("/") ? "rgba(255, 255, 255, 0.2)" : "transparent",
          transition: "all 0.3s ease"
        }}
      >
        🏆 Leaderboard
      </Link>
      <Link
        to="/history"
        style={{
          fontWeight: isActive("/history") ? "600" : "500",
          textDecoration: "none",
          color: isActive("/history") ? "#fff" : "rgba(255, 255, 255, 0.8)",
          fontSize: "1.1rem",
          padding: "8px 16px",
          borderRadius: "8px",
          background: isActive("/history") ? "rgba(255, 255, 255, 0.2)" : "transparent",
          transition: "all 0.3s ease"
        }}
      >
        📜 Claim History
      </Link>
    </nav>
  );
};
export default Navbar;
