// Load Env variables from .env
require('dotenv').config();

// Import Libraries
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Create the app
const app = express();

// Middleware (runs for every request)
app.use(cors()); // allow cross-origin in dev (React on :5173  -> server on :5000)
app.use(express.json()); //Parse json request bodies into req.body

// Health route
app.get('/api/health', (req, res) => {
    res.json({ok:true, env:process.env.NODE_ENV || "unknown"})
});

// DEV-ONLY smoke test routes (remove later)
const Assignment = require('./models/Assignment');

// create one test document
app.get('/api/dev/seed-one', async (req, res) => {
  try {
    const doc = await Assignment.create({
      title: 'Factory valuation',
      client: 'ACME Ltd.',
      dueDate: new Date('2025-09-01T00:00:00.000Z'),
      status: 'Pending',
      notes: 'Seeded via dev route'
    });
    res.status(201).json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// list all documents
app.get('/api/dev/list', async (req, res) => {
  try {
    const docs = await Assignment.find().sort({ dueDate: 1 });
    res.json(docs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Connect to MongoDB (Mongoose)
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/valuationDB';

mongoose.connect(MONGO_URI)
.then(()=>console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ Mongo connection error:', err.message));


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server is listening in http://localhost:${PORT}`);
});