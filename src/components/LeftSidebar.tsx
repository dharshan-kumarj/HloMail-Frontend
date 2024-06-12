// src/components/LeftSidebar.tsx
import React, { useState, useEffect } from 'react';
import img_logo from '../images/dashboard/logo.svg';
import '../styles/dashboard.css';

interface LeftSidebarProps {
  setSelectedComponent: (component: string) => void;
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({ setSelectedComponent }) => {
  const [isLeftSidebarVisible, setIsLeftSidebarVisible] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 992) {
        setIsLeftSidebarVisible(true);
      } else {
        setIsLeftSidebarVisible(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
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
          src={
            isLeftSidebarVisible
              ? 'https://img.icons8.com/metro/26/back.png'
              : 'https://img.icons8.com/metro/26/forward.png'
          }
          alt="toggle"
        />
      </span>
      <div className={`sidebar left-sidebar ${isLeftSidebarVisible ? 'show' : ''}`}>
        <div className="card shadow bg-white rounded-lg">
          <img src={img_logo} alt="" />
          <div className="d-flex flex-column" style={{ height: '65vh' }}>
            <ul className="nav flex-column">
              <li className="nav-item mt-3">
                <a className="nav-link active" href="#" onClick={() => setSelectedComponent('Dashboard')}>
                  Dashboard
                </a>
              </li>
              <li className="nav-item mt-3">
                <a className="nav-link" href="#" onClick={() => setSelectedComponent('API Key')}>
                  API Key
                </a>
              </li>
              <li className="nav-item mt-3">
                <a className="nav-link" href="#" onClick={() => setSelectedComponent('Credits')}>
                  Credits
                </a>
              </li>
              <li className="nav-item mt-3">
                <a className="nav-link" href="#" onClick={() => setSelectedComponent('Templates')}>
                  Templates
                </a>
              </li>
              <li className="nav-item mt-3">
                <a className="nav-link" href="#" onClick={() => setSelectedComponent('Documentation')}>
                  Documentation
                </a>
              </li>
              <li className="nav-item mt-3">
                <a className="nav-link" href="#" onClick={() => setSelectedComponent('Support')}>
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
