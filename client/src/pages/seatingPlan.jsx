import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Navbar from './navigationbar';

export default function Seating() {
  const [rows, setRows] = useState('');
  const [columns, setColumns] = useState('');
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [categoryRange, setCategoryRange] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const[color,setColor] = useState([]);

  const handleRowsChange = (event) => {
    setRows(event.target.value);
  };

  const handleColumnsChange = (event) => {
    setColumns(event.target.value);
  };

  const handleAddCategory = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };
    

  

  const handleModalSave = () => {
    const newCategory = {
       name: categoryName,
       range: categoryRange,
       color: getRandomColor(),
    };
    console.log(newCategory);
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWHXYZ';
    const index1ST = alphabet.indexOf( newCategory.range.split(',')[1]);
    const index2ND = alphabet.indexOf( newCategory.range.split(',')[3]);

    console.log(index2ND);

    // Update the color of the divs inside the category range labeled A1 to A3
    for(let i = newCategory.range.split(',')[0] ; i <= newCategory.range.split(',')[2];i++ )
    {
      console.log("for loop 1 "+newCategory.range.split(',')[0]);
      for(let k = index1ST ; k < index2ND+1; k++)
      {
        // console.log(i+k);
        let id = i+alphabet[k];
        // console.log(id);
        document.getElementById(i+alphabet[k]).style.backgroundColor = newCategory.color;

      }
      
    }
   
    setCategories([...categories, newCategory]);
    setColor([...color,newCategory.color]);
    setIsModalOpen(false);
   };

   const getCategoryAnnotations = () => {
    return categories.map((category, index) => (
      <div key={`annotation-${index}`} className="category-annotation">
        <div className="annotation" style={{ backgroundColor: category.color}}></div>
        {`${category.name}`}
      </div>
    ));
  };
  

  const createSeatingPlan = () => {
    const seatingPlan = [];
    for (let i = 0; i < parseInt(columns, 10); i++) {
      const column = [];
      for (let j = 0; j < parseInt(rows, 10); j++) {
        const divKey = `${j}-${i}`;
        // const backgroundColor = getDivColor(divKey);
        const backgroundColor = "gray";
        column.push(
          <div
            key={`seat-${divKey}`}
            className="seat"
            id={`${j + 1}${String.fromCharCode(65 + i)}`}
            style={{ backgroundColor }}
          >
            {`${j + 1}${String.fromCharCode(65 + i)}`}
            {/* <div className="annotation" style={{ backgroundColor }}></div> */}
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


  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    console.log(color);
    return color;
  };

  return (
    <div>
      <Navbar></Navbar>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
        <div>Seating plan:</div>
        <Stack direction="row" spacing={2} justifyContent="center">
          {/* Rows and Columns input fields */}
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
          <div>
            <Button onClick={handleAddCategory}>+</Button>
          </div>
        </Stack>

        {/* Total Seats and Category Annotations */}
        <div>
          Total Seats: {parseInt(rows) * parseInt(columns)}
        </div>
        <div className="category-annotations">
          {getCategoryAnnotations()}
        </div>
        <div className="seating-plan">
          {createSeatingPlan()}
        </div>

        {/* Modal for adding categories */}
        <Modal open={isModalOpen} onClose={handleModalClose}>
          <div className="modal">
            <h2>Add Category</h2>
            <TextField
              label="Category Name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              variant="outlined"
            />
            <TextField
              label="Range (e.g., 1,A,3,C)"
              value={categoryRange}
              onChange={(e) => setCategoryRange(e.target.value)}
              variant="outlined"
            />
            <Button onClick={handleModalSave}>Save</Button>
          </div>
        </Modal>

        <style>
          {`
            .category-annotations {
              display: flex;
              justify-content: center;
              gap:15px;
            }

            .seating-plan {
              display: flex;
              margin-top: 20px;
              justify-content: center;
            }

            .modal {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              background-color: white;
              padding: 20px;
            }

            .modal h2 {
              margin: 0;
            }

            /* Styling for seats and annotations */
            .column {
              display: flex;
              flex-direction: column;
              align-items: center;
              margin-right: 20px; /* Add space between columns */
            }

            .seat {
              width: 80px;
              height: 80px;
              display: flex;
              align-items: center;
              justify-content: center;
              position: relative;
            }

            .annotation {
              width: 20px;
              height: 20px;
              border-radius: 50%;

            }
          `}
        </style>
      </div>
    </div>
  );
}
