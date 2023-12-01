import React, { useEffect, useState } from 'react';
import Navbar from '../navigationbar';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../css/excel.css';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Modal from 'react-modal';
import CircularProgress from '@mui/material/CircularProgress';

const ExcelFileUpload = () => {
  const [file, setFile] = useState(null);
  const [isDownloading, setIsDownloading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal
  const navigate = useNavigate();
  const location = useLocation();
  const eventid = location.pathname.split("/")[2];

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

useEffect(() => {
// Simulate loading delay
const loadingTimeout = setTimeout(() => {
  setIsDownloading(false);
}, 3000); // Set the timeout duration (in milliseconds)

return () => {
  clearTimeout(loadingTimeout);
};
}, [])

  const handleFileUpload = async () => {
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`http://localhost:8800/upload/${eventid}`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Uploaded data:', data);
        // Redirect to the events page after a successful upload
        navigate(`/event`);
      } else {
        console.error('File upload failed.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const downloadFile = async (url, fileName) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();

      const downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(blob);
      downloadLink.download = fileName;
      downloadLink.click();
      window.URL.revokeObjectURL(downloadLink.href);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  const getPublicUrl = (filePath) => new URL(filePath, window.location.origin).toString();

  const handleDownloadTemplate = async () => {
    setIsDownloading(true);
  
    try {
      // Endpoint to export sample Excel file
      const templateEndpoint = 'http://localhost:8800/export-sample-excel';
  
      // Create an invisible link and trigger a click event to initiate the download
      const a = document.createElement('a');
      a.href = templateEndpoint;
      a.download = 'template_excel_file.xlsx';
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading file:', error);
    } finally {
      setIsDownloading(false);
      setIsModalOpen(false);
    }
  };
  

  return (
    <div className="container">
      <Navbar />
      <br /><br /><br />
      <Stack direction="column" alignItems="center" justifyContent="center">
        <h2>Upload Excel File</h2>
        <div className='Button'>
          <label className='excels' htmlFor="fileInput">Select File</label>
          <input type="file" id="fileInput" accept=".xlsx, .xls" onChange={handleFileChange} />
          <div style={{ width: 550, marginLeft: -200 }}>
            {file && <p>Selected File: {file.name}</p>} {/* Display the file name */}
          </div>
          <Button className='excelbtn' onClick={handleFileUpload}>Upload</Button>
          <Button className='excelbtn' onClick={() => setIsModalOpen(true)}>Download Template</Button>
        </div>
      </Stack>

      {/* Modal for Template Download */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={{
          content: {
            backgroundColor: 'lightblue',
            borderRadius: '18px',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            top: '10%',
            bottom: '10%'
          },
        }}
      >
         <h2>Download Excel Template</h2>
  {isDownloading ? ( // Render loading spinner if downloading
    <CircularProgress style={{ margin: '20px' }} />
  ) : (
    <>
      <p>Click the button below to download the template file.</p>
      <Button onClick={() => handleDownloadTemplate()}>
        Download Template
      </Button>
    </>
  )}
  <Button onClick={() => setIsModalOpen(false)}>Close</Button>
</Modal>
    </div>
  );
};

export default ExcelFileUpload;
