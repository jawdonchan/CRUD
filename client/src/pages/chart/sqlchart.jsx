import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import { useParams } from 'react-router-dom';
import ipaddress from '../../../port';

const ChartComponent = () => {
  const { id: eventId } = useParams();
  const [chartData, setChartData] = useState(null);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch student data from the backend using the eventId
        const response = await fetch(`http://${ipaddress}/student/${eventId}`);
        const data = await response.json();

        // Sort data by the "Status" column
        const sortedData = data.sort((a, b) => (a.Status > b.Status ? 1 : -1));

        // Extract relevant data for chart
        const labels = sortedData.map((student) => student.FullName);
        const attendanceData = sortedData.map((student) => student.Attendance);

        // Update state with sorted data
        setChartData({
          labels,
          datasets: [
            {
              label: 'Attendance',
              data: attendanceData,
              backgroundColor: 'rgba(75,192,192,0.2)',
              borderColor: 'rgba(75,192,192,1)',
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    fetchData();
  }, [eventId]);

  useEffect(() => {
    // Render the chart when chartData changes
    const ctx = document.getElementById('myChart');
    if (ctx && chartData) {
      // Destroy existing Chart instance
      if (chartInstance) {
        chartInstance.destroy();
      }

      // Create new Chart instance
      const newChartInstance = new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
      setChartInstance(newChartInstance);
    }
  }, [chartData, chartInstance]);

  return (
    <div>
      <h1>Student Attendance Chart</h1>
      <p>Event ID: {eventId}</p>
      <canvas id="myChart" width="800" height="400"></canvas>
    </div>
  );
};

export default ChartComponent;
