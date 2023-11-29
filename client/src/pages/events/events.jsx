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
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';



var hash = require('object-hash');


const Events = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate(); // Use useNavigate to navigate
  const [searchInput, setSearchInput] = useState('');
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [filter, setFilter] = useState('all'); // Default filter
  const [fabAnchorEl, setFabAnchorEl] = useState(null);
  const userRole = sessionStorage.getItem("role");
  const username = sessionStorage.getItem("username");
  const [hashed,setHash] = useState([]);
  const [collabbutton,setcollabbutton] = useState(false);
  const [collaborators,setCollaborators] = useState(null);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [searchCollaboratorInput, setSearchCollaboratorInput] = useState('');
  const [collaboratorOptions, setCollaboratorOptions] = useState([]);
  const [addCollabAnchorEl, setAddCollabAnchorEl] = useState(null);




  useEffect(() => {
    setHash(hash.MD5("Admin"));
    if(userRole == hash.MD5("Admin")){
      setHash("Admin");
    }
    else if(userRole == hash.MD5("Teacher")){
      setHash("Teacher");
    }
    else{
      setHash("Student");
      document.getElementById("hiddenspeed").style.display = "none";
    }


    const fetchALlEvents = async () => {
      try {
        const res = await axios.get("http://localhost:8800/events");
        setEvents(res.data);
        // console.log("users get : " + res.data);
        for(let i = 0 ; i < res.data.length; i++)
        {
          let checked =  await checkeventuser(res.data[i].id);
          if(checked === true)
          {
            console.log("its true");
            // document.getElementById("")
          }
          else{
            console.log("not true");
            console.log(`hiddenstudentlist${res.data[i].id}`);
            document.getElementById(`hiddenupdatebtn${res.data[i].id}`).style.display = "none";
            document.getElementById(`hiddendeletebtn${res.data[i].id}`).style.display = "none";
            document.getElementById(`hiddenstudentlist${res.data[i].id}`).style.display = "none";

          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    const fetchUsers = async () => {
    
    
      if(searchCollaboratorInput !== null){
          //console.log("there is input");
          try {
            const res = await axios.get(`http://localhost:8800/user/${searchCollaboratorInput}`);
            // params: { query: searchCollaboratorInput },
            setCollaboratorOptions(null);
            setCollaboratorOptions(res.data); 
            // console.log("search");
            // console.log(res.data);
            const eventuser = await axios.get(`http://localhost:8800/eventcollaborator/${selectedEventId}`);
        // console.log(eventuser.data);
        for(let l = 0 ; l < eventuser.data.length; l++)
        {
          document.getElementById(`tick${eventuser.data[l].user_id}`).style.display= "block";
  
        }
          }
          catch (err) {
            console.log(err);
          }
        }
      } 
      fetchUsers();

    fetchALlEvents();
  }, [userRole,searchCollaboratorInput,addCollabAnchorEl,collaborators]);
  
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

  const handleAddCollaboratorsClick = async (event) => {
    console.log("eventid"+ event);
    // setSelectedEventId(event);
    console.log("selected:"+selectedEventId);    
    console.log(searchCollaboratorInput);
    setAddCollabAnchorEl(true);
    if(searchCollaboratorInput == "")
    {
      try {
      const res = await axios.get(`http://localhost:8800/user`);
        // params: { query: searchCollaboratorInput },
      setCollaboratorOptions(res.data); 
      // console.log(res.data);
      
      const eventuser = await axios.get(`http://localhost:8800/eventcollaborator/${selectedEventId}`);
      // console.log(eventuser.data);
      for(let l = 0 ; l < eventuser.data.length; l++)
      {
        document.getElementById(`tick${eventuser.data[l].user_id}`).style.display= "block";
          // console.log(`${q.data[l].name} + " "+ ${q.data[l].color}`);
        
      
      }
      }
      catch (err) {
      console.log(err);
    }
    }

    };
    const handleAddCollaboratorsClose = () => {    
      //console.log("closed");
      document.getElementById(`contributebutton${selectedEventId}`).click();
      setAddCollabAnchorEl(null);
      // setSelectedEventId(null);
      setSearchCollaboratorInput('');
      setCollaboratorOptions([]);
      window.location.reload();

    };

    const handleCollaboratorSelection = async (collaboratorId) => {

      if(document.getElementById(`tick${collaboratorId}`).style.display == "block")
      {
        document.getElementById(`listitem${collaboratorId}`).onClick=error(`${collaboratorId}`);
      }
      else{
        //console.log("selected:"+selectedEventId+"collabid:"+collaboratorId);
  
        try{      
        const userid = collaboratorId;
       // console.log(userid);
          const q = await axios.post(`http://localhost:8800/addeventstaff/${selectedEventId}/`+userid);
         // console.log(q);
          handleAddCollaboratorsClose();
        }
        catch(err)
        {
          console.log(err);
        }
      }
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

  function deleteEventStaff(eventId, userId) {
    try {
      axios.delete(`http://localhost:8800/deleteeventstaff/${eventId}/${userId}`);
      // Optionally, you can refresh the page or update the UI after successful deletion
       window.location.reload();
      // console.log()
    } catch (err) {
      console.log(err);
    }
  }

  const error = (collaboratorId) => {
    document.getElementById(`error${collaboratorId}`).style.display = "block";
  }
const handleCollabClick = async (event) =>{
    const dropdown = document.getElementsByClassName("collabList");
    for(let i=0 ;i<dropdown.length;i++)
    {
      dropdown[i].style.display="none";
    }
    

    if(collabbutton == false)
    {
      try{
        const q = await  axios.get(`http://localhost:8800/eventcollaborator/${event}`);
        console.log(q.data);
        console.log(q.data.length);
        for(let l = 0 ; l < q.data.length; l++)
        {
              setCollaborators(q.data);
        }
      }

      catch(err){
        console.log(err);
      }
      let checked =  await checkeventuser(event);
      console.log(checked);
      if(checked === true || hashed == "Admin")
      {
        console.log("button checked true");
        document.getElementById(`addButton${event}`).style.display = 'block';
      }
      else{
        let deletebtn = document.getElementsByClassName(`deletebtn${event}`);
        console.log(deletebtn);
        for(let j=0;j<deletebtn.length;j++){
          deletebtn[j].innerHTML="-";
        }

      }
      document.getElementById(`collab${event}`).style.display = 'block';
       setcollabbutton(true);
      setSelectedEventId(event);
    }
    
    else{
      try{
        const q = await  axios.get(`http://localhost:8800/eventcollaborator/${event}`);
        console.log(q.data);
        console.log(q.data.length);
        for(let l = 0 ; l < q.data.length; l++)
        {
      
          //   let og = document.getElementById(`collab${q.data[l].eventid}`).innerHTML;
          //   console.log("update"+og);
          //   //let newid = "ann" + q.data[l].name+l;
          document.getElementById(`collab${q.data[l].eventid}`).innerHTML = ``;
            // console.log(`${q.data[l].name} + " "+ ${q.data[l].color}`);
          
        
        }
      }

      catch(err){
        console.log(err);
      }
      let checked =  await checkeventuser(event);
    if(checked === true)
    {
      // document.getElementById(`addButton${event}`).style.display = 'none';
      document.getElementById(`collab${event}`).style.display = 'none';
    }
    else{
      document.getElementById(`collab${event}`).style.display = 'none';
    }
      setSelectedEventId(null);
      setcollabbutton(false);
    }
  }

  
const checkeventuser = async (eventid) => {
  try{
    let check = await axios.get(`http://localhost:8800/checkeventcollab/${username}/${eventid}`);
    console.log(check.data[0].count);
    if(check.data[0].count != 0)
    {
      return true;
    }
    else{
      return false;
    }
  }
  catch(error){
    console.log(error);
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
      
      <div      
      id='hiddenspeed'        
      style={{ position: 'fixed', bottom: 16, right: 16 }} // Set position to bottom right
      >
      <SpeedDial
        ariaLabel="SpeedDial openIcon example"
        icon={<SpeedDialIcon openIcon={<AddIcon />} />}
        onClose={handleOptionsClose}
        onOpen={handleFabClick}
        open={isOptionsOpen}
        direction="up"
        FabProps={{ ref: setFabAnchorEl }}
      >
        {actions.map((action) => (
          <SpeedDialAction key={action.name} icon={action.icon} tooltipTitle={action.name} onClick={action.onClick} />
        ))}
      </SpeedDial>
      </div>
      
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
              <td style={{ padding: 10, fontWeight: 'bold' }}>
      <Stack direction="column">
        {hashed !== "Student" && (
          <div className={`hidden`} id={`hiddenupdatebtn${event.id}`}> 
            <Button component={Link} to={`/updateevent/${event.id}`} className="no-underline-link">
              Update details
            </Button>
          </div>
        )}
        
        <div id={`hiddenstudentlist${event.id}`}>
          <Button component={Link} to={`/student/${event.id}`} className="no-underline-link">
          Student List
        </Button>
        </div>
        

        <Button onClick={() => handleSeat(event.id)} className="no-underline-link">
          Seating Plan
        </Button>

        {hashed !== "Student" && (
          <div className="hidden" id={`hiddendeletebtn${event.id}`}>
            <Button onClick={() => handleDeleteEvent(event.id)} className="no-underline-link">
              Delete
            </Button>
          </div>
        )}
      </Stack>
    </td>
    <td>
                <Stack direction="column" justifyContent="center" >
                <Button id={`contributebutton${event.id}`} variant="outlined" onClick={() => handleCollabClick(event.id)} >Collaborators</Button>  
                      <div id={`collab${event.id}`} className = "collabList">
                      {collaborators && collaborators.map((collaborator)=>(
                        <div key={collaborator.user_id}>
                          <Stack direction={"row"} justifyContent={"space-between"}><div className={`deletebtn${event.id}`} ><DeleteIcon className={`deletebtn deletebtn${event.id}`}  onClick={() => deleteEventStaff(selectedEventId,collaborator.user_id)}></DeleteIcon></div> <div>{collaborator.username}</div>  [{collaborator.role}] </Stack>
                        </div>
                      ))}                
                      <Button id = {`addButton${event.id}`} className='addCollab' onClick={()=>handleAddCollaboratorsClick(event.id)}>Add Collaborators</Button>
                    </div>
                  </Stack>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
      {selectedEventId && (
        <Popover className='popup'
          open={addCollabAnchorEl}
          // anchorEl={addCollabAnchorEl}
          onClose={handleAddCollaboratorsClose}
        >
          <div style={{ padding: '20px', width: '300px' }}>
            <TextField
              label="Search Collaborators"
              variant="outlined"
              fullWidth
              value={searchCollaboratorInput}
              onChange={(e) => setSearchCollaboratorInput(e.target.value)}
            />
            <List className =  "searchcollabscroll"style={{ marginTop: '10px' }}>
              {collaboratorOptions.map((collaborator) => (
                <ListItem
                  id={`listitem${collaborator.id}`}
                  button
                  key={collaborator.id}
                  onClick={() => handleCollaboratorSelection(collaborator.id)}
                >
                  <ListItemText primary={`${collaborator.username} [${collaborator.role}]`} />
                  <div id={`error${collaborator.id}`} className='error'>Already Added !!!!</div>
                  <DoneIcon id = {`tick${collaborator.id}`} className="hiddenticks"></DoneIcon>
                </ListItem>
              ))}
            </List>
          </div>
        </Popover>)}
      </div>
      <style>
    {`
 .deletebtn{
  size:20px;
}
.deletebtn:hover{
  color:red;
}


.error{
  display:none;
  color:red;
}
.searchcollabscroll{
  overflow:scroll;
}

.searchcollabscroll::-webkit-scrollbar{
  display:none;
}

.hiddenticks{
  display:none;
  color:green
}
      .popup{
        position:absolute;
        left:35vw;
        top:35vh;
      }
      .addCollab{
        display:none;
        

      }
      .collabList{
        display:none;
        font-size:15px;
        overflow:scroll;
      }
      .collabList::-webkit-scrollbar{
        display:none;
      }
      .scroll {
        overflow-y:scroll;
        bottom:60px;
        right:60px;
        height:65vh;
      }
      .css-1e6y48t-MuiButtonBase-root-MuiButton-root {
      .no-underline-link{
        font-weight: bold;
        font-size: 18px;
        font-size: 15px;
    }
        
        `}
    </style>
      
    </div>
  );
};

export default Events;
