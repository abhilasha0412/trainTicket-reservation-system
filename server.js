require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const trainTicketRoutes = require('./routes/trainTicketRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
try {
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
} catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
}

// Routes
app.use('/api', trainTicketRoutes);

app.get('/', (req, res) => {
    res.send('Train Ticket Reservation API is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
