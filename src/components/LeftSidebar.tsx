// src/components/LeftSidebar.tsx
import React, { useState, useEffect } from 'react';
import img_logo from "../images/dashboard/logo.svg";
import "../styles/sidebar.css"; // Ensure you import necessary CSS for styling

const LeftSidebar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleToggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleResize = () => {
    if (window.innerWidth >= 992) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <span className="toggle-btn toggle-left" onClick={handleToggleVisibility}>
        <img
          width="26"
          height="26"
          src={
            isVisible
              ? "https://img.icons8.com/metro/26/back.png"
              : "https://img.icons8.com/metro/26/forward.png"
          }
          alt="toggle"
        />
      </span>
      <div className={`sidebar left-sidebar ${isVisible ? "show" : ""}`} style={{ top: "10px" }}>
        <div className="card shadow bg-white rounded-lg">
          <img src={img_logo} alt="Logo" />
          <div className="d-flex flex-column" style={{ height: "65vh" }}>
            <ul className="nav flex-column">
              <li className="nav-item mt-3">
                <a className="nav-link active" href="#">
                  Dashboard
                </a>
              </li>
              <li className="nav-item mt-3">
                <a className="nav-link" href="#">
                  API Key
                </a>
              </li>
              <li className="nav-item mt-3">
                <a className="nav-link" href="#">
                  Credits
                </a>
              </li>
              <li className="nav-item mt-3">
                <a className="nav-link" href="#">
                  Templates
                </a>
              </li>
              <li className="nav-item mt-3">
                <a className="nav-link" href="#">
                  Documentation
                </a>
              </li>
              <li className="nav-item mt-3">
                <a className="nav-link" href="#">
                  Support
                </a>
              </li>
            </ul>
          </div>
          <div className="card-footer text-center">
            <button type="button" className="btn btn-primary btn-sm">
              Log out
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeftSidebar;
