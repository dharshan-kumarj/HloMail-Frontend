import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import EditApiPopUp from "./EditApiPopUp";
import GenerateApiPopUp from "./GenerateApiPopUp";
import DeletePopUp from "./DeletePopUp";

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
  const [selectedApiKey, setSelectedApiKey] = useState("");
  const [action, setAction] = useState("");
  const token = Cookies.get("token");

  const fetchApiKeyData = () => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    fetch("https://hlomail.sanjaysagar.com/dashboard", {
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

  const FetchData = async (method: string, end_point: string, headers: any, body: any) => {
    try {
      const response = await fetch(end_point, {
        method: method,
        headers: headers,
        body: JSON.stringify(body),
      });

      if (response.status === 401) {
        window.location.href = "https://hlomail-frontend.sanjaysagar.com/login";
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
      FetchData("POST", "https://hlomail.sanjaysagar.com/delete-apikey", headers, body);
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

    if (action === "delete-apikey") {
      console.log("deleting", selectedApiKey);
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const body = { api_key: selectedApiKey };
      FetchData("POST", "https://hlomail.sanjaysagar.com/delete-apikey", headers, body);
    } else if (action === "edit-apikey") {
      const body = { api_key: selectedApiKey, title: value };
      FetchData("POST", "https://hlomail.sanjaysagar.com/edit-apikey", headers, body);
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
      FetchData("POST", "https://hlomail.sanjaysagar.com/add-apikey", headers, body);
    }
    setGenerateApiModalShow(false);
  };

  return (
    <div className="main-content">
      <div className="container mt-5">
        <h1 className="text-center mb-4">API Keys</h1>
        <p className="text-center">List of API keys</p>

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
          <div className="table-responsive">
            <table className="table table-striped table-bordered table-hover">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>API Key</th>
                  <th>Type</th>
                  <th>Created On</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {apiKeyData.map((item, index) => (
                  <tr key={index}>
                    <td>{item["title"]}</td>
                    <td onClick={() => handleApiKeyClick(item["api_key"])}>
                      {item["api_key"]}
                    </td>
                    <td>{item["type"]}</td>
                    <td>{item["created_on"]}</td>
                    <td>
                      <button
                        className="btn btn-primary btn-sm me-2"
                        onClick={() => {
                          setEditApiModalShow(true);
                          setSelectedApiKey(item["api_key"]);
                          setAction("edit-apikey");
                        }}
                      >
                        <i className="bi bi-pencil-square"></i> Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => {
                          setDeleteApiModalShow(true);
                          setSelectedApiKey(item["api_key"]);
                          setAction("delete-apikey");
                        }}
                      >
                        <i className="bi bi-trash"></i> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              className="btn btn-primary btn-sm me-2 "
              style={{ backgroundColor: '#aa14f0' ,padding: '0.5rem 2rem',fontSize: '1rem'}}
              onClick={() => {
                setGenerateApiModalShow(true);
                setAction("generate-apikey");
              }}
            >
              Generate key
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardApiKeys;
