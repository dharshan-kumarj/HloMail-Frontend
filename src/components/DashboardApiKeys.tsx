import { useState, useEffect } from "react";
import Cookies from "js-cookie";

interface DashboardApiKeys {
  handleApiKeyClick: (component: string) => void;
}

const DashboardApiKeys: React.FC<DashboardApiKeys> = ({
  handleApiKeyClick,
}) => {
  const [apiKeyData, setApiKeyData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("token"); // Replace with your token
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
        console.log(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="main-content">
      <div className="container mt-5">
        <h1 className="text-center mb-4">API Keys</h1>
        <p className="text-center">List of API keys</p>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-bordered table-hover">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Email</th>
                  <th>API Key</th>
                  <th>Type</th>
                  <th>Created On</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {apiKeyData.map((item, index) => (
                  <tr
                    onClick={() => handleApiKeyClick(item["api_key"])}
                    key={index}
                  >
                    <td>{item["title"]}</td>
                    <td>{item["email"]}</td>
                    <td>{item["api_key"]}</td>
                    <td>{item["type"]}</td>
                    <td>{item["created_on"]}</td>
                    <td>
                      <button className="btn btn-primary btn-sm me-2">
                        <i className="bi bi-pencil-square"></i> Edit
                      </button>
                      <button className="btn btn-danger btn-sm">
                        <i className="bi bi-trash"></i> Delete
                      </button>
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
