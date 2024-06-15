import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import EditApiPopUp from "./EditApiPopUp";
import GenerateApiPopUp from "./GenerateApiPopUp";
import DeletePopUp from "./DeletePopUp";
import edit_icon from "../images/dashboard/edit-icon.svg";
import delete_icon from "../images/dashboard/delete-icon.svg";
import copy_icon from "../images/dashboard/copy-icon.svg";

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

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      // Optionally, you can show a temporary message to indicate successful copying
      alert("API Key copied to clipboard!");
    }, (err) => {
      console.error('Could not copy text: ', err);
    });
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
        "https://hlomail.sanjaysagar.com/delete-apikey",
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
        "https://hlomail.sanjaysagar.com/edit-apikey",
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
        "https://hlomail.sanjaysagar.com/add-apikey",
        headers,
        body
      );
    }
    setGenerateApiModalShow(false);
  };

  return (
    <div className="main-content">
      <div className="container mt-5">
        <h1 className="text-center mb-4">API Keys</h1>
        <p className="text-center">List of API keys</p>
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
                  <th>Title</th>
                  <th>API Key</th>
                  <th>Type</th>

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
                      <td>
                        <div className="row">
                          <div className="col">
                            <img
                              src={edit_icon}
                              className="btn me-2"
                              onClick={() => {
                                setEditApiModalShow(true);
                                setSelectedApiKey(item["api_key"]);
                                setAction("edit-apikey");
                              }}
                            />
                          </div>
                          <div className="col">
                            <img
                              className=""
                              src={delete_icon}
                              onClick={() => {
                                setDeleteApiModalShow(true);
                                setSelectedApiKey(item["api_key"]);
                                setAction("delete-apikey");
                              }}
                            />
                          </div>
                          <div className="col">
                            <img
                              src={copy_icon}
                              className="btn me-2"
                              onClick={() => copyToClipboard(item["api_key"])}
                            />
                          </div>
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
