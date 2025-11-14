const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const userRouter = require('./routes/authRoutes');

const app = express();
app.use(cors({
    origin: 'http://localhost:5173',                                   // Frontend URL
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

app.use('/api/auth', userRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
