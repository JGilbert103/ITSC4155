const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const ticketModel = require('./schemas/ticket.js');

const app = express();
// Middleware
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true
}));

// MongoDB Connection
const mongoURI = 'mongodb+srv://danielleff03:9tZXrhKqsi3Mn2S8@cluster0.zekhtoy.mongodb.net/NinerMaintenance?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(mongoURI, {})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));


// Routes
app.post('/tickets', async (req, res) => {
    try {
        const ticket = await ticketModel.create(req.body);
        res.json(ticket);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create ticket' });
    }
});


app.get('/getTickets', async (req, res) =>{
       ticketModel.find()
       .then(tickets => res.json(tickets)) 
       .catch(err => res.json(err))
  

})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})