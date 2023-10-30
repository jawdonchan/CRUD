import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../css/seats.css';
import Navbar from "./navigationbar";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Button from '@mui/material/Button';

const Users = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate(); // Use useNavigate to navigate

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const res = await axios.get("http://localhost:8800/accounts");
        setUsers(res.data);
        console.log("users get : " + res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:8800/deleteUser/${userId}`);
      navigate('/addaccount')
      // Navigate to the users page and trigger a page reload
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Navbar></Navbar>
      <br></br>
      <h1>Users</h1>
      <br></br>
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
          {users.map((user) => (
            <tr key={user.idaccounts}>
              <td>{user.username}</td>
              <td>{user.role}</td>
              <td>
                <Link to={`/updateUser/${user.idaccounts}`} className="no-underline-link">
                  Update
                </Link>
              </td>
              <td>
                <Button onClick={() => handleDeleteUser(user.idaccounts)}>
                  Delete
                </Button>
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
