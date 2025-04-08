const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    firstname: String,
    lastname: String

})


const ticketModel = mongoose.model("tickets", ticketSchema)
module.exports = ticketModel