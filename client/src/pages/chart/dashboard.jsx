import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from 'axios';
import Navbar from "../navigationbar";
import Stack from '@mui/material/Stack';
import { Typography, Button, Modal, Backdrop, Fade, TextField } from "@mui/material";
import EmailForm from '../email/email.jsx';
import Denied from '../user/access-denied';
var hash = require('object-hash');


function BarChart() {
    const [totalstudents, setTotalStudents] = useState([]);
    const [attendedstudents, setattendedstudents] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [isModalOpen, setModalOpen] = useState(false);
    const userRole = sessionStorage.getItem("role");
    const [hashed,setHash] = useState([]);



    const [eventdata, setEventdata] = useState({
        labels: [],
        datasets: [
            {
                label: "Total Students",
                data: [],
                backgroundColor: [
                    'rgba(75,192,192,1)',
                    "#ecf0f1",
                    "#50AF95",
                    "#f3ba2f",
                    "#271d0",
                ],
                borderColor: "black",
                borderWidth: 2,
            }
        ]
    });

    useEffect(() => {
        setHash(hash.MD5("Admin"));
                
        const fetchTotalStudents = async () => {
            if(searchInput === "")
            {
              try {
                const res1 = await axios.get("http://localhost:8800/dashboardtotalstudent");
                setTotalStudents(res1.data);
                try{
                    const res2 = await axios.get("http://localhost:8800/dashboardattendedstudent");
                setattendedstudents(res2.data);
                if(attendedstudents.length > 0)
                {
                    setEventdata({
                    labels: totalstudents.map((event) => event.name),
                    datasets: [
                        {
                            label:  "Total Students Expected to Attend",
                            data: totalstudents.map((event) => event.count),
                            backgroundColor: [
                                'rgba(75,192,192,1)',
                                "#ecf0f1",
                                "#50AF95",
                                "#f3ba2f",
                                "#271d0",
                            ],
                            borderColor: "black",
                            borderWidth: 2,
                        //}
                        },
                        {

                            label: "Attended Students",

                            data: attendedstudents.map((event) => event.count),
                            backgroundColor: [
                                'rgba(75,192,182,1)',
                                "#ecf0f1",
                                "#50AF95",
                                "#f3ba2f",
                                "#271d0",
                            ],
                            borderColor: "black",
                            borderWidth: 2,
                        }
                        
                    ]
                });
                }
                else{
                    setEventdata({
                        labels: totalstudents.map((event) => event.name),
                        datasets: [
                            {
                                label: "Total Students Expected to Attend",
                                data: totalstudents.map((event) => event.count),
                                backgroundColor: [
                                    'rgba(75,192,192,1)',
                                    "#ecf0f1",
                                    "#50AF95",
                                    "#f3ba2f",
                                    "#271d0",
                                ],
                                borderColor: "black",
                                borderWidth: 2,
                            //}
                            },
                            
                        ]
                    });
                }
       
                }
                catch(err){
                    console.log(err);

                }
                // Move the initialization of labels and data here

            } catch (err) {
                console.log(err);
            }  
            }
            else{
                try {
                    const res1 = await axios.get("http://localhost:8800/dashboardtotalstudent/"+searchInput);
                    setTotalStudents(res1.data);
                    try{
                        const res2 = await axios.get("http://localhost:8800/dashboardattendedstudent/"+searchInput);
                    setattendedstudents(res2.data);
                    if(attendedstudents.length > 0)
                    {
                        setEventdata({
                        labels: totalstudents.map((event) => event.name),
                        datasets: [
                            {
                                label:  "Total Students Expected to Attend",
                                data: totalstudents.map((event) => event.count),
                                backgroundColor: [
                                    'rgba(75,192,192,1)',
                                    "#ecf0f1",
                                    "#50AF95",
                                    "#f3ba2f",
                                    "#271d0",
                                ],
                                borderColor: "black",
                                borderWidth: 2,
                            //}
                            },
                            {
                                label: "Attended Students",
                                data: attendedstudents.map((event) => event.count),
                                backgroundColor: [
                                    'rgba(75,192,182,1)',
                                    "#ecf0f1",
                                    "#50AF95",
                                    "#f3ba2f",
                                    "#271d0",
                                ],
                                borderColor: "black",
                                borderWidth: 2,
                            }
                            
                        ]
                    });
                    }
                    else{
                        setEventdata({
                            labels: totalstudents.map((event) => event.name),
                            datasets: [
                                {
                                    label: "Total Students Expected to Attend",
                                    data: totalstudents.map((event) => event.count),
                                    backgroundColor: [
                                        'rgba(75,192,192,1)',
                                        "#ecf0f1",
                                        "#50AF95",
                                        "#f3ba2f",
                                        "#271d0",
                                    ],
                                    borderColor: "black",
                                    borderWidth: 2,
                                //}
                                },
                                
                            ]
                        });
                    }
           
                    }
                    catch(err){
                        console.log(err);
    
                    }
                    // Move the initialization of labels and data here
    
                } catch (err) {
                    console.log(err);
                }  
            }
            
        };

        fetchTotalStudents();
    }, [totalstudents,attendedstudents,searchInput]);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };
    return (
     <div>
        <Navbar></Navbar>
        {userRole !== hashed && (
        <div>
          {/* <p>Access denied. User is not an admin.</p> */}
          <Denied></Denied>
          {/* You can redirect here as well if needed */}
        </div>
      )}
      {userRole == hashed && (
        <div className="dashboard">
            <Typography variant="h5">Number of Students Attended</Typography>
            <br></br><br></br>
            <Stack direction="column" alignItems={"center"}>
                <div className="Graph">
                    <Line data={eventdata} />
                </div>
            </Stack>
            <TextField  
                label="Search Event"
                className="outlined-basic"
                variant="outlined"
                fullWidth
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)} // Step 4: Implement the search functionality
            />
            <Button variant="contained" color="primary" onClick={handleOpenModal} style={{ position: 'fixed', bottom: '16px', right: '16px' }}>
                Open Email Form
            </Button>
            <Modal                 
                open={isModalOpen}
                onClose={handleCloseModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{timeout: 500,}}
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
        </div>
      )}
        <style>
            {`
            .dashboard{
                margin:10px;
               width: 100%;
                height:80vh;
                overflow:scroll;
                padding:5px;
                //border:2px solid black;
            }

            .dashboard::-webkit-scrollbar{
                display:none;
              }
            .Graph{
                min-height:50vh;
                min-width:50vw;
            }
            .outlined-basic{
                width: 30vw;
            }
            
            `}
        </style>
    </div> 

    )
    
}

export default BarChart;
