import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import { Link } from 'react-router-dom';
import '../css/seats.css';
import Navbar from './navigationbar';
import { useNavigate, useLocation } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

const Seatinglist = () => {
  const [eventlist,setEvent] = useState([]);
  const [seatingarrangement,setSeatingArrangment] = useState([]);
  const location = useLocation();
  const eventid = location.pathname.split("/")[2];
  const [fabAnchorEl, setFabAnchorEl] = useState(null);
  // const [rows, setRows] = useState('');
  // const [columns, setColumns] = useState('');
  const [selectedSeat, setSelectedSeat] = useState(null); // New state for selected seat
  const [isSeatModalOpen, setIsSeatModalOpen] = useState(false);




  const handleFabClick = (event) => {
    setFabAnchorEl(event.currentTarget);
  };
  // const fetchSeats = async (endpoint) => {
  //   console.log("fetching seating");
  //   try {
  //     const res = await axios.get(endpoint);
  //     console.log("endpoint btw: " + endpoint);
  //     // console.log(res.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  useEffect(() => {
    const fetchSeating = async () => {
      try {
        const data = await axios.get(`http://localhost:8800/searchseating/`);
        setEvent(data.data);        
        console.log(data.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSeating();
  }, [eventid]);


  const handleOpenSeat = (seatId) => {
    setSelectedSeat(seatId); // Set the selected seat
    setIsSeatModalOpen(true);
  }
  // useEffect(() => {
  //   // Fetch students when the component mounts
  //   const endpoint = `http://localhost:8800/studentsfilter/${filter}/${eventid}`;
  //   console.log("this is the endpoint:"+endpoint);
  //   fetchStudents(endpoint);
  // }, [filter]);
  const colorcat = (eventid) =>{
    
  }
 
  const createSeatingPlan = (rowxcol) => {
    

    let rowncol = rowxcol.split(',');
    let rows = rowncol[0];
    let columns = rowncol[1];
    const seatingPlan = [];
    for (let i = 0; i < parseInt(columns, 10); i++) {
      const column = [];
      for (let j = 0; j < parseInt(rows, 10); j++) {
        const divKey = `${j}-${i}`;
        // const backgroundColor = getDivColor(divKey);
        const backgroundColor = "gray";
        column.push(
          <div
            // onClick={() => handleOpenSeat(`${j + 1}${String.fromCharCode(65 + i)}`)}
            key={`seat-${divKey}`}
            className="seat"
            id={`${j + 1}${String.fromCharCode(65 + i)}`}
            style={{ backgroundColor }}
          >
            {/* {`${j + 1}${String.fromCharCode(65 + i)}`} */}
          </div>
        );
      }
      seatingPlan.push(
        <div key={`column-${i}`} className="column">
          {column}
        </div>
      );
    }
    return seatingPlan;
  };

  return (
    <div>
      <Navbar />
    
      <Grid container spacing={2}>
      <Grid xs={4}></Grid>
        <Grid xs={4}>
          <Stack direction='column' justifyContent={'space-around'}>
            <br></br>
            <br></br>
            <div>
              <h1>Students</h1>
            </div>
          </Stack>
        </Grid>
      </Grid>
      <br></br>
      <div className='scroll'>
        <Grid container spacing={2}>
          {eventlist.map((event) => (
            <Grid item>
              <Card key={event.id} sx={{ maxWidth: 350, minHeight: 60 }}>
              <div className='seating-plan'>{createSeatingPlan(event.rowxcol)}</div>
              <CardActionArea>
                <Stack direction="column" spacing={3}>
                  <div>{event.name}</div>
                  <div>{event.location}</div>
                  <div>{event.date}</div>
                  <div>{event.time}</div>
                </Stack>
              </CardActionArea>
            </Card>
            </Grid>
           
          ))}
        </Grid>

      </div>
          <style>
    {`
          .seating-plan{
            height:150px;
            overflow:hidden;
          }
          .floating{
            position:fixed;
            bottom:60px;
            right:60px;
          }
          .scroll {
            overflow-y:scroll;
            height: 300px;
          }
          .seat {
            width: 10px;
            height: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            cursor: pointer;
          }
          .column {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-right: 10px; /* Add space between columns */
          }
          .seating-plan {
            display: flex;
            margin-top: 20px;
            justify-content: center;
          }
        `}
    </style>    </div>
  );
};

export default Seatinglist;
