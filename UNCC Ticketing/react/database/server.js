import express from "express";
import mysql from "mysql2";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors())

const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'password',
    database: 'Niner'

})

app.get('/', (re, res)=>{
    return res.json("From Backend")
})

app.get('/tickets', (req, res)=>{
    const sql = "SELECT * FROM tickets";
    db.query(sql,(err, data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.post('/tickets', (req, res)=>{
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const problem = req.body.problem;
    const building = req.body.building;
    const location = req.body.location;
    const updates = req.body.updates;
    const photo = req.body.photo;
    console.log(req.body)

    db.query("INSERT INTO tickets (firstname, lastname, problem, building, location, updates) VALUES (?, ?, ?, ?, ?, ?)", [firstname, lastname, problem, building, location, updates], (err, result) =>{
        if (err){
            console.log(err)
        } else{
            //res.send({firstname: firstname})
        }
    })

})

app.listen(8081, ()=>{
    console.log("listen")
})


 