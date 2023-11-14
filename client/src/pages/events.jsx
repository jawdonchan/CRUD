import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../css/seats.css';
import Navbar from "./navigationbar";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import Popover from '@mui/material/Popover';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const Events = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate(); // Use useNavigate to navigate
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [filter, setFilter] = useState('all'); // Default filter
  const [fabAnchorEl, setFabAnchorEl] = useState(null);

  useEffect(() => {
    const fetchALlEvents = async () => {
      try {
        const res = await axios.get("http://localhost:8800/events");
        setEvents(res.data);
        // console.log("users get : " + res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchALlEvents();
  }, []);
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };
  const handleFabClick = (event) => {
    setFabAnchorEl(event.currentTarget);
    setIsOptionsOpen(true);
  };
  const handleOptionsClose = () => {
    setFabAnchorEl(null);
    setIsOptionsOpen(false);
  };

  const handleFIlterClick = () => {
    // Handle the first option - Open in a new tab
    navigate('/createevent');
    handleOptionsClose();
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      await axios.delete(`http://localhost:8800/deleteEvent/${eventId}`);
      navigate('/choose')
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Fab
            className="floating"
            size="medium"
            color="primary"
            aria-label="add"
            onClick={handleFabClick}
          >
            <AddIcon />
          </Fab>

          <Popover
            open={isOptionsOpen}
            anchorEl={fabAnchorEl}
            onClose={handleOptionsClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <List>
              {/* <ListItem button onClick={handleGuestClick}>
                <ListItemText primary="Qr scanner" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Option 2" />
              </ListItem> */}
              <ListItem onClick={handleFIlterClick}>
                <ListItemText primary="Create Event" />
              </ListItem>
            </List>
          </Popover>
      <Navbar></Navbar>
      <br></br>
      <h1>Events</h1>
      <br></br>
      <div className='scroll'>
<table className='seats-table'>
        <thead>
          <tr>
            <th>name</th>
            <th>location</th>
            <th>date</th>
            <th>time</th>
            <th>Links</th>
 
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td>{event.name}</td>
              <td>{event.location}</td>
              <td>{event.date}</td>
              <td>{event.time}</td>
              <td>
                <Stack direction="column">
                <Link to={`/Excel/${event.id}`} className="no-underline-link">
                  Upload
                </Link>
                <Link to={`/student/${event.id}`} className='no-underline-link'>
                  Student List
                </Link>
                <Link to={`/chooseseating/${event.id}`} className='no-underline-link'>
                  Seating Plan
                </Link>
                <Button onClick={() => handleDeleteEvent(event.id)} className='no-underline-link'>
                  Delete
                </Button>
                </Stack>
               
              </td>

            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <style>
    {`
          .scroll {
            overflow-y:scroll;
            height:72vh;
          }

          .floating{
            position:fixed;
            bottom:60px;
            right:60px;
          }
        `}
    </style>
      
    </div>
  );
};

export default Events;
