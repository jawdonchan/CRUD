import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/seats.css'; // Import the CSS file
import { Link } from 'react-router-dom';

const Seats = () => {
  const [seats, setSeats] = useState([]);

  useEffect(() => {
    const fetchAllSeats = async () => {
      try {
        const res = await axios.get("http://localhost:8800/seat");
        setSeats(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllSeats();
  }, []);

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
            </tr>
          ))}
        </tbody>
      </table>
      <button><Link to="/add">Add seats</Link></button>
    </div>
  );
};

export default Seats;
