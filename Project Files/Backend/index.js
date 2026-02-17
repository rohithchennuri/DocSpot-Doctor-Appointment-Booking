require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectToDB = require('./config/connectToDB');

const userRoutes = require('./routes/userRoutes');
const doctorRoutes = require('./routes/doctorRoutes');


// import other routes as needed

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/doctors', doctorRoutes);
app.use('/api/users', userRoutes);
// app.use('/api/doctors', doctorRoutes);
// app.use('/api/admin', adminRoutes);

connectToDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));