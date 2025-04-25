const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser')

const ticketModel = require('./schemas/ticket.js');
const userModel = require('./schemas/user.js');

const app = express();
// Middleware
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true
}));
app.use(bodyParser.json({limit: '1gb'}))

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

app.post('/register', async (req, res) => {
    var newUser = new userModel(req.body);

    newUser.password = newUser.generateHash(req.body.password);
    newUser.save();
});

app.post('/login', async (req,res) =>{
    try {
        const { email, password } = req.body;
        
        let user = await userModel.findOne({ email });
        
        if (!user) {
            const newUser = new userModel({
                email: email,
                role: 1 
            });
            
            newUser.password = newUser.generateHash(password);
            
            user = await newUser.save();
            
            console.log("New user created:", email);
            
            return res.json({
                id: user._id,
                email: user.email,
                role: user.role,
                newUser: true
            });
        }
        
        const isValidPassword = user.validPassword(password);
        
        if (!isValidPassword) {
          return res.status(401).json({ error: 'Invalid credentials' });
        }

        res.json({
          id: user._id,
          email: user.email,
          role: user.role,
          newUser: false
        });

      } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Server error' });
      }
});

app.get('/getUsers', async (req, res) => {
    try {
        console.log('Fetching all users from database');
        const users = await userModel.find({});
        console.log(`Found ${users.length} users`);
        res.json(users);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

app.get('/getTickets', async (req, res) =>{
    ticketModel.find()
    .then(tickets => res.json(tickets)) 
    .catch(err => res.json(err))
});

app.get('/userTickets', async (req, res) =>{
    try{
        const authHeader = req.headers['authorization']
        const userEmail = authHeader.split(' ')[1]
        console.log(userEmail);

        const user = await ticketModel.find({ email: userEmail})
        console.log("user tickets: ", user)
        res.json(user)

    } catch(err) {
        console.log(err)
    }

})

app.get('/admin', async (req, res) => {
    const user = req.user;
    if (user.role ===2 || user.role === 3) {
        res.json({ isAdmin: true });
    } else {
        res.json({ isAdmin: false });
    }
});

app.put('/users/:id', async (req, res) => {
    try {
        console.log('Update request received');
        console.log('Route parameter:', req.params);
        console.log('Request body:', req.body);
        
        const userId = req.params.id;
        const role = parseInt(req.body.role);

        console.log(`Attempting to update user ${userId} to role ${role}`);
        const userExists = await userModel.findById(userId);
        
        if (!userExists) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { role: role }
        );

        console.log('User updated successfully:', updatedUser);
        res.json(updatedUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update user role' });
    }
}); 

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})