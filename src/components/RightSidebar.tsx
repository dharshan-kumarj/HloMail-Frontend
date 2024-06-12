// src/components/RightSidebar.tsx
import React, { useState, useEffect } from 'react';
import "../styles/sidebar.css"; // Ensure you import necessary CSS for styling

const RightSidebar: React.FC = () => {
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
      <span className="toggle-btn toggle-right" onClick={handleToggleVisibility}>
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
      <div className={`sidebar right-sidebar ${isVisible ? "show" : ""}`} style={{ top: "10px" }}>
        <div className="card shadow bg-white rounded-lg">
          <div className="d-flex flex-column" style={{ height: "65vh" }}>
            <ul className="nav flex-column">
              <li className="nav-item mt-3">
                <a className="nav-link active" href="#">
                  Profile
                </a>
              </li>
              <li className="nav-item mt-3">
                <a className="nav-link" href="#">
                  Settings
                </a>
              </li>
              <li className="nav-item mt-3">
                <a className="nav-link" href="#">
                  Notifications
                </a>
              </li>
              <li className="nav-item mt-3">
                <a className="nav-link" href="#">
                  Help
                </a>
              </li>
              <li className="nav-item mt-3">
                <a className="nav-link" href="#">
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default RightSidebar;
