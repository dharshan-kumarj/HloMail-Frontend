import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Chart from "chart.js/auto";
import "../styles/dashboard.css";
import Cookies from "js-cookie";
import img_logo from "../images/dashboard/logo.svg";
import img_mail from "../images/dashboard/mail.svg";
import img_mail_icn from "../images/dashboard/mail-logo.svg";
import img_profile from "../images/dashboard/profile.svg";

const Dashboard: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const [IsVisible, setIsVisible] = useState(false);
  const [credit, setCredit] = useState(false);
  const [interactionData, setInteractionData] = useState<Record<string, number>>({});

  const handleToggle = () => {
    setIsVisible(!IsVisible);
  };

  useEffect(() => {
    if (Object.keys(interactionData).length === 0) return;

    const chart = new Chart(chartRef.current!, {
      type: "bar",
      data: {
        labels: Object.keys(interactionData),
        datasets: [
          {
            label: "# of Interactions",
            data: Object.values(interactionData),
            backgroundColor: "purple",
            borderColor: "purple",
            borderWidth: 1,
            borderRadius: 10,
            borderSkipped: false,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    return () => {
      chart.destroy();
    };
  }, [interactionData]);

  const toggleSidebar = (side: "left" | "right") => {
    const sidebar = document.querySelector(`.sidebar.${side}-sidebar`);
    if (sidebar) {
      sidebar.classList.toggle("show");
    }
  };

  const handleResize = () => {
    const rightSidebar = document.querySelector(".right-sidebar");
    const leftSidebar = document.querySelector(".left-sidebar");
    if (window.innerWidth >= 992) {
      setIsVisible(true);
      rightSidebar?.classList.add("show");
      leftSidebar?.classList.add("show");
    } else {
      setIsVisible(false);
      rightSidebar?.classList.remove("show");
      leftSidebar?.classList.remove("show");
    }
  };

  const checkTokenAndFetchData = async () => {
    const token = Cookies.get('token'); // replace 'token' with the actual cookie name if different
    const api_key = 'e7a82f9f241ea70a00fd2ba7542a06a6'; // replace with your actual API key
  
    if (!token) {
      window.location.href = 'https://hlomail-frontend.sanjaysagar.com/login';
      return;
    }
  
    try {
      const response = await fetch('https://hlomail.sanjaysagar.com/api-dashboard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ api_key: api_key })
      });
  
      if (response.status === 401) {
        window.location.href = 'https://hlomail-frontend.sanjaysagar.com/login';
        return;
      }
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      setCredit(data.credit);
      const filledData = ensureMinimumDataPoints(data.today_intraction);
      setInteractionData(filledData);
      console.log('API Response:',data);
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  const ensureMinimumDataPoints = (data: Record<string, number>): Record<string, number> => {
    const labels = Object.keys(data);
    const values = Object.values(data);

    if (labels.length >= 7) {
      return data;
    }

    const filledData: Record<string, number> = { ...data };
    const additionalDataNeeded = 7 - labels.length;

    for (let i = 0; i < additionalDataNeeded; i++) {
      const lastLabel = labels[labels.length - 1];
      const lastValue = 0;
      const nextLabel = (parseInt(lastLabel) + 1).toString();

      filledData[nextLabel] = lastValue; // or use a more sophisticated extrapolation method
      labels.push(nextLabel);
      values.push(lastValue);
    }

    return filledData;
  };

  useEffect(() => {
    checkTokenAndFetchData();
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <span
        className="toggle-btn toggle-left"
        onClick={() => toggleSidebar("left")}
      >
        <img
          width="26"
          height="26"
          onClick={handleToggle}
          src={
            IsVisible
              ? "https://img.icons8.com/metro/26/back.png"
              : "https://img.icons8.com/metro/26/forward.png"
          }
          alt="forward"
        />
      </span>
      <div className="row">
        <div className="col-1">
          <span
            className="toggle-btn"
            style={{ right: "30px", position: "absolute" }}
          >
            <img src={img_profile} alt="" height="45" width="45" />
          </span>
        </div>
        <div className="col-1">
          <span
            className="toggle-btn"
            style={{ right: "80px", position: "absolute" }}
            onClick={() => toggleSidebar("right")}
          >
            <img src={img_mail} alt="" />
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="content">
        <div className="container-fluid">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h1>Dashboard</h1>
              <p>
                Welcome to your API's dashboard, Effortless API Integration for
                Smarter Communication.
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="card shadow bg-white rounded">
                <div className="card-body">
                  <h5 className="card-title">Credits</h5>
                  <p className="card-text">{credit}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 mt-3 mt-md-0">
              <div className="card shadow bg-white rounded">
                <div className="card-body">
                  <h5 className="card-title">Interactions</h5>
                  <p className="card-text">11 Interactions today</p>
                </div>
              </div>
            </div>
          </div>
          <div className="card mt-3 shadow bg-white rounded">
            <div className="card-body">
              <h5 className="card-title">Your API key</h5>
              <p className="card-text">
                G8nQCflexBZfJ5dDickWu0fUx3jc5sX4Vdsat2
              </p>
            </div>
          </div>
          <div className="card mt-3 shadow bg-white rounded">
            <div className="card-body">
              <div className="row">
                <div className="col">
                  <h5>Interactions</h5>
                </div>

                <div className="col-2 d-none d-lg-flex">
                  <p>Day</p>
                </div>
                <div className="col-2 d-none d-lg-flex">
                  <p>Week</p>
                </div>
                <div className="col-2 d-none d-lg-flex">
                  <p>Month</p>
                </div>
                <div className="col-2 d-none d-lg-flex">
                  <p>Year</p>
                </div>
              </div>
              <div className="row d-lg-none">
                <div className="col-12">
                  <select className="form-select">
                    <option value="day">Day</option>
                    <option value="week">Week</option>
                    <option value="month">Month</option>
                    <option value="year">Year</option>
                  </select>
                </div>
              </div>

              <canvas ref={chartRef}></canvas>
            </div>
          </div>
        </div>
      </div>

      {/* Left Sidebar */}
      <div className="sidebar left-sidebar" style={{ top: "10px" }}>
        <div className="card shadow bg-white rounded-lg">
          <img src={img_logo} alt="" />
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

      {/* Right Sidebar */}
      <div
        className="sidebar right-sidebar scrollable"
        style={{ height: "70vh" }}
      >
        <div className="card shadow p-3 mb-5 bg-white rounded-lg">
          <div className="row mb-4">
            <div className="col-3">
              <img src={img_mail_icn} style={{ height: "30", width: "30" }} />
            </div>
            <div className="col">
              <h4>Inbox</h4>
            </div>
          </div>
          <ul className="list-unstyled">
            <li className="media mb-3">
              <div className="media-body">
                <p className="mt-0 mb-1">Check out PortOs...</p>
                <hr></hr>
              </div>
            </li>
            <li className="media mb-3">
              <div className="media-body">
                <p className="mt-0 mb-1 hr hr-blurry">Hey Rohith nice to...</p>
                <hr></hr>
              </div>
            </li>
            <li className="media mb-3">
              <div className="media-body">
                <p className="mt-0 mb-1">HLOmail offers you...</p>
                <hr></hr>
              </div>
            </li>
            <li className="media mb-3">
              <div className="media-body">
                <p className="mt-0 mb-1">Don't miss out our...</p>
                <hr></hr>
              </div>
            </li>
            <li className="media mb-3">
              <div className="media-body">
                <p className="mt-0 mb-1">We at HLOmail help...</p>
                <hr></hr>
              </div>
            </li>
            <li className="media mb-3">
              <div className="media-body">
                <p className="mt-0 mb-1 ">New notification alert...</p>
                <hr></hr>
              </div>
            </li>
            <li className="media mb-3">
              <div className="media-body">
                <p className="mt-0 mb-1">Welcome to HLOmail...</p>
                <hr></hr>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
