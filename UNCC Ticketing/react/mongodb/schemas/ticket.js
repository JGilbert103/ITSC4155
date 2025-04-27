const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose)

const ticketSchema = new mongoose.Schema({
    ticketid: {
        type: Number,
        unique: true
    },
    firstname: String,
    lastname: String,
    problem: String,
    building: String,
    location: String,
    email: String,
    status: {
        type: Number, 
        enum: [1, 2, 3], 
        default: 1 
    },
    updates: {
        type: Boolean,
        required: false,
        default: false
    },
    photo: String,
    
}, {
    timestamps: true
})

ticketSchema.plugin(AutoIncrement,{inc_field:'ticketid'})

const ticketModel = mongoose.model("tickets", ticketSchema)
module.exports = ticketModel;