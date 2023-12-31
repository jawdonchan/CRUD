import React, { useEffect } from 'react';
import { Routes, Route, useNavigate,useLocation } from 'react-router-dom';
import Guests from '../student/guest';
import Login from '../admin';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Seats from './seats'; // Import the Seats component
import Navbar from '../navigationbar';
import { createEvents } from '@react-three/fiber';
import axios from 'axios';
import { Alert } from '@mui/material';
import ipaddress from '../../../port';


export default function ChooseSeating() {
  const navigate = useNavigate();

  const location = useLocation();
  const eventid = location.pathname.split("/")[2];
  const handleViewClick = async (id)=>{
    navigate(`/seatingsearch/${id}`);
  }

  
  const handleCreateClick = async (id)  => {
    try {
      const res = await axios.get(`http://${ipaddress}/seatingsearch/${id}`);
      console.log(res.data);
      if(res.data.length != 0)
      {
navigate(`/seatingplan/${eventid+"/"+eventid}`);      }
      else{
        navigate(`/seatingplan/${id}`);
      }
    } catch (err) {
      console.log(err);
    }
  };
  

  // const handleEventClick = () => {
  //   navigate('/event');
  // };

  // const handleSeatsClick = () => {
  //   navigate('/seatingplan'); // Navigate to the Seats component
  // };

  return (
      <div>    
        <Navbar></Navbar>
        <br></br>
        <Stack
          direction="column"
          justifyContent='space-around'
          alignItems="center"
          spacing={20}
        > 
        <div></div>
          <Stack direction="row" spacing={3}>
            <Button variant='contained' onClick={() => handleCreateClick(eventid)}>Create Seating Plan</Button>
            <Button variant='contained' onClick={() =>handleViewClick(eventid)}>View Previous Seating Plan</Button>
          </Stack>
        </Stack>

      </div>
      
    
  );
}
