import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../css/update.css';
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
        const response = await axios.get(`http://localhost:8800/updategetstudents/${studentId}`);
        console.log(response.data[0]);
        let studentData = response.data[0];
        setStudent(studentData);
        console.log("student award" + student.Award);
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
      navigate(`/event`); // Redirect to the students page after updating
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
          <Stack direction='column' alignItems='flex-start'>
            <div>
              <input
            type="radio"
            name="Award"
            value="Director List Year 1"
            checked={student.Award === "Director List Year 1"}
            onChange={handleChange}
          /> Director List Year 1
            </div>
            <div>
               <input
            type="radio"
            name="Award"
            value="Director List Year 2"
            checked={student.Award === "Director List Year 2"}
            onChange={handleChange}
          /> Director List Year 2
            </div>
          <div>
            <input
            type="radio"
            name="Award"
            value="Director List Year 3"
            checked={student.Award === "Director List Year 3"}
            onChange={handleChange}
          /> Director List Year 3
          </div>
          <div>
            <input
            type="radio"
            name="Award"
            value="Good Progress"
            checked={student.Award === "Good Progress"}
            onChange={handleChange}
          /> Good Progress
          </div>
          
          </Stack>
          
        </div>
      </div>
      <div>
        <label>Status:</label>
        <div>
          <Stack direction='column' alignItems='flex-start'>
            <div>
              <input
            type="radio"
            name="Status"
            value="Yes"
            checked={student.Status === "Yes"}
            onChange={handleChange}
          /> Attending
            </div>
            <div>
              <input
            type="radio"
            name="Status"
            value="No"
            checked={student.Status === "No"}
            onChange={handleChange}
          /> Not Attending
            </div>
          </Stack>          
        </div>
      </div>
      <div>
        <label>Attendance:</label>
        <div>
          <Stack direction='column' alignItems='flex-start'>
            <div>
              <input
            type="radio"
            name="Attendance"
            value="Yes"
            checked={student.Attendance === "Yes"}
            onChange={handleChange}
          /> Yes
            </div>
            <div>
              <input
                type="radio"
                name="Attendance"
                value="No"
                checked={student.Attendance === "No"}
                onChange={handleChange}
              /> No
            </div>
          </Stack>
          

        </div>
      </div>
      <button className="formButton" onClick={handleUpdate}>
        Update
      </button>
    </div>
  );
};

export default UpdateStudent;
