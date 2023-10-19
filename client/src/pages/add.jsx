import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Add = () => {

    const [seats, setSeats] = useState({
        seatcol:"",
        year:""
    });

    const navigate = useNavigate()

    const handleChange = (e) =>{
        setSeats((prev) => ({ ...prev, [e.target.name]: e.target.value}));
    };

    const handleClick = async e =>{
       e.preventDefault()
        try{
            await axios.post("http://localhost:8800/seat", seats)
            navigate("/")
        }
        catch(err){
            console.log(err)
        }
    };
    console.log(seats)
    return (
        <div className='form'>
            <h1>Add New Seat</h1>
        {/* <div>Add</div> */}
        <input type='text' placeholder='seat column' onChange={handleChange} name='seatcol'></input>
        <input type='number' placeholder='seat year' onChange={handleChange} name='year'></input>
        <button onClick={handleClick}>Add</button>
        </div>
    );
}

export default Add