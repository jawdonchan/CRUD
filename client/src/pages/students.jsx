import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Stack from '@mui/material/Stack';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Unstable_Grid2';
import { Link } from 'react-router-dom';
import '../css/seats.css';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Popover from '@mui/material/Popover';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Navbar from './navigationbar';
import { useNavigate, useLocation } from 'react-router-dom';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [awardFilters, setAwardFilters] = useState([]);
  const [filter, setFilter] = useState('all');
  const [fabAnchorEl, setFabAnchorEl] = useState(null);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const location = useLocation();
  const eventid = location.pathname.split("/")[2];


  const fetchStudents = async (endpoint) => {
    console.log("fetching students");
    try {
      const res = await axios.get(endpoint);
      console.log("endpoint btw: " + endpoint);
      setStudents(res.data);
      // console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchAwardFilters = async () => {
      try {
        const awardFilterRes = await axios.get(`http://localhost:8800/studentawardfilter/${eventid}`);
        const awardFilters = awardFilterRes.data;
        console.log(awardFilters);
        setAwardFilters(awardFilters);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAwardFilters();
  }, [eventid]);

  useEffect(() => {
    // Fetch students when the component mounts
    const endpoint = `http://localhost:8800/studentsfilter/${filter}/${eventid}`;
    console.log("this is the endpoint:"+endpoint);
    fetchStudents(endpoint);
  }, [filter]);

  const handleFilterChange = (event) => {
    const selectedFilter = event.target.value;
    setFilter(selectedFilter);
  };

  const handleFabClick = (event) => {
    setFabAnchorEl(event.currentTarget);
    setIsOptionsOpen(true);
  };

  const handleOptionsClose = () => {
    setFabAnchorEl(null);
    setIsOptionsOpen(false);
  };

  const handleGuestClick = () => {
    // Handle the first option - Open in a new tab
    window.open('/guest', '_blank');
    handleOptionsClose();
  };

  const handleFIlterClick = () => {
    // Handle the first option - Open in a new tab
    window.open('/FilterPage', '_blank');
    handleOptionsClose();
  };

  return (
    <div>
      <Navbar />
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
          <ListItem  onClick={handleFIlterClick}>
            <ListItemText primary="SLide SHow" />
          </ListItem>
        </List>
      </Popover>
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
        <Grid xs={3}>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Filter</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            value={filter}
            onChange={handleFilterChange}
            name="radio-buttons-group"
          >
            <FormControlLabel value="all" control={<Radio />} label="All" />
            <FormControlLabel value="top" control={<Radio />} label="Top" />
            {awardFilters.map((filterOption) => (
  // This could be the problematic part
  <FormControlLabel
    key={filterOption}
    value={filterOption.Award}
    control={<Radio />}
    label={filterOption.Award} // Assuming Award is the property you want to render
  />
  ))}

          </RadioGroup>
        </FormControl>
      </Grid>
      </Grid>
      <br></br>
      <div className='scroll'>
        <table className='seats-table'>
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Student Admin</th>
            <th>Award</th>
            <th>Top Student</th>
            <th>FlipFlop</th>
            <th>Status</th>
            <th>Attendance</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.FullName}</td>
              <td>{student.AdmNo}</td>
              <td>{student.Award}</td>
              <td>{student.Top}</td>
              <td>{student.FlipFlop}</td>
              <td>{student.Status}</td>
              <td>{student.Attendance}</td>
              <td>
                <Link to={`/updateStudent/${student.id}`} className="no-underline-link">Update</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      </div>
          <style>
    {`
          .floating{
            position:fixed;
            bottom:60px;
            right:60px;
          }
          .scroll {
            overflow-y:scroll;
            height: 300px;
          }
        `}
    </style>    </div>
  );
};

export default Students;
