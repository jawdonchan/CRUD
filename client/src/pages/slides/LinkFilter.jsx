import React, { useState } from 'react';
import { Link , useLocation} from 'react-router-dom';
import Navbar from "../navigationbar";

const Home = () => {
  const [selectedOption, setSelectedOption] = useState('default'); // Default CSS style option

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const location = useLocation();
  const eventId = location.pathname.split("/")[2];
  const handleGoToFilterPage = () => {
    // Get the event ID from the URL parameters
   

    // Store the event ID in session storage
    if (eventId) {
      sessionStorage.setItem('eventId', eventId);
    } else {
      console.error('Event ID not found in URL parameters.');
    }
  };

  return (
    <div>
      <Navbar></Navbar>
      <h1>Link Filter Page</h1>
      <label>Select a CSS Style:</label>
      <select value={selectedOption} onChange={handleOptionChange}>
        <option value="default">Default</option>
        <option value="style1">Style 1</option>
        <option value="style2">Style 2</option>
        {/* Add more style options here */}
      </select>
      {/* Add onClick handler to store the event ID in session storage before navigating */}
      <Link to={`/FilterPage?style=${selectedOption}`} onClick={handleGoToFilterPage}>
        <button>Go to Filter Page</button>
      </Link>
    </div>
  );
};

export default Home;
