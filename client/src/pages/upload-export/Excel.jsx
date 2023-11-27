import React, { useState } from 'react';
import Navbar from '../navigationbar';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../css/excel.css';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';



const ExcelFileUpload = () => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
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
        // Redirect to the events page after successful upload
        navigate(`/event`);
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
      <br></br><br></br><br></br>
      <Stack direction="column" alignItems={"center"} justifyContent={"center"}>
      <h2>Upload Excel File</h2>
      <div className='Button'>
        <label className='excels' htmlFor="fileInput">Select File</label>
      <input type="file" id="fileInput" accept=".xlsx, .xls" onChange={handleFileChange} />
      <div style={{width: 550, marginLeft: -200}}>
      {file && <p>Selected File: {file.name}</p>} {/* Display the file name */}
      </div>
      <Button className='excelbtn' onClick={handleFileUpload}>Upload</Button>
      </div>
      </Stack>

    </div>
  );
};

export default ExcelFileUpload;
