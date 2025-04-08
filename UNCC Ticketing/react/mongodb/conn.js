const mongoose = require('mongoose');

const url = 'mongodb+srv://danielleff03:9tZXrhKqsi3Mn2S8@cluster0.zekhtoy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const connect = async () => {
    try {
        await mongoose.connect(url, {})
        console.log('Connected to MongoDB')
    } catch (error) {
        console.log(error)
    }
}

const ticketSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    }
});

const collection = new mongoose.model('tickets', ticketSchema);

mockData={
    firstName: 'John'
}

collection.insertMany([mockData]);

module.exports = connect();
