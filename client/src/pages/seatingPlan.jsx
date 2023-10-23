import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Navbar from './navigationbar';

export default function Seating() {
  const [rows, setRows] = useState('');
  const [columns, setColumns] = useState('');
  const [categories, setCategories] = useState('');

  const handleRowsChange = (event) => {
    setRows(event.target.value);
  };

  const handleColumnsChange = (event) => {
    setColumns(event.target.value);
  };

  const handleCategoriesChange = (event) => {
    // Split the input into categories
    const categoriesInput = event.target.value;
    const categoriesArray = categoriesInput.split(',').map(category => category.trim());
  
    // Ensure a maximum of 3 categories
    const categories = categoriesArray.slice(0, 3).join(', '); // Take the first 3 categories
  
    setCategories(categories);
  };
  
  const createSeatingPlan = () => {
    const seatingPlan = [];
    const categoryList = categories.split(',').map(category => category.trim());
    const columnsPerCategory = Math.floor(parseInt(columns, 10) / categoryList.length);

    for (let i = 0; i < parseInt(columns, 10); i++) {
      const column = [];
      const categoryIndex = Math.floor(i / columnsPerCategory) % categoryList.length;
      const category = categoryList[categoryIndex];
      for (let j = 0; j < parseInt(rows, 10); j++) {
        column.push(
          <div
            key={`seat-${j}-${i}`}
            className="seat"
            style={{ backgroundColor: getCategoryColor(categoryIndex, categoryList.length) }}
          >
            {`${j + 1}${String.fromCharCode(65 + i)}`}
            <div className="annotation" style={{ backgroundColor: getCategoryColor(categoryIndex, categoryList.length) }}></div>
          </div>
        );
      }
      seatingPlan.push(
        <div key={`column-${i}`} className="column">
          {column}
        </div>
      );
    }
    return seatingPlan;
  };

  const getCategoryColor = (index, totalCategories) => {
    const hue = (360 / totalCategories) * index;
    return `hsl(${hue}, 70%, 70%)`; // Generates a color based on hue
  };

  const getCategoryAnnotations = (categoryList) => {
    return categoryList.map((category, index) => (
      <div key={`annotation-${index}`} className="category-annotation">
        <div className="annotation" style={{ backgroundColor: getCategoryColor(index, categoryList.length) }}></div>
        {`${category}`}
      </div>
    ));
  };

  return (
    <div>
      <Navbar></Navbar>
         <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
      
      <div>Seating plan:</div>
      <Stack direction="row" spacing={2} justifyContent="center">
        <TextField
          id="outlined-basic-rows"
          label="Rows"
          variant="outlined"
          value={rows}
          onChange={handleRowsChange}
        />
        <Stack
        direction="column"
        justifyContent="center"
        >
          <div>&times;</div>
        </Stack>
        <TextField
          id="outlined-basic-columns"
          label="Columns"
          variant="outlined"
          value={columns}
          onChange={handleColumnsChange}
        />
        <Stack
        direction="column"
        justifyContent="center"
        >        
        <div>Categories</div>
        </Stack>
        <TextField
          id="outlined-basic-categories"
          label="Categories"
          variant="outlined"
          value={categories}
          onChange={handleCategoriesChange}
        />
      </Stack>
      <div>
        Total Seats: {parseInt(rows) * parseInt(columns)}
      </div>
      <div className="category-annotations">
        {getCategoryAnnotations(categories.split(',').map(category => category.trim()))}
      </div>
      <div className="seating-plan">
        {createSeatingPlan()}
      </div>
      <style>
        {`
          .category-annotations {
            display: flex;
            justify-content: center;
          }

          .seating-plan {
            display: flex;
            margin-top: 20px;
            justify-content: center;
          }

          .column {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-right: 20px; /* Add space between columns */
          }

          .seat {
            width: 80px;
            height: 80px;
            background-color: #ccc;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
          }

          .annotation {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            position: absolute;
            bottom: 5px;
            right: 5px;
          }
        `}
      </style>
    </div>
    </div>
 
  );
}
