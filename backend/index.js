import express from "express"
import mysql from "mysql"
import cors from "cors"
 
import dotenv from "dotenv"; // Import dotenv

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

app.post("/seat", (req,res)=>{
    const q = "INSERT INTO seating (`seatcol`,`year`) values (?,?)";
    const values = [req.body.seatcol, req.body.year];

    db.query(q,[values], (err,data)=>{
        if(err) return res.json(err)
        return res.json("Seats has been added!")
    })
})

app.get("/studentsfilter/:id", (req,res) => {
  let id = req.params.id;
  console.log(id);
  if(id == "Top")
  {
    const q = "Select * from students where Top = 'Top'";

    db.query(q, (err,data)=>{
      if(err) return res.json(err)
      return res.json(data)
  })
  }
  else if (id == "Directorlist")
  {

      const q = "Select * from students where Award like 'Director List%'";
      db.query(q, (err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
  }
  else if (id == "Goodprogress")
  {
    const q = "Select * from students where Award = 'Good Progress'";
    db.query(q, (err,data)=>{
      if(err) return res.json(err)
      return res.json(data)
  })
  }
  
})

app.get("/student", (req,res)=>{
    const q = "SELECT * from student"
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

app.delete("/seat/:id", (req,res)=>{
    const seatId = req.params.id;
    const q = "DELETE from seating where id = ?"

    db.query(q,[seatId], (err,data)=>{
        if(err) return res.json(err)
        return res.json("Seats has been deleted!");
    })
})

app.put("/seat/:id", (req, res) => {
    const seatId = req.params.id;
    const q = "UPDATE seating SET seatcol = IFNULL(?, seatcol), year = IF (ISNULL(?), NULL, year) WHERE id = ?";
  
    const values = [req.body.seatcol, req.body.year];
  
    db.query(q, [...values, seatId], (err, data) => {
      if (err) return res.json(err);
      return res.json("Seats have been updated!");
    });
  });
  
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
  const q = "select idaccounts,username,role from users where username != 'admin'"
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
    const q = `UPDATE student SET Attendance = 'yes' WHERE adminNo = ${adminNo}`;
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

app.post('/insertStudent', (req, res) => {
    const { adminNo } = req.body;
    const firstTwoDigits = adminNo.slice(1, 3);
    // Check the value of the student column added
    let year = '';
    if (firstTwoDigits === '21') {
        year = 'year 1';
    } else if (firstTwoDigits === '22') {
        year = 'year 2';
    } else if (firstTwoDigits === '23') {
        year = 'year 3';
    }

    // Define the SQL query to insert a new student's admin number and year
    const insertQuery = 'INSERT INTO display (student, year) VALUES (?, ?)';

    const values = [adminNo, year];

    db.query(insertQuery, values, (err, data) => {
        if (err) {
            console.error('Error inserting student:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.json('Student has been inserted!');
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