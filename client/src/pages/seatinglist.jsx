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
  const navigate = useNavigate();




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
        const data = await axios.get(`http://localhost:8800/searchevent/`);
        setEvent(data.data);        
        console.log("huh");
        console.log(data.data);
        
        try{
           const color = await axios.get(`http://localhost:8800/searchseating/`);
        // console.log(color.data);
        // console.log(color.data.length);        
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWHXYZ';

        for(let g = 0 ; g <= color.data.length;g++){
          // console.log("this is g" + g);
          let index1ST = alphabet.indexOf( color.data[g].rowxcol.split(',')[1]) ;
          let index2ND = alphabet.indexOf( color.data[g].rowxcol.split(',')[3]) +1;
          // console.log(index1ST);
          // console.log(index2ND);

          for(let i = color.data[g].rowxcol.split(',')[0] ; i < color.data[g].rowxcol.split(',')[2];i++ )
          {
            for(let k = index1ST ; k < index2ND; k++)
            {
              // console.log(i+k);
              let id = color.data[g].event+""+i+""+alphabet[k];
              // console.log(id);
              // console.log(color.data[g].color);
              document.getElementById(id).style.backgroundColor = color.data[g].color;

            }
          }
        }

   // Update the color of the divs inside the category range labeled A1 to A3
     
      }
      catch(err){
        console.log(err);
      }
      } catch (err) {
        console.log(err);
      }
    };

    fetchSeating();
  }, [eventid]);



  const handleSeatClick = (eid) => {

    navigate(`/seatingplan/${eventid}/${eid}`);
  };
 
  const createSeatingPlan = (event,rowxcol) => {
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
            id={`${event.id}${j + 1}${String.fromCharCode(65 + i)}`}
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
    
      <Grid container spacing={2} >
      <Grid xs={4}></Grid>
        <Grid xs={4}>
          <Stack direction='column' justifyContent={'space-around'}>
            <br></br>
            <br></br>
            <div>
              <h1>Seating Arrangement</h1>
            </div>
          </Stack>
        </Grid>
      </Grid>
      <br></br>
      <div className='scroll'>
        <Grid container direction = "row" justifyContent="space-around" alignItems="flex-start" spacing={{xd:2,md:3}}>
          {eventlist.map((event) => (
            <Grid item xs={4} >
              <Card key={event.id} sx={{ maxWidth: 350, minHeight: 60 }}>
              <div className='seating-plan' >{createSeatingPlan(event, event.rowxcol)}</div>
                <div>                 

                <Stack direction="column" spacing={3}>
                  <Stack direction = "row" justifyContent="center" alignItems="center"> 
                    <label>Event name: </label>
                    <div>{event.name}</div>
                  </Stack>
                  <Stack direction = "row" justifyContent="center" alignItems="center"> 
                  <label>Event location: </label>
                  <div>{event.location}</div>
                  </Stack>
                  <Stack direction = "row" justifyContent="center" alignItems="center"> 
                  <label>Event date: </label>                 
                  <div>{event.date}</div>
                  </Stack>
                  <Stack direction = "row" justifyContent="center" alignItems="center"> 
                  <label>Event Time: </label>
                  <div>{event.time}</div>
                  </Stack>
                  <Stack direction = "row" justifyContent="center" alignItems="center"> 
                    <Link to={`/seatingplan/${eventid}/${event.id}`} className="no-underline-link">Use</Link>
                  </Stack>
                              </Stack>
              </div>
                  <br></br><br></br>
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
            overflow-x: hidden;
            height: 70vh;
            width: 100vw;
          }
          .seat {
            width: 5px;
            height: 5px;
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