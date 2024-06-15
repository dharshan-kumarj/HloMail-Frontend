// src/components/LeftSidebar.tsx
import React, { useState, useEffect } from "react";
import img_logo from "../images/logo.svg";

import dashboard_icon from "../images/sidebar/dashboard-icon.svg";
import api_icon from "../images/sidebar/api-icon.svg";
import templates_icon from "../images/sidebar/templates-icon.svg";
import creadits_icon from "../images/sidebar/creadits-icon.svg";
import documentation_icon from "../images/sidebar/documentation-icon.svg";
import support_icon from "../images/sidebar/support-icon.svg";
import "../styles/dashboard.css";

interface LeftSidebarProps {
  setSelectedComponent: (component: string) => void;
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({ setSelectedComponent }) => {
  const [isLeftSidebarVisible, setIsLeftSidebarVisible] = useState(false);
  const [active, setActive] = useState("api-keys");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 992) {
        setIsLeftSidebarVisible(true);
      } else {
        setIsLeftSidebarVisible(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setIsLeftSidebarVisible(!isLeftSidebarVisible);
  };

  return (
    <>
      <span className="toggle-btn toggle-left" onClick={toggleSidebar}>
        <img
          width="26"
          height="26"
          className="position-fixed"
          style={{ zIndex: 12 }}
          src={
            isLeftSidebarVisible
              ? "https://img.icons8.com/metro/26/back.png"
              : "https://img.icons8.com/metro/26/forward.png"
          }
          alt="toggle"
        />
      </span>
      <div
        className={`sidebar left-sidebar p-3 ${
          isLeftSidebarVisible ? "show" : ""
        }`}
      >
        <div
          className="card shadow bg-white rounded-lg"
          style={{ height: "90vh" }}
        >
          <img src={img_logo} alt="" />
          <div className="d-flex flex-column" style={{ height: "100vh" }}>
            <ul className="nav flex-column">
              <li className="nav-item mt-3 ">
                <span
                  className={
                    active == "Dashboard"
                      ? "bg-lite-purple rounded side-bar-a"
                      : " rounded "
                  }
                >
                  <img src={dashboard_icon} />
                  <a
                    style={{ textDecoration: "none", color: "black" }}
                    className="ps-2 text-dark "
                    href="#"
                    onClick={() => {
                      setSelectedComponent("Dashboard"), setActive("Dashboard");
                    }}
                  >
                    Dashboard
                  </a>
                </span>
              </li>
              <li className="nav-item mt-3">
                <span
                  className={
                    active == "API Key"
                      ? "bg-lite-purple rounded "
                      : " rounded "
                  }
                >
                  <img src={api_icon} />
                  <a
                    style={{ textDecoration: "none", color: "black" }}
                    className="ps-2"
                    href="#"
                    onClick={() => {
                      setSelectedComponent("API Key"), setActive("API Key");
                    }}
                  >
                    API Key
                  </a>
                </span>
              </li>
              <li className="nav-item mt-3">
                <span
                  className={
                    active == "Credits"
                      ? "bg-lite-purple rounded "
                      : " rounded "
                  }
                >
                  <img src={creadits_icon} />
                  <a
                    style={{ textDecoration: "none", color: "black" }}
                    className="ps-2"
                    href="#"
                    onClick={() => {
                      setSelectedComponent("Credits"), setActive("Credits");
                    }}
                  >
                    Credits
                  </a>
                </span>
              </li>
              <li className="nav-item mt-3">
                <span
                  className={
                    active == "Templates"
                      ? "bg-lite-purple rounded "
                      : " rounded "
                  }
                >
                  <img src={templates_icon} />
                  <a
                    style={{ textDecoration: "none", color: "black" }}
                    className="ps-2"
                    href="#"
                    onClick={() => {
                      setSelectedComponent("Templates"), setActive("Templates");
                    }}
                  >
                    Templates
                  </a>
                </span>
              </li>
              <li className="nav-item mt-3">
                <span
                  className={
                    active == "Documentation"
                      ? "bg-lite-purple rounded "
                      : " rounded "
                  }
                >
                  <img src={documentation_icon} />
                  <a
                    style={{ textDecoration: "none", color: "black" }}
                    className="ps-2"
                    href="#"
                    onClick={() => {
                      setSelectedComponent("Documentation"),
                        setActive("Documentation");
                    }}
                  >
                    Documentation
                  </a>
                </span>
              </li>
              <li className="nav-item mt-3">
                <span
                  className={
                    active == "Support"
                      ? "bg-lite-purple rounded "
                      : " rounded "
                  }
                >
                  <img src={support_icon} />
                  <a
                    style={{ textDecoration: "none", color: "black" }}
                    className="ps-2"
                    href="#"
                    onClick={() => {
                      setSelectedComponent("Support"), setActive("Support");
                    }}
                  >
                    Support
                  </a>
                </span>
              </li>
            </ul>
          </div>
          <div className="card-footer text-center">
            <button type="button" className="btn btn-sm bg-lite-purple">
              Log out
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeftSidebar;
