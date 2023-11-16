import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import { Typography, CircularProgress, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';


const Guest = (props) => {
    const location = useLocation();
    const eventid = location.pathname.split("/")[2];
    const [data, setData] = useState('No result');
    const [isLoading, setIsLoading] = useState(true); // Add a loading state
    const navigate = useNavigate();
    const handleBack = () => {
        navigate('/');
    }
    
    const [adminNo,setadminNo] = useState("");
    const handleSubmit = ()=>{
      handleQrResult(adminNo);  
    }
    const handleQrResult = async (result, error) => {
        if (result) {
            let resultText ={ 
                value:String(result).replace(/^"|"$/g, ''),
                writable:true
            }
            console.log("text length: "+resultText.value.length);
            console.log("eventid:" + eventid);
            if(resultText.value.length != 7) {
                setIsLoading(false);
                setData("Invalid Qr code" );
            }
            else{
              try {
                setIsLoading(true); // Set loading state to true

                

                const response = await axios.put("http://localhost:8800/attendance/" + result.text);
                console.log('Axios Response:', response.data);

                // Insert admin number into the student and seatcol tables
                await axios.post("http://localhost:8800/insertStudent", { adminNo: result.text , event: eventid});
                // await axios.post("http://localhost:8800/insertSeatcol", { adminNo: result.text });

                setData(result.text);
                // Add a delay of 2 seconds (2000 milliseconds)
                setTimeout(() => {
                    setIsLoading(false); // Set loading state to false after the delay
                }, 1500);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false); // Set loading state to false when done
            }   
            }
           
        }

        if (error) {
            console.info(error);
        }
    };

    return (
        <div>
            <Stack 
            divider={<Divider orientation="vertical" flexItem />}

            direction="row"
            spacing={3}
            justifyContent="space-around"
        >
            <div>
                <Stack 
                    direction="column"
                    spacing={3}
                    justifyContent="center"
                >
                    <br></br>
                    <Typography variant="h4">Scan For Attendance</Typography>
                   
                    <div style={{ width: 300 }}>
                        <QrReader
                            onResult={handleQrResult}
                            style={{ width: '10%' }}
                        />
                    </div>
                    <Stack direction="row" alignContent="center"justifyContent="center">
                        {isLoading ? (
                            <CircularProgress />
                        ) : (
                            <p>Attendance scanned for {data}</p>
                        )}
                    </Stack>
                </Stack>
            </div>
            <div>
            <Stack
                direction="column"
                justifyContent="space-evenly"
                alignItems="center"
                spacing={2}
            >
               <div className='spacer'></div>
               <br></br>

                <Typography variant="h4" > Mannual Input</Typography>
                    <form >
                    <TextField 
                        id="outlined-basic" 
                        label="Admin Number"
                        onChange={(e)=> setadminNo(e.target.value)}
                    />

                </form>
                <Button variant="contained" type="submit">
                    Enter
                </Button>
                </Stack>
               
            </div>
 
        </Stack>
        <style>
         {`
          .spacer{
            height: 25vh;
          }
        `}
    </style> 
        </div>
        
        
    );
}

export default Guest;
