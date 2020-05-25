const express = require('express');
const mysql = require('mysql')
const app = express();
const port = 3400;

var conn = mysql.createConnection({
    host: process.env.hostname,
    user: "admin",
    password: process.env.pwd,
    database: "mydb"
})

app.get('/', (req,res) => {
    res.send("Hii To Edureka")
})

//Create
app.post('/addStudent',(req,res) => {
    conn.connect((err) => {
        if(err) throw err
        var sql = "INSERT INTO student(name,address,marks) VALUES('Ammy','U789 Delhi',87)"
        conn.query(sql, (err,result) => {
            if(err) throw err;
            res.send('Add Added')
        })
    })
})

//Read
app.get('/getstudents',(req,res) => {
    conn.connect((err) => {
        if (err) throw err;
        console.log("Connected")
        var sql = "SELECT * FROM student"
        conn.query(sql, (err,result,fields) => {
            if(err) throw err;
            res.send(result)
        })
    })
})

//Update
app.put('/updatestudent',(req,res) => {
    conn.connect((err) => {
        if(err) throw err;
        var sql = "UPDATE student SET address = 'Y77 London' WHERE name = 'Anand' ";
        conn.query(sql, (err,result) => {
            if(err) throw err;
            res.send('Record Updated')
        })
    })
})

//Delete
app.delete('/deletestudent', (req,res) => {
    conn.connect((err) => {
        if (err) throw err;
        var sql = "DELETE FROM  student WHERE name = 'Anand'";
        conn.query(sql, (err,result) => {
            if(err) throw err;
            res.send('Record Deleted')
        })
    })
})


app.get('/createtable',(req,res) => {
    conn.connect((err) => {
        if (err) throw err;
        console.log("Connected")
        var sql = "CREATE TABLE student (name VARCHAR(255), address VARCHAR(255), marks INT)"
        conn.query(sql, (err,result) => {
            if(err) throw err;
            res.send("Table Created")
            res.end;
        })
    })
})




app.listen(port,() => {
    console.log(`Server is running on port ${port}`)
})
