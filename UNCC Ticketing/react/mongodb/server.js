const express = require('express');
const mongoose = require('mongoose');

const DataModel = require('./schemas/ticket.js');
const connect = require('./conn.js');

const app = express();
app.use(express.json({ extended: false }));

const cors = require('cors');
app.use(cors());


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})