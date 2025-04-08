const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    problem: String,
    building: String,
    location: String,
    updates: {
        type: Boolean,
        required: false,
        default: false
    },
    photo: String
})


const ticketModel = mongoose.model("tickets", ticketSchema)
module.exports = ticketModel;