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
  

app.listen(8800, ()=>{
    console.log("connected to crud app!")
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




