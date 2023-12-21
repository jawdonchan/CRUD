// src/components/ChartDisplay.js
import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import ipaddress from '../../../port';

const ChartDisplay = () => {
  const [excelData, setExcelData] = useState(null);

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];

    if (!selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch(`http://${ipaddress}/api/upload-excel`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        // Assuming the first row contains labels and the rest contain data
        const labels = data[0];
        const datasets = data.slice(1).map((row, index) => ({
          label: `Dataset ${index + 1}`,
          data: row,
          backgroundColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.2)`,
          borderColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 1)`,
          borderWidth: 1,
        }));

        // Update state with Excel data
        setExcelData({
          labels,
          datasets,
        });
      } else {
        console.error('File upload failed.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  useEffect(() => {
    // Render the chart when excelData changes
    const ctx = document.getElementById('myChart');
    if (ctx && excelData) {
      new Chart(ctx, {
        type: 'bar',
        data: excelData,
      });
    }
  }, [excelData]);

  return (
    <div>
      <h1>Excel Data and Chart Display</h1>
      <label htmlFor="fileInput">Select Excel File:</label>
      <input type="file" id="fileInput" accept=".xlsx, .xls" onChange={handleFileChange} />
      <button onClick={() => document.getElementById('fileInput').click()}>Upload</button>
      <canvas id="myChart" width="800" height="400"></canvas>

      {excelData && (
        <div>
          <h2>Excel Data</h2>
          <pre>{JSON.stringify(excelData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default ChartDisplay;
