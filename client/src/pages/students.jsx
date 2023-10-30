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

const Students = () => {
  const [students, setStudents] = useState([]);
  const [filter, setFilter] = useState('all'); // Default filter

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

  return (
    <div>
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
  );
};

export default Students;
