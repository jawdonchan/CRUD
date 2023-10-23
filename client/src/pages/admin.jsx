// import React from 'react';

// import ReactDOM from 'react-dom';
//  import FormPropsTextFields from './textfield';
//  import { Routes, Route, Link, BrowserRouter, useNavigate } from 'react-router-dom';
//  import Guests from './guest';
//  import Stack from '@mui/material/Stack';
//  import Button from '@mui/material/Button';
// import Seating from './seatingPlan';

// export default function Login(){
//     const navigate = useNavigate();
//     const handleGuestClick = () => {
//         navigate('/seatingplan');
//     };
//     return (
//         <div>
//             <Routes>
//                 <Route path = "/seatingplan" element={<Seating/>}></Route>
//             </Routes>            
//             <Button variant = "contained" onClick = {handleGuestClick}>Seating</Button>

//             <FormPropsTextFields/>
//         </div>
//     );
// }
import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Seating from './seatingPlan';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');

  const handleGuestClick = () => {
    navigate('/seatingplan');
  };

  const handleLogin = () => {
    // Define the login data
    const loginData = {
      username: username,
      password: password,
    };

    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoginMessage(data.message);
      })
      .catch((error) => {
        console.error('Error during login:', error);
        setLoginMessage('Error during login');
      });
  };

  return (
    <div>
      <Routes>
        <Route path="/seatingplan" element={<Seating />} />
      </Routes>
      <Button variant="contained" onClick={handleGuestClick}>
        Seating
      </Button>

      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <Stack spacing={1} alignItems="center">
          <br />
          <br />
          <Typography variant="h5">Admin Login</Typography>
          <br />
          <br />
          <TextField
            required
            id="outlined-required"
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="contained" onClick={handleLogin}>
            Login
          </Button>
          <div>
            {loginMessage && <Typography>{loginMessage}</Typography>}
          </div>
        </Stack>
      </Box>
    </div>
  );
}


