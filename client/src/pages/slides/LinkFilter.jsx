import React, { useState } from 'react';
import { Link , useLocation} from 'react-router-dom';
import Navbar from "../navigationbar";
import '../../css/linkfilter.css';

const Home = () => {
  const [selectedOption, setSelectedOption] = useState('default'); // Default CSS style option

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const location = useLocation();
  const eventId = location.pathname.split("/")[2];
  const handleGoToFilterPage = () => {
    // Get the event ID from the URL parameters
    console.log('Event ID from URL:', eventId);
  
    // Store the event ID in session storage
    if (eventId) {
      sessionStorage.setItem('eventId', eventId);
      console.log('Event ID stored in session storage:', eventId);
    } else {
      console.error('Event ID not found in URL parameters.');
    }
  };
  

  return (
    <div className="link-filter-page">
      <Navbar />
      <div className="link-filter-container">
        <h1>Slides Link Filter</h1>
        <label>Select a CSS Style:</label>
        <select value={selectedOption} onChange={handleOptionChange}>
          <option value="default">Default</option>
          <option value="style1">Top</option>
          <option value="style2">Bottom</option>
          {/* Add more style options here */}
        </select>
        {/* Add onClick handler to store the event ID in session storage before navigating */}
        <br></br>
        <div className='buttoncontainer'>
        <Link to={`/FilterPage?style=${selectedOption}`} onClick={handleGoToFilterPage} className="filter-link">
          Go to Filter Page
        </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
