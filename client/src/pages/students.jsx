import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/seats.css'; // Import the CSS file
import { Link } from 'react-router-dom';

const Students = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchAllStudents = async () => {
      try {
        const res = await axios.get("http://localhost:8800/student");
        setStudents(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllStudents();
  }, []);

  return (
    <div>
      <h1>Students</h1>
      <table className='seats-table'>
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Student Admin</th>
            <th>Good Progress</th>
            <th>D List</th>
            <th>Top Student</th>
            <th>Coming</th>
            <th>Attendance</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.FullName}</td>
              <td>{student.adminNo}</td>
              <td>{student.GdProgress}</td>
              <td>{student.DList}</td>
              <td>{student.TopStudent}</td>
              <td>{student.Cmging}</td>
              <td>{student.Attendance}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  );
};

export default Students;
