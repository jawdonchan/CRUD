import React, { useState } from 'react';

const ExportToExcel = ({ data }) => {
  const [fileName, setFileName] = useState('');

  const exportToExcel = () => {
    if (!fileName) {
      alert('Please enter a file name.');
      return;
    }

    import('xlsx').then((XLSX) => {
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Students'); // Specify the sheet name

      const fileExtension = 'xlsx';
      const blob = XLSX.write(workbook, { bookType: fileExtension, type: 'blob' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${fileName}.${fileExtension}`;
      a.click();
      URL.revokeObjectURL(url);
    });
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
