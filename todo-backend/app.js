const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const todoRoutes = require('./routes/todoRoutes');
const authRoutes = require('./routes/authRoutes');

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Middleware
app.use(express.json()); // Parse JSON requests

// Routes
app.use('/api/todos', todoRoutes); // Todo routes
app.use('/api/auth', authRoutes);  // Authentication routes

module.exports = app; // Export the app
