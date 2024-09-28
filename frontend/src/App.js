import React, { useState } from "react";
import axios from "axios";
import "./App.css"; // Import the CSS file

const App = () => {
  const [csvFile, setCsvFile] = useState(null);
  const [timestamp, setTimestamp] = useState("");
  const [balance, setBalance] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleFileChange = (e) => {
    setCsvFile(e.target.files[0]);
  };

  const handleTimestampChange = (e) => {
    setTimestamp(e.target.value);
  };

  const handleUpload = async () => {
    if (csvFile) {
      const formData = new FormData();
      formData.append("file", csvFile);
      try {
        const response = await axios.post(
          "http://localhost:5000/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setUploadStatus(response.data.message);
      } catch (error) {
        console.error("Error uploading file:", error);
        setUploadStatus("Error uploading file.");
      }
    } else {
      setUploadStatus("Please select a CSV file to upload.");
    }
  };

  const fetchBalance = async () => {
    try {
      console.log(timestamp);
      const response = await axios.post(
        "http://localhost:5000/balance",
        { timestamp: timestamp },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log("response", response.data);
      setBalance(response.data);
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  return (
    <>
    <h1>Trade Parsing and Balance Calculator</h1>
    <div className="container">
      <div className="input-section">
        <input type="file" accept=".csv" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload CSV</button>
        <p>{uploadStatus}</p>
        <input
          className="timeDate"
          type="datetime-local"
          value={timestamp}
          onChange={handleTimestampChange}
        />
        <button onClick={fetchBalance}>Fetch Balance</button>
      </div>
      {balance !== null && ( // Only render output-section if balance is available
        <div className="output-section">
          <h2>Base Coin Balance List:</h2>
          <ul>
            {Object.entries(balance).map(([coin, amount]) => (
              <li key={coin}>
                {coin}: <span style={{ color: amount < 0 ? 'red' : 'green' }}>{amount}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
    </>
  );  
};

export default App;
