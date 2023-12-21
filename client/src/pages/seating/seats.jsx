import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../css/seats.css'; // Import the CSS file
import { Link } from 'react-router-dom';
import ipaddress from '../../../port';

const Seats = () => {
  const [seats, setSeats] = useState([]);

  useEffect(() => {
    const fetchAllSeats = async () => {
      try {
        const res = await axios.get(`http://${ipaddress}/seat`);
        setSeats(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllSeats();
  }, []);

  const handleDelete = async (id)=>{
    try{
      await axios.delete(`http://${ipaddress}/seat/`+id);
      window.location.reload()
    }catch(err){
      console.log(err);
    }
  }

  return (
    <div>
      <h1>Seats</h1>
      <table className='seats-table'>
        <thead>
          <tr>
            <th>Seat Column</th>
            <th>Seat Year</th>
          </tr>
        </thead>
        <tbody>
  {seats.map(seat => (
    <tr key={seat.id}>
      <td>{seat.seatcol}</td>
      <td>{seat.year}</td>
      <td> {/* Wrap the buttons in a <td> */}
        <button className='delete' onClick={() => handleDelete(seat.id)}>Delete</button>
        <button className='update'><Link to={`/update/${seat.id}`}>Update</Link></button>
      </td>
    </tr>
  ))}
</tbody>

      </table>
      <button><Link to="/add">Add seats</Link></button>
    </div>
  );
};

export default Seats;
