// src/components/Dashboard.tsx
import  { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/dashboard.css';
import Cookies from 'js-cookie';
import ChartComponent from '../components/ChartComponent';

interface Props{
  api_key :string;
}
const ApiDashboard = ({api_key}:Props) => {
  const [credit, setCredit] = useState(false);
  const [interactionData, setInteractionData] = useState<Record<string, number>>({});
  const [timePeriod, setTimePeriod] = useState('day');

  const FetchData = async () => {
    const token = Cookies.get('token');
    

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
      console.log('API Response:', data);
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

  const fetchInteractionData = async (timePeriod: string) => {
    const token = Cookies.get('token');
    const api_key = 'e7a82f9f241ea70a00fd2ba7542a06a6';

    try {
      const response = await fetch('https://hlomail.sanjaysagar.com/logs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ api_key: api_key, time_period: timePeriod })
      });

      if (response.status === 401) {
        window.location.href = 'https://hlomail-frontend.sanjaysagar.com/login';
        return;
      }

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data);
      const filledData = ensureMinimumDataPoints(data.interactions);
      setInteractionData(filledData);
      console.log('API Logs Response:', data);
    } catch (error) {
      console.log('API Logs Error:', error);
    }
  };

  useEffect(() => {
    FetchData();
  }, []);

  useEffect(() => {
    fetchInteractionData(timePeriod);
  }, [timePeriod]);

  return (
    <>
      
      <div className="main-content">
        <div className="container-fluid">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h1>Dashboard</h1>
              <p>
                Welcome to your API's dashboard, Effortless API Integration for Smarter Communication.
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
              <p className="card-text">G8nQCflexBZfJ5dDickWu0fUx3jc5sX4Vdsat2</p>
            </div>
          </div>
          <div className="card mt-3 shadow bg-white rounded">
            <div className="card-body">
              <div className="row">
                <div className="col">
                  <h5>Interactions</h5>
                </div>
                <div className="col-2 d-none d-lg-flex" onClick={() => setTimePeriod('day')}>
                  <p>Day</p>
                </div>
                <div className="col-2 d-none d-lg-flex" onClick={() => setTimePeriod('week')}>
                  <p>Week</p>
                </div>
                <div className="col-2 d-none d-lg-flex" onClick={() => setTimePeriod('month')}>
                  <p>Month</p>
                </div>
                <div className="col-2 d-none d-lg-flex" onClick={() => setTimePeriod('year')}>
                  <p>Year</p>
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

export default ApiDashboard;
