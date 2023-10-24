import express from "express"
import mysql from "mysql"
import cors from "cors"
 
const app = express()

const db = mysql.createConnection({
    host:"127.0.0.1",
    user:"root",
    password:"",
    database: "crud",
    port: "3303"

})

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

app.get("/student", (req,res)=>{
    const q = "SELECT * from student"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
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
    const { GdProgress, DList, TopStudent, Cmging, Attendance } = req.body;

    // Define the SQL query to update student information with IFNULL
    const updateQuery = `UPDATE student
                          SET
                            GdProgress = IFNULL(?, GdProgress),
                            DList = IFNULL(?, DList),
                            TopStudent = IFNULL(?, TopStudent),
                            Cmging = IFNULL(?, Cmging),
                            Attendance = IFNULL(?, Attendance)
                          WHERE id = ?`;

    const values = [GdProgress, DList, TopStudent, Cmging, Attendance, studentId];

    db.query(updateQuery, values, (err, data) => {
      if (err) {
        console.error('Error updating student:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      return res.json('Student has been updated!');
    });
  });


app.listen(8800, ()=>{
    console.log("connected to crud app!")
});


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
app.post('/insertStudent', (req, res) => {
    const { adminNo } = req.body;
  
    // Define the SQL query to insert a new student's admin number
    const insertQuery = 'INSERT INTO display (student) VALUES (?)';
  
    const values = [adminNo];
  
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
  