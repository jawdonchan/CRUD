import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import ipaddress from '../../../port';
// import '../css/update.css'; // Import the CSS file
const Update = () => {

    const [seats, setSeats] = useState({
        seatcol:"",
        year:""
    });

    const navigate = useNavigate()
    const location = useLocation()

    const seatId = location.pathname.split("/")[2]

 

    const handleChange = (e) =>{
        setSeats((prev) => ({ ...prev, [e.target.name]: e.target.value}));
    };

    const handleClick = async e =>{
       e.preventDefault()
        try{
            await axios.put(`http://${ipaddress}/seat/`+ seatId, seats)
            navigate("/")
        }
        catch(err){
            console.log(err)
        }
    };
    console.log(seats)
    return (
        <div className='update-form'>
            <h1>Update Seat</h1>
        {/* <div>Add</div> */}
        <input type='text' placeholder='seat column' onChange={handleChange} name='seatcol'></input>
        <input type='number' placeholder='seat year' onChange={handleChange} name='year'></input>
        <button className="formButton" onClick={handleClick}>Update</button>
        </div>
    );
}

export default Update