import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Stack, FormControl, FormLabel, Radio, RadioGroup, FormControlLabel,Button } from '@mui/material';
import Navbar from './navigationbar';

const AddAccount = () => {
  const [account, setAccount] = useState({
    username: "",
    password: "",
    role: "",
  });
  const [errorMessage, setErrorMessage] = useState(""); // New state for error message

  const [errorMessage, setErrorMessage] = useState(""); // State for error messages

  const navigate = useNavigate();

  const handleChange = (e) => {
    setAccount((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    
    if (!account.username || !account.password || !account.role) {
      setErrorMessage("All fields are required");
      return;
    }

    try {
<<<<<<< HEAD
      console.log("adding account");
      await axios.post("http://localhost:8800/addaccount", account);
      navigate("/");
    } catch (err) {
      console.log(err);
      if (err.response && err.response.status === 400) {
        // Display the error message received from the server
        setErrorMessage(err.response.data.error);
      }
=======
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
>>>>>>> e66564e168fece92685a916cc59e61d0ce49dc99
    }
  };

  return (
    <div className='form'>
    <Navbar></Navbar>
    <br></br>
    <h1>Add New Account</h1>
    <br></br>
    <Stack direction="row"
        justifyContent="center">
        <div></div>
    <Stack
        direction="column"      
        justifyContent="center"
        spacing={5}
      >
        
        <input
          type='text'
          placeholder='Username'
          onChange={handleChange}
          name='username'
          required
        />
        <input
          type='password'
          placeholder='Password'
          onChange={handleChange}
          name='password'
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
<<<<<<< HEAD
        <Button variant="contained" onClick={handleClick}>Add</Button>
        {errorMessage && <div className="error" >{errorMessage}</div>} {/* Display error message */}
=======
        <button onClick={handleClick}>Add</button>
        {/* Conditional rendering of error message */}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
>>>>>>> e66564e168fece92685a916cc59e61d0ce49dc99
      </Stack>
      <div></div>
    </Stack>
      
    </div>
  );
}

export default AddAccount;
