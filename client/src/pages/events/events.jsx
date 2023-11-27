import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../css/seats.css';
import Navbar from "../navigationbar";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import EventIcon from '@mui/icons-material/Event';
import Popover from '@mui/material/Popover';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { SpeedDial, SpeedDialIcon, SpeedDialAction } from '@material-ui/lab';
import { TextField } from '@mui/material';
var hash = require('object-hash');


const Events = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate(); // Use useNavigate to navigate
  const [searchInput, setSearchInput] = useState('');
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [filter, setFilter] = useState('all'); // Default filter
  const [fabAnchorEl, setFabAnchorEl] = useState(null);
  const userRole = sessionStorage.getItem("role");
  const [hashed,setHash] = useState([]);
  const [collabbutton,setcollabbutton] = useState(false);



  useEffect(() => {
    setHash(hash.MD5("Admin"));

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
  }, [userRole]);
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

  const handleSeat = async (id)  => {
    console.log(id);
    try {
      const res = await axios.get(`http://localhost:8800/seatingsearch/${id}`);
      console.log("data length");
      console.log(res.data);
      if(res.data > 0 )
      {
      navigate(`/seatingplan/${id+"/"+id}`);      }
      else{
        navigate(`/chooseseating/${id}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

const handleCollabClick = async (event) =>{
    if(collabbutton == false)
    {
      try{
        const q = await  axios.get(`http://localhost:8800/eventcollaborator/${event}`);
        console.log(q.data);
        console.log(q.data.length);
        for(let l = 0 ; l < q.data.length; l++)
        {
      
            let og = document.getElementById(`collab${q.data[l].eventid}`).innerHTML;
            console.log("update"+og);
            //let newid = "ann" + q.data[l].name+l;
          document.getElementById(`collab${q.data[l].eventid}`).innerHTML = `${og}<div class = "gridcollab"><div>${q.data[l].username}</div></div>`;
          // document.getElementById(`${event}${q.data[l].name}`).style.backgroundColor= q.data[l].color;
            // console.log(`${q.data[l].name} + " "+ ${q.data[l].color}`);
          
        
        }
      }

      catch(err){
        console.log(err);
      }
      document.getElementById(`addButton${event}`).style.display = 'block';
      setcollabbutton(true);
    }
    
    else{
      try{
        const q = await  axios.get(`http://localhost:8800/eventcollaborator/${event}`);
        console.log(q.data);
        console.log(q.data.length);
        for(let l = 0 ; l < q.data.length; l++)
        {
      
            let og = document.getElementById(`collab${q.data[l].eventid}`).innerHTML;
            console.log("update"+og);
            //let newid = "ann" + q.data[l].name+l;
          document.getElementById(`collab${q.data[l].eventid}`).innerHTML = ``;
            // console.log(`${q.data[l].name} + " "+ ${q.data[l].color}`);
          
        
        }
      }

      catch(err){
        console.log(err);
      }
      document.getElementById(`addButton${event}`).style.display = 'none';
      setcollabbutton(false);
    }
  }

  

  const handleDeleteEvent = async (eventId) => {
    try {
      await axios.delete(`http://localhost:8800/deleteEvent/${eventId}`);
      navigate('/choose')
    } catch (err) {
      console.error(err);
    }
  };

  const actions = [
    { icon: <EventIcon />, name: 'Create Event', onClick: handleFIlterClick },
    // Add more actions as needed
  ];
//search bar
  const filteredEvents = events.filter((event) =>
  event.name.toLowerCase().includes(searchInput.toLowerCase())
);
  return (
    <div>
     <Navbar />
     <br></br>
      
    
      <SpeedDial
      className='hidden'
        ariaLabel="SpeedDial openIcon example"
        icon={<SpeedDialIcon openIcon={<AddIcon />} />}
        onClose={handleOptionsClose}
        onOpen={handleFabClick}
        open={isOptionsOpen}
        direction="up"
        FabProps={{ ref: setFabAnchorEl }}
        style={{ position: 'fixed', bottom: 16, right: 16 }} // Set position to bottom right
      >
        {actions.map((action) => (
          <SpeedDialAction key={action.name} icon={action.icon} tooltipTitle={action.name} onClick={action.onClick} />
        ))}
      </SpeedDial>
       <TextField  label="Search Event"
        variant="outlined"
        fullWidth
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)} // Step 4: Implement the search functionality
        style={{ marginBottom: '20px' , marginTop: '20px' ,width: '28vw'}}
      />
     
      <div className='scroll'>
<table className='seats-table'>
        <thead>
          <tr>
            <th>name</th>
            <th>location</th>
            <th>date</th>
            <th>time</th>
            <th>Links</th>
            <th>Collaborators</th>
          </tr>
        </thead>
        <tbody>
          {filteredEvents.map((event) => (
            <tr key={event.id}>
              <td>{event.name}</td>
              <td>{event.location}</td>
              <td>{event.date}</td>
              <td>{event.time}</td>
              <td>
                <Stack direction="column">
                  {userRole === hashed && (<div className ="hidden"> <Link  to={`/updateevent/${event.id}`} className="no-underline-link">
                  Update details
                </Link></div>)}
                  
               
                <Link to={`/student/${event.id}`} className='no-underline-link'>
                  Student List
                </Link>
                <Button onClick={() => handleSeat(event.id)} className='no-underline-link'>
                  Seating Plan
                </Button>
                {userRole === hashed && (
                <div className = "hidden">
                    <Button onClick={() => handleDeleteEvent(event.id)} className='no-underline-link'>
                  Delete
                </Button>
                </div>)}
              
                </Stack>
               
              </td>
              <td>
                <Stack direction="column" justifyContent="center">
                <Button variant="outlined" onClick={() => handleCollabClick(event.id)} >Collaborators</Button>  
                    <Stack id={`collab${event.id}`} direction="column" justifyContent="start" alignItems="start" className = "annotate"></Stack>
                <Button id = {`addButton${event.id}`} className='addCollab'>Add Collaborators</Button>
                  </Stack>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <style>
    {`
          .addCollab{
            display:none;
          }
          .scroll {
            overflow-y:scroll;
            height:65vh;
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
