import React, { useState } from "react";
import axios from "axios";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import "../../css/styles.css"; // Import the CSS file
import '../../css/login.css';
import SphereAnimation from '../sphere';
import ipaddress from '../../../port';
var hash = require('object-hash');

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  const navigate = useNavigate();

  const handleGuestClick = () => {
    navigate('/Guest');
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://${ipaddress}/api/login`, {
        username,
        password,
      });
      setMessage(response.data.message);

      if (response.data.user) {
        const { username, role } = response.data.user;
        const newrole= hash.MD5(role);
        sessionStorage.setItem("username", username);
        sessionStorage.setItem("role", newrole);

        // console.log("Stored username:", sessionStorage.getItem("username"));
        // console.log("Stored role:", sessionStorage.getItem("role"));

        // Set login state to trigger animation
        setIsLoggedIn(true);
      }

      setTimeout(() => {
        navigate("/events");
      }, 1000); // Navigate after the animation
    } catch (error) {
      setMessage("Login failed. Check your credentials.");
    }
  };
  

  return (
    <div className={`AppLogin ${isLoggedIn ? "fade-out" : ""}`}>
       <div className="bg-container"> {/* Add this container for the background animation */}
      <Stack spacing={5} alignItems="center">
        <br />
        {/* <SphereAnimation /> */}
        <Typography className="titlelogin" variant="h4">Login Page</Typography>
        <br />
        <form className="loginform" onSubmit={handleLogin}>
          <Stack spacing={3} alignItems="center">
            <TextField
              className="usernamef"
              required
              id="outlined-required"
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
  
            <TextField
              className="passwordf"
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Stack direction="row" spacing={8}>
              {/* <Button className="guestbtn" >
              </Button> */}
              <Button className="loginbtn" variant="contained" type="submit">
                Login
              </Button>
            </Stack>
          </Stack>
        </form>
  
        <p>{message}</p>
      </Stack>
      </div>
    </div>
  );
  }  

export default Login;
