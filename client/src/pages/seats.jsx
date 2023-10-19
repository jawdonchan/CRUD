import React, { useEffect, useState } from 'react'
import axios from 'axios';
const Seats = () => {

const [seats, setSeats] = useState([])

useEffect(()=>{
    const fetchAllSeats = async ()=>{
        try{
            const res = await axios.get("http://localhost:8800/seat")
            // console.log(res)
            setSeats(res.data)
        }
        catch(err){
            console.log(err);
        }
    }
    fetchAllSeats();
},[])

    return <div>
       <div className='seats'>
        {seats.map(seat=>(
            <div className='seat'>
                <h2>{seat.seatscol}</h2>
                <h2>{seat.year}</h2>
                </div>
        ))}
       </div>
        <div>Seats</div>
        </div>;
}

export default Seats