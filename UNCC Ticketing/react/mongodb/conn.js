const mongoose = require('mongoose');
const express = require("express")
const cors = require("cors")
const ticketModel = require('./schemas/ticket.js');


const app = express()
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin : 'http://localhost:5001',
    credentials:true
}))


const url = 'mongodb+srv://danielleff03:9tZXrhKqsi3Mn2S8@cluster0.zekhtoy.mongodb.net/NinerMaintenance?retryWrites=true&w=majority&appName=Cluster0';

const connect = async () => {
    try {
        await mongoose.connect(url, {})
        console.log('Connected to MongoDB')
    } catch (error) {
        console.log(error)
    }
}

app.post('/tickets', (req, res) =>{
    ticketModel.create(req.body)
    .then(ticket => res.json(ticket))
    .catch(err => res.json(err))

})

app.get('/getTickets', async (req, res) => {
    try {
        const tickets = await ticketModel.find();
        res.json(tickets);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

    



//const collection = new mongoose.model('tickets', ticketSchema);

/*
mockData={
    firstName: 'John'
}
    */



//collection.insertMany([mockData]);

//console.log(mockData);

module.exports = connect();
