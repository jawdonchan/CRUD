import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Stack, FormControl, FormLabel, Radio, RadioGroup, FormControlLabel, Button, TextField } from '@mui/material';
import Navbar from '../navigationbar';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ipaddress from '../../../port';

const CreateEvent = () => {
  const [event, setEvent] = useState({
    name: '',
    location: '',
    date: '',
    time: ''
  });
  const username = sessionStorage.getItem("username");


  const [errorMessage, setErrorMessage] = useState(''); // New state for error message

  const navigate = useNavigate();

  const handleChange = (e) => {
    setEvent((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    if (!event.name || !event.location || !event.date || !event.time) {
      setErrorMessage('All fields are required');
      return;
    }

    try {
      console.log('adding Event');
      await axios.post(`http://${ipaddress}/addEvent/${username}`, event);
      navigate('/event');
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
      <h1>Add New event</h1>
      <br></br>
      <form onSubmit={handleClick}>
        <Stack direction="row" justifyContent="center">
          <div></div>
          <Stack direction="column" justifyContent="center" spacing={5}>
            <TextField
             variant="outlined"
              type="text"
              placeholder="name"
              onChange={handleChange}
              name="name"
              required
            />
            <TextField
             variant="outlined"
              type="text"
              placeholder="location"
              onChange={handleChange}
              name="location"
              required
            />
            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker label="Date of event" onChange={handleChange}   />
            </LocalizationProvider> */}
            <input type="date" name="date" onChange={handleChange}/>
            <TextField
             variant='outlined'
             type='text' 
             placeholder="time" 
             onChange={handleChange}
             name="time" 
             required
            />

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

export default CreateEvent;
