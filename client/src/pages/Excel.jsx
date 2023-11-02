import React, { useState } from 'react';
import Navbar from './navigationbar';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';

const ExcelFileUpload = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleFileUpload = async () => {
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    // Create a FormData object to send the file to the server
    const formData = new FormData();
    formData.append('file', file);

    try {
      // Make a POST request to your backend to upload the file
      const response = await fetch('http://localhost:8800/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // You can handle the response data as needed, but for now, let's log it
        const data = await response.json();
        console.log('Uploaded data:', data);
      } else {
        console.error('File upload failed.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    
    <div>
        <Navbar></Navbar>
      <h2>Upload Excel File</h2>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload</button>
    </div>
  );
};

export default ExcelFileUpload;
