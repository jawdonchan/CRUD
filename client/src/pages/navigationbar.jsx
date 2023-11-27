import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate ,useLocation} from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';

var hash = require('object-hash');
export default function Navbar() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [hashRole,sethashrole] = useState('90eb20f1400db82ab874744e47836dc6');
  const location = useLocation();
  const eventid = location.pathname.split("/")[2];
  const userRole = sessionStorage.getItem("role");

  const handleUsersClick = () => {
    navigate('/users');
  };

  const handleSeatingClick = () => {
    // navigate(`/chooseseating/${eventid}`);
    navigate(`/chooseseating/undefined`);

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
      navigate('/');
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
   const admin = hash.MD5("Admin");
   const Student = hash.MD5("Student");
   const Teacher = hash.MD5("Teacher");
   if(userRole == admin)
   {
    sethashrole("Admin");
   }
   else if(userRole == Teacher)
   {
    sethashrole("Teacher");
   }
   else{
    sethashrole("Student");
   }
   
    if(userRole !== admin)
    {
      document.getElementById("hiddennav").style.display = "none";
    }
  },[userRole,userRole])

  return (
    <AppBar position="static">
      <Toolbar>
        {/* <Stack  direction="row" alignItems={"space-between"} justifyContent={"center"}> */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Dashboard
        </Typography>
        <Typography variant="h6" component="div" sx={{ flexGrow: 2 }}>
          {hashRole}
        </Typography>
        <div></div>
        <div>
          <Button color="inherit" id = "hiddennav" onClick={handleUsersClick}>
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
        </div>
        {/* </Stack> */}
        
        
      </Toolbar>
    </AppBar>
  );
}
