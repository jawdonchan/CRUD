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
import '../../css/seats.css';
import AddIcon from '@mui/icons-material/Add';
import Navbar from '../navigationbar';
import { SpeedDial, SpeedDialIcon, SpeedDialAction } from '@material-ui/lab';
import { useNavigate, useLocation } from 'react-router-dom';
import CoPresentIcon from '@mui/icons-material/CoPresent';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Typography, Button, Modal, Backdrop, Fade, TextField } from "@mui/material";
import EmailForm from '../email/email.jsx';
import EmailIcon from '@mui/icons-material/Email';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import DeleteIcon from '@mui/icons-material/Delete';
var hash = require('object-hash');

const Students = () => {
  const [students, setStudents] = useState([]);
  const [awardFilters, setAwardFilters] = useState([]);
  const navigate = useNavigate(); // Use useNavigate to navigate
  const [studentrole,setstudentrole] = useState([]);
  const [filter, setFilter] = useState('all');
  const [fabAnchorEl, setFabAnchorEl] = useState(null);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const location = useLocation();
  const eventid = location.pathname.split("/")[2];
  const userRole = sessionStorage.getItem("role");
  const [isModalOpen, setModalOpen] = useState(false);
  const [markstudents,setmarkstudents] = useState('');
  const [markstudentscount,setmarkstudentscount] = useState(0);

  const fetchStudents = async (endpoint) => {
    // console.log("fetching students");
    try {
      const res = await axios.get(endpoint);
      // console.log("endpoint btw: " + endpoint);
      setStudents(res.data);
      // // console.log(res.data)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setstudentrole(hash.MD5("Student"));

    const fetchAwardFilters = async () => {
      try {
        const awardFilterRes = await axios.get(`http://localhost:8800/studentawardfilter/${eventid}`);
        const awardFilters = awardFilterRes.data;
        // console.log(awardFilters);
        setAwardFilters(awardFilters);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAwardFilters();
  }, [eventid,markstudentscount]);

  useEffect(() => {
    // Fetch students when the component mounts
    const endpoint = `http://localhost:8800/studentsfilter/${filter}/${eventid}`;
    // console.log("this is the endpoint:" + endpoint);
    const fetchlist = async () => {
      try{
        const res = await axios.get("http://localhost:8800/dashboardflag");
        console.log(res.data.length);
        setmarkstudents(res.data);
        let count = 0;
        for(let i = 0 ; i < res.data.length;i++)
        {
          console.log(res.data[i].count);
          if(res.data[i].count > 2){
            document.getElementById(res.data[i].admNo).innerHTML = "!";
            count++ ;
            console.log("count" + count);
          }
        }        
        setmarkstudentscount(count);

      }
      catch(err){
        console.error(err);
      }
    }
    fetchlist();
    fetchStudents(endpoint);
  }, [filter,markstudents]);

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
    window.open(`/guest/${eventid}`, '_blank');
    handleOptionsClose();
  };

  const handleFIlterClick = () => {
    // Handle the first option - Open in a new tab
    // window.open('/LinkFilter', '_blank');
    // handleOptionsClose();

    navigate(`/LinkFilter/${eventid}`);
  };
  const handleUpload = () =>
  {
    navigate(`/Excel/${eventid}`);

  }

function deleteStudents(){
  try{
    axios.delete(`http://localhost:8800/deletestudents/${eventid}`);
  }
  catch(err){
    console.log(err);
  }
}
  const handleOpenModal = () => {
    setModalOpen(true);
};

const handleCloseModal = () => {
    setModalOpen(false);
};
const handleEmailClick = () => {
  handleOpenModal();
  handleCloseModal(); // Close the SpeedDial options
};
  const actions = [
    { icon: <CoPresentIcon />, name: 'Slide Show', onClick: handleFIlterClick },
    { icon: <QrCodeScannerIcon />, name: 'ScanQR', onClick: handleGuestClick },
    { icon: <UploadFileIcon />, name: 'Upload Students', onClick: handleUpload },
    { icon: <EmailIcon />, name: 'Email ', onClick: handleOpenModal },
    { icon: <DeleteIcon/>, name: "Delete", onClick: deleteStudents}

  ];

  const modifiedactions = [
    { icon: <CoPresentIcon />, name: 'Slide Show', onClick: handleFIlterClick },
    { icon: <QrCodeScannerIcon />, name: 'ScanQR', onClick: handleGuestClick },
  ]
  
  return (
    <div>
      <Navbar />
      <SpeedDial
        ariaLabel="SpeedDial openIcon example"
        icon={<SpeedDialIcon openIcon={<AddIcon />} />}
        onClose={handleOptionsClose}
        onOpen={handleFabClick}
        open={isOptionsOpen}
        direction="up"
        FabProps={{ ref: setFabAnchorEl }}
        style={{ position: 'fixed', bottom: 16, right: 16 }} // Set position to bottom right
      >
        {studentrole === userRole && 
          modifiedactions.map((action) => (
            <SpeedDialAction key={action.name} icon={action.icon} tooltipTitle={action.name} onClick={action.onClick} />
          ))
          }
        { studentrole !== userRole &&
        actions.map((action) => (
          <SpeedDialAction key={action.name} icon={action.icon} tooltipTitle={action.name} onClick={action.onClick} />
        ))}
      </SpeedDial>
      <Modal 
                
                open={isModalOpen}
                onClose={handleCloseModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={isModalOpen}>
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '25px', borderRadius: '10px' , height: '42vh'}}>
                        {/* Add your email form components here */}
                        <EmailForm onClose={handleCloseModal} />
                        {/* <Button variant="contained" color="primary" onClick={handleCloseModal} style={{ marginTop: '16px' }}>
                            Send Email
                        </Button> */}
                    </div>
                </Fade>
            </Modal>
      <Grid container spacing={2}>
        <Grid xs={4}>
          <Stack direction="column" justifyContent={"center"} alignItems={"center"}>
            <br></br><br></br><br></br><br></br><br></br>
            <div>Number of Students marked: {markstudentscount > 0 && markstudentscount}</div>
          </Stack>
        </Grid>
        <Grid xs={4}>
          <Stack direction='column' justifyContent={'space-around'}>
            <br></br>
            <br></br>
            <div>
              <h1>Students</h1>
            </div>
          </Stack>
        </Grid>
        <Grid xs={4}>
          <FormControl style={{marginTop: 50}}>
            <FormLabel id="demo-radio-buttons-group-label">Filter</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              value={filter}
              onChange={handleFilterChange}
              name="radio-buttons-group"
            >
              <FormControlLabel value="all" control={<Radio />} label="All" />
              {awardFilters.map((filterOption) => (
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
      <div className='scroll' style={{marginTop: -50}}>
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
                <td>{student.FullName}<div className="warning" id = {student.AdmNo}></div></td>
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
        .warning{
          color:red;
          font-weight:bold;
        }
          .floating{
            position:fixed;
            bottom:60px;
            right:60px;
          }
          .scroll {
            overflow-y:scroll;
            height: 45vh;
          }
        `}
      </style>
    </div>
  );
};

export default Students;
