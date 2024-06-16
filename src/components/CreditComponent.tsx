import React, { useState } from 'react';
import '../styles/credit.css';

const Credits = () => {
  const [amount, setAmount] = useState('');

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  return (
    <div className="main-content">
      <div className="container">
        <div className="row mb-3">
          <div className="col">
            <h2>Buy Credits</h2>
            <p>Keep Your Emails Flowing with Credits for Seamless Communication.</p>

            <div className="input-container">
              <div className="input-wrapper">
                <input
                  type="text"
                  className="styled-input"
                  placeholder="Enter the amount of credits"
                  value={amount}
                  onChange={handleAmountChange}
                />
                <span className="input-suffix">| ${amount / 1000}</span>
              </div>
              <button className="pay-button" disabled>
                Pay
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Credits;
