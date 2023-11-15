import React from 'react';
import axios from 'axios';
import moment from 'moment';  // Import moment library
import Navbar from "./navigationbar";

const ExportStudentsToExcel = () => {
  const handleExportExcel = () => {
    // Generate a timestamp in the format YYYY-MM-DD_HHMMSS
    const timestamp = moment().format('YYYY-MM-DD_HHmmss');
    const fileName = `students-export-${timestamp}.xlsx`;

    // Make a GET request to your server to trigger the export
    axios.get('http://localhost:8800/export-students-excel', { responseType: 'arraybuffer' })
      .then(response => {
        const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName; // Use the generated file name
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch(error => {
        console.error('Error exporting students data to Excel:', error);
      });
  };

  return (
    <div>
      <Navbar></Navbar>
      <h1>Export Students Data to Excel</h1>
      <button onClick={handleExportExcel}>Export Students to Excel</button>
    </div>
  );
};

export default ExportStudentsToExcel;
