import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [csvFile, setCsvFile] = useState(null);
  const [timestamp, setTimestamp] = useState('');
  const [balance, setBalance] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileChange = (e) => {
    setCsvFile(e.target.files[0]);
  };

  const handleTimestampChange = (e) => {
    setTimestamp(e.target.value);
  };

  const handleUpload = async () => {
    if (csvFile) {
      const formData = new FormData();
      formData.append('file', csvFile);
      try {
        const response =  await axios.post('http://localhost:5000/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setUploadStatus(response.data.message);
      } catch (error) {
        console.error('Error uploading file:', error);
        setUploadStatus('Error uploading file.');
      }
    } else {
      setUploadStatus('Please select a CSV file to upload.');
    }
  };

  const fetchBalance = async () => {
    try {
      const response = await axios.get('http://localhost:5000/', { // Updated URL
        params: { timestamp },
      });
      setBalance(response.data.balance);
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/');
      console.log(response)
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>CSV Upload and Balance Fetcher</h1>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <br />
      <button onClick={handleUpload}>Upload CSV</button>
      <p>{uploadStatus}</p>
      <br />
      <input
        type="datetime-local"
        value={timestamp}
        onChange={handleTimestampChange}
      />
      <br />
      <button onClick={fetchBalance}>Fetch Balance</button>
      <button onClick={fetchData}>Test</button>
      {balance !== null && <h2>Balance: {balance}</h2>}
    </div>
  );
};

export default App;
