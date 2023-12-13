import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from 'axios';
import Navbar from "../navigationbar";
import Stack from '@mui/material/Stack';
import { Typography } from "@mui/material";


function BarChart() {
    const [totalstudents, setTotalStudents] = useState([]);
    const [attendedstudents, setattendedstudents] = useState([]);


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
        const fetchTotalStudents = async () => {
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
        };

        fetchTotalStudents();
    }, [totalstudents,attendedstudents]);

    return (
     <div>
        <Navbar></Navbar>
        <div className="dashboard">
            <Typography variant="h5">Number of Students Attended</Typography>
        <br></br><br></br>
            <Stack direction="column" alignItems={"center"}>
                <div className="Graph">
                <Line data={eventdata} />;
                </div>
            </Stack>
        </div>
        <style>
            {`
            .dashboard{
                margin:10px;
               width: 100%;
                height:60vh;
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
            `}
        </style>
    </div> 

    )
    
}

export default BarChart;
