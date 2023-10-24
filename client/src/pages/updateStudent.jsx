import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import '../css/update.css';

const UpdateStudent = () => {
  const [student, setStudent] = useState({
    GdProgress: '',
    DList: '',
    TopStudent: '',
    Cmging: '',
    Attendance: '',
  });

  const navigate = useNavigate();
  const location = useLocation();
  const studentId = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/student/${studentId}`);
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
    if (
      student.GdProgress === '' ||
      student.DList === '' ||
      student.TopStudent === '' ||
      student.Cmging === '' ||
      student.Attendance === ''
    ) {
      alert('Please select values for all fields.');
      return;
    }

    try {
      await axios.put(`http://localhost:8800/updateStudent/${studentId}`, student);
      navigate("/student"); // Redirect to the students page after updating
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="update-form">
      <h1>Update Student</h1>
      <div>
        <label>Good Progress:</label>
        <div>
          <input
            type="radio"
            name="GdProgress"
            value="yes"
            checked={student.GdProgress === "yes"}
            onChange={handleChange}
            required
          /> Yes
          <input
            type="radio"
            name="GdProgress"
            value="no"
            checked={student.GdProgress === "no"}
            onChange={handleChange}
            required
          /> No
        </div>
      </div>
      <div>
        <label>D List:</label>
        <div>
          <input
            type="radio"
            name="DList"
            value="yes"
            checked={student.DList === "yes"}
            onChange={handleChange}
            required
          /> Yes
          <input
            type="radio"
            name="DList"
            value="no"
            checked={student.DList === "no"}
            onChange={handleChange}
            required
          /> No
        </div>
      </div>
      <div>
        <label>Top Student:</label>
        <div>
          <input
            type="radio"
            name="TopStudent"
            value="yes"
            checked={student.TopStudent === "yes"}
            onChange={handleChange}
            required
          /> Yes
          <input
            type="radio"
            name="TopStudent"
            value="no"
            checked={student.TopStudent === "no"}
            onChange={handleChange}
            required
          /> No
        </div>
      </div>
      <div>
        <label>Coming:</label>
        <div>
          <input
            type="radio"
            name="Cmging"
            value="yes"
            checked={student.Cmging === "yes"}
            onChange={handleChange}
            required
          /> Yes
          <input
            type="radio"
            name="Cmging"
            value="no"
            checked={student.Cmging === "no"}
            onChange={handleChange}
            required
          /> No
        </div>
      </div>
      <div>
        <label>Attendance:</label>
        <div>
          <input
            type="radio"
            name="Attendance"
            value="yes"
            checked={student.Attendance === "yes"}
            onChange={handleChange}
            required
          /> Yes
          <input
            type="radio"
            name="Attendance"
            value="no"
            checked={student.Attendance === "no"}
            onChange={handleChange}
            required
          /> No
        </div>
      </div>
      <button className="formButton" onClick={handleUpdate}>
        Update
      </button>
    </div>
  );
};

export default UpdateStudent;
