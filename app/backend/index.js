const express = require('express');
const mysql = require('mysql');
const app = express();
const cors = require('cors');

const db = mysql.createConnection({
       host: "localhost",
       user:"root",
       password:"",
       database:"node"
})

app.use(express.json())
app.use(cors());

app.get("/", (req, res) => {
    res.json("Hello this is backend")
})
app.get("/books", (req, res) => {
    const q = "SELECT * FROM books"
        db.query(q, (err, data) =>{
            if(err) return res.json(err)
            return res.json(data)
        })
})
app.post("/books", (req, res) => {
    const q = "INSERT INTO books(`title`,`desc`,`cover`,`price`) VALUES (?)"
    const values = [
     req.body.title,
     req.body.desc,
     req.body.cover,
     req.body.price
    ]
    
    db.query(q, [values], (err, data)=>{
        if(err) return res.json(err)
        return res.json("User created successfully")

    })
})

app.delete("/books/:id", (req, res)=>{
   const bookId = req.params.id;
   const q = "DELETE FROM books WHERE id = ?"

   db.query(q,[bookId], (err, data)=>{
    if(err) return res.json(err);
    return res.json("Book Delete successfully");
   })

})

app.put("/books/:id", (req, res)=>{
    const bookId = req.params.id;
    const q = "UPDATE books SET `title`= ?, `desc`= ?, `cover`= ?, `price`= ? WHERE id = ?"
 
    const values = [
        req.body.title,
        req.body.desc,
        req.body.cover,
        req.body.price
       ]


    db.query(q,[...values, bookId], (err, data)=>{
     if(err) return res.json(err);
     return res.json("Book Updated successfully");
    })
 
 })
 

app.listen(3001, ()=> {
    console.log("Listening to port 3001")
});