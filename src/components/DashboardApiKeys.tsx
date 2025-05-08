import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import EditApiPopUp from "./EditApiPopUp";
import GenerateApiPopUp from "./GenerateApiPopUp";
import DeletePopUp from "./DeletePopUp";
import edit_icon from "../images/dashboard/edit-icon.svg";
import delete_icon from "../images/dashboard/delete-icon.svg";
import copy_icon from "../images/dashboard/copy-icon.svg";
import user_icon from "../images/dashboard/user-icon.svg";


interface DashboardApiKeys {
  handleApiKeyClick: (component: string) => void;
}

const DashboardApiKeys: React.FC<DashboardApiKeys> = ({
  handleApiKeyClick,
}) => {
  const [editApiModalShow, setEditApiModalShow] = React.useState(false);
  const [deleteApiModalShow, setDeleteApiModalShow] = React.useState(false);
  const [generateApiModalShow, setGenerateApiModalShow] = React.useState(false);
  const [apiKeyData, setApiKeyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [action, setAction] = useState("");
  const token = Cookies.get("token");
  const [copyApiModalShow, setCopyApiModalShow] = useState(false);
  const [selectedApiKey, setSelectedApiKey] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);
  const [copyMessage, setCopyMessage] = useState("");

  const fetchApiKeyData = () => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    fetch("https://hlomail-backend.onrender.com/dashboard", {
      method: "POST",
      headers,
    })
      .then((response) => response.json())
      .then((data) => {
        setApiKeyData(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchApiKeyData();
  }, []);

  const FetchData = async (
    method: string,
    end_point: string,
    headers: any,
    body: any
  ) => {
    try {
      const response = await fetch(end_point, {
        method: method,
        headers: headers,
        body: JSON.stringify(body),
      });

      if (response.status === 401) {
        window.location.href = "http://localhost:5173/login";
        return;
      }

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("API Response:", data);

      // Refresh the API key data after performing an action
      fetchApiKeyData();
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  const handleDeletePopUpSubmit = async () => {
    console.log(selectedApiKey);
    console.log(action);

    if (action === "delete-apikey") {
      console.log("deleting", selectedApiKey);
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const body = { api_key: selectedApiKey };
      FetchData(
        "POST",
        "https://hlomail-backend.onrender.com/delete-apikey",
        headers,
        body
      );
    }
    setDeleteApiModalShow(false);
  };

  const handleEditPopUpSubmit = async (value: string) => {
    console.log(selectedApiKey, value);
    console.log(action);

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    if (action === "edit-apikey") {
      const body = { api_key: selectedApiKey, title: value };
      FetchData(
        "POST",
        "https://hlomail-backend.onrender.com/edit-apikey",
        headers,
        body
      );
    }
    setEditApiModalShow(false);
  };

  const handleGeneratePopUpSubmit = async (value: any) => {
    console.log(selectedApiKey, value);
    console.log(action);

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    if (action === "generate-apikey") {
      const body = { api_type: value[0], title: value[1] };
      FetchData(
        "POST",
        "https://hlomail-backend.onrender.com/add-apikey",
        headers,
        body
      );
    }
    setGenerateApiModalShow(false);
  };

  const handleCopyToClipboard = (apiKey: string) => {
    navigator.clipboard.writeText(apiKey).then(
      () => {
        setCopyMessage("API key copied successfully");
        setTimeout(() => setCopyMessage(""), 2000); // Clear message after 2 seconds
      },
      (err) => {
        console.error("Could not copy text: ", err);
        setCopyMessage("Failed to copy API key");
        setTimeout(() => setCopyMessage(""), 2000);
      }
    );
  };


  return (
    <div className="main-content">
    {/* <div className="icon-container d-flex justify-content-end align-items-center p-3">
      <img src={user_icon} alt="User" className="icon" />
    </div> */}
        {copyMessage && (
            <div 
              style={{
                position: 'fixed',
                top: '20px',
                right: '20px',
                backgroundColor: '#4CAF50',
                color: 'white',
                padding: '15px',
                borderRadius: '5px',
                zIndex: 1000
              }}
            >
              {copyMessage}
            </div>
        )}
      <div className="container">
        <h1 className="">API Keys</h1>
        <p className="">
          Generate your API key now and unlock the full potential of our email
          solutions.
        </p>
        <button
          className="btn btn-primary btn-sm me-2 "
          style={{
            backgroundColor: "#aa14f0",
            padding: "0.5rem 2rem",
            fontSize: "1rem",
          }}
          onClick={() => {
            setGenerateApiModalShow(true);
            setAction("generate-apikey");
          }}
        >
          Generate key
        </button>

        <EditApiPopUp
          show={editApiModalShow}
          onHide={() => setEditApiModalShow(false)}
          onSubmit={handleEditPopUpSubmit}
        />
        <DeletePopUp
          show={deleteApiModalShow}
          onHide={() => setDeleteApiModalShow(false)}
          onSubmit={handleDeletePopUpSubmit}
        />
        <GenerateApiPopUp
          show={generateApiModalShow}
          onHide={() => setGenerateApiModalShow(false)}
          onSubmit={handleGeneratePopUpSubmit}
        />
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="table-responsive pt-3">
            <table className="table table-striped pt-2 table-bordered table-hover">
              <thead>
                <tr>
                  <th className="text-center">Name</th>
                  <th className="text-center">API Key</th>
                  <th className="text-center">Type</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {apiKeyData.map((item, index) => (
                  <tr key={index}>
                    <td className="text-center">{item["title"]}</td>
                    <td className="text-center" onClick={() => handleApiKeyClick(item["api_key"])}>
                      {item["api_key"]}
                    </td>
                    <td className="text-center">{item["type"]}</td>
                    <td className="text-center">
                      <div className="d-flex justify-content-center align-items-center">
                        <img
                          src={edit_icon}
                          className="action-icon mx-1"
                          onClick={() => {
                            setEditApiModalShow(true);
                            setSelectedApiKey(item["api_key"]);
                            setAction("edit-apikey");
                          }}
                          alt="Edit"
                        />
                        <img
                          src={delete_icon}
                          className="action-icon mx-1"
                          onClick={() => {
                            setDeleteApiModalShow(true);
                            setSelectedApiKey(item["api_key"]);
                            setAction("delete-apikey");
                          }}
                          alt="Delete"
                        />
                        <img
                          src={copy_icon}
                          className="action-icon mx-1"
                          onClick={() => handleCopyToClipboard(item["api_key"])}
                          alt="Copy"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardApiKeys;
