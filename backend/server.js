const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors({
    origin: [
        "http://localhost:3000",
        "http://localhost:5173",
        "https://creativeshowcaseforartist.onrender.com"
    ],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/images', require('./routes/imageRoutes'));

// Test route
app.get('/', (req, res) => {
    res.json({ message: 'Creative Showcase API is running...' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    console.error('Server Error:', err.message);

    res.status(statusCode).json({
        success: false,
        message: err.message || 'Internal Server Error',
        // Show stack only in development
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`API URL: http://localhost:${PORT}`);
});