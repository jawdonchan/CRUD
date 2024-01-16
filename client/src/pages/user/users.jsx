import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../css/seats.css';
import Navbar from "../navigationbar";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Popover from '@mui/material/Popover';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Denied from '../user/access-denied';
var hash = require('object-hash');
import ipaddress from '../../../port';



const Users = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate(); // Use useNavigate to navigate
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [filter, setFilter] = useState('all'); // Default filter
  const [fabAnchorEl, setFabAnchorEl] = useState(null);
  const userRole = sessionStorage.getItem("role");
  const [hashed,setHash] = useState([]);
  const username = sessionStorage.getItem("username");


  useEffect(() => {
    setHash(hash.MD5("Admin"));
    // console.log("hashed role : " + hashed);
    // console.log("og role : " + userRole); 
    const fetchAllUsers = async () => {
      try { 
        let res; 
        if(userRole == hashed)
        {
          if(username == "admin")
          {
            res= await axios.get(`http://${ipaddress}/accounts`);
          }
          else{
            res= await axios.get(`http://${ipaddress}/accountsadmin`);

          }
        }
        else{
        res = await axios.get(`http://${ipaddress}/accountsteacher`);

        }
        setUsers(res.data);
        // console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllUsers();
  }, [hashed,users,username]);
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
    navigate('/addAccount');
    handleOptionsClose();
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://${ipaddress}/deleteUser/${userId}`);
      navigate('/addaccount')
      // Navigate to the users page and trigger a page reload
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
              <ListItem button onClick={handleFIlterClick}>
                <ListItemText primary="Add User" />
              </ListItem>
            </List>
          </Popover>
      <Navbar></Navbar>
      <br></br>
      <h1>Users</h1>
        <br></br>
      {/* || userRole === "user" */}
      {userRole === hashed  && (
       
        <div className='scroll'>
<table className='seats-table'>
        <thead>
          <tr>
            <th>Username</th>
            <th>Role</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 && users.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.role}</td>
              <td>
                <Link to={`/updateUser/${user.id}`} className="no-underline-link">
                  Update
                </Link>
              </td>
              <td>
                <Button onClick={() => handleDeleteUser(user.id)}>
                  Delete
                </Button>
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      )}
       {userRole !== hashed && (
        <div>
          {/* <p>Access denied. User is not an admin.</p> */}
          <Denied></Denied>
          {/* You can redirect here as well if needed */}
        </div>
      )}
      
      <style>
    {`
          .scroll {
            overflow-y:scroll;
            height: 73vh;
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

export default Users;
