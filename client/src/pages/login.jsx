import React, { useState } from "react";
import axios from "axios";
import Seating from './seatingPlan';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8800/api/login", { username, password });
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Login failed. Check your credentials.");
    }
  };

  return (
    <div className="App">
       <Stack  spacing={5} alignItems="center">
        <br></br>
         <Typography variant="h4">Login Page</Typography>
      <br></br>
      <form onSubmit={handleLogin}>
        <Stack  spacing={3} alignItems="center">
        <TextField required
            id="outlined-required"
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}/>

          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="contained" type="submit">
            Login
          </Button>
        {/* <button type="submit">Login</button> */}
        </Stack>

      </form>

      <p>{message}</p>
       </Stack>
         
    </div>
  );
}

export default App;
