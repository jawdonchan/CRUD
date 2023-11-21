import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../css/update.css';
import Stack from '@mui/material/Stack';
import { TextField } from '@mui/material';
import Navbar from "../navigationbar";

const UpdateEvent = () => {
  const [event, setevent] = useState({
    name: '',
    location: '',
    date: '', 
    time: '',
  });

  const navigate = useNavigate();
  const location = useLocation();
  const eventid = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/eventsearch/${eventid}`);
        const eventData = response.data;
        setevent(eventData[0]);
        console.log(eventData[0]);
        console.log("data");
      } catch (error) {
        console.error(error);
      }
    };       
    // console.log(event[0].name);

    fetchEvent();
  }, [eventid]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setevent((prevevent) => ({
      ...prevevent,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    console.log(event.name);
    console.log(event.location);
    console.log(event.time);
    console.log(event.date);
    // Check if all fields are chosen
    if (event.name === '' || event.location === '' || event.date === '' || event.time === '') {
      alert('Please select values for all fields.');
      return;
    }

    try {
      await axios.put(`http://localhost:8800/updateEvent/${eventid}`, event);
      navigate("/event"); // Redirect to the students page after updating
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div>
      <Navbar/>
          <div className="update-form">

      <h1>Update Event</h1>
      <div>
        <div>            
          <label>Name:</label>
          <Stack direction='row' justifyContent={"center"} alignContent={"center"}>
            <TextField
              type="text"
              name="name"
              value={event.name}
              onChange={handleChange}
              required
            />
          </Stack>
        </div>
        <div>            
          <label>Location:</label>
          <Stack direction='row' justifyContent={"center"} alignContent={"center"}>
            <TextField
              type="text"
              name="location"
              value={event.location}
              onChange={handleChange}
              required
            />
          </Stack>
        </div>
        <div>            
          <label>Date:</label>
          <Stack direction='row' justifyContent={"center"} alignContent={"center"}>
          <input type="date" name="date" value = {event.date}onChange={handleChange}/>
          </Stack>
        </div>
        <div>            
          <label>Time:</label>
          <Stack direction='row' justifyContent={"center"} alignContent={"center"}>
            <TextField
              type="text"
              name="time"
              value={event.time}
              onChange={handleChange}
              required
            />
          </Stack>
        </div>
      </div>
      
          
      <button className="formButton" onClick={handleUpdate}>
        Update
      </button>
    </div>
    </div>

  );
};

export default UpdateEvent;
