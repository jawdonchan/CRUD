import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Stack, FormControl, FormLabel, Radio, RadioGroup, FormControlLabel, Button } from '@mui/material';
import Navbar from '../navigationbar';
import ipaddress from '../../../port';


const AddAccount = () => {
  const [account, setAccount] = useState({
    username: '',
    password: '',
    role: '',
  });
  const [errorMessage, setErrorMessage] = useState(''); // New state for error message

  const navigate = useNavigate();

  const handleChange = (e) => {
    setAccount((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    if (!account.username || !account.password || !account.role) {
      setErrorMessage('All fields are required');
      return;
    }

    try {
      console.log('adding account');
      await axios.post(`http://${ipaddress}/addaccount`, account);
      navigate('/users');
    } catch (err) {
      console.log(err);
      if (err.response && err.response.status === 400) {
        // Display the error message received from the server
        setErrorMessage(err.response.data.error);
      }
    }
  };

  return (
    <div className="form">
      <Navbar></Navbar>
      <br></br>
      <h1>Add New Account</h1>
      <br></br>
      <form onSubmit={handleClick}>
        <Stack direction="row" justifyContent="center">
          <div></div>
          <Stack direction="column" justifyContent="center" spacing={5}>
            <input
              type="text"
              placeholder="Username"
              onChange={handleChange}
              name="username"
              required
            />
            <input
              type="password"
              placeholder="Password"
              onChange={handleChange}
              name="password"
              required
            />
            <FormControl component="fieldset">
              <FormLabel component="legend">Role</FormLabel>
              <RadioGroup
                aria-label="role"
                name="role"
                value={account.role}
                onChange={handleChange}
              >
                <FormControlLabel value="Admin" control={<Radio />} label="Admin" />
                <FormControlLabel value="Teacher" control={<Radio />} label="Teacher" />
                <FormControlLabel value="Student" control={<Radio />} label="Student" />
              </RadioGroup>
            </FormControl>
            <Button type="submit" variant="contained">Add</Button>
            {errorMessage && <div className="error">{errorMessage}</div>}{' '}
            {/* Display error message */}
          </Stack>
          <div></div>
        </Stack>
      </form>
    </div>
  );
};

export default AddAccount;
