const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const appointmentsRoutes = require('./routes/appointmentRoutes');
const doctorRoutes = require('./routes/doctorsRoutes');
const prescriptionRoutes = require('./routes/prescriptionRoutes');
const jwtTokenRoute = require('./routes/jwtTokenRoute');

const connectDB = require('./config/db');

const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

connectDB();

// Routes
app.get('/', (_req, res) => {
    res.send('Hello World!');
})

// Test route to check if server is working
app.get('/test', (_req, res) => {
    res.json({ message: 'Server is working!', timestamp: new Date().toISOString() });
})

app.use('/', appointmentsRoutes);
app.use('/', doctorRoutes);
app.use('/', prescriptionRoutes);
app.use('/',jwtTokenRoute);



// Connect to database and start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


