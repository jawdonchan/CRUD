import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from "./navigationbar";
const Home = () => {
  const [selectedOption, setSelectedOption] = useState('default'); // Default CSS style option

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <Navbar></Navbar>
      <h1>Welcome to the Home Page</h1>
      <label>Select a CSS Style:</label>
      <select value={selectedOption} onChange={handleOptionChange}>
        <option value="default">Default</option>
        <option value="style1">Style 1</option>
        <option value="style2">Style 2</option>
        {/* Add more style options here */}
      </select>
      <Link to={`/FilterPage?style=${selectedOption}`}>
        <button>Go to Filter Page</button>
      </Link>
    </div>
  );
};

export default Home;
