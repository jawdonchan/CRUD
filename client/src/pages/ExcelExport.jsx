import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const ExportToExcel = ({ data }) => {
  const [fileName, setFileName] = useState('');

  const exportToExcel = () => {
    if (!fileName) {
      alert('Please enter a file name.');
      return;
    }

    const ws = XLSX.utils.json_to_sheet(data);

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Students'); // Specify the sheet name

    const fileExtension = 'xlsx';

    // Use XLSX.write function to save the file
    const blob = XLSX.write(wb, { bookType: fileExtension, type: 'blob' });

    // Create a download link
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName}.${fileExtension}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter file name"
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
      />
      <button onClick={exportToExcel}>Export to Excel</button>
    </div>
  );
};

export default ExportToExcel;
