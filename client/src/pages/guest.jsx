import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import axios from 'axios';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import { Typography, CircularProgress, Button } from '@mui/material';

const Guest = (props) => {
    const [data, setData] = useState('No result');
    const [isLoading, setIsLoading] = useState(true); // Add a loading state
    const navigate = useNavigate();
    const handleBack = () => {
        navigate('/');
    }
    const handleQrResult = async (result, error) => {
        if (result) {
            setIsLoading(false); // Set loading state to true

            try {
                const response = await axios.put("http://localhost:8800/attendance/" + result.text);
                console.log('Axios Response:', response.data); // Add this line
                // Assuming the result.text contains the adminNo for updating attendance
                setData(result.text);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false); // Set loading state to false when done
            }
        }

        if (error) {
            console.info(error);
        }
    };

    return (
        <Stack
            direction="row"
            spacing={3}
            justifyContent="space-between"
        >
            <Button variant="outlined" onClick={handleBack}>Back</Button>
            <div>
                <Stack 
                    direction="column"
                    spacing={3}
                    justifyContent="center"
                >
                    <br></br>
                    <Typography variant="h4"> Scan For attendance</Typography>
                    <div style={{ width: 300 }}>
                        <QrReader
                            onResult={handleQrResult}
                            style={{ width: '10%' }}
                        />
                    </div>
                    <Stack direction="row" alignContent="center"justifyContent="center">    
{isLoading ? (
                        <CircularProgress /> // Display the loading indicator while loading
                    ) : (
                        <p>Attendance scanned for {data}</p>
                    )}
                    </Stack>
                    
                </Stack>
            </div>
            <div></div>
        </Stack>
    );
}

export default Guest;
