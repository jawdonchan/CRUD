import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Guests from './guest';
import Login from './admin';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Seats from './seats'; // Import the Seats component

export default function Choose() {
  const navigate = useNavigate();

  const handleGuestClick = () => {
    navigate('/guest');
  };

  const handleAdminClick = () => {
    navigate('/admin');
  };

  const handleSeatsClick = () => {
    navigate('/seatingplan'); // Navigate to the Seats component
  };

  return (

      <Stack
      direction="column"
      justifyContent='space-around'
      alignItems="center"
      spacing={8}
    >
    
      <Routes>
        <Route path="/guest" element={<Guests />} />
        <Route path="/admin" element={<Login />} />
        <Route path="/seats" element={<Seats />} /> {/* Add the new route for Seats */}
      </Routes>
      <div>
        <Stack       
        direction="row"
        spacing={3}>
          {!window.location.pathname.includes('/guest') && (
          <Button variant="contained" onClick={handleGuestClick}>Guest</Button>
        )}
        
        {!window.location.pathname.includes('/admin') && (
          <Button variant="contained" onClick={handleAdminClick}>Admin</Button>
        )}
        {!window.location.pathname.includes('/seats') && (
          <Button variant="contained" onClick={handleSeatsClick}>Seats</Button>
        )}
        </Stack>
        
      </div>
    </Stack>

    
  );
}
