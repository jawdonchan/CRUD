import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Stack, FormControl, FormLabel, Radio, RadioGroup, FormControlLabel } from '@mui/material';

const AddAccount = () => {
  const [account, setAccount] = useState({
    username: "",
    password: "",
    role: "",
  });
  const [errorMessage, setErrorMessage] = useState(""); // New state for error message

  const navigate = useNavigate();

  const handleChange = (e) => {
    setAccount((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8800/addaccount", account);

      if (response.status === 200) {
        console.log("Account has been added!");
        navigate('/admin');
      } else {
        console.log("Error adding account. Please check the input and try again.");
        setErrorMessage("Error adding account. Please check the input and try again.");
      }
    } catch (err) {
      console.log(err);
      setErrorMessage("Error adding account. Please try again later.");
    }
  };

  return (
    <div className='form'>
      <Stack>
        <h1>Add New Account</h1>
        <input type='text' placeholder='Username' onChange={handleChange} name='username' />
        <input type='password' placeholder='Password' onChange={handleChange} name='password' />
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
        <button onClick={handleClick}>Add</button>
        {/* Conditional rendering of error message */}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </Stack>
    </div>
  );
}

export default AddAccount;
