import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../css/update.css';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';

const UpdateUser = () => {
  const [user, setUser] = useState({
    username: '',
    password: '', // Add the password field
    role: '', // Set a default role
  });

  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/user/${userId}`);
        const userData = response.data;
        console.log("User data");
        console.log(userData);
        setUser(userData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserData();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    // Check if all fields are chosen
    if (
      user.username === '' ||
      user.password === '' ||
      user.role === ''
    ) {
      alert('Please select values for all fields.');
      return;
    }

    try {
      await axios.put(`http://localhost:8800/updateUser/${userId}`, user);
      navigate("/users"); // Redirect to the users page after updating
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="update-form">
      <h1>Update User</h1>
      <div>
        <div>
          <Stack direction="row">
            <label>Username:</label>
            <TextField
              type="text"
              name="username"
              value={user.username}
              onChange={handleChange}
              required
            />
          </Stack>
        </div>
      </div>
      <div>
        <label>Password:</label>
        <TextField
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Role:</label>
        <RadioGroup
          name="role"
          value={user.role}
          onChange={handleChange}
        >
          <FormControlLabel
            value="Admin"
            control={<Radio />}
            label="Admin"
          />
          <FormControlLabel
            value="Teacher"
            control={<Radio />}
            label="Teacher"
          />
          <FormControlLabel
            value="Student"
            control={<Radio />}
            label="Student"
          />
        </RadioGroup>
      </div>
      <button className="formButton" onClick={handleUpdate}>
        Update
      </button>
    </div>
  );
};

export default UpdateUser;
