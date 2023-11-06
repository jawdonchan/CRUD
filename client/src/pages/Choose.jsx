import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Guests from './guest';
import Login from './admin';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Seats from './seats'; // Import the Seats component
import Navbar from './navigationbar';
import { createEvents } from '@react-three/fiber';

export default function Choose() {
  const navigate = useNavigate();

  const handleCreateClick = () => {
    navigate('/createevent');
  };

  const handleEventClick = () => {
    navigate('/event');
  };

  const handleSeatsClick = () => {
    navigate('/seatingplan'); // Navigate to the Seats component
  };

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
            <Button variant='contained' onClick={handleCreateClick}>Create Events</Button>
            <Button variant='contained' onClick={handleEventClick}>View Events</Button>
          </Stack>
        </Stack>

      </div>
      
    
  );
}
