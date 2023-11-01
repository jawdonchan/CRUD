import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Stack from '@mui/material/Stack';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Unstable_Grid2';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../css/seats.css'; // Import the CSS file
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Popover from '@mui/material/Popover';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
const Students = () => {
  const [students, setStudents] = useState([]);
  const [filter, setFilter] = useState('all'); // Default filter
  const [fabAnchorEl, setFabAnchorEl] = useState(null);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        let endpoint = `http://localhost:8800/students`;
        if (filter !== 'all') {
          endpoint = `http://localhost:8800/studentsfilter/${filter}`;
        }
        
        const res = await axios.get(endpoint);
        setStudents(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchStudents();
  }, [filter]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
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
    window.open('/guest', '_blank',);
    handleOptionsClose();
  };

  const handleFIlterClick = () => {
    // Handle the first option - Open in a new tab
    window.open('/FilterPage', '_blank',);
    handleOptionsClose();
  };

  return (
    <div>
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
              {/* <ListItem button onClick={handleGuestClick}>
                <ListItemText primary="Qr scanner" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Option 2" />
              </ListItem> */}
              <ListItem button onClick={handleFIlterClick}>
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
              <FormControlLabel value="Top" control={<Radio />} label="Top Student" />
              <FormControlLabel value="Directorlist" control={<Radio />} label="Director List" />
              <FormControlLabel value="Goodprogress" control={<Radio />} label="Good Progress" />
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
    </style>
    </div>

  );
};

export default Students;
