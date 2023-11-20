import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { Routes, Route, useNavigate ,useLocation} from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function Navbar() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const location = useLocation();
  const eventid = location.pathname.split("/")[2];
  const handleUsersClick = () => {
    navigate('/users');
  };

  const handleSeatingClick = () => {
    navigate(`/chooseseating/${eventid}`);
  };

  const handleStudentlistClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleEventsClick = () => {
    navigate('/events');
  };

  const handleLogoutClick = () => {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('role');
    if (!sessionStorage.getItem('username')) {
      navigate('/login');
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Dashboard
        </Typography>
        <Button color="inherit" onClick={handleUsersClick}>
          User List
        </Button>
        {/* <Button color="inherit" onClick={handleStudentlistClick}>
          Student List
        </Button> */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => navigate('/admin')}>Admin</MenuItem>
          {/* Add additional items in the dropdown menu as needed */}
        </Menu>
        <Button color="inherit" onClick={handleEventsClick}>
          Events
        </Button>
        <Button color="inherit" onClick={handleSeatingClick}>
          Seating
        </Button>
        <Button color="inherit" onClick={handleLogoutClick}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}
