import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import '../css/update.css';
import Stack from '@mui/material/Stack';

const UpdateStudent = () => {
  const [student, setStudent] = useState({
    Award: '', // Add Award field
    Status: '', // Add Status field
    Attendance: '', // Add Attendance field
  });

  const navigate = useNavigate();
  const location = useLocation();
  const studentId = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/students/${studentId}`);
        const studentData = response.data;
        setStudent(studentData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchStudentData();
  }, [studentId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    // Check if all fields are chosen
    if (student.Award === '' || student.Status === '' || student.Attendance === '') {
      alert('Please select values for all fields.');
      return;
    }

    try {
      await axios.put(`http://localhost:8800/updateStudent/${studentId}`, student);
      navigate("/admin"); // Redirect to the students page after updating
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="update-form">
      <h1>Update Student</h1>
      <div>
        <label>Award:</label>
        <div>
          <input
            type="radio"
            name="Award"
            value="Director List Year 1"
            checked={student.Award === "Director List Year 1"}
            onChange={handleChange}
          /> Director List Year 1
          <input
            type="radio"
            name="Award"
            value="Director List Year 2"
            checked={student.Award === "Director List Year 2"}
            onChange={handleChange}
          /> Director List Year 2
          <input
            type="radio"
            name="Award"
            value="Director List Year 3"
            checked={student.Award === "Director List Year 3"}
            onChange={handleChange}
          /> Director List Year 3
          <input
            type="radio"
            name="Award"
            value="Good Progress"
            checked={student.Award === "Good Progress"}
            onChange={handleChange}
          /> Good Progress
        </div>
      </div>
      <div>
        <label>Status:</label>
        <div>
          <input
            type="radio"
            name="Status"
            value="Attending"
            checked={student.Status === "Attending"}
            onChange={handleChange}
          /> Attending
          <input
            type="radio"
            name="Status"
            value="Not Attending"
            checked={student.Status === "Not Attending"}
            onChange={handleChange}
          /> Not Attending
        </div>
      </div>
      <div>
        <label>Attendance:</label>
        <div>
          <input
            type="radio"
            name="Attendance"
            value="Present"
            checked={student.Attendance === "Present"}
            onChange={handleChange}
          /> Present
          <input
            type="radio"
            name="Attendance"
            value="Absent"
            checked={student.Attendance === "Absent"}
            onChange={handleChange}
          /> Absent
        </div>
      </div>
      <button className="formButton" onClick={handleUpdate}>
        Update
      </button>
    </div>
  );
};

export default UpdateStudent;
