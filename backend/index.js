import express from "express"
import mysql from "mysql"
import cors from "cors"
import multer from 'multer';
import { read, utils } from 'xlsx';
import dotenv from "dotenv"; // Import dotenv
import XLSX from 'xlsx';
import fs from 'fs';
import ExcelJS from 'exceljs';
import XlsxPopulate from 'xlsx-populate';
// Load environment variables from .env
dotenv.config();

const app = express();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT
});

// if there is an auth problem
// alter user 'root'@'localhost' identified with mysql_native_password by '';


app.use(express.json())
app.use(cors())

const storage = multer.memoryStorage();
const upload = multer({ storage });

function parseExcelFile(fileBuffer) {
  try {
    const workbook = read(fileBuffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    const data = utils.sheet_to_json(worksheet);
    return data;
  } catch (error) {
    console.error('Error parsing Excel file:', error);
    throw new Error('Error parsing Excel file');
  }
}

app.get("/", (req,res)=>{
    res.json("hello this is the backend")
})

app.get("/seat", (req,res)=>{
    const q = "SELECT * from seating"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

// app.post('/upload', upload.single('file'), (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ message: 'No file provided' });
//   }

//   try {
//     const fileData = req.file.buffer;
//     const data = parseExcelFile(fileData);

//     res.json(data);
//   } catch (error) {
//     return res.status(500).json({ message: 'Error parsing Excel file' });
//   }
// });

app.post('/upload/:id', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file provided' });
  }
  let id = req.params.id;


  try {
    const fileData = req.file.buffer;
    const data = parseExcelFile(fileData);

    // Define the SQL query with parameter placeholders
    const q = "INSERT INTO students (`Stage`, `Award`, `FlipFlop`, `AdmNo`, `FullName`, `TutGrp`, `Status`, `Top`, `Event`) VALUES ?";

    // Prepare the data for insertion with empty values replaced by null
    const values = data.map((item) => [
      item.Stage,
      item.Award,
      item.FlipFlop,
      item.AdmNo,
      item.FullName,
      item.TutGrp,
      item.Status,
      // item.Attendance || null,
      item.Top,
      id,
      // item.Event || null
    ]);
    
    db.query(q, [values], (err, result) => {
      if (err) {
        console.error('Error inserting data:', err);
        return res.status(500).json({ message: 'Error inserting data' });
      }
     
      console.log('Data inserted into "students" table successfully');
      res.json({ message: 'Data inserted into "students" table successfully' });
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error parsing Excel file' });
  }
});

// Export data with specific column names
app.get('/export-students-excel', (req, res) => {
  // Define your SQL query to fetch student data
  const q = 'SELECT Stage, Award, FlipFlop, AdmNo, FullName, TutGrp, Status, Top, Event FROM students';

  // Execute the query to fetch the data from the students table
  db.query(q, (err, data) => {
    if (err) {
      console.error('Error fetching student data:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    try {
      // Create a new Excel workbook
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Students Data');

      // Add header row
      worksheet.addRow(['Stage', 'Award', 'FlipFlop', 'AdmNo', 'FullName', 'TutGrp', 'Status', 'Top', 'Event']);

      // Add student data rows
      data.forEach(row => {
        worksheet.addRow([row.Stage, row.Award, row.FlipFlop, row.AdmNo, row.FullName, row.TutGrp, row.Status, row.Top, row.Event]);
      });

      // Create a buffer to store the Excel file
      workbook.xlsx.writeBuffer()
        .then(buffer => {
          // Set response headers for Excel file download
          res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
          res.setHeader('Content-Disposition', 'attachment; filename=students-export.xlsx');

          // Send the Excel file to the client
          res.end(buffer);
        })
        .catch(error => {
          console.error('Error generating Excel file:', error);
          return res.status(500).json({ error: 'Error generating Excel file' });
        });
    } catch (error) {
      console.error('Error generating Excel file:', error);
      return res.status(500).json({ error: 'Error generating Excel file' });
    }
  });
});

app.get('/export-sample-excel', (req, res) => {
  // Sample data
  const sampleData = [
    { Stage: 'A1', Award: 'B1', FlipFlop: 'C1', AdmNo: 'D1', FullName: 'E1', TutGrp: 'F1', Status: 'G1', Top: 'H1', Event: 'I1' },
    { Stage: 'A2', Award: 'B2', FlipFlop: 'C2', AdmNo: 'D2', FullName: 'E2', TutGrp: 'F2', Status: 'G2', Top: 'H2', Event: 'I2' },
    { Stage: 'A3', Award: 'B3', FlipFlop: 'C3', AdmNo: 'D3', FullName: 'E3', TutGrp: 'F3', Status: 'G3', Top: 'H3', Event: 'I3' },
    // Add more sample data as needed
  ];

  try {
    // Create a new Excel workbook
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sample Data');

    // Add header row
    worksheet.addRow(['Stage', 'Award', 'FlipFlop', 'AdmNo', 'FullName', 'TutGrp', 'Status', 'Top', 'Event']);

    // Add sample data rows
    sampleData.forEach(row => {
      worksheet.addRow([row.Stage, row.Award, row.FlipFlop, row.AdmNo, row.FullName, row.TutGrp, row.Status, row.Top, row.Event]);
    });

    // Create a buffer to store the Excel file
    workbook.xlsx.writeBuffer()
      .then(buffer => {
        // Set response headers for Excel file download
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=sample-data-export.xlsx');

        // Send the Excel file to the client
        res.end(buffer);
      })
      .catch(error => {
        console.error('Error generating Excel file:', error);
        return res.status(500).json({ error: 'Error generating Excel file' });
      });
  } catch (error) {
    console.error('Error generating Excel file:', error);
    return res.status(500).json({ error: 'Error generating Excel file' });
  }
});
// app.post("/seat", (req,res)=>{
//     const q = "INSERT INTO seating (`seatcol`,`year`) values (?,?)";
//     const values = [req.body.seatcol, req.body.year];

//     db.query(q,[values], (err,data)=>{
//         if(err) return res.json(err)
//         return res.json("Seats has been added!")
//     })
// })

app.get("/studentsfilter/:id/:id2", (req,res) => {
  let id = req.params.id;
  let id2 = req.params.id2;
  console.log(id);
  if(id == "all")
  {
    const q = `Select * from students where Event = `+ id2;

    db.query(q, (err,data)=>{
      if(err) return res.json(err)
      return res.json(data)
  })
  }
  else if(id=="top"){
    const q = `Select * from students where Top = 'Top' and Event = `+id2;

    db.query(q, (err,data)=>{
      if(err) return res.json(err)
      return res.json(data)
  })
  }
  else{
    const q  = `Select * from students where Award like "${id}" and Event = `+ id2;
    db.query(q, (err,data)=>{
              if(err) return res.json(err)
              return res.json(data)
          })
  }
//   else if (id == "Directorlist")
//   {

//       const q = "Select * from students where Award like 'Director List%'";
//       db.query(q, (err,data)=>{
//         if(err) return res.json(err)
//         return res.json(data)
//     })
//   }
//   else if (id == "Goodprogress")
//   {
//     const q = "Select * from students where Award = 'Good Progress'";
//     db.query(q, (err,data)=>{
//       if(err) return res.json(err)
//       return res.json(data)
//   })
//   }
  
})

app.get("/student/:id", (req,res)=>{
    const eventid = req.params.id;
    const q = "SELECT * from students where Event = "+eventid;
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})
app.get("/studentawardfilter/:id",(req,res)=>
{
  const eventid = req.params.id;
  const q  = "SELECT DISTINCT Award from Students where Event = "+eventid;
  db.query(q,(err,data)=>{
    if(err) return res.json(err)
    return res.json(data)
  })
})
//khai chers student list
app.get("/students", (req,res)=>{
    const q = "SELECT * from students"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.get("/user",(req,res)=>{
  const q  = "Select * from users"
  db.query(q,(err,data)=>{
    if(err) return res.json(res)
    return res.json(data)
  })
})

// app.delete("/seat/:id", (req,res)=>{
//     const seatId = req.params.id;
//     const q = "DELETE from seating where id = ?"

//     db.query(q,[seatId], (err,data)=>{
//         if(err) return res.json(err)
//         return res.json("Seats has been deleted!");
//     })
// })

// app.put("/seat/:id", (req, res) => {
//     const seatId = req.params.id;
//     const q = "UPDATE seating SET seatcol = IFNULL(?, seatcol), year = IF (ISNULL(?), NULL, year) WHERE id = ?";
  
//     const values = [req.body.seatcol, req.body.year];
  
//     db.query(q, [...values, seatId], (err, data) => {
//       if (err) return res.json(err);
//       return res.json("Seats have been updated!");
//     });
//   });
  
//updating student details
app.put('/updateStudent/:id', (req, res) => {
    const studentId = req.params.id;
    const { Award, Status, Attendance } = req.body;

    // Define the SQL query to update student information with IFNULL
    const updateQuery = `UPDATE students
                          SET
                            Award = IFNULL(?, Award),
                            Status = IFNULL(?, Status),
                            Attendance = IFNULL(?, Attendance)
                          WHERE id = ?`;

    const values = [Award, Status, Attendance, studentId];

    db.query(updateQuery, values, (err, data) => {
      if (err) {
        console.error('Error updating student:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      return res.json('Student has been updated!');
    });
});

app.listen(8800, () => {
    console.log("connected to crud app!");
});





app.get("/accounts",(req,res)=> {
  const q = "select id,username,role from users where username != 'admin'"
  db.query(q,(err,data) => {
    if(err) {
      console.log(err);
      return res.json(err);
    }
    else{
      console.log(data);
      return res.json(data)
    }
  })
})





app.post("/addaccount", (req,res)=>{
  const q = "INSERT INTO users (username,password,role) values (?)";
  const values = [req.body.username, req.body.password,req.body.role];

  db.query(q,[values], (err,data)=>{
      if(err) 
      {return res.json(err)}
      else{
        return res.json("User has been added!")

      }
  })
})




app.put('/updateUser/:id', (req, res) => {
  const userID = req.params.id;
  const { username, password, role } = req.body;

  // Define the SQL query to update student information with IFNULL
  const updateQuery = `UPDATE users
                        SET
                          username = IFNULL(?, username),
                          password = IFNULL(?, password),
                          role = IFNULL(?, role)
                        WHERE idaccounts = ?`;

  const values = [username, password, role, userID];

  db.query(updateQuery, values, (err, data) => {
    if (err) {
      console.error('Error updating User:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    return res.json('User has been updated!');
  });
});

app.delete("/deleteUser/:id", (req,res)=>{
  const seatId = req.params.id;
  const q = "DELETE from users where idaccounts = ?"

  db.query(q,[seatId], (err,data)=>{
      if(err) return res.json(err)
      return res.json("Account has been deleted!");
  })
})


//liheng - qr scanner
app.put("/attendance/:id", (req, res) => {
    const adminNo = req.params.id;
    const q = `UPDATE students SET Attendance = 'yes' WHERE AdmNo = '${adminNo}'`;
    const completeQuery = q; // No need to replace '?' in this case

    // Log the complete SQL query
    console.log("Complete SQL Query:", completeQuery);

    // Execute the database query
    db.query(q, (err, data) => {
        if (err) {
            console.log(err);
            return res.json(err);
        } else {
            // Log the query result and return a response
            console.log(data);
            return res.json("Your attendance has been updated");
        }
    });
});
// Login endpoint
app.post("/api/login", (req, res) => {
    const { username, password } = req.body;
    const sql = "SELECT * FROM users WHERE username = ? AND password = ?";
    db.query(sql, [username, password], (err, results) => {
      if (err) {
        res.status(500).json({ message: "Database error" });
      } else if (results.length > 0) {
        res.json({ message: "Login successful" });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    });
  });
  
//qr inserting 2 tables
// app.post('/insertStudent', (req, res) => {
//     const { adminNo } = req.body;
   
//     //checking if adminNo starts with '21'
    

//     // Define the SQL query to insert a new student's admin number
//     const insertQuery = 'INSERT INTO display (student) VALUES (?)';
  
//     const values = [adminNo];
  
//     db.query(insertQuery, values, (err, data) => {
//       if (err) {
//         console.error('Error inserting student:', err);
//         return res.status(500).json({ error: 'Internal server error' });
//       }
//       return res.json('Student has been inserted!');
//     });
//   });

// app.post('/insertStudent', (req, res) => {
//     const { adminNo } = req.body;
//     const { event } = req.body;
//     // const firstTwoDigits = adminNo.slice(1, 3);
//     // // Check the value of the student column added
//     // let year = '';
//     // if (firstTwoDigits === '21') {
//     //     year = 'year 1';
//     // } else if (firstTwoDigits === '22') {
//     //     year = 'year 2';
//     // } else if (firstTwoDigits === '23') {
//     //     year = 'year 3';
//     // }

//     // Define the SQL query to insert a new student's admin number and year
//     const insertQuery = 'INSERT INTO emcee (AdmNo, Event) VALUES (?, ?)';

//     const values = [adminNo, event];

//     db.query(insertQuery, values, (err, data) => {
//         if (err) {
//             console.error('Error inserting student:', err);
//             return res.status(500).json({ error: 'Internal server error' });
//         }
//         return res.json('Student has been inserted!');
//     });
// });

app.post('/insertStudent/:eventId', (req, res) => {
  const { adminNo } = req.body;
  const { eventId } = req.params;

  // Check if the AdmNo already exists
  const checkQuery = 'SELECT COUNT(*) AS count FROM emcee WHERE AdmNo = ?';
  const checkValues = [adminNo];

  db.query(checkQuery, checkValues, (checkErr, checkResults) => {
    if (checkErr) {
      console.error('Error checking AdmNo:', checkErr);
      return res.status(500).json({ error: 'Internal server error' });
    }

    const rowCount = checkResults[0].count;

    // If AdmNo exists, send a response indicating that the student is already registered
    if (rowCount > 0) {
      return res.json('Student already exists for this event.');
    }

    // AdmNo doesn't exist, proceed to insert
    const insertQuery =
      'INSERT INTO emcee (AdmNo, Event) VALUES (?, ?)';
    const insertValues = [adminNo, eventId];

    db.query(insertQuery, insertValues, (insertErr, insertData) => {
      if (insertErr) {
        console.error('Error inserting student:', insertErr);
        return res.status(500).json({ error: 'Internal server error' });
      }

      return res.json('Student has been inserted!');
    });
  });
});


  
  app.post('/insertSeatcol', (req, res) => {
    const { adminNo } = req.body;
  
    // Define the SQL query to insert a new seatcol record with student's admin number
    const insertQuery = 'INSERT INTO seating (seatcol) VALUES (?)';
  
    const values = [adminNo];
  
    db.query(insertQuery, values, (err, data) => {
      if (err) {
        console.error('Error inserting seatcol data:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      return res.json('Seatcol data has been inserted!');
    });
  });
  
  app.get("/events",(req,res)=>{
    const q = "Select * from event";
    db.query(q,(err,data)=>{
      if(err){
        res.json(err);
      }
      else{
        return res.json(data);
      }
    })
  });
  app.post("/addEvent", (req,res)=>{
    const q = "INSERT INTO Event (name,location,date,time) values (?)";
    const values = [req.body.name, req.body.location,req.body.date,req.body.time];
    
    db.query(q,[values], (err,data)=>{
        if(err) 
        {return res.json(err)}
        else{
          console.log(data);
          return res.json("Event has been added!")
  
        }
    })
  })

  app.delete("/deleteEvent/:id", (req,res)=>{
    const eventid = req.params.id;
    const q = "DELETE from students where Event = ?"
  
    db.query(q,[eventid], (err,data)=>{
        if(err) return res.json(err)
        else 
        {
        const q = " Delete from seating where event = ?"
        db.query(q,[eventid],(err,data)=>{
          if(err) return res.json(err)
          else{
        const q = "Delete from event where id  = ?"
        db.query(q,[eventid], (err,data)=>{
          if(err) return res.json(err)
          else 
          {
            return res.json("Event has been deleted!");
          }
        })

        }
        })
        
        }
    })
  })


  app.put("/seating/:id/:row/:col" ,(req,res)=>{
    const eventid = req.params.id;
    const rowxcol = req.params.row+","+req.params.col;
    const q = `UPDATE event SET rowxcol = '${rowxcol}' WHERE id = `+eventid;
    console.log(q);
    db.query(q,(err,data)=>{
      if(err) return res.json(err)
      else return res.json("Event has been updated")
    })
  })

  app.post("/addseat/:id",(req,res)=>{
    const eventid = req.params.id;

    // const values = [req.body.name,req.body.range,eventid,req.body.color];
    // console.log(values);
    const q = `INSERT INTO seating (name, rowxcol, event, color) VALUES ('${req.body.name}','${req.body.range}',${eventid},'${req.body.color}')`;
    db.query(q,(err,data)=>{
      console.log(q);
      if(err) return res.json(err)
      else return res.json('Category Added');
    })
  })

  app.get("/seatingsearch/:id",(req,res)=>{
    const eventid = req.params.id;

    const q = "SELECT * FROM seating WHERE event = "+eventid;
    db.query(q,(err,data)=>{
      if(err) return res.json(err);
      else {
        return res.json(data.length);}
    })
  })

  app.get("/searchevent",(req,res)=> {
    const q = "SELECT * FROM event";
    db.query(q,(err,data)=>{
      if(err) return res.json(err);
      else return res.json(data);
    })
  })
  app.get("/searcheventseat",(req,res)=> {
    const q = "SELECT * FROM event where rowxcol is not null";
    db.query(q,(err,data)=>{
      if(err) return res.json(err);
      else return res.json(data);
    })
  })
  app.get("/searchseating",(req,res)=> {
    const q = "SELECT * FROM seating";
    db.query(q,(err,data)=>{
      if(err) return res.json(err);
      else return res.json(data);
    })
  })

  app.get("/eventsearch/:id",(req,res)=>{
    const eventid = req.params.id;

    const q = "SELECT * FROM event WHERE id = "+eventid;
    db.query(q,(err,data)=>{
      if(err) return res.json(err);
      else {
        return res.json(data);
      }
    })
  })