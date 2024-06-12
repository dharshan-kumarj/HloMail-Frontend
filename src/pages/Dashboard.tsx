// src/components/Dashboard.tsx
import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/dashboard.css";
import Cookies from "js-cookie";
import RightSidebar from "../components/RightSidebar";
import LeftSidebar from "../components/LeftSidebar";
import ApiDashboard from "../components/ApiDashboard";

const checkToken = async () => {
  const token = Cookies.get("token");

  if (!token) {
    window.location.href = "https://hlomail-frontend.sanjaysagar.com/login";
    return;
  }
};
useEffect(() => {
  checkToken();
}, []);

const Dashboard: React.FC = () => {
  return (
    <>
      <LeftSidebar />
      <RightSidebar />
      <ApiDashboard api_key="e7a82f9f241ea70a00fd2ba7542a06a6"></ApiDashboard>
    </>
  );
};

export default Dashboard;
