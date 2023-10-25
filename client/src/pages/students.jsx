import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../css/seats.css'; // Import the CSS file

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
            <th>Action</th> {/* New column for the update action */}
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.idstudent}>
              <td>{student.fullname}</td>
              <td>{student.adminno}</td>
              <td>{student.GoodPgrss}</td>
              <td>{student.DList}</td>
              <td>{student.TopStdnt}</td>
              <td>{student.AcceptStatus}</td>
              <td>{student.Attendance}</td>
              <td>
                <Link to={`/updateStudent/${student.idstudent}`} className="no-underline-link">Update</Link> {/* Link to the update page */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Students;
