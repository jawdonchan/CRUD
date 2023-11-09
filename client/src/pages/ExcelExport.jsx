import React from 'react';
import axios from 'axios';

const ExportStudentsToExcel = () => {
  const handleExportExcel = () => {
    // Make a GET request to your server to trigger the export
    axios.get('http://localhost:8800/export-students-excel', { responseType: 'arraybuffer' })
      .then(response => {
        const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'students-export.xlsx';
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch(error => {
        console.error('Error exporting students data to Excel:', error);
      });
  };

  return (
    <div>
      <h1>Export Students Data to Excel</h1>
      <button onClick={handleExportExcel}>Export Students to Excel</button>
    </div>
  );
};

export default ExportStudentsToExcel;
