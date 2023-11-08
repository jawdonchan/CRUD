import React from 'react';
import axios from 'axios';

function StudentExport() {
  const handleExportToExcel = () => {
    axios
      .get('http://localhost:8800/export-excel') // Make sure this matches your backend route
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const a = document.createElement('a');
        a.href = url;
        a.download = 'students-export.xlsx';
        a.click();
      })
      .catch((error) => {
        console.error('Error exporting to Excel:', error);
      });
  }

  return (
    <div>
      <h2>Student Export Page</h2>
      <p>Click the button below to export student data to Excel:</p>
      <button onClick={handleExportToExcel}>Export Students to Excel</button>
    </div>
  );
}

export default StudentExport;
