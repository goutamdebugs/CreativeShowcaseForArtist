const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/creative-showcase');
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(` Error: ${error.message}`);
        // Don't exit in development, let server run
        if (process.env.NODE_ENV === 'production') {
            process.exit(1);
        }
    }
};

module.exports = connectDB;