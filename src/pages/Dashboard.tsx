import React, { useEffect, useState } from "react";

import "../styles/dashboard.css";
import Cookies from "js-cookie";
import Inbox from "../components/Inbox";
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
  const [selectedComponent, setSelectedComponent] =
    useState<string>("API Key");
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
        return <ApiKeyComponent handleApiKeyClick={handleApiKeyClick} />;
    }
  };

  return (
    <>
      <LeftSidebar setSelectedComponent={setSelectedComponent} />
      <Inbox />
      {renderComponent()}
    </>
  );
};

export default Dashboard;
