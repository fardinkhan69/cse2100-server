const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const appointmentsRoutes = require('./routes/appointmentRoutes');
const doctorRoutes = require('./routes/doctorsRoutes');
const prescriptionRoutes = require('./routes/prescriptionRoutes');

const connectDB = require('./config/db');

const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

connectDB();

// Routes
app.get('/',(_req,res) =>  {
    res.send('Hello World!');
})

app.use('/',appointmentsRoutes);
app.use('/',doctorRoutes);
app.use('/',prescriptionRoutes);

// Connect to database and start server
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});