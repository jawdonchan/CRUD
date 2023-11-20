import React, { useState } from 'react';
import Navbar from '../navigationbar';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../css/excel.css';

const ExcelFileUpload = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const location = useLocation();
  const eventid = location.pathname.split("/")[2];

  const handleFileUpload = async () => {
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    

    try {
      const response = await fetch('http://localhost:8800/upload/'+eventid, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
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
    <div className="container">
      <Navbar />
      <h2>Upload Excel File</h2>
      <label className='excels' htmlFor="fileInput">Select File</label>
      <input type="file" id="fileInput" accept=".xlsx, .xls" onChange={handleFileChange} />
      {file && <p>Selected File: {file.name}</p>} {/* Display the file name */}
      <button className='excelbtn' onClick={handleFileUpload}>Upload</button>
    </div>
  );
};

export default ExcelFileUpload;
