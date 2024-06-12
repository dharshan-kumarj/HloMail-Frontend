import React, { useEffect, useState } from "react";

import "../styles/dashboard.css";
import Cookies from "js-cookie";
import RightSidebar from "../components/RightSidebar";
import LeftSidebar from "../components/LeftSidebar";
import DashboardHome from "../components/DashboardHome";  
import ApiKeyComponent from "../components/DashboardApiKeys";

const checkToken = async () => {
  const token = Cookies.get("token");

  if (!token) {
    window.location.href = "https://hlomail-frontend.sanjaysagar.com/login";
    return;
  }
};

const Dashboard: React.FC = () => {
  const [selectedComponent, setSelectedComponent] = useState<string>("Dashboard");
  const [selectedApiKey, setSelectedApiKey] = useState<string>("");

  useEffect(() => {
    checkToken();
  }, []);

  const handleApiKeyClick = (apiKey: string) => {
    setSelectedApiKey(apiKey);
    setSelectedComponent("Dashboard");
  };

  const renderComponent = () => {
    switch (selectedComponent) {
      case "Dashboard":
        return <DashboardHome api_key={selectedApiKey} />;
      case "API Key":
        return <ApiKeyComponent handleApiKeyClick={handleApiKeyClick} />;
      default:
        return <DashboardHome api_key="*" />;
    }
  };

  return (
    <>
      <LeftSidebar setSelectedComponent={setSelectedComponent} />
      <RightSidebar />
      {renderComponent()}
    </>
  );
};

export default Dashboard;