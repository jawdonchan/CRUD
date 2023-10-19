import React from 'react';

import ReactDOM from 'react-dom';
 import FormPropsTextFields from './textfield';
 import { Routes, Route, Link, BrowserRouter, useNavigate } from 'react-router-dom';
 import Guests from './pages/guest';
 import Stack from '@mui/material/Stack';
 import Button from '@mui/material/Button';
import Seating from './pages/seatingPlan';

export default function TempSeating(){
    const navigate = useNavigate();
    const handleGuestClick = () => {
        navigate('/seating');
    };
    return (
        <div>
            <Routes>
                <Route path = "/seating" element={<Seating/>}></Route>
            </Routes>            
            <Button variant = "contained" onClick = {handleGuestClick}>Seating</Button>
        </div>
    );
}

