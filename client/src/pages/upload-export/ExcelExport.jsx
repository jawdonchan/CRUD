import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import ExportModal from './ExportModal';
import Navbar from '../navigationbar';
import Denied from '../user/access-denied';
import axios from 'axios';
import hash from 'object-hash';
import moment from 'moment';
import '../../css/sphere.css';
import '../../css/export.css';
import ipaddress from '../../../port';

import Sphere from '../sphere';
const MainPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [userRole, setUserRole] = useState(sessionStorage.getItem("role"));
  const [hashed, setHashed] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  
  useEffect(() => {
    setHashed(hash.MD5("Admin"));
    // Fetch events from the database
    axios.get(`http://${ipaddress}/events`)
      .then(response => {
        setEvents(response.data);
        setSelectedEvent(response.data[0]);  // Set the default selected event
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
  }, []);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleExportExcel = () => {
    if (selectedEvent) {
      console.log('Selected Event ID:', selectedEvent.id);
      const timestamp = moment().format('YYYY-MM-DD_HHmmss');
      const fileName = `students-export-${timestamp}.xlsx`;
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
      axios
        .get(`http://${ipaddress}/export-students-excel/` + selectedEvent.id, {
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
        .catch(error => {
          console.error('Error exporting emcee data to Excel:', error);
  
          // Log the specific error message from the server
          if (error.response && error.response.data) {
            console.error('Server error message:', error.response.data);
          }
  
          // Display a user-friendly error message
          alert('Error exporting emcee data. Please try again later.' );
        });
    } else {
      // Handle the case where no event is selected
      console.error('No event selected for export');
      // You can display a user-friendly message here as well
      alert('Please select an event before exporting.');
    }
  };
  
  

  return (
    <div className='ExcelExp'>
      {/* <Navbar /> */}
      <h1>Excel Export</h1>
      {/* <div className="animation-wrapper">
        <Sphere />
      </div> */}
      {userRole === hashed && (
        <>
          <div className='excel-export'>
            <label>Select Event: </label>
            <select value={selectedEvent ? selectedEvent.id : ''} onChange={(e) => setSelectedEvent(events.find(event => event.id === Number(e.target.value)))}>
  {events.map(event => (
    <option key={event.id} value={event.id}>{`${event.name}`}</option>
  ))}
</select>
<div className='buttonstyle' style={{ textAlign: 'center' }}>
            <button onClick={handleExportExcel}>Download Excel</button>
          </div>
          </div>
          {/* <Button variant="contained" onClick={handleOpenModal}>
            Download Link
          </Button> */}
         
        </>
      )}

      {userRole !== hashed && (
        <div>
          <Denied />
        </div>
      )}

      <ExportModal isOpen={modalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default MainPage;
