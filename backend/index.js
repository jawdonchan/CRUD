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
import CanvasRenderService from 'chartjs-node-canvas';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
import google from 'google-auth-library';
import readline from 'readline';
// Load environment variables from .env
dotenv.config();

const app = express();
const port = 8800;
const ip = '0.0.0.0';
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
app.use(bodyParser.json()); // for email server
//chart with excel


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

app.get('/emcee-list', (req,res) => {
  const q = 'Select * from emcee';
  db.query(q,(err,data)=>{
    if(err) return res.json(err)
    return res.json(data)
})
})

// Export data with specific column names
app.get('/export-students-excel/:id', (req, res) => {
  // Define your SQL query to fetch student data
  let id = req.params.id;
  const q = 'SELECT id, Award, AdmNo, FullName, TutGrp, Status, Attendance, Event FROM students where Event = ' + id;

  // Execute the query to fetch the data from the students table
  db.query(q, (err, data) => {
    if (err) {
      console.error('Error fetching student data:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    try {
      // Create a new Excel workbook
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Emcee Data');

      // Add header row
      worksheet.addRow(['id', 'Award' ,'AdmNo', 'FullName', 'TutGrp', 'Status', 'Attendance', 'Event']);

      // Add student data rows
      data.forEach(row => {
        worksheet.addRow([row.id, row.Award ,row.AdmNo, row.FullName, row.TutGrp, row.Status, row.Attendance ,row.Event]);
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
    const worksheet = workbook.addWorksheet('Template');

    // Add header row
    worksheet.addRow(['Stage', 'Award', 'FlipFlop', 'AdmNo', 'FullName', 'TutGrp', 'Status','Attendance', 'Top', 'Event']);

    // Add sample data rows
    // sampleData.forEach(row => {
    //   worksheet.addRow([row.Stage, row.Award, row.FlipFlop, row.AdmNo, row.FullName, row.TutGrp, row.Status, row.Top, row.Event]);
    // });

    // Create a buffer to store the Excel file
    workbook.xlsx.writeBuffer()
      .then(buffer => {
        // Set response headers for Excel file download
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=template-data-upload.xlsx');

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
  // console.log(id);
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
    const q = "SELECT * from students where eve"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

//filter students based on events
app.get("/students/:id", (req,res)=>{
  let studid = req.params.id;
  const q = "SELECT * from students where Event = " + studid + " And Status != 'No' and attendance = 'yes'";
  db.query(q,(err,data)=>{
    console.log("slides");
      if(err) return res.json(err)
      return res.json(data)
  })
})

app.get("/updategetstudents/:id", (req,res)=>{
  let studid = req.params.id;
  const q = "SELECT * from students where id = " + studid;
  db.query(q,(err,data)=>{
    console.log(data);
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
app.get("/userteacher",(req,res)=>{
  const q  = "Select * from users where role != 'Teacher'"
  db.query(q,(err,data)=>{
    if(err) return res.json(res)
    return res.json(data)
  })
})

app.get("/user/:username",(req,res)=>{
  const username = req.params.username;
  const q  = "Select * from users where username like '%" + username +"'";
  db.query(q,(err,data)=>{
    if(err) return res.json(res)
    return res.json(data)
  })
})

app.get("/users/:id", (req,res)=>{
  const userid = req.params.id;
  const q = "select * from users where id = " + userid

  db.query(q, (err,data)=>{
      if(err) return res.json(err)
      return res.json(data);
  })
})

app.delete("/seat/:id", (req,res)=>{
    const seatId = req.params.id;
    const q = "DELETE from seating where event = ?"

    db.query(q,[seatId], (err,data)=>{
        if(err) return res.json(err)
        return res.json("Seats has been deleted!");
    })
})
  
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

// app.listen(3001, ip,() => {
//     console.log("connected to crud app!");
// });


app.listen(port, ip, () => {
  console.log(`Server is running on http://${ip}:${port}`);
});


app.get("/accounts",(req,res)=> {
  const q = "select id,username,role from users where username != 'admin'"
  db.query(q,(err,data) => {
    if(err) {
      console.log(err);
      return res.json(err);
    }
    else{
      // console.log(data);
      return res.json(data)
    }
  })
})

app.get("/accountsadmin",(req,res)=> {
  const q = "select id,username,role from users where username != 'admin' and role != 'admin'"
  db.query(q,(err,data) => {
    if(err) {
      console.log(err);
      return res.json(err);
    }
    else{
      // console.log(data);
      return res.json(data)
    }
  })
})

app.get("/accountsteacher",(req,res)=> {
  const q = "select id,username,role from users where role = 'Student'"
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

app.get("/checkeventcollab/:username/:eventid",(req,res) => {
  const eventid = req.params.eventid;
  const username = req.params.username;

  const q ='select count(*) as count from event_staff inner join users on event_staff.user_id = users.id where  event_staff.event_id = '+ eventid+' and username = "'+ username+ '"';

  db.query(q,(err,data)=>{
    if(err) return res.json(err);
    else{
      return res.json(data);
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
                        WHERE id = ?`;

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
      const user = results[0];
      // Include user information in the response
      res.json({
        message: "Login successful",
        user: {
          id: user.id,
          username: user.username,
          role: user.role,
        },
      });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  });
});


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
  app.post("/addEvent/:username", (req,res)=>{
    const q = "INSERT INTO Event (name,location,date,time) values (?)";
    const values = [req.body.name, req.body.location,req.body.date,req.body.time];
    const username = req.params.username;
    db.query(q,[values], (err,data)=>{
        if(err) 
        {return res.json(err)}
        else{
          console.log(data);
          const q = `SELECT id 
          FROM event 
          WHERE name = '`+req.body.name+`' 
            AND location = '`+req.body.location+`' 
            AND date = '`+req.body.date+`' 
            AND time = '`+req.body.time+`'`
          db.query(q, (e,r) => {
            if(e){
              console.log(e)
            }
            else{
              console.log("this is id")
              console.log(r[0].id)
              let eventid = r[0].id;
              const q = `SELECT id from users WHERE username = '${username}'`;
              db.query(q,(e,r)=>{
                if(e) {return res.json(e)}
                else{
                  const userid = r[0].id;  
                  console.log("this is userid" + userid);
                  const insertq = `INSERT INTO event_staff (event_id, user_id) VALUES (${eventid}, ${userid})`;
                  db.query(insertq,(error,result)=>{
                    if(error) return res.json(err);
                    else{
                      return res.json("inserted event staff");
                    }
                  })

                }
              })
            }
          });
        }
    })
  })


  app.put('/updateEvent/:id', (req, res) => {
    const eventid = req.params.id;
    const { name, location, date,time } = req.body;

    // Define the SQL query to update student information with IFNULL
    const updateQuery = `UPDATE event
                          SET
                            name = IFNULL(?, name),
                            location = IFNULL(?, location),
                            date = IFNULL(?, date),
                            time = IFNULL(?,time)
                          WHERE id = ?`;

    const values = [name, location, date, time,eventid];

    db.query(updateQuery, values, (err, data) => {
      if (err) {
        console.error('Error updating event:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      return res.json('Event has been updated!');
    });
});

  app.delete("/deleteEvent/:id", (req,res)=>{
    const eventid = req.params.id;
    const q = "DELETE from students where Event = ?"
  
    db.query(q,[eventid], (err,data)=>{
        if(err) return res.json(err)
        else 
        {
          console.log("deleted students");
          const q = " Delete from seating where event = ?"
          db.query(q,[eventid],(err,data)=>{
            if(err) return res.json(err)
            else{
              console.log("deleted seating");
              const q = "Delete from event_staff where event_id = ?"
              db.query(q,[eventid],(err,results)=> {
                if(err)return res.sendStatus(400)
                else{ 
                  const q = "Delete from event where id  = ?"
                  db.query(q,[eventid], (err,data)=>{
                  if(err) {
                    console.log(err);
                    return res.json(err)}
                  else 
                  {
                    console.log("deleted event");
                    return res.json("Event has been deleted!");
                  }
                  })
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

  app.delete("/updateseat/:id", (req, res) => {
    const eventid = req.params.id;
    const q = "Delete seating SET name = IF(ISNULL(?),name), rowxcol = IF (ISNULL(?), rowxcol), color = IF (ISNULL(?), color)   WHERE event = ?";
  
    const values = [req.body.name, req.body.rowxcol,req.body.color];
  
    db.query(q, [...values, eventid], (err, data) => {
      if (err) return res.json(err);
      return res.json("Seating arrangment have been updated!");
    });
  });
  app.get("/seatingsearch/:id",(req,res)=>{
    const eventid = req.params.id;

    const q = "SELECT * FROM event WHERE id = "+eventid +" and rowxcol is not null";
    db.query(q,(err,data)=>{
      if(err) return res.json(err);
      else {
        return res.json(data.length);}
    })
  })

  app.get("/seatingcategory/:id",(req,res)=>{
    const eventid = req.params.id;

    const q = "SELECT * FROM seating WHERE event = "+eventid;
    db.query(q,(err,data)=>{
      if(err) return res.json(err);
      else {
        return res.json(data);}
    })
  })

  app.get("/seatingdata/:id",(req,res)=>{
    const eventid = req.params.id;

    const q = `SELECT * FROM seating where event = ${eventid}`;
    db.query(q,(err,data)=>{
      if(err) return res.json(err);
      else {
        return res.json(data);}
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

  app.get("/searcheventid/:id",(req,res)=> {
    let id = req.params.id;
    const q = `SELECT * FROM event where rowxcol is not null and (location like '%${id}%' or name like '%${id}%')`;
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


  app.get("/eventcollaborator/:id",(req,res)=>{
    const eventid = req.params.id;

    const q = "SELECT user_id, username,role from event_staff inner join users on users.id = event_staff.user_id where event_id = " + eventid;
    db.query(q,(err,data)=>{
      if(err) return res.json(err);
      else{
        return res.json(data);
      }
    })
  })

  app.get("/checkeventcollab/:username/:eventid",(req,res) => {
    const eventid = req.params.eventid;
    const username = req.params.username;

    const q ='select count(*) as count from event_staff inner join users on event_staff.user_id = users.id where  event_staff.event_id = '+ eventid+' and username = "'+ username+ '"';

    db.query(q,(err,data)=>{
      if(err) return res.json(err);
      else{
        return res.json(data);
      }
    })
  })

  app.post("/addeventstaff/:eventid/:userid", (req,res)=>{
    const eventid = req.params.eventid;
    const userid =req.params.userid;
    const q = `INSERT INTO event_staff (event_id,user_id) values (${eventid},${userid})`;
    
    db.query(q, (err,data)=>{
        if(err) 
        {return res.json(err)}
        else{
          console.log(data);
          return res.json("Event staff has been added!")
  
        }
    })
  })

  app.delete("/deleteeventstaff/:eventid/:userid", (req,res)=>{
    const eventid = req.params.eventid;
    const userid =req.params.userid;
    const q = `delete from event_staff where event_id = ${eventid} and user_id = ${userid}`;
    console.log(q);
    db.query(q, (err,data)=>{
        if(err) 
        {return res.json(err)}
        else{
          console.log(data);
          return res.json("Event staff has been deleted!")
  
        }
    })
  })

  //finding excel file
  app.post('/api/upload-excel', upload.single('file'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded.' });
      }
  
      const workbook = new ExcelJS.Workbook();
      const buffer = req.file.buffer; // Access the buffer of the uploaded file
      await workbook.xlsx.load(buffer);
  
      const worksheet = workbook.getWorksheet(1);
      const data = [];
  
      worksheet.eachRow((row, rowNumber) => {
        data.push(row.values);
      });
  
      res.json(data);
    } catch (error) {
      console.error('Error reading uploaded Excel file:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  //creating chart
  app.get('/api/chart', async (req, res) => {
    try {
      const width = 800;
      const height = 400;
  
      const canvasRenderService = new CanvasRenderService(width, height);
      const configuration = {
        type: 'bar',
        data: {
          // Your chart data goes here
        },
      };
  
      const imageBuffer = await canvasRenderService.renderToBuffer(configuration);
      res.contentType('image/png').end(imageBuffer, 'binary');
    } catch (error) {
      console.error('Error generating chart:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.get('/api/emcee/:eventid', async (req, res) => {
    const eventid = req.params.eventid;

    const q = `   SELECT DIsTINCT(emcee.AdmNo), students.FullName,students.Award  from students inner join emcee on students.AdmNo = emcee.AdmNo where emcee.Event = ${eventid} And Attendance = 'yes' order by emcee.id asc

    `
    console.log(q);
    db.query(q,(err,data)=>{
      if(err) return res.json(err);
      else{
        return res.json(data);
      }
    })
  });

  app.get('/dashboardtotalstudent', async (req, res) => {

    const q = ` select event.name,Count(*) as count from students inner join event on students.event = event.id  where students.event is not null and students.attendance = 'Yes' group by students.event order by event.id`
    //console.log(q);
    db.query(q,(err,data)=>{
      if(err) return res.json(err);
      else{
        // console.log(data);
        return res.json(data);
      }
    })
  });

  app.get('/dashboardattendedstudent', async (req, res) => {

    const q = `  select event.name,Count(*) as count from students inner join event on students.event = event.id  where students.event is not null and students.attendance = 'Yes' and students.Status = 'Yes' group by students.event order by event.id
`
    //console.log(q);
    db.query(q,(err,data)=>{
      if(err) return res.json(err);
      else{
        // console.log(data);
        return res.json(data);
      }
    })
  });


  app.get('/dashboardtotalstudent/:name', async (req, res) => {
    const name = req.params.name;
    const q = ` select event.name,Count(*) as count from students inner join event on students.event = event.id  where students.event is not null and students.attendance = 'Yes' and event.name like '%${name}%' group by students.event order by event.id`
    //console.log(q);
    db.query(q,(err,data)=>{
      if(err) return res.json(err);
      else{
        // console.log(data);
        return res.json(data);
      }
    })
  });

  app.get('/dashboardattendedstudent/:name', async (req, res) => {
    const name = req.params.name;
  
    const q = `  select event.name,Count(*) as count from students inner join event on students.event = event.id  where students.event is not null and students.attendance = 'Yes' and students.Status = 'Yes' and event.name like '%${name}%' group by students.event order by event.id
`
    //console.log(q);
    db.query(q,(err,data)=>{
      if(err) return res.json(err);
      else{
        // console.log(data);
        return res.json(data);
      }
    })
  });

  app.get('/dashboardflag',async (req,res)=>{
    const q= "select distinct(admNo),count(*) as count from students where status = 'Yes'  and (Attendance != 'Yes' || Attendance is null) group by admNo";

    db.query(q,(err,data)=>{
      if(err)return res.status(400).send("Error");
      else{
        return res.json(data);
      }
    })
  })

  app.delete('/deletestudents/:eventid',async (req,res)=>{
    const eventid = req.params.eventid;
    const q ="DELETE FROM students WHERE event = ?";
    db.query(q,eventid,(err,data)=>{
      if(err) return res.status(400).send("Error");
      else{
        return res.json({message:"students deleted"});
      }
    })
  })


  

// // Nodemailer transporter Testin
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     type: "OAuth2",
//     user: process.env.EMAIL,
//     pass: process.env.WORD,
//     clientId: process.env.OAUTH_CLIENTID,
//     clientSecret: process.env.OAUTH_CLIENT_SECRET,
//     refreshToken: process.env.OAUTH_REFRESH_TOKEN,
//   },
// });

// // Email options
// const mailOptions = {
//   from: 'nyp.dime.student1@gmail.com', // Replace with your Gmail address
//   to: 'chanjordan93@gmail.com',
//   subject: 'Test Email',
//   text: 'Hello, this is a test email!',
// };

// // Send the email
// transporter.sendMail(mailOptions, (error, info) => {
//   if (error) {
//     return console.error('Error sending email:', error);
//   }
//   console.log('Email sent:', info.response);
// });

//  transporter.verify((err, success) => {
//   err
//     ? console.log(err)
//     : console.log(`=== Server is ready to take messages: ${success} ===`);
//  });

 app.post('/send-email', async (req, res) => {
  const { emails, subject, message } = req.body;

  // Nodemailer setup
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: "OAuth2",
      user: process.env.EMAIL,
      pass: process.env.WORD,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    },
  });

  // Sending emails
  const promises = emails.map((email) =>
    transporter.sendMail({
      from: 'your-gmail@gmail.com', // Replace with your Gmail address
      to: email,
      subject,
      text: message,
    })
  );

  try {
    await Promise.all(promises);
    res.status(200).json({ message: 'Emails sent successfully.' });
  } catch (error) {
    console.error('Error sending emails:', error);
    res.status(500).json({ error: 'Error sending emails.' });
  }
});


