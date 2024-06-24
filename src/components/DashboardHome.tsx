import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/dashboard.css";
import Cookies from "js-cookie";
import ChartComponent from "./ChartComponent";

interface ApiKeyData {
  api_key: string;
  title: string;
}

interface DashboardData {
  credit: boolean;
  today_intraction: Record<string, number>;
}

interface Props {
  api_key: string;
}

const DashboardHome = ({ api_key }: Props) => {
  const [credit, setCredit] = useState<boolean>(false);
  const [interactionData, setInteractionData] = useState<
    Record<string, number>
  >({});
  const [timePeriod, setTimePeriod] = useState<string>("day");
  const [todayIntraction, setTodayIntraction] = useState<number>(0);
  const [apiKeys, setApiKeys] = useState<ApiKeyData[]>([]);
  const [selectedApiKey, setSelectedApiKey] = useState<string>(api_key);

  function find_today_intraction(interactions: { [x: number]: number }) {
    var interaction = 0;
    for (var key in interactions) {
      interaction += interactions[key];
    }
    return interaction;
  }

  useEffect(() => {
    const fetchApiKeys = async () => {
      const token = Cookies.get("token");

      try {
        const response = await fetch(
          "https://api.hlomail.in/dashboard",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 401) {
          window.location.href =
            "https://dashboard.hlomail.in/login";
          return;
        }

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setApiKeys(data.data);
        console.log("API Keys Response:", data);
      } catch (error) {
        console.error("API Keys Error:", error);
      }
    };

    fetchApiKeys();
  }, []);

  const FetchData = async () => {
    const token = Cookies.get("token");

    try {
      const response = await fetch(
        "https://api.hlomail.in/api-dashboard",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            api_key: selectedApiKey === "*" ? null : selectedApiKey,
          }),
        }
      );

      if (response.status === 401) {
        window.location.href = "https://dashboard.hlomail.in/login";
        return;
      }

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data: DashboardData = await response.json();
      setCredit(data.credit);
      setTodayIntraction(find_today_intraction(data.today_intraction));
      const filledData = ensureMinimumDataPoints(data.today_intraction);
      setInteractionData(filledData);
      console.log("API Response:", data);
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  const fetchInteractionData = async (timePeriod: string) => {
    const token = Cookies.get("token");

    try {
      const response = await fetch("https://api.hlomail.in/logs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          api_key: selectedApiKey === "*" ? null : selectedApiKey,
          time_period: timePeriod,
        }),
      });

      if (response.status === 401) {
        window.location.href = "https://dashboard.hlomail.in/login";
        return;
      }

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const filledData = ensureMinimumDataPoints(data.interactions);
      setInteractionData(filledData);
      console.log("API Logs Response:", data);
    } catch (error) {
      console.error("API Logs Error:", error);
    }
  };

  const ensureMinimumDataPoints = (
    data: Record<string, number>
  ): Record<string, number> => {
    const labels = Object.keys(data);
    const values = Object.values(data);
    var week_data = {
      Monday: 0,
      Tuesday: 0,
      Wednesday: 0,
      Thursday: 0,
      Friday: 0,
      Saturday: 0,
      Sunday: 0,
    };
    if (timePeriod == "week") {
      // Iterate over keys in data
      for (let key in data) {
        if (data.hasOwnProperty(key)) {
          // Assign the value from data[key] to week_data[key]
          week_data[key] = data[key]; 
        }
      }

      return week_data;
    }
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
    FetchData();
  }, [selectedApiKey]);

  useEffect(() => {
    fetchInteractionData(timePeriod);
  }, [timePeriod, selectedApiKey]);

  const handleApiKeyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedApiKey(event.target.value);
  };

  return (
    <>
      <div className="main-content">
        <div className="container-fluid">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <span>
                <h1>Dashboard</h1>
              </span>
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
                  <h5 className="card-title">{credit}</h5>
                  <p className="card-text">Credits</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 mt-3 mt-md-0">
              <div className="card shadow bg-white rounded">
                <div className="card-body">
                  <h5 className="card-title">{todayIntraction}</h5>
                  <p className="card-text">Interactions</p>
                </div>
              </div>
            </div>
          </div>
          <div className="card mt-3 shadow bg-white rounded">
            <div className="card-body">
              <div className="row">
                <div className="col">
                  <h5 className="card-title">Your API key</h5>
                  {selectedApiKey}
                </div>
                <div className="col">
                  <select
                    className="form-select"
                    value={selectedApiKey}
                    onChange={handleApiKeyChange}
                  >
                    <option key="overall" value="*">
                      overall
                    </option>
                    {apiKeys.map((apiKeyData) => (
                      <option
                        key={apiKeyData.api_key}
                        value={apiKeyData.api_key}
                      >
                        {apiKeyData.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="card mt-3 shadow bg-white rounded">
            <div className="card-body">
              <div className="row">
                <div className="col">
                  <h5>Interactions</h5>
                </div>
                <div
                  className="col-2 d-none d-lg-flex btn"
                  onClick={() => setTimePeriod("day")}
                >
                  <a>Day</a>
                </div>
                <div
                  className="col-2 d-none d-lg-flex btn"
                  onClick={() => setTimePeriod("week")}
                >
                  <a>Week</a>
                </div>
                <div
                  className="col-2 d-none d-lg-flex btn"
                  onClick={() => setTimePeriod("month")}
                >
                  <a>Month</a>
                </div>
                <div
                  className="col-2 d-none d-lg-flex btn"
                  onClick={() => setTimePeriod("year")}
                >
                  <a>Year</a>
                </div>
              </div>
              <div className="row d-lg-none">
                <div className="col-12">
                  <select
                    className="form-select"
                    value={timePeriod}
                    onChange={(e) => setTimePeriod(e.target.value)}
                  >
                    <option value="day">Day</option>
                    <option value="week">Week</option>
                    <option value="month">Month</option>
                    <option value="year">Year</option>
                  </select>
                </div>
              </div>
              <ChartComponent interactionData={interactionData} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardHome;
