import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'; // Import useHistory
import axios from 'axios';
import moment from 'moment';
import Navbar from '../navigationbar';
import CircularProgress from '@mui/material/CircularProgress';
import '../../css/studentexport.css';

const ExportStudentsToExcel = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, 5000); // Set the timeout duration (in milliseconds)

    return () => {
      clearTimeout(loadingTimeout);
    };
  }, []);

  const handleExportExcel = () => {
    // Check if the user has the 'admin' role before exporting
    const userRole = sessionStorage.getItem('role');
    if (userRole !== 'Admin') {
      console.log('Unauthorized access: Insufficient privileges');
      // Handle unauthorized access (redirect to login page, show error message, etc.)
      window.location.replace("http://localhost:3000/users");
      return;
    }

    setLoading(true);

    // Generate a timestamp in the format YYYY-MM-DD_HHMMSS
    const timestamp = moment().format('YYYY-MM-DD_HHmmss');
    const fileName = `students-export-${timestamp}.xlsx`;

    // Create an invisible iframe to trigger the download
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);

    // Make a GET request to your server to trigger the export
    axios
      .get('http://localhost:8800/export-students-excel', {
        responseType: 'arraybuffer',
      })
      .then((response) => {
        const blob = new Blob([response.data], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });

        // Create a download link and trigger the click event
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);

        // Remove the iframe from the DOM
        document.body.removeChild(iframe);
      })
      .catch((error) => {
        console.error('Error exporting students data to Excel:', error);
      })
      .finally(() => {
        // Set loading to false after the export is complete
        setLoading(false);
      });
  };

  return (
    <div>
      {/* <Navbar></Navbar> */}
      <h1>Export Students Data to Excel</h1>
      {loading ? (
        <div style={{ textAlign: 'center', paddingTop: '50px' }}>
          <CircularProgress />
        </div>
      ) : (
        <>
          <div className='buttonstyle' style={{ textAlign: 'center' }}>
            <button onClick={handleExportExcel}>Download Excel</button>
          </div>
        </>
      )}
    </div>
  );
};

export default ExportStudentsToExcel;
