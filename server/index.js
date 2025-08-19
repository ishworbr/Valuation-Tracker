// Load Env variables from .env
require('dotenv').config();

// Import Libraries
const express = require('express');
const cors = require('cors');

// Create the app
const app = express();

// Middleware (runs for every request)
app.use(cors()); // allow cross-origin in dev (React on :5173  -> server on :5000)
app.use(express.json()); //Parse json request bodies into req.body

// A simple route to test the server is up 
app.get('/api/health', (req, res) => {
    res.json({ok:true, env:process.env.NODE_ENV || "unknown"})
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server is listening in http://localhost:${PORT}`);
});