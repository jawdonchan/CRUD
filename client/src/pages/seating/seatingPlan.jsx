import React, { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Navbar from '../navigationbar';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Popover from '@mui/material/Popover';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';



const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Seating() {
  const [rows, setRows] = useState('');
  const [columns, setColumns] = useState('');
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [categoryRange, setCategoryRange] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSeatModalOpen, setIsSeatModalOpen] = useState(false);
  const [color, setColor] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [fabAnchorEl, setFabAnchorEl] = useState(null);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [editCategoryIndex, setEditCategoryIndex] = useState(-1);
  const [editCategoryName, setEditCategoryName] = useState('');
  const [selectedSeat, setSelectedSeat] = useState(null); // New state for selected seat
  const [adminNumber, setAdminNumber] = useState(''); // State to store admin number
  const [save,setsave]= useState({
    name:'',
    rowxcol:''
  });

  const handleClick = () => {
    setOpen(true);
  };
  const location = useLocation();
  const eventid = location.pathname.split("/")[2];
  const usedeventid = location.pathname.split("/")[3];
  
  const handleAnnotate = (id) =>{
    console.log("id" + id);
    const newid = "ann"+id;
    document.getElementById(newid).style.backgroundColor = "red";
  }

  useEffect(() => {
    // console.log(usedeventid);
    // console.log("eventid"+eventid);

    if(eventid == "undefined")
    {
      console.log("undefined");
      document.getElementById("plusbutton").style.display = "none";

    }
    else{

    }
    const fetchS = async () => {
      if (usedeventid !== undefined) {
        try {
          const data = await axios.get(`http://localhost:8800/eventsearch/${usedeventid}`);
          const rowncol = data.data[0].rowxcol.split(',');
          console.log("row" + rowncol[0]);
          setRows(rowncol[0]);
          setColumns(rowncol[1]);
        } catch (err) {
          console.log(err);
        }
  
        try {
          const category = await axios.get(`http://localhost:8800/seatingcategory/${usedeventid}`);
          console.log(category.data);
  
          // Accumulate new categories in a temporary array
          const newCategories = category.data.map(item => ({
            name: item.name,
            range: item.rowxcol,
            color: item.color
          }));
          
          for(let i = 0 ; i < category.data.length;i++)
          {
            console.log(category.data[i]);
            const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWHXYZ';
            const index1ST = alphabet.indexOf( category.data[i].rowxcol.split(',')[1]);
            const index2ND = alphabet.indexOf( category.data[i].rowxcol.split(',')[3]);
            console.log(index1ST);
            console.log(index2ND);
            for(let g = category.data[i].rowxcol.split(',')[0] ;g <= category.data[i].rowxcol.split(',')[2];g++ )
            {
              // console.log("for loop 1 "+newCategory.range.split(',')[0]);
              for(let k = index1ST ; k < index2ND+1; k++)
              {
                // console.log(i+k);
                let id = g+""+alphabet[k];
                console.log(id);
                document.getElementById(id).style.backgroundColor = category.data[i].color;
         
              }
              
            }
          }
  
          // Update the state once with all new categories
          setCategories([...categories, ...newCategories]);
        } catch (err) {
          console.log(err);
        }
      }
    };
  
    fetchS();
  }, []); // Ensure categories is in the dependency array if it's used in the useEffect
  
  

  const defaultCategoryColor = 'gray'; // You can choose the desired default color


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

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

  const handleSeatModalClose = () => {
    setIsSeatModalOpen(false);
  }

  const handleOpenSeat = (seatId) => {
    setSelectedSeat(seatId); // Set the selected seat
    setIsSeatModalOpen(true);
  }

  const handleFabClick = (event) => {
    setFabAnchorEl(event.currentTarget);
    setIsOptionsOpen(true);
  };

  const handleOptionsClose = () => {
    setFabAnchorEl(null);
    setIsOptionsOpen(false);
  };

  const handleEditCategory = (index) => {
    setEditCategoryIndex(index);
    setEditCategoryName(categories[index].name);
    setIsModalOpen(true);
  };
  const handleUpdateCategory = () => {
    if (editCategoryIndex !== -1) {
      const updatedCategories = [...categories];
      updatedCategories[editCategoryIndex].name = editCategoryName;
      setCategories(updatedCategories);
    }
    setIsModalOpen(false);
  };
  const handleRemoveCategory = (index) => {
    if (index >= 0 && index < categories.length) {
      const updatedCategories = [...categories];
      const removedCategory = updatedCategories.splice(index, 1)[0]; // Remove the category
      console.log("removed : "+removedCategory.range);
      // Check if the removed category has the 'range' property
      if (removedCategory.range != null) {
        console.log("removing");
        // Reset the color for the category divs to the default color
        let removedrange = removedCategory.range.split(',');
        console.log(removedrange);
          const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWHXYZ';
          const index1ST = alphabet.indexOf(removedrange[1]);
          const index2ND = alphabet.indexOf(removedrange[3]);
  
          for(let i = removedCategory.range.split(',')[0] ; i <= removedCategory.range.split(',')[2];i++ )
          {
            console.log("for loop 1 "+removedCategory.range.split(',')[0]);
            for(let k = index1ST ; k < index2ND+1; k++)
            {
              // console.log(i+k);
              let id = i+alphabet[k];
              console.log(id);
              document.getElementById(i+alphabet[k]).style.backgroundColor = "gray";
       
            }
            
          }
        
      }
  
      setCategories(updatedCategories);
      setEditCategoryIndex(-1); // Reset the edit state
    }
  };
  
  const handleAdminNumberSubmit = () => {
    // Handle the admin number here
    console.log('Admin Number:', adminNumber);
    // Reset the state and close the modal
    setAdminNumber('');
    setIsSeatModalOpen(false);
  }

  const handleGuestClick = () => {
    // Handle the first option - Open in a new tab
    window.open('/guest', '_blank',);
    handleOptionsClose();
  };
  const handleAddSeating = async () =>{
    console.log(categories);    
    console.log(categories.length);  
    try {      
      // let rowxcol = rows+","+columns;
      // console.log(rowxcol);
      const res2= await axios.put(`http://localhost:8800/seating/${eventid}/${rows}/${columns}`);
      console.log(res2);

        if(eventid == usedeventid)
        {        
          const deletecat = await axios.delete(`http://localhost:8800/seat/${eventid}`);
          console.log(deletecat);      
          for(let i = 0 ; i < categories.length; i++)
      {         
         console.log(categories[i]);

          const res= await axios.post(`http://localhost:8800/addseat/${eventid}`,categories[i]);
      console.log(res);
      }
        }
        else{
          for(let i = 0 ; i < categories.length; i++)
          {
          const res= await axios.post(`http://localhost:8800/addseat/${eventid}`,categories[i]);
        console.log(res);
        }
        }
        }
    
      
    
    catch(err){

    }
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
       let id = i+""+alphabet[k];
       // console.log(id);
       document.getElementById(id).style.backgroundColor = newCategory.color;

     }
     
   }
   
  
  //  setCategories([...categories, newCategory]);
  //  setColor([...color,newCategory.color]);
  //  setIsModalOpen(false);
    setCategories([...categories, newCategory]);
    setColor([...color, newCategory.color]);
    setIsModalOpen(false);
  };

  const getCategoryAnnotations = () => {
    return categories.map((category, index) => (
      <div key={`annotation-${index}`} className="category-annotation">
        <Stack
        direction="column"
        alignContent='center'
        justifyContent='center'
        
        >
          <Stack direction='row' alignItems='center' justifyContent='center'><div
          className="annotation"
          style={{ backgroundColor: category.color }}
          onClick={() => handleEditCategory(index)} // Edit category when clicked
        ></div></Stack>
        
        {`${category.name}`}
        <Button className='remove'
          onClick={() => handleRemoveCategory(index)} // Remove category when clicked
        >
          Remove
        </Button>
        </Stack>

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
          onClick={()=> handleAnnotate(j+1+String.fromCharCode(65+i))}
            // onClick={() => handleOpenSeat(`${j + 1}${String.fromCharCode(65 + i)}`)}
            key={`seat-${divKey}`}
            className="seat"
            id={`${j + 1}${String.fromCharCode(65 + i)}`}
            style={{ backgroundColor }}
          >
            {`${j + 1}${String.fromCharCode(65 + i)}`}
            <div className = "annotatediv"id = {`ann${j+1}${String.fromCharCode(65+i)}`} ></div>
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
        <div>Seating plan:</div><br></br>
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
        <div id = "plusbutton">
          <Fab
            className="floating"
            size="medium"
            color="primary"
            aria-label="add"
            onClick={handleFabClick}
          >
            <AddIcon />
          </Fab>

          <Popover
            open={isOptionsOpen}
            anchorEl={fabAnchorEl}
            onClose={handleOptionsClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <List>
              <ListItem button onClick={handleGuestClick}>
                <ListItemText primary="Qr scanner" />
              </ListItem>
              <ListItem button id = "savebtn"  onClick={handleAddSeating}>
                <ListItemText primary="Save" />
              </ListItem>


            </List>
          </Popover>
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

        {/* Modal for admin number */}
        <Modal open={isSeatModalOpen} onClose={handleSeatModalClose}>
          <div className="modal">
            <h2>Admin Number</h2>
            <TextField
              label="Admin Number"
              value={adminNumber}
              onChange={(e) => setAdminNumber(e.target.value)}
              variant="outlined"
            />
            <Button onClick={handleAdminNumberSubmit}>Submit</Button>
          </div>
        </Modal>

        <style>
          {`
          .annotatediv{
            width:5px;
            height:5px;
            border-radius:5px;
            z-index:2;
            position:relative;
            right:1vw;
            top:1vh;
          }
          .seating-plan{
            overflow:scroll;
            height:50vh;
            width:95vw;
          }
          .floating{
            position:fixed;
            bottom:60px;
            right:60px;
          }
          .category-annotations {
            display: flex;
            justify-content: center;
            gap: 15px;
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
            width: 35px;
            height: 35px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            cursor: pointer;
          }

          .annotation {
            width: 20px;
            height: 20px;
            border-radius: 50%;
          }

          .remove{
            fontsize:10;
          }
        `}
        </style>
      </div>
    </div>
  );
}
