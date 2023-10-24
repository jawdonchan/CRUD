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
        <input
          type="text"
          name="GdProgress"
          value={student.GdProgress}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>D List:</label>
        <input
          type="text"
          name="DList"
          value={student.DList}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Top Student:</label>
        <input
          type="text"
          name="TopStudent"
          value={student.TopStudent}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Coming:</label>
        <input
          type="text"
          name="Cmging"
          value={student.Cmging}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Attendance:</label>
        <input
          type="text"
          name="Attendance"
          value={student.Attendance}
          onChange={handleChange}
        />
      </div>
      <button className="formButton" onClick={handleUpdate}>
        Update
      </button>
    </div>
  );
};

export default UpdateStudent;
