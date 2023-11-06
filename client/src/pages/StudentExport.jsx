import React, { useState, useEffect } from 'react';
import ExportToExcel from './ExcelExport';

const StudentsTable = () => {
  const [students, setStudents] = useState([]);

  // Fetch students data from your backend API
  useEffect(() => {
    fetch("http://localhost:8800/students")
      .then((response) => response.json())
      .then((data) => setStudents(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div style={{ height: '400px', overflow: 'auto' }}>
      <table>
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Student Admin</th>
            <th>Award</th>
            <th>Top Student</th>
            <th>FlipFlop</th>
            <th>Status</th>
            <th>Attendance</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.FullName}</td>
              <td>{student.AdmNo}</td>
              <td>{student.Award}</td>
              <td>{student.Top}</td>
              <td>{student.FlipFlop}</td>
              <td>{student.Status}</td>
              <td>{student.Attendance}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ExportToExcel data={students} />
    </div>
  );
};

export default StudentsTable;
